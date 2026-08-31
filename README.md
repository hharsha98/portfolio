# Agentic Systems Studio

Personal studio site of **Hanumanthu Harsha Vardhan** — AI Engineer in Nuremberg building agentic systems for industrial and product use.

Production domain: [agentic-systems-studio.com](https://agentic-systems-studio.com) (bind later in Cloudflare).

## Stack

Astro static site, Tailwind v4, deployable to Cloudflare Pages or Workers static assets (`wrangler.jsonc`).

## Pages

| Route | Content |
|---|---|
| `/` | Positioning, featured work, paper, contact |
| `/projects/vibedeck` | Agentic dev environment |
| `/projects/agent-os` | Local-first Agent OS |
| `/projects/agentops-studio` | Agent-fleet ops platform |
| `/projects/agentgrid` | Multi-agent terminal grid |
| `/projects/retrievallab` | Advanced RAG + eval |
| `/projects/careeragent` | Multi-agent job-hunt product |
| `/projects/ai-rag` | Origin RAG system |
| `/research` | Conference paper |
| `/about` | Siemens, FAPS, IndiaMART, education |

Copy is taken from public GitHub descriptions/READMEs and the CV. No invented star counts or screenshots.

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

## Deploy

**Cloudflare Pages:** build command `npm run build`, output directory `dist`.

**Workers static assets:** `npx wrangler deploy` after a build. Attach `agentic-systems-studio.com` under Custom domains when the zone is ready — do not enable `routes.custom_domain` in `wrangler.jsonc` until the domain is in this account.
