import { futureHosts } from './site'

function hostFor(productName: string) {
  return futureHosts.find((item) => item.product === productName)?.host
}

export type LinkKind = 'live' | 'gallery' | 'download' | 'github' | 'docs' | 'walkthrough'

export type ProductStatus = 'live' | 'download' | 'gallery' | 'building'

export const productStatus = {
  live: 'Live',
  download: 'Download / local',
  gallery: 'Gallery / early',
  building: 'Building / coming soon',
} as const

export function statusLabel(status: ProductStatus) {
  return productStatus[status]
}

export type ProductLink = {
  kind: LinkKind
  label: string
  href: string
}

export type Product = {
  slug: string
  index: string
  name: string
  tagline: string
  description: string
  body: string[]
  features: string[]
  stack: string[]
  status: ProductStatus
  featured: boolean
  /** Saturated accent for orbit, bento, and constellation tiles. */
  accent: string
  github?: string
  links: ProductLink[]
  futureHost?: string
  featuresHeading?: string
  category: 'ops' | 'environment' | 'retrieval' | 'industrial'
  visual?: { src: string; alt: string }
}

export const legacySlugs = {
  vibedeck: 'vibespace',
} as const

export const products: Product[] = [
  {
    slug: 'agentfleet',
    index: '01',
    name: 'Agent Fleet',
    tagline:
      'A self-hostable multi-agent operations platform — chat with a fleet of tool-using agents, or hand the orchestrator a goal and watch it execute as a live task DAG, with evals, cost governance, and guardrails.',
    description:
      'Building. Public repo you can clone and self-host — not a live SaaS, and there is no owned public deploy yet.',
    body: [
      'Agent Fleet is a self-hostable multi-agent operations platform in progress. You chat with a roster of tool-using agents, or hand the orchestrator a goal and watch it decompose into a task DAG with human-approval gates.',
      'The public repository is on GitHub under hharsha98/agentfleet. The product spine is FastAPI plus Next.js, Postgres with pgvector, and a hand-built agent runtime with an env-switchable LangGraph path. The fleet can consume external MCP servers and also expose itself as an MCP server for IDE clients.',
      'There is no public owned deploy. Do not treat this page as a hosted app. A studio hostname (fleet.agentic-systems-studio.com) is planned only — it is not live and is not a product URL. Use GitHub and the self-host docs if you want to run it yourself.',
    ],
    features: [
      'Streaming multi-agent chat with per-agent tools and prompts',
      'Orchestrator: goal → async DAG with human-approval gates',
      'Document RAG: local embeddings (fastembed) + pgvector citations',
      'MCP in both directions — consume servers and expose the fleet',
      'Eval Center, cost budgets, guardrails, versioned rollback',
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'pgvector', 'MCP', 'Docker'],
    accent: '#8b7cff',
    status: 'building',
    featured: true,
    github: 'https://github.com/hharsha98/agentfleet',
    futureHost: hostFor('Agent Fleet'),
    visual: {
      src: '/media/agentfleet-landing.png',
      alt: 'Owned Agent Fleet orbital diagram on a dark grid — product visual from the public repo, not a hosted app',
    },
    links: [
      { kind: 'github', label: 'GitHub', href: 'https://github.com/hharsha98/agentfleet' },
      {
        kind: 'docs',
        label: 'Self-host docs',
        href: 'https://github.com/hharsha98/agentfleet/blob/main/docs/DEPLOY.md',
      },
    ],
    category: 'ops',
  },
  {
    slug: 'agent-os',
    index: '02',
    name: 'Agent OS',
    tagline:
      'Local-first Agent OS dashboard for Cursor, Claude, Codex, and Hermes — dry-run by default, sandboxed workspace, gated machine control.',
    description:
      'Early gallery of a local-first command center. Not production SaaS — dry-run until you turn execution on.',
    body: [
      'Agent OS is a local-first operations dashboard for Cursor Agent, Claude Code, Codex, and Hermes. It reports real CLI presence instead of painting fake “connected” cards.',
      'Safety is a product decision: unified chat is labeled dry-run, the workspace sandbox is jailed to a dedicated folder, and machine-control stays gated. Execution, installs, and public mode are off unless you flip explicit flags.',
      'This is a local app (React + Express), not hosted SaaS. The public github.io gallery is a click-through of the product surfaces — an early look, not a production cloud. A studio hostname (os.agentic-systems-studio.com) is planned only; it is not live.',
    ],
    features: [
      'Mission Control with live local version checks',
      'Unified chat — dry-run by default',
      'Sandboxed workspace preview',
      'Goals, kanban, memory, notebook as local stores',
      'Machine control: status only until execution is enabled',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'Node'],
    accent: '#c9a24a',
    status: 'gallery',
    featured: true,
    github: 'https://github.com/hharsha98/agent-os',
    futureHost: hostFor('Agent OS'),
    links: [
      { kind: 'gallery', label: 'Gallery', href: 'https://hharsha98.github.io/agent-os/' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/hharsha98/agent-os' },
    ],
    category: 'ops',
  },
  {
    slug: 'vibespace',
    index: '03',
    name: 'Vibespace',
    tagline:
      'An open-source agentic development environment: run Claude Code, cursor-agent, Codex and shells side by side in a terminal grid, with a kanban board that dispatches them, shared agent memory, and multi-agent orchestration.',
    description:
      'Desktop ADE you download from GitHub Releases. Marketing and local app — not a hosted IDE.',
    body: [
      'Vibespace is a home base for running multiple AI coding agents at once instead of juggling separate terminal windows. Each pane is a real terminal session: Claude Code, cursor-agent, Codex, or a plain shell. A pane can also load a web page, so a local dev server can sit beside the agent that is building it.',
      'Work moves on a kanban board that dispatches agents the same way you would assign a ticket. Shared memory lets every agent in the workspace read and write notes so they do not rediscover the same facts. Multi-agent orchestration coordinates related pieces of a larger task. Skills follow the agentskills.io standard and are discovered from disk.',
      'The core is usable today as a local/desktop app: split up to 16 panes, pick an agent per pane, browse and edit files, dispatch from the board. Desktop builds ship for macOS, Windows, and Linux. The app is not Apple-notarized; first launch is blocked by Gatekeeper until you explicitly open it. Node.js 22+ is required. This project was previously called vibedeck; existing data migrates on first launch.',
      'There is no hosted IDE. Download the latest GitHub release. A studio hostname (vibespace.agentic-systems-studio.com) is planned only; it is not live.',
    ],
    features: [
      'Terminal grid with real PTYs, split layouts, and templates',
      'Kanban dispatch into live agent sessions',
      'Shared agent memory and swarm missions',
      'Skills on the agentskills.io standard, discovered from disk',
      'Tauri desktop shell · Node 22+ required',
    ],
    stack: ['TypeScript', 'React', 'Tauri', 'Fastify', 'node-pty', 'MCP'],
    accent: '#6ee7f0',
    status: 'download',
    featured: true,
    github: 'https://github.com/hharsha98/Vibespace',
    futureHost: hostFor('Vibespace'),
    links: [
      {
        kind: 'download',
        label: 'Download',
        href: 'https://github.com/hharsha98/Vibespace/releases/latest',
      },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/hharsha98/Vibespace' },
    ],
    category: 'environment',
  },
  {
    slug: 'retrievallab',
    index: '04',
    name: 'RetrievalLab',
    tagline:
      'Advanced RAG made visible — contextual chunking, hybrid search, cross-encoder reranking, query transformation, and retrieval eval (recall@k, MRR).',
    description:
      'The retrieval upgrades that sit between naive RAG and production, instrumented so you can watch each stage — and measure whether they help.',
    body: [
      'RetrievalLab assembles contextual chunking, hybrid search (vector + BM25, fused with RRF), HyDE query transformation, and cross-encoder reranking into one pipeline you can inspect live.',
      'Ingestion uses contextual retrieval: before embedding, an LLM writes a one-sentence context that situates each chunk in its document. The Pipeline Inspector shows the HyDE probe, hybrid candidates with vector vs keyword rank, and the rerank step promoting chunks. A compare view puts naive vs advanced answers side by side.',
      'Eval reports recall@k and MRR for naive vs advanced on a labelled set. The repo is explicit that reranking’s margin is largest on large messy corpora; on a small clean corpus a strong embedding already does well. Measuring that, instead of assuming “advanced” always wins, is the point.',
      'The live lab is at retrievallab.pages.dev. A studio hostname (rag.agentic-systems-studio.com) is planned only — it is not live. Use the Pages demo until a studio host exists.',
    ],
    features: [
      'Contextual chunking (Anthropic-style situating sentence)',
      'Hybrid retrieve: vector + BM25 + RRF, plus HyDE',
      'FlashRank / MiniLM cross-encoder rerank',
      'Pipeline Inspector and naive vs advanced compare',
      'Retrieval eval: recall@k and MRR',
    ],
    stack: ['FastAPI', 'React', 'pgvector', 'FlashRank', 'BM25', 'HyDE', 'Supabase'],
    accent: '#4caf8a',
    status: 'live',
    featured: true,
    github: 'https://github.com/hharsha98/retrievallab',
    futureHost: hostFor('RetrievalLab'),
    links: [
      { kind: 'live', label: 'Live', href: 'https://retrievallab.pages.dev' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/hharsha98/retrievallab' },
    ],
    category: 'retrieval',
  },
  {
    slug: 'rag-trustworthiness',
    index: '05',
    name: 'RAG Trustworthiness Industrial',
    tagline:
      'A RAG system that cannot return an answer without the evidence and a measurement of how well that evidence supports it — or it declines to answer.',
    description:
      'Local / open-weight retrieval with citations, claim-level entailment, and five trust metrics. Live demo plus a walkthrough.',
    body: [
      'Most RAG systems return a fluent answer and leave you to trust it. This one returns the retrieved passages, decomposes the answer into claims scored for entailment, reports five trust metrics plus two aggregate scores — or refuses, with a reason.',
      'Everything can run locally against open-weight models via Ollama, or against a hosted inference endpoint. Answering is deterministic by default (greedy decoding, fixed seed) so the same question against the same corpus returns the same answer and the same trust score.',
      'The live instance is a small VPS running open-weight models; answers take a few seconds. Uploads are rate-limited and deleted after 24 hours. Metric definitions, third-party validation notes, and retrieval ablations live in the repo and the walkthrough — the studio site does not reprint those tables as marketing numbers.',
    ],
    features: [
      'Cited answers, or a refusal when the corpus does not support one',
      'Five trust metrics: faithfulness, attribution, relevance, conciseness, contradiction',
      'Non-compensatory aggregation (arithmetic and geometric)',
      'Two-stage abstention: retrieval gate before generation, grounding gate after',
      'Hybrid retrieval implemented; rerank available, off by default for latency',
    ],
    stack: ['Python', 'Ollama', 'FAISS', 'BM25', 'NLI', 'Gradio', 'Docker'],
    accent: '#22d3ee',
    status: 'live',
    featured: false,
    github: 'https://github.com/hharsha98/rag-trustworthiness-industrial',
    links: [
      { kind: 'live', label: 'Live', href: 'https://ragtrust.169.58.185.43.sslip.io/' },
      {
        kind: 'walkthrough',
        label: 'Walkthrough',
        href: 'https://hharsha98.github.io/rag-trustworthiness-industrial/',
      },
      {
        kind: 'github',
        label: 'GitHub',
        href: 'https://github.com/hharsha98/rag-trustworthiness-industrial',
      },
    ],
    category: 'retrieval',
  },
  {
    slug: 'careeragent',
    index: '06',
    name: 'CareerAgent',
    tagline:
      'AI agents for the job hunt — RAG chat over a CV with citations, live company research, evidence-anchored CV tailoring, Kanban tracker.',
    description:
      'A deployed multi-agent product: cited RAG, a hand-rolled research tool loop, evidence-anchored tailoring, metering, and an LLM-as-judge suite.',
    body: [
      'CareerAgent chats over a CV with page-level citations and refuses questions the documents cannot support. A research agent runs a tool loop over live web search, then structured output (JSON mode, Pydantic, one self-correction retry) shapes the brief. The tailor agent retrieves CV evidence for a job description; every bullet carries the supporting quote, plus honest gaps.',
      'There is no agent framework on purpose. Tool loop, structured output, and provider fallback (Groq, then Mistral) are a small amount of plain Python. Every LLM request logs tokens, latency, and list-price cost. An LLM-as-judge suite includes a hallucination trap where only a refusal counts as a pass.',
      'The public demo runs on Cloudflare Pages. API docs are disabled in production; CORS is pinned; LLM endpoints are rate-limited. The demo workspace uses a synthetic candidate and resets regularly.',
    ],
    features: [
      'Cited RAG chat with refusal when the answer is not in the docs',
      'Research agent: tool loop + structured brief',
      'Tailor agent anchored to CV evidence',
      'Per-request cost metering',
      'LLM-as-judge evals, including a trap question',
    ],
    stack: ['FastAPI', 'React', 'pgvector', 'SSE', 'Docker', 'Kubernetes', 'Supabase'],
    accent: '#fb923c',
    status: 'live',
    featured: false,
    github: 'https://github.com/hharsha98/careeragent',
    links: [
      { kind: 'live', label: 'Live', href: 'https://careeragent-ceq.pages.dev' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/hharsha98/careeragent' },
    ],
    category: 'ops',
  },
  {
    slug: 'mara-open',
    index: '07',
    name: 'MARA Open',
    tagline:
      'From an SMT error code to an evidence-linked corrective plan — one incident, multiple sources, a decision you can inspect.',
    description:
      'Building. Evidence-grounded investigation workspace on GitHub — not offered as a live product here.',
    body: [
      'MARA Open is an evidence-grounded multi-agent maintenance workflow. Public Opulo documentation supplies the technical references; every plant, machine, incident, and repair outcome is fictional. The project is not affiliated with Opulo.',
      'You can compare the same error with different causes, inspect retrieved sources, follow specialist steps (plan, retrieve, hypothesize, evaluate), and record a human decision. Reference-rule execution needs no model key.',
      'This is not a studio Live product. A previous chatgpt.site preview was fragile and is not linked from this hub. GitHub is the source of truth until the project is migrated to an owned host. The README is explicit that reference-fixture scores test software behavior, not open-ended diagnostic generalization, and must not be quoted as LLM or thesis performance.',
    ],
    features: [
      'Visible specialist path: plan → evidence → hypotheses → evaluation → human review',
      'Same error, different cause — comparable fictional PICK-001 cases',
      'Evidence board with source links and machine/line boundaries',
      'Reference mode without a model key; optional live AI behind the API',
      'Durable pause/resume of human review on the local backend',
    ],
    stack: ['Python', 'LangGraph', 'FastAPI', 'React', 'Chroma', 'SQLite'],
    accent: '#f97316',
    status: 'building',
    featured: false,
    github: 'https://github.com/hharsha98/mara-open',
    links: [{ kind: 'github', label: 'GitHub', href: 'https://github.com/hharsha98/mara-open' }],
    category: 'industrial',
  },
  {
    slug: 'agentgrid',
    index: '08',
    name: 'Agent Grid',
    tagline:
      'BridgeSpace-inspired multi-agent terminal grid (Claude Code, cursor-agent, Codex, Gemini CLI, shell). Local ADE — marketing page only, no hosted demo.',
    description:
      'Building. Local ADE — GitHub and run-it-yourself only. Not a hosted IDE.',
    body: [
      'Agent Grid is a BridgeSpace-inspired ADE: mission control for several AI coding agents in one browser window. It is intentionally separate from Vibespace. The two repos are not merged.',
      'A local Fastify server spawns real PTY sessions. The UI is React + xterm.js. You can launch Claude Code, cursor-agent, Codex, Gemini CLI, or a shell, in presets from 1 to 16 panes. Layout, cwd, and agent preference persist; workspace templates live on disk.',
      'On top of the grid: Warp-style command blocks, a kanban board that dispatches into a pane, Monaco file editing, shared memory notes, an MCP server, swarm roles with file-ownership claims, a small skills library, and an optional Tauri desktop shell. There is no public hosted instance — GitHub and local install only.',
    ],
    features: [
      'node-pty sessions that survive a browser refresh',
      'Layout presets through 16 panes',
      'Kanban → agent session dispatch',
      'Shared memory MCP (STDIO) + swarm roles',
      'Optional Tauri desktop wrapper',
    ],
    stack: ['TypeScript', 'React', 'Fastify', 'xterm.js', 'Monaco', 'Tauri', 'MCP'],
    accent: '#60a5fa',
    status: 'building',
    featured: false,
    github: 'https://github.com/hharsha98/agentgrid',
    links: [{ kind: 'github', label: 'GitHub', href: 'https://github.com/hharsha98/agentgrid' }],
    category: 'environment',
  },
  {
    slug: 'revenue-ops',
    index: '09',
    name: 'Revenue Ops Control Tower',
    tagline:
      'Enterprise-style RevenueOps multi-agent control tower — a supervisor coordinates sales, support, outreach, engineering handoff, risk checks, evals, and audit trails.',
    description:
      'Phase 0 scaffold: API contracts, sandbox-first autonomy, Docker/K8s/Terraform skeletons. Not a live product.',
    body: [
      'Revenue Ops Control Tower is a multi-agent control tower: one supervisor coordinates specialists for sales, support, customer communication, engineering handoff, risk checks, evals, and audit trails.',
      'The README is explicit about current status: Phase 0 scaffold. FastAPI contracts, supervisor routing, safety and allowlist checks, a tool registry (Gmail, Slack, GitHub, RAG, lead scoring, ticket triage), a React dashboard with a workflow canvas, and Docker / Kubernetes / Terraform / CI skeletons.',
      'Autonomy defaults to sandbox. Real-account mode is meant to require explicit configuration and allowlists — power with control, not reckless live actions. This is not a hosted demo.',
    ],
    features: [
      'Supervisor / specialist agent graph',
      'Sandbox-first autonomy (real-account mode gated)',
      'Tool registry: Gmail, Slack, GitHub, RAG, triage',
      'React dashboard with workflow canvas',
      'Docker, Kubernetes, Terraform, and CI skeletons',
    ],
    stack: ['FastAPI', 'React', 'Postgres', 'Redis', 'Docker', 'Kubernetes', 'Terraform'],
    accent: '#f472b6',
    status: 'building',
    featured: false,
    github: 'https://github.com/hharsha98/06-revenue-ops-agent-control-tower',
    links: [
      {
        kind: 'github',
        label: 'GitHub',
        href: 'https://github.com/hharsha98/06-revenue-ops-agent-control-tower',
      },
    ],
    category: 'ops',
  },
  {
    slug: 'agentops-studio',
    index: '10',
    name: 'AgentOps Studio',
    tagline:
      'Multi-agent AI operations platform with agent orchestration, RAG, MCP tools, observability, Docker, Kubernetes, and Terraform scaffolding.',
    description:
      'Product and deploy scaffolding for a multi-agent ops command center — Docker, local Kubernetes, Terraform placeholders. Related to Agent Fleet, which is the public platform repo.',
    body: [
      'AgentOps Studio is the public product/ops scaffolding: a command-center surface and deploy foundation (Docker Compose, local Kubernetes structure, Terraform placeholders) for running AI workforces with operational visibility.',
      'The full self-hostable platform source is Agent Fleet. This repo is the product shell and portable-infra trail — not a second claim that the fleet is private.',
      'Named on the product: streaming multi-agent chat, visual workflows, document intelligence with citations, MCP registry, Langfuse observability, cost and token tracking.',
    ],
    features: [
      'Orchestration + RAG + MCP as the product spine',
      'Docker Compose foundation and local Kubernetes structure',
      'Terraform placeholders for portable managed deploys',
      'Observability and cost-tracking in the planned surface',
      'Learning log for incidents, fixes, and verification',
    ],
    stack: ['TypeScript', 'Python', 'FastAPI', 'Docker', 'Kubernetes', 'Terraform', 'MCP'],
    accent: '#a78bfa',
    status: 'building',
    featured: false,
    github: 'https://github.com/hharsha98/agentops-studio',
    featuresHeading: 'On the product',
    links: [
      { kind: 'github', label: 'GitHub', href: 'https://github.com/hharsha98/agentops-studio' },
      { kind: 'github', label: 'Agent Fleet', href: 'https://github.com/hharsha98/agentfleet' },
    ],
    category: 'ops',
  },
]

export function resolveProductSlug(slug: string) {
  return slug in legacySlugs ? legacySlugs[slug as keyof typeof legacySlugs] : slug
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === resolveProductSlug(slug))
}

export function requireProduct(slug: string) {
  const product = getProduct(slug)
  if (!product) {
    throw new Error(`Unknown product slug: ${slug}`)
  }
  return product
}

export function neighbors(slug: string) {
  const resolved = resolveProductSlug(slug)
  const i = products.findIndex((p) => p.slug === resolved)
  return {
    prev: i > 0 ? products[i - 1] : undefined,
    next: i >= 0 && i < products.length - 1 ? products[i + 1] : undefined,
  }
}

const bentoLayouts = {
  agentfleet: 'bento-agentfleet',
  'agent-os': 'bento-agent-os',
  vibespace: 'bento-vibespace',
  retrievallab: 'bento-retrievallab',
} as const

export function featuredProducts() {
  return products.filter((p) => p.featured)
}

export function featuredBentoClass(product: Product) {
  if (!product.featured) return ''
  const cls = bentoLayouts[product.slug as keyof typeof bentoLayouts]
  if (!cls) {
    throw new Error(`featured product ${product.slug} is missing a bento layout class`)
  }
  return cls
}

export function catalogProducts() {
  return products.filter((p) => !p.featured)
}

export function badgeLinks(product: Product) {
  return product.links
}

export function demoLinks(product: Product) {
  return product.links.filter((link) =>
    ['live', 'gallery', 'download', 'walkthrough'].includes(link.kind),
  )
}

export function publicSurfaces() {
  return products.filter((p) => p.status === 'live' || p.status === 'download' || p.status === 'gallery')
}

export function productPaths() {
  const slugs = [...products.map((p) => p.slug), ...Object.keys(legacySlugs)]
  return [...new Set(slugs)]
}

export function catalogStats() {
  return {
    live: products.filter((p) => p.status === 'live').length,
    download: products.filter((p) => p.status === 'download').length,
    gallery: products.filter((p) => p.status === 'gallery').length,
    building: products.filter((p) => p.status === 'building').length,
  }
}

/** Stack names that appear in the catalog (plus Workers for this hub). */
export const credibilityStack = [
  'Python',
  'FastAPI',
  'Next.js',
  'React',
  'TypeScript',
  'PostgreSQL',
  'pgvector',
  'Tauri',
  'MCP',
  'Docker',
  'Gradio',
  'Cloudflare Workers',
] as const
