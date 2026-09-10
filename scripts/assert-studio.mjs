#!/usr/bin/env node
/** Content and free-plan guards for the studio Worker. */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function fail(msg) {
  console.error(`assert-studio: ${msg}`)
  process.exit(1)
}

function read(path) {
  return readFileSync(path, 'utf8')
}

const wrangler = read(join(root, 'wrangler.jsonc'))
if (!wrangler.includes('"name": "agentic-systems-studio"')) fail('wrangler name must stay agentic-systems-studio')
if (!wrangler.includes('"main": "worker/index.ts"')) fail('wrangler must include the contact Worker entry')
if (!wrangler.includes('ass-db')) fail('wrangler must bind free D1 ass-db')
if (!wrangler.includes('ASS_KV')) fail('wrangler must bind free KV ASS_KV')
if (!wrangler.includes('run_worker_first')) fail('API path must run the Worker first')
if (wrangler.includes('EmailMessage') || wrangler.includes('send_email')) {
  fail('must not configure Workers Email Sending')
}

const site = read(join(root, 'src', 'data', 'site.ts'))
if (!site.includes("email: 'contact@agentic-systems-studio.com'")) {
  fail('studio public email must be contact@agentic-systems-studio.com')
}
if (site.includes('rtvision7@gmail.com')) fail('rtvision7@gmail.com must not remain in site.ts')
if (!site.includes('https://www.linkedin.com/in/hanumanthu1')) fail('LinkedIn www URL missing')
if (!site.includes('https://github.com/hharsha98')) fail('GitHub URL missing')
if (!site.includes('https://huggingface.co/hharsha')) fail('Hugging Face URL missing')

const sourceFiles = []
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path)
    else if (entry.name === 'assert-studio.mjs' || entry.name.endsWith('.d.ts')) continue
    else if (/\.(ts|astro|mjs|md|jsonc|html)$/.test(entry.name)) sourceFiles.push(path)
  }
}
walk(root)

let blob = wrangler
for (const file of sourceFiles) blob += `\n${read(file)}`

for (const needle of ['evehicleshop', 'rtvision7@gmail.com', 'EmailMessage', 'mailchannels', 'SEND_EMAIL']) {
  if (blob.toLowerCase().includes(needle.toLowerCase()) && needle !== 'rtvision7@gmail.com') {
    fail(`forbidden string present: ${needle}`)
  }
}
if (blob.includes('rtvision7@gmail.com')) fail('rtvision7@gmail.com still present')
if (!blob.includes('0x4AAAAAAEuwpaBEHtpcUX5g')) fail('Turnstile sitekey missing')
if (!blob.includes('/api/contact')) fail('contact webhook path missing')
if (!existsSync(join(root, 'src', 'pages', 'contact.astro'))) fail('contact page missing')
if (!existsSync(join(root, 'migrations', '0001_contact_submissions.sql'))) fail('D1 migration missing')

const tests = spawnSync(process.execPath, ['--experimental-strip-types', '--test', 'worker/contact.test.ts'], {
  cwd: root,
  encoding: 'utf8',
})
if (tests.status !== 0) {
  console.error(tests.stdout)
  console.error(tests.stderr)
  fail('worker unit tests failed')
}

const build = spawnSync('npm', ['run', 'build'], { cwd: root, encoding: 'utf8' })
if (build.status !== 0) {
  console.error(build.stdout)
  console.error(build.stderr)
  fail('astro build failed')
}

const contactHtml = read(join(root, 'dist', 'contact.html'))
if (!contactHtml.includes('0x4AAAAAAEuwpaBEHtpcUX5g')) fail('built contact page missing Turnstile sitekey')
if (!contactHtml.includes('contact@agentic-systems-studio.com')) fail('built contact page missing studio email')
if (contactHtml.includes('</html>') && contactHtml.split('</html>')[1]?.includes('<script')) {
  fail('Turnstile scripts must stay inside the HTML document')
}

console.log('assert-studio: ok')
