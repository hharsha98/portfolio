# Agentic Systems Studio

Work studio for shipped agentic systems — Agent Fleet, VibeDeck, Agent OS, AgentOps Studio, RetrievalLab, CareerAgent, and related case studies.

This domain is **not** a LinkedIn-style personal profile. Profile lives on [LinkedIn](https://linkedin.com/in/hanumanthu1) and [Hugging Face](https://huggingface.co/hharsha) until a separate Pages site exists. Do not retarget DNS of agentic-systems-studio.com to a profile project.

Production domain: [agentic-systems-studio.com](https://agentic-systems-studio.com).

## Domain / DNS

The zone is on Cloudflare nameservers (`alec.ns.cloudflare.com`). Custom domains **agentic-systems-studio.com** and **www.agentic-systems-studio.com** are already attached to the Workers project `agentic-systems-studio`. Keep that project as the **work studio**. Do not add a CNAME by hand. `wrangler.jsonc` lists both hostnames with `custom_domain: true` so deploys do not drop www.

## Stack

Astro static site, Tailwind v4, Cloudflare Workers static assets (`wrangler.jsonc`).

## Pages

| Route | Content |
|---|---|
| `/` | Studio homepage: schematic, featured systems, paper band |
| `/projects/agentfleet` | Self-hostable multi-agent ops platform (public) |
| `/projects/vibedeck` | Agentic dev environment |
| `/projects/agent-os` | Local-first Agent OS (live gallery) |
| `/projects/agentops-studio` | Product + deploy scaffolding |
| `/projects/agentgrid` | Multi-agent terminal grid |
| `/projects/retrievallab` | Advanced RAG + eval |
| `/projects/careeragent` | Multi-agent job-hunt product |
| `/projects/ai-rag` | Origin RAG system |
| `/projects/revenue-ops` | RevenueOps control tower (Phase 0 scaffold) |
| `/research` | DVS EBL 2026 paper (DOI) |
| `/about` | Pointer to LinkedIn and Hugging Face — not a CV |

Copy is taken from public GitHub descriptions/READMEs. No invented star counts or GPA. GitHub is [github.com/hharsha98](https://github.com/hharsha98) only — never github.com/agentic-systems-studio. Hugging Face is [huggingface.co/hharsha](https://huggingface.co/hharsha). Studio contact: `rtvision7@gmail.com`.

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
