#!/usr/bin/env node
// Prove catalog additions do not alter the hero: build an isolated fixture copy.
import { cpSync, mkdtempSync, readFileSync, writeFileSync, symlinkSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import assert from 'node:assert/strict'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const temporary = mkdtempSync(join(tmpdir(), 'studio-catalog-growth-'))
function hero(html) {
  const start = html.indexOf('<section class="showcase-hero"')
  const end = html.indexOf('<section class="studio-section live-showcases"')
  assert(start >= 0 && end > start, 'home hero and live product section must be present')
  return html.slice(start, end)
}
try {
  for (const path of ['src', 'public', 'package.json', 'astro.config.mjs', 'tsconfig.json']) {
    cpSync(join(root, path), join(temporary, path), { recursive: true })
  }
  symlinkSync(join(root, 'node_modules'), join(temporary, 'node_modules'), 'dir')
  const catalog = join(temporary, 'src/data/products.ts')
  const source = readFileSync(catalog, 'utf8')
  const fixture = `\n  { slug: 'qa-catalog-growth', index: 'qa', name: 'Catalog growth fixture', tagline: 'Test fixture', description: 'Test fixture', body: [], features: [], stack: [], status: 'live', featured: false, accent: '#83bfff', category: 'retrieval', links: [{ kind: 'live', label: 'Live', href: 'https://retrievallab.pages.dev' }] },`
  writeFileSync(catalog, source.replace('export const products: Product[] = [', 'export const products: Product[] = [' + fixture))
  execFileSync('npm', ['run', 'build'], { cwd: temporary, stdio: 'pipe' })
  const home = readFileSync(join(temporary, 'dist/index.html'), 'utf8')
  const catalogHtml = readFileSync(join(temporary, 'dist/products.html'), 'utf8')
  assert(home.includes('/products/qa-catalog-growth'), 'new live product must appear on home')
  assert(catalogHtml.includes('/products/qa-catalog-growth'), 'new product must appear in catalog')
  assert.equal(hero(home), hero(readFileSync(join(root, 'dist/index.html'), 'utf8')), 'catalog additions must leave hero markup unchanged')
  console.log('catalog-growth: home and catalog include the new product; hero unchanged')
} finally {
  rmSync(temporary, { recursive: true, force: true })
}
