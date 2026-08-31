# Agentic Systems Studio

Personal studio site of **Hanumanthu Harsha Vardhan** — AI Engineer in Nuremberg building agentic systems for industrial and product use.

Production domain: [agentic-systems-studio.com](https://agentic-systems-studio.com).

## Domain / DNS

The zone is on Cloudflare nameservers (`alec.ns.cloudflare.com`). Custom domains **agentic-systems-studio.com** and **www.agentic-systems-studio.com** are already attached to the Workers project `agentic-systems-studio`. Do not add a CNAME by hand. `wrangler.jsonc` lists both hostnames with `custom_domain: true` so deploys do not drop www.

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

## Deploy (Cloudflare Workers)

Workers project: **agentic-systems-studio**. This repo is a **static Astro** site, not a Vite SPA.

Cloudflare Git must build **this studio branch** (`cursor/agentic-systems-studio-7fff`) or `main` after this PR merges. Building old `main` (Vite + `public/_redirects` `/* /index.html 200`) fails deploy with:

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

`wrangler.jsonc` serves `./dist` with `not_found_handling: "404-page"` and `html_handling: "auto-trailing-slash"` (Astro `build.format: 'file'`).
