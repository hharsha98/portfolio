/** One object per project. Adding a future project = adding an entry here. */
export type Project = {
  name: string
  tagline: string
  story: string
  tech: string[]
  demo?: string   // live URL — the primary button
  repo?: string
  badge?: string  // the number an interviewer remembers
}

export const projects: Project[] = [
  {
    name: 'CareerAgent',
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
    name: 'ai-rag-project',
    tagline: 'RAG "chat with your documents" — where it started',
    story:
      'PDF ingestion → chunking → Mistral embeddings → ChromaDB retrieval → answers ' +
      'with page-level citations, plus an LLM-as-judge eval script. Built to ' +
      'understand every moving part of RAG before scaling the ideas up into CareerAgent.',
    tech: ['Python', 'ChromaDB', 'Mistral', 'Streamlit'],
    repo: 'https://github.com/hharsha98/ai-rag-project',
    badge: 'citations built-in',
  },
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
