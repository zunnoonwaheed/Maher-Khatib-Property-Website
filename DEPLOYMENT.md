# Cloudflare Workers Deployment Guide

This project deploys to Cloudflare as a native **Worker** (not Cloudflare Pages — no Pages
project exists for this repo). Nitro's `cloudflare_module` preset builds an SSR Worker with a
static-assets binding; there is no git-connected CI/CD, so every deploy is a manual
`wrangler deploy` run from a local machine (or a CI job you set up yourself using the same
command).

## Prerequisites

- GitHub repository: https://github.com/zunnoonwaheed/Maher-Khatib-Property-Website
- A Cloudflare account with access to the `maherkhatib` Worker (Workers & Pages → Overview)
- `.env.local` present locally with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` — Vite bakes
  these into the client/SSR bundle **at build time**; they are not read as Cloudflare runtime
  vars/secrets. If they're missing or wrong when you run `npm run build`, every route that
  touches `src/lib/supabase.ts` (which is most of the site) will throw at SSR render time and the
  Worker will serve `src/lib/error-page.ts`'s static fallback instead of the real page.

## Deploy

```bash
npm run build
npx wrangler deploy --config .output/server/wrangler.json --name maherkhatib
```

The `--name maherkhatib` is required. Nitro auto-generates `.output/server/wrangler.json` with a
different, unused name (`zunnoonwaheed-maher-khatib-property-website`) each build — deploying
without the override creates a brand-new, wrong Worker instead of updating the live site.

Live URL: **https://maherkhatib.zunnoonwaheed.workers.dev** (no custom domain attached yet).

## What NOT to do

- **Don't run `fix-assets.js`.** It renames the `ASSETS` binding to `STATIC_ASSETS`, which was
  written for a Cloudflare *Pages* project where `ASSETS` is a reserved name. This project is a
  plain Worker, where `ASSETS` is the correct, expected binding name — the generated
  `.output/server/index.mjs` hardcodes `env.ASSETS` internally, so renaming the binding breaks
  static asset serving. It isn't wired into any npm script; keep it that way.
- **Don't add a Cloudflare Pages project for this repo.** There isn't one, and the app's asset
  binding / Worker-only APIs (`env.ASSETS.fetch`) aren't Pages-Functions compatible as configured.
- **Don't expect a git push to auto-deploy.** Pushing to `main` only updates GitHub (and syncs
  back into Lovable, per `AGENTS.md`) — it does not trigger a Cloudflare deploy. Run the deploy
  command above after every push you want live.

## Verifying a deploy

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://maherkhatib.zunnoonwaheed.workers.dev/
curl -s -o /dev/null -w "%{http_code}\n" https://maherkhatib.zunnoonwaheed.workers.dev/blog
curl -s -o /dev/null -w "%{http_code}\n" https://maherkhatib.zunnoonwaheed.workers.dev/listings
curl -s -o /dev/null -w "%{http_code}\n" https://maherkhatib.zunnoonwaheed.workers.dev/admin/login
```

All four should return `200`. Note that the first requests immediately after a deploy can
transiently 500 for a few seconds while the new Worker version propagates across Cloudflare's
edge — re-check a moment later before concluding something is actually broken.

## Troubleshooting

### Site returns 500 with a generic "This page didn't load" message
That's this app's own SSR-crash fallback (`src/lib/error-page.ts`), not a Cloudflare error. The
most common cause is `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` being missing or wrong in
`.env.local` at the time you ran `npm run build` — `src/lib/supabase.ts` throws on module init if
either is unset, which crashes SSR for nearly every route. Rebuild with correct values and
redeploy.

### `wrangler deploy` creates a new Worker instead of updating the live one
You omitted `--name maherkhatib`. Nitro's auto-generated name in
`.output/server/wrangler.json` doesn't match the real Worker; always pass the explicit name (see
Deploy above), or hand-edit the `name` field in that generated file before deploying.

### Vercel
`vercel.json` at the repo root also configures a Vercel deployment (`npm install --legacy-peer-deps`,
`npm run build`, output `.output/public`) as an alternative target — unrelated to the Cloudflare
Worker deploy described here.
