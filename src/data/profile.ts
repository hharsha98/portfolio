/** Recruiter profile facts. No invented scores, metrics, or CEFR C1 claims. */

export const profile = {
  name: 'Hanumanthu Harsha Vardhan',
  givenName: 'Harsha',
  familyName: 'Vardhan',
  headline:
    'AI Engineer · Agentic systems · Cloud deployment · M.Sc. Electromobility (ACES), FAU · Nürnberg',
  location: 'Nürnberg, Germany',
  email: 'mechaharsh@gmail.com',
  phoneDisplay: '+49 176 577 99028',
  phoneTel: '+4917657799028',
  photo: '/portrait.jpg',
  openTo: [
    'AI Engineer',
    'AI Architect',
    'AI Cloud Deployment',
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/hanumanthu1',
    github: 'https://github.com/hharsha98',
    huggingface: 'https://huggingface.co/hharsha',
    studio: 'https://agentic-systems-studio.com',
  },
} as const

export const site = {
  origin: 'https://harsha-vardhan.pages.dev',
  title: 'Hanumanthu Harsha Vardhan — AI Engineer',
  description:
    'AI Engineer in Nürnberg. Agentic systems and cloud deployment. M.Sc. Electromobility (ACES) at FAU. Open to AI Engineer, AI Architect, and AI Cloud Deployment.',
} as const

export const about = [
  'I build agentic systems and retrieval pipelines that have to hold up outside a demo — local models, cited answers, and evaluation instead of vibes.',
  'I came to AI from mechanical engineering, then Electromobility (ACES) at FAU Erlangen-Nürnberg.',
  'Public code lives only at github.com/hharsha98.',
]

export const experience = [
  {
    dates: 'Sep 2021 – May 2022',
    org: 'IndiaMART InterMESH Ltd.',
    title: 'Senior Executive, Data Analytics',
    points: [
      'Reporting and business-intelligence work with SQL, Python, and Tableau.',
    ],
  },
  {
    dates: 'Jan 2020 – Feb 2021',
    org: 'RT Vision Technologies Pvt. Ltd.',
    title: 'Project Coordinator',
    points: ['Data operations, structured reporting, and project coordination.'],
  },
] as const

export const education = [
  {
    dates: 'Oct 2022 – Present',
    org: 'FAU Erlangen-Nürnberg',
    title: 'M.Sc. Electromobility (ACES)',
    note: 'AI & autonomous driving, connectivity, e-powertrain, sustainable mobility and production technology.',
  },
  {
    dates: 'Jun 2015 – May 2019',
    org: 'SRM Institute of Science and Technology',
    title: 'B.Tech Mechanical Engineering',
    note: null,
  },
] as const

export const featured = [
  {
    name: 'Agent Fleet',
    repo: 'agentfleet',
    blurb:
      'Self-hostable multi-agent operations platform: chat with a fleet of tool-using agents, orchestrate goals as a live task DAG, with evals, cost governance, and guardrails.',
    href: 'https://github.com/hharsha98/agentfleet',
  },
  {
    name: 'VibeDeck',
    repo: 'vibedeck',
    blurb:
      'Open-source agentic development environment: Claude Code, cursor-agent, Codex, and shells side by side in a terminal grid, with kanban dispatch and shared agent memory.',
    href: 'https://github.com/hharsha98/vibedeck',
  },
  {
    name: 'Agent OS',
    repo: 'agent-os',
    blurb:
      'Local-first Agent OS dashboard for Cursor, Claude, Codex, and Hermes — dry-run by default, sandboxed workspace, gated machine control.',
    href: 'https://github.com/hharsha98/agent-os',
    extra: { label: 'Gallery', href: 'https://hharsha98.github.io/agent-os/' },
  },
  {
    name: 'AgentOps Studio',
    repo: 'agentops-studio',
    blurb:
      'Multi-agent operations scaffolding: orchestration, RAG, MCP tools, observability, plus Docker, Kubernetes, and Terraform structure.',
    href: 'https://github.com/hharsha98/agentops-studio',
  },
  {
    name: 'RetrievalLab',
    repo: 'retrievallab',
    blurb:
      'Advanced RAG made visible — contextual chunking, hybrid search, reranking, query transformation, and retrieval evaluation you can inspect.',
    href: 'https://github.com/hharsha98/retrievallab',
    extra: {
      label: 'Hugging Face Space',
      href: 'https://huggingface.co/spaces/hharsha/retrievallab',
    },
  },
  {
    name: 'CareerAgent',
    repo: 'careeragent',
    blurb:
      'AI agents for the job hunt: RAG chat over a CV with citations, company research, evidence-anchored tailoring, and a Kanban tracker.',
    href: 'https://github.com/hharsha98/careeragent',
  },
  {
    name: 'ai-rag-project',
    repo: 'ai-rag-project',
    blurb:
      'RAG chat-with-your-documents: PDF ingestion, embeddings, retrieval with citations, Streamlit UI, and an LLM-as-judge eval script.',
    href: 'https://github.com/hharsha98/ai-rag-project',
  },
  {
    name: 'AgentGrid',
    repo: 'agentgrid',
    blurb:
      'BridgeSpace-inspired multi-agent terminal grid (Claude Code, cursor-agent, Codex, shell). Independent Cursor lane — not related to VibeDeck.',
    href: 'https://github.com/hharsha98/agentgrid',
  },
] as const

export const skills = [
  {
    group: 'Agentic systems',
    items: ['Multi-agent orchestration', 'Tool loops', 'MCP', 'Local LLMs', 'Gated / dry-run execution'],
  },
  {
    group: 'Retrieval',
    items: ['RAG pipelines', 'Hybrid search', 'Reranking', 'Citations'],
  },
  {
    group: 'Engineering',
    items: ['Python', 'TypeScript', 'FastAPI', 'React', 'PostgreSQL / pgvector'],
  },
  {
    group: 'Cloud & deployment',
    items: ['Docker', 'Cloudflare Pages / Workers', 'Hugging Face Spaces', 'Kubernetes (scaffolding)'],
  },
] as const

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'German', level: 'Intermediate' },
] as const
