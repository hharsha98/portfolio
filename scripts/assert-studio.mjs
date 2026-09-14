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
if (blob.includes('agentfleet.169.58.185.43.sslip.io')) {
  fail('Agent Fleet has no confirmed public owned SaaS URL — do not link the sslip live app')
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
  'https://github.com/hharsha98/agent-os',
  'https://hharsha98.github.io/agent-os/',
  'https://github.com/hharsha98/Vibespace',
  'https://github.com/hharsha98/Vibespace/releases/latest',
  'https://github.com/hharsha98/retrievallab',
  'https://retrievallab.pages.dev',
  'https://ragtrust.169.58.185.43.sslip.io/',
  'https://hharsha98.github.io/rag-trustworthiness-industrial/',
  'https://careeragent-ceq.pages.dev',
  'https://mara-open-hharsha98.rtvision134.chatgpt.site',
  'https://github.com/hharsha98/agentgrid',
  'https://github.com/hharsha98/06-revenue-ops-agent-control-tower',
  'https://github.com/hharsha98/agentops-studio',
]) {
  if (!products.includes(url)) fail(`product catalog missing required URL: ${url}`)
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
if (!indexHtml.includes('hharsha98.github.io/agent-os')) fail('built home must use Agent OS gallery URL')
if (indexHtml.includes('agentfleet.vercel.app') || indexHtml.includes('agentfleet.169.58.185.43.sslip.io')) {
  fail('built home must not present Agent Fleet as hosted SaaS')
}
if (!existsSync(join(root, 'dist', 'products.html'))) fail('built products page missing')
if (!existsSync(join(root, 'dist', 'demos.html'))) fail('built demos page missing')

const productsHtml = read(join(root, 'dist', 'products.html'))
if (productsHtml.includes('Open dossier')) fail('products page still says Open dossier')
if (!productsHtml.includes('Open product') && !productsHtml.includes('GitHub')) {
  fail('products page must use product CTAs')
}

if (wrangler.includes('fleet.agentic-systems-studio.com')) {
  fail('do not attach future product hosts in wrangler routes / DNS')
}

console.log('assert-studio: ok')
