import type { ProductStatus } from '../data/products'

/**
 * Signal traces for the system index. The shape is the status:
 * a running line for Live, a stepped line for Download / local,
 * and a dotted baseline for Gallery / early and Building / coming soon.
 *
 * Each trace is built at compile time from a seed (the product slug), so a
 * product always draws the same signature. Paths cover two periods of
 * PERIOD units so a Live strip can loop with translateX(-50%).
 */
export const PERIOD = 240
export const HEIGHT = 24

function seedFrom(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const n = (value: number) => Number(value.toFixed(2))

/** Smooth telemetry: a sum of whole-number harmonics, so every period repeats exactly. */
function runningPath(seed: string) {
  const rand = mulberry32(seedFrom(seed))
  const harmonics = [1, 2, 3, 5, 8, 13].map((k) => ({
    k,
    amp: (0.35 + rand()) / k ** 0.55,
    phase: rand() * Math.PI * 2,
  }))
  const total = harmonics.reduce((sum, h) => sum + h.amp, 0)
  const steps = 120
  const points: string[] = []
  for (let i = 0; i <= steps * 2; i++) {
    const x = (i / steps) * PERIOD
    const v = harmonics.reduce((sum, h) => sum + h.amp * Math.sin((2 * Math.PI * h.k * x) / PERIOD + h.phase), 0)
    points.push(`${n(x)} ${n(HEIGHT / 2 + (v / total) * (HEIGHT / 2 - 2))}`)
  }
  return `M${points.join('L')}`
}

/** Quantised steps: a packaged build, held at a few fixed levels. */
function steppedPath(seed: string) {
  const rand = mulberry32(seedFrom(seed) ^ 0x9e3779b9)
  const levels = [7, 12, 17]
  const runs: { width: number; level: number }[] = []
  let width = 0
  while (width < PERIOD) {
    const run = Math.min(PERIOD - width, 14 + Math.floor(rand() * 4) * 9)
    runs.push({ width: run, level: levels[Math.floor(rand() * levels.length)] })
    width += run
  }
  // End on the starting level so the two periods meet without a seam.
  runs[runs.length - 1].level = runs[0].level
  let x = 0
  let d = `M0 ${runs[0].level}`
  for (const period of [0, 1]) {
    for (const [i, run] of runs.entries()) {
      if (period > 0 || i > 0) d += `V${run.level}`
      x += run.width
      d += `H${x}`
    }
  }
  return d
}

const dottedPath = `M1 ${HEIGHT / 2}H${PERIOD * 2 - 1}`

export function tracePath(status: ProductStatus, seed: string) {
  if (status === 'live') return runningPath(seed)
  if (status === 'download') return steppedPath(seed)
  return dottedPath
}
