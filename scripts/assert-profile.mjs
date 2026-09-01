#!/usr/bin/env node
/**
 * Content guards for the recruiter profile.
 * Fail if the built site invents metrics, lists the shop, uses the wrong GitHub org,
 * or would deploy as the studio Worker.
 */
import { readFileSync, existsSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const wranglerPath = join(root, 'wrangler.jsonc')
const portrait = join(root, 'public', 'portrait.jpg')

function fail(msg) {
  console.error(`assert-profile: ${msg}`)
  process.exit(1)
}

function read(path) {
  return readFileSync(path, 'utf8')
}

if (!existsSync(portrait)) fail('public/portrait.jpg is missing')
if (statSync(portrait).size < 20_000) fail('public/portrait.jpg looks too small to be the portrait')

const wrangler = read(wranglerPath)
if (!wrangler.includes('"name": "harsha-vardhan"')) fail('wrangler name must be harsha-vardhan')
if (!wrangler.includes('pages_build_output_dir')) fail('wrangler must be a Pages project (pages_build_output_dir)')
if (wrangler.includes('agentic-systems-studio')) {
  fail('wrangler must not mention agentic-systems-studio')
}
if (wrangler.includes('custom_domain') || wrangler.includes('agentic-systems-studio.com')) {
  fail('wrangler must not attach studio DNS')
}

const build = spawnSync('npm', ['run', 'build'], { cwd: root, encoding: 'utf8' })
if (build.status !== 0) {
  console.error(build.stdout)
  console.error(build.stderr)
  fail('npm run build failed')
}

const index = read(join(dist, 'index.html'))
const assetsDir = join(dist, 'assets')
let bundled = index
if (existsSync(assetsDir)) {
  const { readdirSync } = await import('node:fs')
  for (const file of readdirSync(assetsDir)) {
    if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
      bundled += `\n${read(join(assetsDir, file))}`
    }
  }
}
const source = `${read(join(root, 'src', 'data', 'profile.ts'))}\n${read(join(root, 'src', 'App.tsx'))}`
bundled += `\n${source}`

const forbidden = [
  'evehicleshop',
  'evehicleshop.in',
  'github.com/agentic-systems-studio',
  'harsha.vardhan@fau.de',
  'rtvision134@gmail.com',
  'English (C1)',
  'German (C1)',
  'GPA',
  'eval 6/6',
  '€0/mo',
  '€0 infra',
]
for (const needle of forbidden) {
  if (bundled.toLowerCase().includes(needle.toLowerCase())) {
    fail(`forbidden string present: ${needle}`)
  }
}

const required = [
  'Hanumanthu Harsha Vardhan',
  'rtvision7@gmail.com',
  '+49 176 577 99028',
  'Nürnberg',
  'https://github.com/hharsha98',
  'https://linkedin.com/in/hanumanthu1',
  'https://huggingface.co/hharsha',
  'https://agentic-systems-studio.com',
  'github.com/hharsha98/agentfleet',
  'github.com/hharsha98/vibedeck',
  'github.com/hharsha98/agent-os',
  'github.com/hharsha98/agentops-studio',
  'github.com/hharsha98/retrievallab',
  'huggingface.co/spaces/hharsha/retrievallab',
  'github.com/hharsha98/careeragent',
  'github.com/hharsha98/ai-rag-project',
  'github.com/hharsha98/agentgrid',
  '"@type": "Person"',
  '/portrait.jpg',
  'Pflichtpraktikum',
  'German',
  'Intermediate',
  '10.53192/EBL20260344',
]
for (const needle of required) {
  if (!bundled.includes(needle)) fail(`missing required string: ${needle}`)
}

if (!existsSync(join(dist, 'portrait.jpg'))) fail('dist/portrait.jpg missing after build')
if (!index.includes('application/ld+json')) fail('Person JSON-LD missing from index.html')
if (!index.includes('og:image')) fail('Open Graph image missing')

console.log('assert-profile: ok')
