# Agentic Systems Studio

Product studio for AI systems — Agent Fleet, Agent OS, Vibespace, RetrievalLab, and related tools.

This domain is **not** a personal CV. The founder site is [harsha-vardhan.pages.dev](https://harsha-vardhan.pages.dev). Do not retarget DNS of agentic-systems-studio.com to that project.

Production domain: [agentic-systems-studio.com](https://agentic-systems-studio.com).

## Domain / DNS

The zone is on Cloudflare nameservers (`alec.ns.cloudflare.com`). Custom domains **agentic-systems-studio.com** and **www.agentic-systems-studio.com** are already attached to the Workers project `agentic-systems-studio`. Keep that project as the **product studio**. Do not add a CNAME by hand. `wrangler.jsonc` lists both hostnames with `custom_domain: true` so deploys do not drop www.

Future product hosts (copy/config only — **planned names, not live URLs**. Do **not** attach Cloudflare DNS from this repo):

| Host | Product | Primary CTA today |
|---|---|---|
| `fleet.agentic-systems-studio.com` | Agent Fleet | [Live demo / Contabo](https://agentfleet.169.58.185.43.sslip.io/) — studio hostname is planned only, not attached |
| `os.agentic-systems-studio.com` | Agent OS | [Clone / run locally](https://github.com/hharsha98/agent-os) on `127.0.0.1:8090` — studio hostname is planned only, not attached. No public Contabo demo. |
| `vibespace.agentic-systems-studio.com` | Vibespace | [Download](https://github.com/hharsha98/Vibespace/releases/latest) |
| `rag.agentic-systems-studio.com` | RetrievalLab | [Live lab](https://retrievallab.pages.dev) |

## Stack

Astro static site, Tailwind v4, Cloudflare Workers static assets (`wrangler.jsonc`).

## Pages

| Route | Content |
|---|---|
| `/` | Product studio home: pitch, featured products, catalog, coming hosts |
| `/products` | Full product catalog with Live / Download / local / Gallery / early / Building badges |
| `/products/agentfleet` | Live — [Contabo/sslip demo](https://agentfleet.169.58.185.43.sslip.io/) · [GitHub](https://github.com/hharsha98/agentfleet) · [self-host docs](https://github.com/hharsha98/agentfleet/blob/main/docs/DEPLOY.md) |
| `/products/agent-os` | Download / local — [clone](https://github.com/hharsha98/agent-os) (`127.0.0.1:8090`) · [static gallery](https://hharsha98.github.io/agent-os/) · [GitHub](https://github.com/hharsha98/agent-os) |
| `/products/vibespace` | Download / local — [GitHub Releases](https://github.com/hharsha98/Vibespace/releases/latest) |
| `/products/retrievallab` | Live — [retrievallab.pages.dev](https://retrievallab.pages.dev) |
| `/products/careeragent` | Live — [careeragent-ceq.pages.dev](https://careeragent-ceq.pages.dev) |
| `/products/agentgrid` | Download / local — [clone](https://github.com/hharsha98/agentgrid) (127.0.0.1 or SSH tunnel; no public URL) |
| `/products/agentops-studio` | Live — [public demo](https://agentops.169.58.185.43.sslip.io/) · [GitHub](https://github.com/hharsha98/agentops-studio) |
| `/products/revenue-ops` | Live — [public demo](https://revenueops.169.58.185.43.sslip.io/) · [GitHub](https://github.com/hharsha98/06-revenue-ops-agent-control-tower) |
| `/demos` | Live / gallery / download surfaces only |
| `/about` | Founder pointer to [harsha-vardhan.pages.dev](https://harsha-vardhan.pages.dev) |
| `/contact` | Turnstile-protected contact form (sitekey `0x4AAAAAAEuwpaBEHtpcUX5g`). POST `/api/contact` verifies the token and stores the message in free D1 (`ass-db`) + KV (`ASS_KV`). No Email Sending / Workers Paid. |

Copy is taken from public GitHub descriptions/READMEs. No invented star counts or eval headlines. GitHub is [github.com/hharsha98](https://github.com/hharsha98) only — never github.com/agentic-systems-studio. Hugging Face is [huggingface.co/hharsha](https://huggingface.co/hharsha). Studio contact: `contact@agentic-systems-studio.com`. Do not put a personal Gmail address on public studio pages. Turnstile-protected form at `/contact` stores submissions in free D1 + KV — no Email Sending / Workers Paid.

Do **not** link third-party Vercel or Pages hosts for Agent Fleet. The owned live demo is the Contabo/sslip host. Do **not** attach `fleet.agentic-systems-studio.com` or `os.agentic-systems-studio.com` in this repo. Agent OS is Download / local, like Agent Grid: clone and run on `127.0.0.1:8090`. Optional private self-host for the owner. Not a hosted multi-tenant SaaS. No public Contabo demo. The github.io page is a static gallery only. Do not re-add a public sslip URL for Agent OS. See `docs/AGENT-OS-LOCAL.md`. AgentOps Studio and Revenue Ops are Live on their verified Contabo/sslip hosts (`agentops` and `revenueops` on `169.58.185.43.sslip.io`). Agent Grid stays Download / local: the PTY API is `127.0.0.1` only (SSH tunnel for a private remote). Do **not** give Agent Grid a public sslip URL. Delisted routes are absent from the catalog and are not linked; unknown paths 404.

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
