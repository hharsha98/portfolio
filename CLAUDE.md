# Notes for coding agents

This branch is the Agentic Systems Studio hub (Astro 5, Tailwind v4, Cloudflare Worker `agentic-systems-studio`). `main` is a different site.

## Never name removed work

Never name, link, or describe any project removed from the catalog, any former employer or internship, or any academic research work. That covers site copy, docs, code comments, commit messages, PR titles and bodies, and chat summaries pasted into the repo. `scripts/assert-studio.mjs` checks the repo and the built site against SHA-256 hashes of those words. Add new hashes there; never write the plain words.

## Status honesty

- **Live**: only with a public URL the owner has verified on their own host list.
- **Download / local**: local-first tools that run from a clone or a release.
- **Building / coming soon**: hosted products without a verified public host. Link GitHub only.
- Never link third-party hosts (for example a `pages.dev` or `vercel.app` copy) as owned.

## Cloudflare and hosting

Free plan only: no payment card, no R2, no paid add-ons. Confirm before any DNS or MX change. Deploy only when asked. Do not touch the Contabo VPS from this repo.

## Before pushing

```bash
npm run check && npm run test && npm run build
```
