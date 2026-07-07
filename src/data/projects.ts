/** All portfolio content lives here. Add a project = add one object; it lands
 *  in its category section automatically, with that category's color. */

export type Accent = 'emerald' | 'indigo' | 'cyan' | 'amber' | 'rose' | 'violet'

export type Category = { id: string; label: string; accent: Accent }

export const categories: Category[] = [
  { id: 'platforms', label: 'AI Platforms', accent: 'emerald' },
  { id: 'industrial', label: 'Industrial AI', accent: 'amber' },
  { id: 'rag', label: 'RAG & LLM Systems', accent: 'cyan' },
]

export type Project = {
  name: string
  category: string          // one of categories[].id
  tagline: string
  story: string
  tech: string[]
  demo?: string
  repo?: string
  badge?: string
}

export const projects: Project[] = [
  {
    name: 'CareerAgent',
    category: 'platforms',
    tagline: 'Multi-agent platform for the job hunt',
    story:
      'RAG chat over a CV with citations, a web-research agent (hand-rolled tool ' +
      'loop), CV tailoring anchored to evidence, and a Kanban tracker. Every request ' +
      'is cost-metered; an LLM-as-judge eval suite scores the pipeline — including ' +
      'trick questions it must refuse. API docs are disabled in production.',
    tech: ['FastAPI', 'React', 'pgvector', 'SSE', 'Docker', 'Kubernetes', 'Supabase'],
    demo: 'https://careeragent-ceq.pages.dev',
    repo: 'https://github.com/hharsha98/careeragent',
    badge: 'eval 6/6 · €0/mo infra',
  },
  {
    name: 'Multi-agent root-cause analysis',
    category: 'industrial',
    tagline: 'Master thesis @ Siemens',
    story:
      'Implementing a multi-agent system for automated root-cause analysis in ' +
      'production environments — agents that investigate failures, correlate ' +
      'evidence, and propose causes in an industrial setting. (Code confidential; ' +
      'happy to discuss architecture and evaluation approach in conversation.)',
    tech: ['Multi-agent systems', 'LLMs', 'Automation', 'Industrial AI'],
    badge: 'in progress · Siemens',
  },
  {
    name: 'RetrievalLab',
    category: 'rag',
    tagline: 'Advanced RAG, made visible',
    story:
      'The 2026 advanced-RAG ladder in one instrumented pipeline: contextual chunking, ' +
      'hybrid search (vector + BM25, RRF), HyDE query transformation, and cross-encoder ' +
      'reranking — with a Pipeline Inspector that shows every stage and the reranker ' +
      'promoting chunks live, plus a retrieval eval (recall@k, MRR) comparing naive vs advanced.',
    tech: ['FastAPI', 'React', 'pgvector', 'FlashRank', 'BM25', 'HyDE', 'Supabase'],
    demo: 'https://retrievallab.pages.dev',
    repo: 'https://github.com/hharsha98/retrievallab',
    badge: 'advanced 100% vs naive 86% recall',
  },
  {
    name: 'ai-rag-project',
    category: 'rag',
    tagline: 'RAG "chat with your documents" — where it started',
    story:
      'PDF ingestion → chunking → Mistral embeddings → vector retrieval → answers ' +
      'with page-level citations, plus an LLM-as-judge eval script. Built to ' +
      'understand every moving part of RAG before scaling the ideas up into CareerAgent.',
    tech: ['Python', 'ChromaDB', 'Mistral', 'Streamlit'],
    repo: 'https://github.com/hharsha98/ai-rag-project',
    badge: 'citations built-in',
  },
]

/** The classification layer — what I build, each with its own color. */
export type Capability = {
  title: string
  accent: Accent
  glyph: string
  blurb: string
  provenance: string   // which work proves it
}

export const capabilities: Capability[] = [
  {
    title: 'RAG Systems',
    accent: 'cyan',
    glyph: '⌕',
    blurb: 'Chunking, embeddings, pgvector retrieval, page-level citations, refusal when the answer is not in the documents.',
    provenance: 'CareerAgent · ai-rag-project',
  },
  {
    title: 'Multi-Agent Systems',
    accent: 'indigo',
    glyph: '⧉',
    blurb: 'Tool loops, structured output with validation, provider fallback — hand-rolled, no framework, every line explainable.',
    provenance: 'Siemens thesis · CareerAgent',
  },
  {
    title: 'Evaluation & Metering',
    accent: 'rose',
    glyph: '∑',
    blurb: 'LLM-as-judge suites with hallucination traps, per-request token/cost/latency accounting charted live.',
    provenance: 'CareerAgent Insights',
  },
  {
    title: 'Deployment & Infra',
    accent: 'emerald',
    glyph: '▲',
    blurb: 'Docker everywhere; serverless containers for demos, Kubernetes manifests with probes and autoscaling; CI/CD on push.',
    provenance: 'careeragent/k8s · GitHub Actions',
  },
]

/** Footer marquee — the honest tool list (friend-style "Built With"). */
export const builtWith = [
  'Python', 'FastAPI', 'React 19', 'TypeScript', 'Tailwind v4', 'pgvector',
  'Supabase', 'Docker', 'Kubernetes', 'Mistral', 'Groq', 'Tavily',
  'GitHub Actions', 'Cloudflare Pages', 'HF Spaces', 'Claude Code',
]

export const contact = {
  name: 'Hanumanthu Harsha Vardhan',
  shortName: 'Harsha',
  headline: 'AI Engineer — RAG · multi-agent systems · evals',
  location: 'Nuremberg region, Germany',
  status: 'Master thesis @ Siemens · open to AI Engineer roles',
  email: 'rtvision134@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hanumanthu1',
  github: 'https://github.com/hharsha98',
}
