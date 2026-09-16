// Editorial demonstrations are independent of catalog size and order.
// They illustrate supported capabilities; they are not live service telemetry.
export const showcase = [
  { id: 'coordinate', label: 'Coordinate agents', slug: 'agentfleet', title: 'One goal. A coordinated team.', description: 'Follow a task from assignment through specialist work to a result you can review.', action: 'Open Agent Fleet' },
  { id: 'retrieve', label: 'Search documents', slug: 'retrievallab', title: 'From documents to grounded answers.', description: 'See a document become searchable passages, relevant evidence, and an answer with a citation.', action: 'Open RetrievalLab' },
  { id: 'verify', label: 'Verify answers', slug: 'rag-trustworthiness', title: 'Every claim meets its evidence.', description: 'Inspect the source behind an answer. Distinguish supported claims from claims the evidence cannot establish.', action: 'Open RAG Trust' },
] as const
export type ShowcaseKind = typeof showcase[number]['id']
