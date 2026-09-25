export const site = {
  name: 'Hanumanthu Harsha Vardhan',
  shortName: 'Harsha Vardhan',
  studio: 'Agentic Systems Studio',
  domain: 'agentic-systems-studio.com',
  url: 'https://agentic-systems-studio.com',
  title: 'Agentic Systems Studio',
  description:
    'A studio that ships AI systems over time: live labs, local downloads, early galleries, and products still being built. GitHub github.com/hharsha98.',
  location: 'Nuremberg, Germany',
  coordinates: '49.45°N · 11.08°E',
  positioning:
    'The studio ships real systems over time — live retrieval labs, local-first tools, and products still being built.',
  email: 'contact@agentic-systems-studio.com',
  linkedin: 'https://www.linkedin.com/in/hanumanthu1',
  github: 'https://github.com/hharsha98',
  huggingface: 'https://huggingface.co/hharsha',
  profile: 'https://harsha-vardhan.pages.dev',
  now: 'Shipping over time',
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
  { href: '/contact', label: 'Contact' },
] as const
