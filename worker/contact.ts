/** Contact webhook: Turnstile siteverify → D1 row + KV inbox. No email sending. */

export const MAX_BODY_BYTES = 32_000
export const MAX_PER_HOUR = 5
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactFields = {
  name: string
  email: string
  company: string
  message: string
  token: string
  honeypot: string
}

export type ParseResult = { ok: true; fields: ContactFields } | { ok: false; error: string }

function clip(value: unknown, max: number): string {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

export function parseContactPayload(input: Record<string, unknown>): ParseResult {
  const honeypot = String(input.website ?? '').trim()
  const name = clip(input.name, 80)
  const email = clip(input.email, 120).toLowerCase()
  const company = clip(input.company, 120)
  const message = String(input.message ?? '')
    .trim()
    .slice(0, 4000)
  const token = String(input['cf-turnstile-response'] ?? input.token ?? '').trim()

  if (honeypot) {
    return { ok: true, fields: { name, email, company, message, token, honeypot } }
  }
  if (name.length < 2) return { ok: false, error: 'Name is required.' }
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'A valid email is required.' }
  if (message.length < 10) return { ok: false, error: 'Message is too short.' }
  if (!token) return { ok: false, error: 'Turnstile token missing.' }
  return { ok: true, fields: { name, email, company, message, token, honeypot } }
}

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function allowedOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin')
  if (!origin) return true
  const host = new URL(request.url).origin
  const extras = new Set([
    host,
    'https://agentic-systems-studio.com',
    'https://www.agentic-systems-studio.com',
    'http://localhost:4321',
    'http://127.0.0.1:4321',
    'http://localhost:8787',
    'http://127.0.0.1:8787',
  ])
  return extras.has(origin)
}

async function readPayload(request: Request): Promise<Record<string, unknown> | null> {
  const declared = Number(request.headers.get('content-length') ?? '0')
  if (declared > MAX_BODY_BYTES) return null
  const type = request.headers.get('content-type') ?? ''
  if (type.includes('application/json')) {
    const text = await request.text()
    if (text.length > MAX_BODY_BYTES) return null
    const parsed: unknown = JSON.parse(text)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed as Record<string, unknown>
  }
  const form = await request.formData()
  const record: Record<string, unknown> = {}
  let size = 0
  for (const [key, value] of form.entries()) {
    if (typeof value !== 'string') continue
    size += key.length + value.length
    if (size > MAX_BODY_BYTES) return null
    record[key] = value
  }
  return record
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.set('remoteip', ip)
  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!result.ok) return false
  try {
    const data = (await result.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

async function ipHash(ip: string): Promise<string> {
  const bytes = new TextEncoder().encode(ip)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32)
}

export async function handleContact(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS', 'Cache-Control': 'no-store' } })
  }
  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'Method not allowed.' }, 405)
  }
  if (!allowedOrigin(request)) {
    return jsonResponse({ ok: false, error: 'Forbidden origin.' }, 403)
  }

  let payload: Record<string, unknown> | null
  try {
    payload = await readPayload(request)
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid body.' }, 400)
  }
  if (!payload) return jsonResponse({ ok: false, error: 'Payload too large.' }, 413)

  const parsed = parseContactPayload(payload)
  if (!parsed.ok) return jsonResponse({ ok: false, error: parsed.error }, 400)

  if (parsed.fields.honeypot) {
    return jsonResponse({ ok: true })
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0'
  const rlKey = `rl:${ip}`
  const hits = Number((await env.INBOX.get(rlKey)) ?? '0')
  if (hits >= MAX_PER_HOUR) {
    return jsonResponse({ ok: false, error: 'Rate limited.' }, 429)
  }
  // Count the attempt before siteverify so junk tokens cannot burn free-plan subrequests.
  await env.INBOX.put(rlKey, String(hits + 1), { expirationTtl: 3600 })

  if (!env.TURNSTILE_SECRET) {
    console.error(JSON.stringify({ msg: 'TURNSTILE_SECRET missing', path: '/api/contact' }))
    return jsonResponse({ ok: false, error: 'Contact is temporarily unavailable.' }, 503)
  }

  try {
    const valid = await verifyTurnstile(env.TURNSTILE_SECRET, parsed.fields.token, ip)
    if (!valid) {
      return jsonResponse({ ok: false, error: 'Turnstile verification failed.' }, 403)
    }

    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()
    const hashedIp = await ipHash(ip)
    const record = {
      id,
      created_at: createdAt,
      name: parsed.fields.name,
      email: parsed.fields.email,
      company: parsed.fields.company,
      message: parsed.fields.message,
      ip_hash: hashedIp,
    }

    await env.DB.prepare(
      `INSERT INTO contact_submissions (id, created_at, name, email, company, message, ip_hash)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`,
    )
      .bind(record.id, record.created_at, record.name, record.email, record.company, record.message, record.ip_hash)
      .run()

    await env.INBOX.put(`inbox:${id}`, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 90 })

    console.info(JSON.stringify({ msg: 'contact stored', id }))
    return jsonResponse({ ok: true, id })
  } catch (error) {
    console.error(JSON.stringify({ msg: 'contact persist failed', error: String(error) }))
    return jsonResponse({ ok: false, error: 'Contact is temporarily unavailable.' }, 503)
  }
}
