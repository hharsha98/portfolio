export const site = {
  name: 'Hanumanthu Harsha Vardhan',
  shortName: 'Harsha Vardhan',
  studio: 'Agentic Systems Studio',
  domain: 'agentic-systems-studio.com',
  url: 'https://agentic-systems-studio.com',
  title: 'Hanumanthu Harsha Vardhan — AI Engineer',
  description:
    'AI Engineer in Nuremberg. M.Sc. Electromobility (ACES), FAU. Siemens thesis on multi-agent root-cause analysis. Public work: agent fleets, local agent environments, evaluated RAG.',
  location: 'Nuremberg, Germany',
  coordinates: '49.45°N · 11.08°E',
  role: 'AI Engineer / Agentic Systems',
  positioning:
    'AI Engineer building agentic systems for industrial and product use.',
  educationShort: 'M.Sc. Electromobility (ACES), FAU Erlangen-Nürnberg',
  email: 'harsha.vardhan@fau.de',
  linkedin: 'https://linkedin.com/in/hanumanthu1',
  github: 'https://github.com/hharsha98',
  huggingface: 'https://huggingface.co/hharsha',
  photo: '/portrait.jpg',
  cv: '/cv.pdf',
  now: 'Master thesis · Siemens AG, Amberg',
  nowDetail: 'Multi-agent root-cause analysis in manufacturing',
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

export const evehicleshop = {
  name: 'EVEHICLESHOP',
  href: 'https://evehicleshop.in',
  label: 'evehicleshop.in',
  note: 'Founder. Discover and compare EVs.',
}

export const hfSpaces = [
  {
    name: 'RetrievalLab',
    href: 'https://huggingface.co/spaces/hharsha/retrievallab',
    note: 'Explainer Space for the retrieval pipeline. Not an industrial deployment.',
  },
  {
    name: 'Agentic Systems Portfolio',
    href: 'https://huggingface.co/spaces/hharsha/agent-portfolio',
    note: 'Hub Space linking out to public GitHub work.',
  },
]

export const nav = [
  { href: '/', label: 'Profile' },
  { href: '/#work', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
] as const
