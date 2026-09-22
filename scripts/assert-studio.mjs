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
for (const label of ["label: 'Products'", "label: 'Demos'", "label: 'Research'", "label: 'Contact'"]) {
  if (!site.includes(label)) fail(`nav must include ${label}`)
}
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
  'https://agentos.169.58.185.43.sslip.io/',
  'https://hharsha98.github.io/agent-os/',
  'https://github.com/hharsha98/Vibespace',
  'https://github.com/hharsha98/Vibespace/releases/latest',
  'https://github.com/hharsha98/retrievallab',
  'https://retrievallab.pages.dev',
  'https://ragtrust.169.58.185.43.sslip.io/',
  'https://hharsha98.github.io/rag-trustworthiness-industrial/',
  'https://careeragent-ceq.pages.dev',
  'https://github.com/hharsha98/mara-open',
  'https://github.com/hharsha98/agentgrid',
  'https://github.com/hharsha98/06-revenue-ops-agent-control-tower',
  'https://github.com/hharsha98/agentops-studio',
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
if (!agentOs.includes("status: 'live'")) fail('Agent OS must be Live')
if (!agentOs.includes("label: 'Public demo'")) fail('Agent OS CTA must be labeled Public demo')
if (agentOs.includes('os.agentic-systems-studio.com') && /href:\s*'https?:\/\/os\.agentic-systems-studio\.com/.test(agentOs)) {
  fail('do not use os.agentic-systems-studio.com as an Agent OS product URL')
}
if (/href:\s*'https?:\/\/[^']*os\.agentic-systems-studio\.com/.test(products)) {
  fail('do not link os.agentic-systems-studio.com')
}

for (const [slug, next] of [
  ['agentgrid', 'revenue-ops'],
  ['revenue-ops', 'agentops-studio'],
  ['agentops-studio', null],
]) {
  const block = productBlock(slug, next)
  if (!block.includes("status: 'building'")) fail(`${slug} must stay Building until it has a verified public URL`)
  if (block.includes("status: 'live'")) fail(`${slug} must not be marked Live`)
  if (block.includes('sslip.io')) fail(`${slug} must not invent a Contabo/sslip URL`)
}

if ((products.match(/accent: '#[0-9a-fA-F]{6}'/g) || []).length < 10) {
  fail('each catalog product must declare a hex accent')
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
if (!indexHtml.includes('ragtrust.169.58.185.43.sslip.io')) fail('built home must include RAG Trust live URL')
if (!indexHtml.includes('hharsha98.github.io/agent-os')) fail('built home must keep the Agent OS static gallery as a secondary link')
if (!indexHtml.includes('agentos.169.58.185.43.sslip.io')) {
  fail('built home must link the owned Agent OS Contabo/sslip public demo')
}
if (!indexHtml.includes('02 Agent OS — Live')) fail('built home constellation must mark Agent OS Live')
if (indexHtml.includes('02 Agent OS — Gallery')) fail('Agent OS must not stay Gallery / early')
if (!indexHtml.includes('08 Agent Grid — Building / coming soon')) fail('Agent Grid must stay Building')
if (!indexHtml.includes('09 Revenue Ops Control Tower — Building / coming soon')) {
  fail('Revenue Ops Control Tower must stay Building')
}
if (!indexHtml.includes('10 AgentOps Studio — Building / coming soon')) fail('AgentOps Studio must stay Building')
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
  fail('built home must not link MARA chatgpt.site as Live')
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
if (!productsHtml.includes('agentos.169.58.185.43.sslip.io')) {
  fail('products catalog must link the Agent OS Contabo/sslip public demo')
}
if (!productsHtml.includes('Public demo')) fail('products catalog must label the Agent OS demo as Public demo')
if (/href=["'][^"']*os\.agentic-systems-studio\.com/.test(productsHtml)) {
  fail('products catalog must not link os.agentic-systems-studio.com')
}
if (/href=["'][^"']*chatgpt\.site/.test(productsHtml)) {
  fail('products catalog must not link MARA chatgpt.site as Live')
}

const demosHtml = read(join(root, 'dist', 'demos.html'))
if (/href=["'][^"']*chatgpt\.site/.test(demosHtml)) fail('demos page must not link MARA chatgpt.site')
if (!demosHtml.includes('retrievallab.pages.dev')) fail('demos page must include RetrievalLab live URL')
if (!demosHtml.includes('careeragent-ceq.pages.dev')) fail('demos page must include CareerAgent live URL')
if (!demosHtml.includes('agentfleet.169.58.185.43.sslip.io')) {
  fail('demos page must include the Agent Fleet Contabo/sslip live demo')
}
if (!demosHtml.includes('agentos.169.58.185.43.sslip.io')) {
  fail('demos page must include the Agent OS Contabo/sslip public demo')
}
if (/href=["'][^"']*os\.agentic-systems-studio\.com/.test(demosHtml)) {
  fail('demos page must not link os.agentic-systems-studio.com')
}
if (demosHtml.includes('Self-host docs')) fail('Fleet self-host docs belong on the product page, not the demos list')

const maraHtml = read(join(root, 'dist', 'products', 'mara-open.html'))
if (/href=["'][^"']*chatgpt\.site/.test(maraHtml)) fail('MARA product page must not link chatgpt.site')
if (!maraHtml.includes('github.com/hharsha98/mara-open')) fail('MARA product page must link GitHub')

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
if (!osHtml.includes('02 · Live')) fail('Agent OS product page must be Live')
if (!osHtml.includes('Public demo')) fail('Agent OS product page must label the public demo')
if (!osHtml.includes('https://agentos.169.58.185.43.sslip.io/')) {
  fail('Agent OS product page must link the owned sslip demo')
}
if (!osHtml.includes('github.com/hharsha98/agent-os')) fail('Agent OS product page must keep GitHub')
if (!osHtml.includes('hharsha98.github.io/agent-os')) fail('Agent OS product page must keep the static gallery')
if (osHtml.includes('02 · Gallery')) fail('Agent OS must not remain Gallery / early')
if (/href=["'][^"']*os\.agentic-systems-studio\.com/.test(osHtml)) {
  fail('Agent OS product page must not link os.agentic-systems-studio.com')
}
if (!osHtml.includes('os.agentic-systems-studio.com')) {
  fail('Agent OS product page must keep the planned hostname as copy, not a URL')
}

for (const [file, marker, name] of [
  ['agentgrid.html', '08 · Building / coming soon', 'Agent Grid'],
  ['revenue-ops.html', '09 · Building / coming soon', 'Revenue Ops Control Tower'],
  ['agentops-studio.html', '10 · Building / coming soon', 'AgentOps Studio'],
]) {
  const html = read(join(root, 'dist', 'products', file))
  if (!html.includes(marker)) fail(`${name} must stay Building / coming soon`)
  if (html.includes(' · Live<')) fail(`${name} must not be marked Live`)
}

if (wrangler.includes('fleet.agentic-systems-studio.com')) {
  fail('do not attach future product hosts in wrangler routes / DNS')
}
if (wrangler.includes('os.agentic-systems-studio.com') || wrangler.includes('vibespace.agentic-systems-studio.com') || wrangler.includes('rag.agentic-systems-studio.com')) {
  fail('do not attach future product hosts in wrangler routes / DNS')
}

console.log('assert-studio: ok')
