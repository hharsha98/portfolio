export type ProjectStatus = 'deployed' | 'usable' | 'local' | 'foundation'

export type Project = {
  slug: string
  index: string
  name: string
  tagline: string
  description: string
  body: string[]
  features: string[]
  stack: string[]
  status: ProjectStatus
  statusNote: string
  github: string
  demo?: { label: string; href: string }
  secondary?: { label: string; href: string }
  category: 'environment' | 'ops' | 'retrieval'
}

export const projects: Project[] = [
  {
    slug: 'vibedeck',
    index: '01',
    name: 'vibedeck',
    tagline:
      'An open-source agentic development environment: run Claude Code, cursor-agent, Codex and shells side by side in a terminal grid, with a kanban board that dispatches them, shared agent memory, and multi-agent orchestration.',
    description:
      'Mission control for AI coding agents. Real PTYs in a grid, a board that launches them, and memory they can share — TypeScript and Tauri, not a chat wrapper.',
    body: [
      'vibedeck is a home base for running multiple AI coding agents at once instead of juggling separate terminal windows. Each pane is a real terminal session: Claude Code, cursor-agent, Codex, or a plain shell.',
      'Work moves on a kanban board that dispatches agents the same way you would assign a ticket. Shared memory lets every agent in the workspace read and write notes so they do not rediscover the same facts. Multi-agent orchestration coordinates related pieces of a larger task.',
      'The core is usable today: split up to 16 panes, pick an agent per pane, browse and edit files, dispatch from the board. Sessions live on the server, so closing a tab does not kill the agents. Desktop builds ship for macOS, Windows, and Linux. The app is not Apple-notarized; first launch is blocked by Gatekeeper until you explicitly open it.',
    ],
    features: [
      'Terminal grid with real PTYs, split layouts, and templates',
      'Kanban dispatch into live agent sessions',
      'Shared agent memory and swarm missions',
      'Skills on the agentskills.io standard, discovered from disk',
      'Tauri desktop shell · Node 22+ required',
    ],
    stack: ['TypeScript', 'React', 'Tauri', 'Fastify', 'node-pty', 'MCP'],
    status: 'usable',
    statusNote: 'Usable, still being built',
    github: 'https://github.com/hharsha98/vibedeck',
    secondary: {
      label: 'Releases',
      href: 'https://github.com/hharsha98/vibedeck/releases/latest',
    },
    category: 'environment',
  },
  {
    slug: 'agent-os',
    index: '02',
    name: 'Agent OS',
    tagline:
      'Local-first Agent OS dashboard for Cursor, Claude, Codex, and Hermes — dry-run by default, sandboxed workspace, gated machine control.',
    description:
      'A local command center for agents already on the machine. Honest status. Dry-run until you turn execution on.',
    body: [
      'Agent OS is a local-first operations dashboard for Cursor Agent, Claude Code, Codex, and Hermes. It reports real CLI presence instead of painting fake “connected” cards.',
      'Safety is a product decision: unified chat is labeled dry-run, the workspace sandbox is jailed to a dedicated folder, and machine-control stays gated. Execution, installs, and public mode are off unless you flip explicit flags.',
      'The public gallery is a click-through of the product surfaces. The running system is a local app (React + Express), not hosted SaaS.',
    ],
    features: [
      'Mission Control with live local version checks',
      'Unified chat — dry-run by default',
      'Sandboxed workspace preview',
      'Goals, kanban, memory, notebook as local stores',
      'Machine control: status only until execution is enabled',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'Node'],
    status: 'local',
    statusNote: 'Local-first · dry-run default',
    github: 'https://github.com/hharsha98/agent-os',
    demo: { label: 'Product gallery', href: 'https://hharsha98.github.io/agent-os/' },
    category: 'ops',
  },
  {
    slug: 'agentops-studio',
    index: '03',
    name: 'AgentOps Studio',
    tagline:
      'Multi-agent AI operations platform with agent orchestration, RAG, MCP tools, observability, Docker, Kubernetes, and Terraform scaffolding.',
    description:
      'The agent-fleet product: an operations command center for running AI workforces, with portable deploy paths instead of a vendor lock-in demo.',
    body: [
      'AgentOps Studio is framed as a multi-agent workforce platform for business operations — support, research, delivery, compliance — with operational visibility and Kubernetes-based deployment.',
      'The first implementation is the product shell and the deploy foundation: dashboard workspace, a deployment page covering Docker, local Kubernetes, and managed Kubernetes, Docker Compose, k3d-oriented manifests, and Terraform placeholders so provider-specific infra stays isolated.',
      'Planned platform pieces are named in the repo: streaming multi-agent chat, visual workflows, document intelligence with citations, MCP registry, Langfuse observability, cost and token tracking. Treat this as the fleet product in the studio, not a finished SaaS.',
    ],
    features: [
      'Orchestration + RAG + MCP as the product spine',
      'Docker Compose foundation and local Kubernetes structure',
      'Terraform placeholders for portable managed deploys',
      'Observability and cost-tracking in the planned surface',
      'Learning log for incidents, fixes, and verification',
    ],
    stack: ['TypeScript', 'Python', 'FastAPI', 'Docker', 'Kubernetes', 'Terraform', 'MCP'],
    status: 'foundation',
    statusNote: 'Platform foundation',
    github: 'https://github.com/hharsha98/agentops-studio',
    category: 'ops',
  },
  {
    slug: 'agentgrid',
    index: '04',
    name: 'agentgrid',
    tagline:
      'BridgeSpace-inspired multi-agent terminal grid (Claude Code, cursor-agent, Codex, shell). Independent Cursor lane — not related to vibedeck.',
    description:
      'A second agentic development environment, kept as its own repo on purpose. Real PTYs, grid presets, kanban dispatch, shared memory MCP.',
    body: [
      'agentgrid is a BridgeSpace-inspired ADE: mission control for several AI coding agents in one browser window. It is the Cursor lane — intentionally separate from vibedeck. The two repos are not merged.',
      'A local Fastify server spawns real PTY sessions. The UI is React + xterm.js. You can launch Claude Code, cursor-agent, Codex, Gemini CLI, or a shell, in presets from 1 to 16 panes. Layout, cwd, and agent preference persist; workspace templates live on disk.',
      'On top of the grid: Warp-style command blocks, a kanban board that dispatches into a pane, Monaco file editing, shared memory notes, an MCP server, swarm roles with file-ownership claims, a small skills library, and an optional Tauri desktop shell.',
    ],
    features: [
      'node-pty sessions that survive a browser refresh',
      'Layout presets through 16 panes',
      'Kanban → agent session dispatch',
      'Shared memory MCP (STDIO) + swarm roles',
      'Optional Tauri desktop wrapper',
    ],
    stack: ['TypeScript', 'React', 'Fastify', 'xterm.js', 'Monaco', 'Tauri', 'MCP'],
    status: 'local',
    statusNote: 'Local ADE · Cursor lane',
    github: 'https://github.com/hharsha98/agentgrid',
    category: 'environment',
  },
  {
    slug: 'retrievallab',
    index: '05',
    name: 'RetrievalLab',
    tagline:
      'Advanced RAG made visible — contextual chunking, hybrid search, cross-encoder reranking, query transformation, and retrieval eval (recall@k, MRR).',
    description:
      'The retrieval upgrades that sit between naive RAG and production, instrumented so you can watch each stage — and measure whether they help.',
    body: [
      'RetrievalLab assembles contextual chunking, hybrid search (vector + BM25, fused with RRF), HyDE query transformation, and cross-encoder reranking into one pipeline you can inspect live.',
      'Ingestion uses contextual retrieval: before embedding, an LLM writes a one-sentence context that situates each chunk in its document. The Pipeline Inspector shows the HyDE probe, hybrid candidates with vector vs keyword rank, and the rerank step promoting chunks. A compare view puts naive vs advanced answers side by side.',
      'Eval reports recall@k and MRR for naive vs advanced on a labelled set. The repo is explicit that reranking’s margin is largest on large messy corpora; on a small clean corpus a strong embedding already does well. Measuring that, instead of assuming “advanced” always wins, is the point.',
    ],
    features: [
      'Contextual chunking (Anthropic-style situating sentence)',
      'Hybrid retrieve: vector + BM25 + RRF, plus HyDE',
      'FlashRank / MiniLM cross-encoder rerank',
      'Pipeline Inspector and naive vs advanced compare',
      'Retrieval eval: recall@k and MRR',
    ],
    stack: ['FastAPI', 'React', 'pgvector', 'FlashRank', 'BM25', 'HyDE', 'Supabase'],
    status: 'deployed',
    statusNote: 'Instrumented RAG lab',
    github: 'https://github.com/hharsha98/retrievallab',
    demo: { label: 'Live lab', href: 'https://retrievallab.pages.dev' },
    category: 'retrieval',
  },
  {
    slug: 'careeragent',
    index: '06',
    name: 'CareerAgent',
    tagline:
      'AI agents for the job hunt — RAG chat over your CV with citations, live company research, CV tailoring, Kanban tracker.',
    description:
      'A deployed multi-agent product: cited RAG, a hand-rolled research tool loop, evidence-anchored tailoring, metering, and an LLM-as-judge suite.',
    body: [
      'CareerAgent chats over a CV with page-level citations and refuses questions the documents cannot support. A research agent runs a tool loop over live web search, then structured output (JSON mode, Pydantic, one self-correction retry) shapes the brief. The tailor agent retrieves CV evidence for a job description; every bullet carries the supporting quote, plus honest gaps.',
      'There is no agent framework on purpose. Tool loop, structured output, and provider fallback (Groq, then Mistral) are a small amount of plain Python. Every LLM request logs tokens, latency, and list-price cost. An LLM-as-judge suite includes a hallucination trap where only a refusal counts as a pass.',
      'The public demo runs on Hugging Face Spaces and Cloudflare Pages. The same container has Kubernetes manifests with probes, limits, and an autoscaler. API docs are disabled in production; CORS is pinned; LLM endpoints are rate-limited.',
    ],
    features: [
      'Cited RAG chat with refusal when the answer is not in the docs',
      'Research agent: tool loop + structured brief',
      'Tailor agent anchored to CV evidence',
      'Per-request cost metering',
      'LLM-as-judge evals, including a trap question',
    ],
    stack: ['FastAPI', 'React', 'pgvector', 'SSE', 'Docker', 'Kubernetes', 'Supabase'],
    status: 'deployed',
    statusNote: 'Live demo',
    github: 'https://github.com/hharsha98/careeragent',
    demo: { label: 'Live demo', href: 'https://careeragent-ceq.pages.dev' },
    secondary: {
      label: 'API health',
      href: 'https://hv1998-careeragent-api.hf.space/api/health',
    },
    category: 'ops',
  },
  {
    slug: 'ai-rag',
    index: '07',
    name: 'ai-rag',
    tagline:
      'RAG chat-with-your-documents: PDF ingestion, Mistral embeddings, ChromaDB retrieval with citations, Streamlit UI, LLM-as-judge eval.',
    description:
      'The origin system. Chat with PDFs, cite the chunks, and score answers — built to understand every moving part before scaling the ideas up.',
    body: [
      'ai-rag-project is a local RAG loop: PDFs are sentence-aware chunked, embedded with Mistral, stored in ChromaDB, and retrieved with hybrid search (vector + BM25, fused with RRF). Answers stream with inline citations back to source chunks.',
      'A Streamlit UI handles upload and chat. An evaluation script scores Q/A pairs, including unanswerable trick questions. Later work in the same repo moved eval from 4/6 to 6/6 by fixing chunking, retrieval, and prompt mistakes the suite actually caught.',
      'CareerAgent and RetrievalLab sit downstream of this project. The point of keeping it public is the lineage: citations and evals were requirements from the first system, not a retrofit.',
    ],
    features: [
      'Sentence-aware chunking with overlap',
      'Hybrid retrieval fused with RRF',
      'Streaming chat with conversation memory',
      'Inline citations to source chunks',
      'LLM-as-judge eval with unanswerable traps',
    ],
    stack: ['Python', 'ChromaDB', 'Mistral', 'BM25', 'Streamlit'],
    status: 'local',
    statusNote: 'Origin RAG system',
    github: 'https://github.com/hharsha98/ai-rag-project',
    category: 'retrieval',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function neighbors(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : undefined,
  }
}

export const experience = [
  {
    dates: 'Aug 2025 — present',
    org: 'Siemens AG, Amberg',
    title: 'Master thesis — multi-agent root-cause analysis',
    points: [
      'Multi-agent system for automated root-cause analysis in manufacturing.',
      'Agents for perception, reasoning, retrieval, and decision support.',
      'Local LLMs, retrieval pipelines, and reliability metrics in an industrial setting.',
      'Code is confidential; architecture and evaluation approach are fair game in conversation.',
    ],
  },
  {
    dates: 'Jan 2025 — Mar 2025',
    org: 'Siemens AG, Amberg',
    title: 'Computer vision intern',
    points: [
      'Vision-based inspection agent for PCBs: CNNs and real-time image processing.',
      'End-to-end workflow combining computer vision, Python, dashboards, and automation.',
    ],
  },
  {
    dates: 'Aug 2024 — Apr 2025',
    org: 'Institute FAPS, Nuremberg',
    title: 'Student research assistant — AI and automation',
    points: [
      'RAG system for industrial knowledge retrieval with local embedding models.',
      'Trustworthiness and verification metrics for industrial decision support.',
      'Retrieval pipelines, prototype agent workflows, reliability evaluation.',
    ],
  },
  {
    dates: 'Sep 2021 — May 2022',
    org: 'IndiaMART InterMESH Ltd.',
    title: 'Senior executive — data analytics',
    points: [
      'SQL, shell, and Python automation for reporting workflows.',
      'Business-intelligence analysis in Python and Tableau.',
      'Scheduled job validations and reporting checks.',
    ],
  },
  {
    dates: 'Jan 2020 — Feb 2021',
    org: 'RT Vision Technologies Pvt. Ltd.',
    title: 'Project coordinator — data and systems',
    points: [
      'ERP data operations and structured reporting across departments.',
    ],
  },
]

export const education = [
  {
    dates: 'Oct 2022 — Oct 2025',
    org: 'FAU Erlangen-Nürnberg',
    title: 'M.Sc. Electromobility (ACES)',
    note: 'AI & autonomous driving, connectivity, e-powertrain, sustainable mobility & production technology.',
  },
  {
    dates: 'Jun 2015 — May 2019',
    org: 'SRM University',
    title: 'B.Tech Mechanical Engineering',
    note: null,
  },
]

export const skills = [
  {
    group: 'Agentic systems',
    items: ['Multi-agent orchestration', 'Tool loops', 'MCP', 'Local LLMs', 'Dry-run / gated exec'],
  },
  {
    group: 'Retrieval',
    items: ['RAG pipelines', 'Hybrid search', 'Reranking', 'Citations', 'recall@k / MRR'],
  },
  {
    group: 'Engineering',
    items: ['Python', 'TypeScript', 'FastAPI', 'React', 'PostgreSQL / pgvector'],
  },
  {
    group: 'Industrial + infra',
    items: ['Docker', 'Kubernetes', 'Terraform', 'Tauri', 'Computer vision'],
  },
]
