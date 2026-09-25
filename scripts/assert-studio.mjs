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
if (!site.includes("profile: 'https://harsha-vardhan.pages.dev'")) {
  fail('founder profile must be https://harsha-vardhan.pages.dev')
}
for (const host of [
  'fleet.agentic-systems-studio.com',
  'os.agentic-systems-studio.com',
  'vibespace.agentic-systems-studio.com',
  'rag.agentic-systems-studio.com',
]) {
  if (!site.includes(host)) fail(`future host missing from site config: ${host}`)
}

const header = read(join(root, 'src', 'components', 'Header.astro'))
for (const label of ["label: 'Products'", "label: 'Demos'", "label: 'Contact'"]) {
  if (!site.includes(label)) fail(`nav must include ${label}`)
}
if (site.includes("href: '/research'") || site.includes("label: 'Research'")) {
  fail('research nav must stay removed')
}
if (existsSync(join(root, 'src', 'pages', 'research.astro'))) fail('research page must stay deleted')
if (!header.includes('Founder')) fail('nav must include Founder')
if (header.includes('Profile')) fail('header Profile link must be Founder')
if (header.includes('Browse products')) fail('header must stay a studio nav, not a SaaS launch CTA')
if (header.includes('Sign in') || header.includes('Launch app') || header.includes('Launch the fleet')) {
  fail('header must not clone a SaaS sign-in funnel')
}
if (site.includes("label: 'Studio'") || site.includes("label: 'Work'")) {
  fail('nav must not use CV/dossier labels Studio/Work')
}

if (!existsSync(join(root, 'src', 'pages', 'products', 'index.astro'))) fail('products index missing')
if (!existsSync(join(root, 'src', 'pages', 'demos.astro'))) fail('demos page missing')
if (!existsSync(join(root, 'src', 'data', 'products.ts'))) fail('products catalog missing')

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
if (blob.toLowerCase().includes('mechaharsh@')) fail('personal mechaharsh@ email must not appear on studio pages')
if (blob.includes('agentos.169.58.185.43.sslip.io')) {
  fail('do not link the retired Agent OS Contabo public demo')
}
if (blob.includes('agentfleet.vercel.app')) fail('do not link third-party Agent Fleet vercel.app')
if (blob.includes('agentfleet.pages.dev')) fail('do not link third-party agentfleet.pages.dev')
if (!existsSync(join(root, 'public', 'media', 'agentfleet-landing.png'))) {
  fail('owned Agent Fleet landing visual missing at public/media/agentfleet-landing.png')
}
if (/\bdossier\b/i.test(blob)) fail('CV/dossier framing must not remain in studio copy')
if (blob.includes('Open dossier')) fail('replace Open dossier with product CTAs')
if (!blob.includes('0x4AAAAAAEuwpaBEHtpcUX5g')) fail('Turnstile sitekey missing')
if (!blob.includes('/api/contact')) fail('contact webhook path missing')
if (!existsSync(join(root, 'src', 'pages', 'contact.astro'))) fail('contact page missing')
if (!existsSync(join(root, 'migrations', '0001_contact_submissions.sql'))) fail('D1 migration missing')

const products = read(join(root, 'src', 'data', 'products.ts'))
for (const url of [
  'https://github.com/hharsha98/agentfleet',
  'https://agentfleet.169.58.185.43.sslip.io/',
  'https://github.com/hharsha98/agent-os',
  'https://hharsha98.github.io/agent-os/',
  'https://github.com/hharsha98/Vibespace',
  'https://github.com/hharsha98/Vibespace/releases/latest',
  'https://github.com/hharsha98/retrievallab',
  'https://retrievallab.pages.dev',
  'https://careeragent-ceq.pages.dev',
  'https://github.com/hharsha98/agentgrid',
  'https://github.com/hharsha98/agentgrid/blob/main/docs/HOSTING.md',
  'https://github.com/hharsha98/06-revenue-ops-agent-control-tower',
  'https://revenueops.169.58.185.43.sslip.io/',
  'https://github.com/hharsha98/agentops-studio',
  'https://agentops.169.58.185.43.sslip.io/',
]) {
  if (!products.includes(url)) fail(`product catalog missing required URL: ${url}`)
}

function productBlock(slug, nextSlug) {
  const start = products.indexOf(`slug: '${slug}'`)
  const end = nextSlug ? products.indexOf(`slug: '${nextSlug}'`) : products.length
  if (start < 0 || end < 0 || end <= start) fail(`could not slice product block for ${slug}`)
  return products.slice(start, end)
}

const agentOs = productBlock('agent-os', 'vibespace')
if (!agentOs.includes("status: 'download'")) fail('Agent OS must be Download / local')
if (agentOs.includes("status: 'live'")) fail('Agent OS must not be marked Live')
if (agentOs.includes('sslip.io')) fail('Agent OS must not link a public sslip URL')
if (!agentOs.includes("kind: 'download'")) fail('Agent OS must use the download link kind')
if (!agentOs.includes("label: 'Clone / run locally'")) fail('Agent OS primary CTA must be Clone / run locally')
if (!agentOs.includes('https://github.com/hharsha98/agent-os')) fail('Agent OS clone path must be the GitHub repo')
if (!agentOs.includes("kind: 'gallery'")) fail('Agent OS must keep the static gallery link')
if (!agentOs.includes('https://hharsha98.github.io/agent-os/')) fail('Agent OS gallery must stay on github.io')
if (!agentOs.includes('127.0.0.1:8090')) fail('Agent OS copy must say to run on 127.0.0.1:8090')
if (agentOs.includes('os.agentic-systems-studio.com') && /href:\s*'https?:\/\/os\.agentic-systems-studio\.com/.test(agentOs)) {
  fail('do not use os.agentic-systems-studio.com as an Agent OS product URL')
}
if (/href:\s*'https?:\/\/[^']*os\.agentic-systems-studio\.com/.test(products)) {
  fail('do not link os.agentic-systems-studio.com')
}

const allowedSslip = new Set([
  'agentfleet.169.58.185.43.sslip.io',
  'agentops.169.58.185.43.sslip.io',
  'revenueops.169.58.185.43.sslip.io',
])
for (const host of products.match(/[a-z0-9.-]+\.sslip\.io/g) || []) {
  if (!allowedSslip.has(host)) fail(`unexpected sslip host in catalog: ${host}`)
}
if (/href:\s*'https?:\/\/[^']*agentic-systems-studio\.com/.test(products)) {
  fail('do not use a studio apex hostname as a product URL')
}

const agentGrid = productBlock('agentgrid', 'revenue-ops')
if (!agentGrid.includes("status: 'download'")) fail('Agent Grid must be Download / local')
if (agentGrid.includes("status: 'live'")) fail('Agent Grid must not be marked Live')
if (agentGrid.includes('sslip.io')) fail('Agent Grid must not link a public sslip URL')
if (!agentGrid.includes("kind: 'download'")) fail('Agent Grid must use the download link kind')
if (!agentGrid.includes('https://github.com/hharsha98/agentgrid')) fail('Agent Grid clone path must be the GitHub repo')

for (const [slug, next, url] of [
  ['revenue-ops', 'agentops-studio', 'https://revenueops.169.58.185.43.sslip.io/'],
  ['agentops-studio', null, 'https://agentops.169.58.185.43.sslip.io/'],
]) {
  const block = productBlock(slug, next)
  if (!block.includes("status: 'live'")) fail(`${slug} must be Live`)
  if (!block.includes("label: 'Public demo'")) fail(`${slug} CTA must be labeled Public demo`)
  if (!block.includes(url)) fail(`${slug} must link its verified Contabo/sslip demo`)
}

if ((products.match(/accent: '#[0-9a-fA-F]{6}'/g) || []).length !== 8) {
  fail('catalog must list eight products, each with a hex accent')
}

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

const indexHtml = read(join(root, 'dist', 'index.html'))
if (indexHtml.includes('Open dossier') || /\bdossier\b/i.test(indexHtml)) {
  fail('built home still uses dossier framing')
}
if (!indexHtml.includes('harsha-vardhan.pages.dev')) fail('built home must link the founder site')
if (!indexHtml.includes('Vibespace')) fail('built home must feature Vibespace')
if (!indexHtml.includes('retrievallab.pages.dev')) fail('built home must use RetrievalLab live URL')
if (!indexHtml.includes('careeragent-ceq.pages.dev')) fail('built home must include CareerAgent live URL')
if (!indexHtml.includes('hharsha98.github.io/agent-os')) fail('built home must keep the Agent OS static gallery as a secondary link')
if (indexHtml.includes('agentos.169.58.185.43.sslip.io')) {
  fail('built home must not link the retired Agent OS Contabo public demo')
}
if (!indexHtml.includes('02 Agent OS — Download / local')) fail('built home constellation must mark Agent OS Download / local')
if (indexHtml.includes('02 Agent OS — Live')) fail('built home must not mark Agent OS Live')
if (indexHtml.includes('02 Agent OS — Gallery')) fail('Agent OS must not stay Gallery / early')
if (!indexHtml.includes('06 Agent Grid — Download / local')) fail('Agent Grid must be Download / local')
if (indexHtml.includes('06 Agent Grid — Live')) fail('Agent Grid must not be marked Live')
if (!indexHtml.includes('07 Revenue Ops Control Tower — Live')) {
  fail('built home constellation must mark Revenue Ops Live')
}
if (!indexHtml.includes('08 AgentOps Studio — Live')) fail('built home constellation must mark AgentOps Studio Live')
if (!indexHtml.includes('agentops.169.58.185.43.sslip.io')) {
  fail('built home must link the AgentOps Studio Contabo/sslip public demo')
}
if (!indexHtml.includes('revenueops.169.58.185.43.sslip.io')) {
  fail('built home must link the Revenue Ops Contabo/sslip public demo')
}
if (/agentgrid\.[^"'\s]*sslip\.io/.test(indexHtml)) fail('built home must not give Agent Grid a public sslip URL')
if (/href=["'][^"']*os\.agentic-systems-studio\.com/.test(indexHtml)) {
  fail('built home must not link os.agentic-systems-studio.com')
}
if (!indexHtml.includes('agentfleet.169.58.185.43.sslip.io')) {
  fail('built home must link the owned Agent Fleet Contabo/sslip live demo')
}
if (indexHtml.includes('agentfleet.vercel.app')) {
  fail('do not link third-party Agent Fleet vercel.app')
}
if (indexHtml.includes('agentfleet.pages.dev')) {
  fail('do not link third-party agentfleet.pages.dev')
}
if (!indexHtml.includes('/media/agentfleet-landing.png')) {
  fail('built home must use the owned Agent Fleet landing visual')
}
if (indexHtml.includes('94ms') || /17 built-in/i.test(indexHtml)) {
  fail('do not copy Agent Fleet marketing metrics onto the studio hub')
}
function census(html, kind) {
  const match = html.match(new RegExp(`is-${kind}[\\s\\S]{0,500}?stat-value">(\\d+)`))
  if (!match) fail(`built home missing ${kind} census`)
  return match[1]
}
if (census(indexHtml, 'live') !== '5') fail(`live census must be 5 after delist, got ${census(indexHtml, 'live')}`)
if (census(indexHtml, 'download') !== '3') fail(`download census must be 3, got ${census(indexHtml, 'download')}`)
if (census(indexHtml, 'gallery') !== '0') fail(`gallery census must be 0, got ${census(indexHtml, 'gallery')}`)
if (census(indexHtml, 'building') !== '0') fail(`building census must be 0, got ${census(indexHtml, 'building')}`)
if (!indexHtml.includes('Studio constellation')) {
  fail('built home must include the studio constellation graphic')
}
if (!indexHtml.includes('products around one core')) {
  fail('built home constellation must be the full catalog, not a four-node Fleet clone')
}
if (!indexHtml.includes('Live · square')) {
  fail('built home constellation must encode honesty in node shape, not clone Fleet tool glyphs')
}
if (!indexHtml.includes('orbit-plate')) {
  fail('built home constellation must be a chart plate, not a CSS radar clone')
}
if (indexHtml.includes('orbit-spoke')) {
  fail('built home constellation must not use Fleet-style radial spokes')
}
if (!indexHtml.includes('Studio workflow')) fail('built home must include the studio workflow section')
if (!indexHtml.includes('Tech we actually use')) fail('built home must include tech credibility pills')
if (!indexHtml.includes('Write the studio')) fail('built home must close on studio contact, not a SaaS funnel')
if (!indexHtml.includes('contact@agentic-systems-studio.com')) {
  fail('built home must expose contact@agentic-systems-studio.com')
}
if (indexHtml.includes('Sign in') || indexHtml.includes('Launch app') || indexHtml.includes('Launch the fleet')) {
  fail('built home must not clone a SaaS sign-in funnel')
}
if (!indexHtml.includes('Building / coming soon')) {
  fail('built home must mark coming-soon products')
}
if (!indexHtml.includes('Gallery / early')) fail('built home must keep the gallery census label')
if (!indexHtml.includes('Download / local')) fail('built home must mark Vibespace as download / local')
if (/href=["'][^"']*chatgpt\.site/.test(indexHtml)) {
  fail('built home must not link chatgpt.site')
}
if (!existsSync(join(root, 'dist', 'products.html'))) fail('built products page missing')
if (!existsSync(join(root, 'dist', 'demos.html'))) fail('built demos page missing')

const productsHtml = read(join(root, 'dist', 'products.html'))
if (productsHtml.includes('Open dossier')) fail('products page still says Open dossier')
if (!productsHtml.includes('Open product') && !productsHtml.includes('GitHub')) {
  fail('products page must use product CTAs')
}
if (!productsHtml.includes('Building / coming soon')) fail('products page must show building status')
if (!productsHtml.includes('agentfleet.169.58.185.43.sslip.io')) {
  fail('products catalog must link the Agent Fleet Contabo/sslip live demo')
}
if (!productsHtml.includes('Live demo / Contabo')) {
  fail('products catalog must label the Fleet demo as Live demo / Contabo')
}
if (productsHtml.includes('agentos.169.58.185.43.sslip.io')) {
  fail('products catalog must not link the retired Agent OS Contabo public demo')
}
if (!productsHtml.includes('Clone / run locally')) fail('products catalog must offer Clone / run locally for Agent OS')
if (!productsHtml.includes('Public demo')) fail('products catalog must still label the remaining Contabo public demos')
if (/href=["'][^"']*os\.agentic-systems-studio\.com/.test(productsHtml)) {
  fail('products catalog must not link os.agentic-systems-studio.com')
}
if (/href=["'][^"']*chatgpt\.site/.test(productsHtml)) {
  fail('products catalog must not link chatgpt.site')
}

const demosHtml = read(join(root, 'dist', 'demos.html'))
if (/href=["'][^"']*chatgpt\.site/.test(demosHtml)) fail('demos page must not link chatgpt.site')
if (!demosHtml.includes('retrievallab.pages.dev')) fail('demos page must include RetrievalLab live URL')
if (!demosHtml.includes('careeragent-ceq.pages.dev')) fail('demos page must include CareerAgent live URL')
if (!demosHtml.includes('agentfleet.169.58.185.43.sslip.io')) {
  fail('demos page must include the Agent Fleet Contabo/sslip live demo')
}
if (demosHtml.includes('agentos.169.58.185.43.sslip.io')) {
  fail('demos page must not include the retired Agent OS Contabo public demo')
}
if (!demosHtml.includes('127.0.0.1:8090')) fail('demos page must say Agent OS runs on 127.0.0.1:8090')
if (!demosHtml.includes('https://github.com/hharsha98/agent-os')) {
  fail('demos page must link the Agent OS clone path')
}
if (!demosHtml.includes('agentops.169.58.185.43.sslip.io')) {
  fail('demos page must include the AgentOps Studio Contabo/sslip public demo')
}
if (!demosHtml.includes('revenueops.169.58.185.43.sslip.io')) {
  fail('demos page must include the Revenue Ops Contabo/sslip public demo')
}
if (/agentgrid\.[^"'\s]*sslip\.io/.test(demosHtml)) fail('demos page must not give Agent Grid a public sslip URL')
if (/href=["'][^"']*os\.agentic-systems-studio\.com/.test(demosHtml)) {
  fail('demos page must not link os.agentic-systems-studio.com')
}
if (demosHtml.includes('Self-host docs')) fail('Fleet self-host docs belong on the product page, not the demos list')

const fleetHtml = read(join(root, 'dist', 'products', 'agentfleet.html'))
if (!fleetHtml.includes('01 · Live')) fail('Agent Fleet product page must be Live')
if (!fleetHtml.includes('Live demo / Contabo')) fail('Agent Fleet product page must label the Contabo demo')
if (!fleetHtml.includes('https://agentfleet.169.58.185.43.sslip.io/')) {
  fail('Agent Fleet product page must link the owned sslip demo')
}
if (!fleetHtml.includes('github.com/hharsha98/agentfleet')) fail('Agent Fleet product page must keep GitHub')
if (!fleetHtml.includes('docs/DEPLOY.md')) fail('Agent Fleet product page must keep self-host docs')
if (fleetHtml.includes('agentfleet.pages.dev') || fleetHtml.includes('agentfleet.vercel.app')) {
  fail('do not link third-party Agent Fleet Pages or Vercel hosts')
}
if (fleetHtml.includes('01 · Building')) fail('Agent Fleet must not remain Building / coming soon')

const osHtml = read(join(root, 'dist', 'products', 'agent-os.html'))
if (!osHtml.includes('02 · Download / local')) fail('Agent OS product page must be Download / local')
if (osHtml.includes('02 · Live')) fail('Agent OS product page must not be Live')
if (osHtml.includes('Public demo')) fail('Agent OS product page must not label a public demo')
if (osHtml.includes('agentos.169.58.185.43.sslip.io') || /sslip\.io/.test(osHtml)) {
  fail('Agent OS product page must not link a public sslip URL')
}
if (!osHtml.includes('Clone / run locally')) fail('Agent OS product page must offer Clone / run locally')
if (!osHtml.includes('127.0.0.1:8090')) fail('Agent OS product page must say to run on 127.0.0.1:8090')
if (!osHtml.includes('github.com/hharsha98/agent-os')) fail('Agent OS product page must keep GitHub')
if (!osHtml.includes('hharsha98.github.io/agent-os')) fail('Agent OS product page must keep the static gallery')
if (osHtml.includes('02 · Gallery')) fail('Agent OS must not remain Gallery / early')
if (/href=["'][^"']*os\.agentic-systems-studio\.com/.test(osHtml)) {
  fail('Agent OS product page must not link os.agentic-systems-studio.com')
}
if (!osHtml.includes('os.agentic-systems-studio.com')) {
  fail('Agent OS product page must keep the planned hostname as copy, not a URL')
}

const gridHtml = read(join(root, 'dist', 'products', 'agentgrid.html'))
if (!gridHtml.includes('06 · Download / local')) fail('Agent Grid product page must be Download / local')
if (gridHtml.includes('06 · Live')) fail('Agent Grid product page must not be Live')
if (/sslip\.io/.test(gridHtml)) fail('Agent Grid product page must not link a public sslip URL')
if (!gridHtml.includes('https://github.com/hharsha98/agentgrid')) fail('Agent Grid product page must link the GitHub clone path')
if (!gridHtml.includes('docs/HOSTING.md')) fail('Agent Grid product page must link HOSTING.md')

for (const [file, marker, name, url] of [
  ['revenue-ops.html', '07 · Live', 'Revenue Ops Control Tower', 'https://revenueops.169.58.185.43.sslip.io/'],
  ['agentops-studio.html', '08 · Live', 'AgentOps Studio', 'https://agentops.169.58.185.43.sslip.io/'],
]) {
  const html = read(join(root, 'dist', 'products', file))
  if (!html.includes(marker)) fail(`${name} product page must be Live`)
  if (!html.includes('Public demo')) fail(`${name} product page must label the public demo`)
  if (!html.includes(url)) fail(`${name} product page must link its Contabo/sslip demo`)
}

if (wrangler.includes('fleet.agentic-systems-studio.com')) {
  fail('do not attach future product hosts in wrangler routes / DNS')
}
if (wrangler.includes('os.agentic-systems-studio.com') || wrangler.includes('vibespace.agentic-systems-studio.com') || wrangler.includes('rag.agentic-systems-studio.com')) {
  fail('do not attach future product hosts in wrangler routes / DNS')
}

function walkBuilt(dir, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walkBuilt(path, acc)
    else if (/\.(html|xml|txt|json)$/.test(entry.name)) acc.push(path)
  }
  return acc
}
const delistedNeedles = [
  [/mara-open/i, 'mara-open'],
  [/\bMARA\b/, 'MARA'],
  [/siemens/i, 'Siemens'],
  [/\bFAPS\b/, 'FAPS'],
  [/\bEBL\b/, 'EBL'],
  [/10\.53192/, 'EBL DOI'],
  [/RAG Trustworthiness/i, 'RAG Trustworthiness'],
  [/rag-trustworthiness/i, 'rag-trustworthiness'],
  [/ragtrust/i, 'ragtrust'],
  [/Pflichtpraktikum/i, 'Pflichtpraktikum'],
  [/\bthesis\b/i, 'thesis'],
  [/\bNDA\b/, 'NDA'],
  [/researchgate\.net/i, 'ResearchGate paper'],
  [/\/research(?![a-z])/i, '/research'],
]

function assertDelisted(label, text) {
  for (const [re, name] of delistedNeedles) {
    if (re.test(text)) fail(`${label} still contains delisted copy: ${name}`)
  }
}

const publicSource = []
function walkPublic(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walkPublic(path)
    else if (/\.(astro|ts|css|mjs|md|txt|svg)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
      publicSource.push(path)
    }
  }
}
walkPublic(join(root, 'src'))
walkPublic(join(root, 'public'))
publicSource.push(join(root, 'README.md'))
for (const file of publicSource) assertDelisted(file, read(file))

for (const gone of [
  'research.html',
  join('products', 'mara-open.html'),
  join('products', 'rag-trustworthiness.html'),
  join('projects', 'mara-open.html'),
  join('projects', 'rag-trustworthiness.html'),
]) {
  if (existsSync(join(root, 'dist', gone))) fail(`delisted page still built: ${gone}`)
}

for (const file of walkBuilt(join(root, 'dist'))) {
  const built = read(file)
  if (built.includes('agentos.169.58.185.43.sslip.io')) {
    fail(`retired Agent OS public demo still linked in ${file}`)
  }
  assertDelisted(file, built)
}

console.log('assert-studio: ok')
