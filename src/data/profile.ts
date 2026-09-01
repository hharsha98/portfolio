/** Recruiter profile facts. No invented scores, metrics, or CEFR C1 claims. */

export const profile = {
  name: 'Hanumanthu Harsha Vardhan',
  givenName: 'Harsha',
  familyName: 'Vardhan',
  headline:
    'AI Engineer · Agentic systems · Cloud deployment · M.Sc. Electromobility (ACES), FAU · Nürnberg',
  location: 'Nürnberg, Germany',
  email: 'rtvision7@gmail.com',
  phoneDisplay: '+49 176 577 99028',
  phoneTel: '+4917657799028',
  photo: '/portrait.jpg',
  openTo: [
    'AI Engineer',
    'AI Architect',
    'AI Cloud Deployment',
    'Pflichtpraktikum',
  ],
  links: {
    linkedin: 'https://linkedin.com/in/hanumanthu1',
    github: 'https://github.com/hharsha98',
    huggingface: 'https://huggingface.co/hharsha',
    studio: 'https://agentic-systems-studio.com',
  },
} as const

export const site = {
  origin: 'https://harsha-vardhan.pages.dev',
  title: 'Hanumanthu Harsha Vardhan — AI Engineer',
  description:
    'AI Engineer in Nürnberg. Agentic systems and cloud deployment. M.Sc. Electromobility (ACES) at FAU. Open to AI Engineer, AI Architect, AI Cloud Deployment, and Pflichtpraktikum.',
} as const

export const about = [
  'I build agentic systems and retrieval pipelines that have to hold up outside a demo — local models, cited answers, and evaluation instead of vibes. This page is the person. The work studio is separate: Agentic Systems Studio.',
  'I came to AI from mechanical engineering, then Electromobility (ACES) at FAU Erlangen-Nürnberg. The problems that stuck were industrial: making language models reliable enough for a plant, not a slide.',
  'Right now I am writing my master thesis at Siemens AG in Amberg on multi-agent root-cause analysis. Public code lives only at github.com/hharsha98.',
]

export const experience = [
  {
    dates: 'Aug 2025 – Present',
    org: 'Siemens AG, Amberg',
    title: 'Master thesis — multi-agent root-cause analysis',
    points: [
      'Multi-agent system for automated root-cause analysis in industrial production.',
      'Agents for perception, reasoning, retrieval, and decision support, with local models and reliability metrics.',
      'Code is confidential. Architecture and evaluation approach are fair game in conversation.',
    ],
  },
  {
    dates: 'Jan 2025 – Mar 2025',
    org: 'Siemens AG',
    title: 'Computer vision intern',
    points: [
      'Computer-vision internship on vision-based inspection and image processing.',
    ],
  },
  {
    dates: 'Aug 2024 – Apr 2025',
    org: 'Institute FAPS, FAU Erlangen',
    title: 'Research assistant',
    points: [
      'Local RAG for industrial knowledge retrieval, with trustworthiness and verification metrics.',
      'This work is the basis of the EBL 2026 publication listed below.',
    ],
  },
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

export const publication = {
  authors: 'Mahr, F.; Vardhan, H. H.; Franke, J.; Ockel, M.',
  year: '2026',
  title:
    'Development and Evaluation of a RAG System for Local Knowledge Retrieval with Integrated Trustworthiness Metrics in Industrial Environments',
  venue: 'EBL 2026',
  series: 'DVS-Berichte, vol. 404',
  pages: 'pp. 344–354',
  doi: '10.53192/EBL20260344',
  doiUrl: 'https://doi.org/10.53192/EBL20260344',
} as const

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
    items: ['RAG pipelines', 'Hybrid search', 'Reranking', 'Citations', 'Trustworthiness metrics'],
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
