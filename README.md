# Hanumanthu Harsha Vardhan — recruiter profile

Light, recruiter-facing personal page (LinkedIn + German Bewerbung). This branch is **only** the profile. It is not Agentic Systems Studio.

- Live (Cloudflare Pages): `https://harsha-vardhan.pages.dev`
- Work studio (separate): [agentic-systems-studio.com](https://agentic-systems-studio.com)
- GitHub: [github.com/hharsha98](https://github.com/hharsha98)

## Run locally

```bash
npm install
npm run dev
```

## Build & deploy

Static Vite export. No Node at runtime. Wrangler project name is `harsha-vardhan`. Never deploy this branch as Worker `agentic-systems-studio`, and do not attach `agentic-systems-studio.com`.

```bash
npm test          # content guards + production build
npm run deploy    # wrangler pages deploy → project harsha-vardhan
```

`npm run deploy` needs `CLOUDFLARE_API_TOKEN` with **Cloudflare Pages** edit on the same account that already has Worker `agentic-systems-studio`.

### If Git integration still needs a dashboard click

1. [Cloudflare Dashboard → Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. **Create** → **Pages** → **Connect to Git**
3. GitHub repo `hharsha98/portfolio`
4. **Project name:** `harsha-vardhan` (not `agentic-systems-studio`)
5. **Production branch:** `cursor/harsha-profile-pages-4f23` (or `main` after merge, if this is the production profile)
6. **Build command:** `npm run build`
7. **Build output directory:** `dist`
8. Do **not** add a custom domain on `agentic-systems-studio.com`
