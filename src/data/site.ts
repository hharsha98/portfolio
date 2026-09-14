export const site = {
  name: 'Hanumanthu Harsha Vardhan',
  shortName: 'Harsha Vardhan',
  studio: 'Agentic Systems Studio',
  domain: 'agentic-systems-studio.com',
  url: 'https://agentic-systems-studio.com',
  title: 'Agentic Systems Studio',
  description:
    'A studio of AI products: Agent Fleet, Agent OS, Vibespace, RetrievalLab, and related systems. Self-host, local-first, and live demos. GitHub github.com/hharsha98.',
  location: 'Nuremberg, Germany',
  coordinates: '49.45°N · 11.08°E',
  positioning:
    'A studio of AI products — self-hostable multi-agent ops, local-first agent environments, and retrieval you can inspect.',
  email: 'contact@agentic-systems-studio.com',
  linkedin: 'https://www.linkedin.com/in/hanumanthu1',
  github: 'https://github.com/hharsha98',
  huggingface: 'https://huggingface.co/hharsha',
  profile: 'https://harsha-vardhan.pages.dev',
  now: 'Public products',
}

export const paper = {
  title:
    'Development and Evaluation of a RAG System for Local Knowledge Retrieval with Integrated Trustworthiness Metrics in Industrial Environments',
  venue: 'DVS EBL 2026',
  venueFull: 'Elektronische Baugruppen und Leiterplatten (EBL 2026)',
  series: 'DVS-Berichte, Band 404',
  isbn: '978-3-96144-320-8',
  date: 'February 2026',
  doi: '10.53192/EBL20260344',
  doiUrl: 'https://doi.org/10.53192/EBL20260344',
  researchgate:
    'https://www.researchgate.net/publication/408497590_Development_and_Evaluation_of_a_RAG_System_for_Local_Knowledge_Retrieval_with_Integrated_Trustworthiness_Metrics_in_Industrial_Environments',
  context: 'DVS EBL 2026 · Institute FAPS, Nuremberg',
  summary:
    'Local knowledge retrieval for industrial settings, with trustworthiness and verification metrics in the evaluation loop — not retrieval quality alone.',
}

export const futureHosts = [
  { product: 'Agent Fleet', host: 'fleet.agentic-systems-studio.com' },
  { product: 'Agent OS', host: 'os.agentic-systems-studio.com' },
  { product: 'Vibespace', host: 'vibespace.agentic-systems-studio.com' },
  { product: 'RetrievalLab', host: 'rag.agentic-systems-studio.com' },
] as const

export const nav = [
  { href: '/products', label: 'Products' },
  { href: '/demos', label: 'Demos' },
  { href: '/research', label: 'Research' },
  { href: '/contact', label: 'Contact' },
] as const
