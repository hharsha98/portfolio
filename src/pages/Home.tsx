/** The whole portfolio on one page: hero → projects → about → writing → contact. */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { contact, projects } from '../data/projects'
import { posts } from '../lib/posts'

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

function Section({ id, kicker, children }: { id: string; kicker: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
      <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">{kicker}</h2>
      {children}
    </section>
  )
}

export default function Home() {
  const [copied, setCopied] = useState(false)
  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="min-h-dvh atmosphere">
      {/* hero */}
      <header className="mx-auto max-w-4xl px-5 pt-20 pb-8 sm:px-6 sm:pt-28">
        <motion.p {...rise(0)} className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
          {contact.status}
        </motion.p>
        <motion.h1 {...rise(1)} className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">
          {contact.name.split(' ').slice(-2).join(' ')}
        </motion.h1>
        <motion.p {...rise(2)} className="mt-4 max-w-xl text-lg text-zinc-400">
          {contact.headline} · {contact.location}
        </motion.p>
        <motion.div {...rise(3)} className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:brightness-110">
            See the projects ↓
          </a>
          <a href="/cv.pdf" className="rounded-md border border-edge px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500">
            Download CV
          </a>
          <a href={contact.github} target="_blank" rel="noreferrer" className="px-2 font-mono text-sm text-zinc-500 hover:text-zinc-200">GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="px-2 font-mono text-sm text-zinc-500 hover:text-zinc-200">LinkedIn</a>
        </motion.div>
      </header>

      {/* projects */}
      <Section id="projects" kicker="projects — live, not mockups">
        <div className="space-y-6">
          {projects.map((p) => (
            <motion.article key={p.name} {...inView}
              className="rounded-xl border border-edge bg-panel p-6 transition-colors hover:border-zinc-600 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold text-zinc-50">{p.name}</h3>
                {p.badge && <span className="font-mono text-[11px] text-accent">{p.badge}</span>}
              </div>
              <p className="mt-0.5 text-sm text-zinc-500">{p.tagline}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">{p.story}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded border border-edge px-2 py-0.5 font-mono text-[11px] text-zinc-400">{t}</span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer"
                    className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-zinc-950 transition hover:brightness-110">
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
      </Section>

      {/* about + skills */}
      <Section id="about" kicker="about">
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
              projects — deployed, evaluated, and metered — are linked above.
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
      </Section>

      {/* writing */}
      <Section id="writing" kicker="writing">
        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div key={post.slug} {...inView}>
              <Link to={`/writing/${post.slug}`}
                className="block rounded-xl border border-edge bg-panel p-6 transition-colors hover:border-accent/50">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-zinc-100">{post.title}</h3>
                  <span className="font-mono text-[11px] text-zinc-500">{post.date}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">{post.teaser}…</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* contact */}
      <footer id="contact" className="border-t border-edge/60">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-5 py-10 sm:px-6">
          <div>
            <p className="text-sm text-zinc-300">Let's talk about reliable AI systems.</p>
            <button onClick={copyEmail} className="mt-1 font-mono text-sm text-accent hover:brightness-110">
              {copied ? 'copied ✓' : contact.email}
            </button>
          </div>
          <div className="flex gap-4 font-mono text-sm text-zinc-500">
            <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-zinc-200">GitHub</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-200">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
