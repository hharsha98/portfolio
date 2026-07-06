/** Portfolio home — classified, color-coded sections:
 *  hero → capabilities (what I build) → projects by category → about → writing
 *  → built-with marquee → CTA/contact. Every category owns a color. */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { builtWith, capabilities, categories, contact, projects, type Accent } from '../data/projects'
import { posts } from '../lib/posts'

/* Static literal classes per accent — Tailwind only compiles what it can see. */
const ACCENTS: Record<Accent, { text: string; tile: string; chip: string; edge: string; dot: string }> = {
  emerald: { text: 'text-emerald-400', tile: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25', chip: 'border-emerald-400/30 text-emerald-300', edge: 'border-l-emerald-400/60', dot: 'bg-emerald-400' },
  indigo:  { text: 'text-indigo-400',  tile: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/25',    chip: 'border-indigo-400/30 text-indigo-300',   edge: 'border-l-indigo-400/60',  dot: 'bg-indigo-400' },
  cyan:    { text: 'text-cyan-400',    tile: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/25',          chip: 'border-cyan-400/30 text-cyan-300',       edge: 'border-l-cyan-400/60',    dot: 'bg-cyan-400' },
  amber:   { text: 'text-amber-400',   tile: 'bg-amber-400/10 text-amber-400 border-amber-400/25',       chip: 'border-amber-400/30 text-amber-300',     edge: 'border-l-amber-400/60',   dot: 'bg-amber-400' },
  rose:    { text: 'text-rose-400',    tile: 'bg-rose-400/10 text-rose-400 border-rose-400/25',          chip: 'border-rose-400/30 text-rose-300',       edge: 'border-l-rose-400/60',    dot: 'bg-rose-400' },
  violet:  { text: 'text-violet-400',  tile: 'bg-violet-400/10 text-violet-400 border-violet-400/25',    chip: 'border-violet-400/30 text-violet-300',   edge: 'border-l-violet-400/60',  dot: 'bg-violet-400' },
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.1 * i, duration: 0.5 },
})

const inView = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
}

const SKILLS: [string, string[]][] = [
  ['LLM / RAG', ['RAG pipelines', 'embeddings + pgvector', 'tool-calling agents', 'prompt engineering', 'LLM-as-judge evals', 'multi-agent systems']],
  ['Backend', ['Python', 'FastAPI', 'PostgreSQL', 'SSE streaming', 'REST design', 'rate limiting / auth']],
  ['Frontend', ['React', 'TypeScript', 'Tailwind', 'Vite']],
  ['Infra', ['Docker', 'Kubernetes', 'GitHub Actions', 'Cloudflare Pages', 'HF Spaces', 'Supabase']],
]

function SectionHead({ accent, glyph, kicker, title, blurb }: {
  accent: Accent; glyph: string; kicker: string; title: string; blurb?: string
}) {
  const a = ACCENTS[accent]
  return (
    <div className="mb-8">
      <p className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] ${a.text}`}>
        <span>{glyph}</span>{kicker}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">{title}</h2>
      {blurb && <p className="mt-2 max-w-xl text-sm text-zinc-500">{blurb}</p>}
    </div>
  )
}

export default function Home() {
  const [copied, setCopied] = useState(false)
  const [live, setLive] = useState<string | null>(null)

  useEffect(() => {
    // live proof in the hero: ping the real CareerAgent API
    fetch('https://hv1998-careeragent-api.hf.space/api/insights/evals')
      .then((r) => r.json())
      .then((e) => setLive(e.score != null ? `systems live · eval ${e.score}/${e.total}` : 'systems live'))
      .catch(() => setLive(null))
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="min-h-dvh atmosphere">
      {/* ── hero ─────────────────────────────────────────────── */}
      <header className="mx-auto max-w-5xl px-5 pt-20 pb-10 sm:px-6 sm:pt-28">
        <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1 font-mono text-[11px] text-zinc-400">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${live ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
          {contact.status}{live && <span className="text-emerald-400"> · {live}</span>}
        </motion.p>
        <motion.h1 {...rise(1)} className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
          <span className="text-zinc-50">Harsha</span>{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Vardhan</span>
        </motion.h1>
        <motion.p {...rise(2)} className="mt-5 max-w-xl text-lg text-zinc-400">
          {contact.headline} · {contact.location}
        </motion.p>
        <motion.div {...rise(3)} className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className="rounded-md bg-emerald-400 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:brightness-110">
            See the projects ↓
          </a>
          <a href="/cv.pdf" className="rounded-md border border-edge px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500">
            Download CV
          </a>
          <a href={contact.github} target="_blank" rel="noreferrer" className="px-2 font-mono text-sm text-zinc-500 hover:text-zinc-200">GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="px-2 font-mono text-sm text-zinc-500 hover:text-zinc-200">LinkedIn</a>
        </motion.div>
      </header>

      {/* ── capabilities: the classification layer ───────────── */}
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
        <SectionHead accent="indigo" glyph="◈" kicker="what I build"
          title="Four things, done properly"
          blurb="Every capability below is proven by shipped work — the receipts are on each card." />
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((c) => {
            const a = ACCENTS[c.accent]
            return (
              <motion.div key={c.title} {...inView}
                className="rounded-xl border border-edge bg-panel p-5 transition-colors hover:border-zinc-600">
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border text-base ${a.tile}`}>
                  {c.glyph}
                </div>
                <h3 className="mt-3 font-semibold text-zinc-100">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{c.blurb}</p>
                <p className={`mt-3 font-mono text-[11px] ${a.text}`}>↳ {c.provenance}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── projects, grouped by category ─────────────────────── */}
      <section id="projects" className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
        <SectionHead accent="emerald" glyph="▣" kicker="projects — live, not mockups"
          title="Deployed work, by category"
          blurb="Categories grow as projects land — each keeps its own color." />
        <div className="space-y-10">
          {categories.map((cat) => {
            const items = projects.filter((p) => p.category === cat.id)
            if (items.length === 0) return null
            const a = ACCENTS[cat.accent]
            return (
              <div key={cat.id}>
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                  <span className={`inline-block h-2 w-2 rounded-full ${a.dot}`} />
                  {cat.label} <span className="text-zinc-600">· {items.length}</span>
                </h3>
                <div className="space-y-4">
                  {items.map((p) => (
                    <motion.article key={p.name} {...inView}
                      className={`rounded-xl border border-edge border-l-2 ${a.edge} bg-panel p-6 transition-colors hover:border-zinc-600 sm:p-7`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-xl font-semibold text-zinc-50">{p.name}</h4>
                        {p.badge && <span className={`font-mono text-[11px] ${a.text}`}>{p.badge}</span>}
                      </div>
                      <p className="mt-0.5 text-sm text-zinc-500">{p.tagline}</p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">{p.story}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span key={t} className={`rounded border px-2 py-0.5 font-mono text-[11px] ${a.chip}`}>{t}</span>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noreferrer"
                            className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:brightness-110">
                            Try it live →
                          </a>
                        )}
                        {p.repo && (
                          <a href={p.repo} target="_blank" rel="noreferrer"
                            className="rounded-md border border-edge px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500">
                            Code
                          </a>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── about + skills ────────────────────────────────────── */}
      <section id="about" className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
        <SectionHead accent="cyan" glyph="⌁" kicker="about" title="From production lines to production AI" />
        <motion.div {...inView} className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-[15px] leading-relaxed text-zinc-300">
            <p>
              I came to AI from engineering — a mechanical B.Tech, then an M.Sc. in
              Electromobility at FAU Erlangen-Nürnberg (graduating October 2026). Somewhere
              between battery systems and production lines I found the problems I actually
              wanted to solve: making language models <em className="text-zinc-100">reliable</em> enough for real work.
            </p>
            <p>
              Now I build agentic systems: my master thesis at Siemens applies multi-agent
              LLMs to automated root-cause analysis in production environments, and my own
              projects — deployed, evaluated, and metered — are above.
            </p>
            <p>
              What I care about: answers with citations, eval scores over vibes, security
              by default, and knowing what every line does.
            </p>
          </div>
          <div className="space-y-5">
            {SKILLS.map(([group, items]) => (
              <div key={group}>
                <h4 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{group}</h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span key={s} className="rounded border border-edge bg-panel px-2 py-1 font-mono text-[11px] text-zinc-300">{s}</span>
                  ))}
                </div>
              </div>
            ))}
            <p className="font-mono text-[11px] text-zinc-500">languages: English (C1) · German (learning) · Telugu · Hindi</p>
          </div>
        </motion.div>
      </section>

      {/* ── writing ───────────────────────────────────────────── */}
      <section id="writing" className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
        <SectionHead accent="amber" glyph="✎" kicker="writing" title="Build notes, including what broke" />
        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div key={post.slug} {...inView}>
              <Link to={`/writing/${post.slug}`}
                className="block rounded-xl border border-edge border-l-2 border-l-amber-400/60 bg-panel p-6 transition-colors hover:border-amber-400/50">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-zinc-100">{post.title}</h3>
                  <span className="font-mono text-[11px] text-zinc-500">{post.date}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">{post.teaser}…</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── built with (marquee, friend-style) ────────────────── */}
      <section className="border-y border-edge/60 py-6">
        <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-600">built with</p>
        <div className="marquee">
          <div className="marquee-track">
            {[...builtWith, ...builtWith].map((t, i) => (
              <span key={i} className="mx-3 inline-block rounded border border-edge bg-panel px-3 py-1.5 font-mono text-xs text-zinc-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + contact ─────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-6 sm:py-20">
        <motion.div {...inView}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-400">✳ contact</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50">Let's talk about reliable AI systems.</h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button onClick={copyEmail}
              className="rounded-md bg-violet-400 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:brightness-110">
              {copied ? 'email copied ✓' : contact.email}
            </button>
            <a href={contact.linkedin} target="_blank" rel="noreferrer"
              className="rounded-md border border-edge px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500">
              LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer"
              className="rounded-md border border-edge px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500">
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-edge/60 py-6 text-center font-mono text-xs text-zinc-600">
        {contact.name} · built with the tools above · no template
      </footer>
    </div>
  )
}
