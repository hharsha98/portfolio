# Studio delist log

Internal removal record for agentic-systems-studio.com. This file is not a site page and is not copied into the Worker `dist/` output.

Contabo hosts were not changed from this repo. Unrelated GitHub repositories were not deleted.

## Removed from the public catalog

| Item | Former route | Former outbound links |
|---|---|---|
| MARA Open | `/products/mara-open`, `/projects/mara-open` | `mara-open.169.58.185.43.sslip.io`, `github.com/hharsha98/mara-open` |
| RAG Trustworthiness Industrial | `/products/rag-trustworthiness`, `/projects/rag-trustworthiness` | `ragtrust.169.58.185.43.sslip.io`, `hharsha98.github.io/rag-trustworthiness-industrial/`, `github.com/hharsha98/rag-trustworthiness-industrial` |
| Conference paper page | `/research` | DOI `10.53192/EBL20260344`, ResearchGate record for the FAPS / DVS EBL 2026 industrial retrieval paper |

Those routes are no longer generated. Cloudflare `not_found_handling: "404-page"` serves the studio 404. There is no stub page and no `_redirects` entry (a SPA fallback breaks this Worker).

## Edited so the names do not remain

- `src/data/products.ts` — both products removed; remaining indexes renumbered 01–08; census is derived from the catalog (5 live, 3 download / local).
- `src/data/site.ts` — paper metadata and Research nav removed.
- `src/pages/index.astro` — homepage paper block removed; retrieval line names RetrievalLab only; hero count follows the catalog.
- `src/pages/demos.astro` — demos intro no longer names the delisted lab.
- `src/pages/404.astro` — no research link.
- `src/components/StudioOrbit.astro` — constellation relaid for the eight remaining products.
- `README.md` — route table and hosting note no longer advertise the delisted pages.
- `scripts/assert-studio.mjs` — guards expect absence on `src/`, `public/`, `README.md`, and built `dist/` (this log is excluded).

## Kept

CareerAgent, Vibespace, Agent Fleet, Agent OS, Agent Grid, AgentOps Studio, Revenue Ops Control Tower, RetrievalLab, About, and Contact. RetrievalLab stays as the generic retrieval lab, including the planned hostname `rag.agentic-systems-studio.com`.
