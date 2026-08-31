# Agentic Systems Studio

Personal studio site of **Hanumanthu Harsha Vardhan** — AI Engineer in Nuremberg building agentic systems for industrial and product use.

Production domain: [agentic-systems-studio.com](https://agentic-systems-studio.com).

## Domain / DNS

The zone is already delegated to Cloudflare nameservers (`alec.ns.cloudflare.com`). Apex **A / AAAA records are empty on purpose** — do not add a CNAME first.

After this site is built and deployed, attach the **exact hostname** `agentic-systems-studio.com` as a Cloudflare Pages or Workers **Custom Domain**. Cloudflare then creates the DNS records and issues the certificate. `wrangler.jsonc` already lists that hostname with `custom_domain: true` for the Workers path.

## Stack

Astro static site, Tailwind v4, deployable to Cloudflare Pages or Workers static assets (`wrangler.jsonc`).

## Pages

| Route | Content |
|---|---|
| `/` | Positioning, featured work, paper, contact |
| `/projects/vibedeck` | Agentic dev environment |
| `/projects/agent-os` | Local-first Agent OS |
| `/projects/agentops-studio` | Product page for Agent Fleet (fleet source is not public) |
| `/projects/agentgrid` | Multi-agent terminal grid |
| `/projects/retrievallab` | Advanced RAG + eval |
| `/projects/careeragent` | Multi-agent job-hunt product |
| `/projects/ai-rag` | Origin RAG system |
| `/research` | DVS EBL 2026 paper (DOI) |
| `/about` | Siemens, FAPS, IndiaMART, education |

Copy is taken from public GitHub descriptions/READMEs and the CV. No invented star counts or screenshots. The GitHub org [agentic-systems-studio](https://github.com/agentic-systems-studio) holds older experiments — footer only, not homepage heroes.

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

**Cloudflare Pages:** build command `npm run build`, output directory `dist`. Then Custom domains → `agentic-systems-studio.com`.

**Workers static assets:** `npx wrangler deploy` after a build. The Wrangler `routes` entry with `custom_domain: true` attaches the apex hostname and fills the empty A/AAAA records.
