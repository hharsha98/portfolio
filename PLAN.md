# Plan: Portfolio site — harsha-ai.pages.dev

## Goal
One link for recruiters that shows working software, not a code listing. Live at
a free Cloudflare Pages subdomain, same "industrial terminal-precision" design
as CareerAgent (consistent personal brand). €0/month. 1–2 build days.

## Stack (all proven in project 02)
Vite + React + TypeScript + Tailwind v4 (copy the @theme tokens from
`02-careeragent/frontend/src/index.css`) + framer-motion. **No backend** —
pure static site, so nothing can go down or cost money. New public repo
`portfolio` (hharsha98), local at `projects/03-portfolio/`.

## Structure (single page + light blog)
1. **Hero** — name, one-line positioning ("AI Engineer — RAG, agents, evals · Erlangen/Germany"),
   status chip ("open to AI Engineer roles"), links: GitHub · LinkedIn · CV download.
2. **Projects** — data-driven cards from `src/data/projects.ts` (adding a future
   project = adding one object). Each card: screenshot, 2-sentence story with
   *numbers* (6/6 eval, €0 infra, ~100 endpoints analyzed), tech chips,
   **"Try it live →"** primary button, quiet GitHub link.
   Launch content: CareerAgent (live demo) · ai-rag-project (repo + screenshot) ·
   master-thesis AI work (short card, no demo).
3. **About + skills** — Electromobility→AI story (5-6 lines), grouped skill tags
   (LLM/RAG · Backend · Frontend · Infra), languages.
4. **Writing** — blog index reading markdown files via `import.meta.glob` +
   `marked`; route `/writing/:slug`. Ship with post #1: "What I learned building
   CareerAgent" (drafted together during the build).
5. **Contact footer** — email (copy button), LinkedIn, GitHub.

## User inputs needed during build
- A **public CV PDF** (no phone/street address) for `/public/cv.pdf` — I'll help strip Profile.pdf.
- LinkedIn URL, preferred public email.
- Approve the positioning line + about text before deploy.

## Deploy & verify
CF Pages: connect repo `portfolio`, project name `harsha-ai` (→ harsha-ai.pages.dev),
build `npm run build`, output `dist`, plus `public/_redirects` for the blog routes.
Verify: mobile (375px) + desktop screenshots per section, Lighthouse-style checks
(title/meta/og tags), all live links click through, CV downloads.

## Out of scope (v2)
Custom domain (~€10/yr, attach later without rebuilding) · analytics (Cloudflare
free analytics can be toggled in dashboard) · CMS · dark/light toggle.
