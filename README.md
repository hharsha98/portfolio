# Agentic Systems Studio

Product studio for AI systems — Agent Fleet, Agent OS, Vibespace, RetrievalLab, and related tools.

This domain is **not** a personal CV. The founder site is [harsha-vardhan.pages.dev](https://harsha-vardhan.pages.dev). Do not retarget DNS of agentic-systems-studio.com to that project.

Production domain: [agentic-systems-studio.com](https://agentic-systems-studio.com).

## Domain / DNS

The zone is on Cloudflare nameservers (`alec.ns.cloudflare.com`). Custom domains **agentic-systems-studio.com** and **www.agentic-systems-studio.com** are already attached to the Workers project `agentic-systems-studio`. Keep that project as the **product studio**. Do not add a CNAME by hand. `wrangler.jsonc` lists both hostnames with `custom_domain: true` so deploys do not drop www.

Future product hosts (copy/config only — **do not attach Cloudflare DNS from this repo** until the apps are ready):

| Host | Product | Primary CTA today |
|---|---|---|
| `fleet.agentic-systems-studio.com` | Agent Fleet | GitHub + [self-host docs](https://github.com/hharsha98/agentfleet/blob/main/docs/DEPLOY.md) — no public owned SaaS URL yet |
| `os.agentic-systems-studio.com` | Agent OS | [Gallery](https://hharsha98.github.io/agent-os/) |
| `vibespace.agentic-systems-studio.com` | Vibespace | [Download](https://github.com/hharsha98/Vibespace/releases/latest) |
| `rag.agentic-systems-studio.com` | RetrievalLab | [Live lab](https://retrievallab.pages.dev) |

## Stack

Astro static site, Tailwind v4, Cloudflare Workers static assets (`wrangler.jsonc`).

## Pages

| Route | Content |
|---|---|
| `/` | Product studio home: pitch, featured products, catalog, coming hosts |
| `/products` | Full product catalog with Live / Gallery / Download / GitHub badges |
| `/products/agentfleet` | Self-hostable multi-agent ops — GitHub + self-host docs |
| `/products/agent-os` | Local-first Agent OS — [gallery](https://hharsha98.github.io/agent-os/) |
| `/products/vibespace` | Desktop ADE — [download](https://github.com/hharsha98/Vibespace/releases/latest) |
| `/products/retrievallab` | Advanced RAG + eval — [live lab](https://retrievallab.pages.dev) |
| `/products/rag-trustworthiness` | Industrial RAG trust metrics — [live](https://ragtrust.169.58.185.43.sslip.io/) · [walkthrough](https://hharsha98.github.io/rag-trustworthiness-industrial/) |
| `/products/careeragent` | Multi-agent job-hunt product — [live demo](https://careeragent-ceq.pages.dev) |
| `/products/mara-open` | Evidence-grounded investigation workspace — [live](https://mara-open-hharsha98.rtvision134.chatgpt.site) |
| `/products/agentgrid` | Multi-agent terminal grid (local; no hosted demo) |
| `/products/agentops-studio` | Product + deploy scaffolding |
| `/products/revenue-ops` | Revenue Ops control tower (Phase 0 scaffold) |
| `/demos` | Working live / gallery / download / self-host links |
| `/research` | DVS EBL 2026 paper (DOI) |
| `/about` | Founder pointer to [harsha-vardhan.pages.dev](https://harsha-vardhan.pages.dev) |
| `/contact` | Turnstile-protected contact form (sitekey `0x4AAAAAAEuwpaBEHtpcUX5g`). POST `/api/contact` verifies the token and stores the message in free D1 (`ass-db`) + KV (`ASS_KV`). No Email Sending / Workers Paid. |

Copy is taken from public GitHub descriptions/READMEs. No invented star counts or eval headlines. GitHub is [github.com/hharsha98](https://github.com/hharsha98) only — never github.com/agentic-systems-studio. Hugging Face is [huggingface.co/hharsha](https://huggingface.co/hharsha). Studio contact: `contact@agentic-systems-studio.com`. Do not put a personal Gmail address on public studio pages. Turnstile-protected form at `/contact` stores submissions in free D1 + KV — no Email Sending / Workers Paid.

Do **not** link third-party Vercel hosts for Agent Fleet. Agent Fleet has no confirmed public owned SaaS URL.

## Local

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

Guards (content, Turnstile, free-plan Worker, Astro build):

```bash
npm test
```

## Deploy (Cloudflare Workers)

Workers project: **agentic-systems-studio**. This repo is a **static Astro** site, not a Vite SPA.

Cloudflare Git must build **this studio branch** (`cursor/agentic-systems-studio-7fff`) or `main` after this PR is merged. Building old `main` (Vite + `public/_redirects` `/* /index.html 200`) fails deploy with:

```
Invalid _redirects configuration: Line 1: Infinite loop detected
(redirect stripping .html / /index) [code: 100324]
```

There is **no** `_redirects` file. Do not add a SPA fallback. `wrangler.jsonc` must stay at the repo root so Wrangler does not auto-scaffold a Vite SPA.

Workers Builds:

- **Production branch:** `cursor/agentic-systems-studio-7fff` (until this PR is merged)
- Install: `npm ci`
- Build command: `npm run build` (Astro → `dist/`)
- Deploy command: `npx wrangler deploy`

`wrangler.jsonc` serves `./dist` with `not_found_handling: "404-page"` and `html_handling: "auto-trailing-slash"` (Astro `build.format: 'file'`). The Worker script handles only `/api/contact` (`run_worker_first`).

### Contact webhook (free plan)

Reuse existing free bindings — do not create paid products:

- D1 `ass-db` (`a3495da0-abe8-4730-937f-e897346f0d2b`)
- KV `ASS_KV` (`a069d00779a44aa495ffece55e99728e`)
- Turnstile widget sitekey `0x4AAAAAAEuwpaBEHtpcUX5g` (public)

Apply the D1 migration, then put the **Turnstile secret** (never commit it):

```bash
npx wrangler d1 migrations apply ass-db --remote
npx wrangler secret put TURNSTILE_SECRET
```

Local test secret is in `.dev.vars.example` (Cloudflare's always-pass test key).
