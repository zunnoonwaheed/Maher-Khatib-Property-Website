# Cloudflare Workers Deployment Guide

This project deploys to Cloudflare as a native **Worker** (not Cloudflare Pages — no Pages
project exists for this repo). Nitro's `cloudflare_module` preset builds an SSR Worker with a
static-assets binding.

**Primary path: git-connected Workers Build.** The Worker `maher-khatib` (Cloudflare account
`Realtorsmbc`) is connected to this GitHub repo's `main` branch via Cloudflare's dashboard Git
integration ("Workers Builds") — Cloudflare checks out the repo and runs the build itself, no
local `wrangler deploy` needed. Check **Settings → Build** on the Worker to see/change whether
new pushes to `main` trigger a build automatically or require a manual "Deploy" from the
dashboard.

A manual `wrangler deploy` from a local machine is still possible as a fallback (see
[Manual deploy](#manual-deploy-fallback) below) but is no longer the primary flow — an earlier
version of this doc described manual deploy to a *different* Cloudflare account/Worker name
(`zunnoonwaheed` / `maherkhatib`, no hyphen); that path is superseded.

## Prerequisites

- GitHub repository: https://github.com/zunnoonwaheed/Maher-Khatib-Property-Website
- Cloudflare account access to the `maher-khatib` Worker (Workers & Pages → `maher-khatib`)
- Build-time environment variables configured **in the Cloudflare dashboard** (Settings →
  Variables and Secrets, or the Build-specific variables section — check both, Cloudflare's UI
  has moved this before): `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Vite bakes these into
  the client/SSR bundle **at build time**; they are not read as Worker runtime vars. Locally
  they live in `.env.local`, which is gitignored (`*.local`) and never reaches Cloudflare's
  build — you must set them separately in the dashboard, or every git-connected build will
  produce a Worker that 500s on nearly every route (see Troubleshooting).

## Manual deploy fallback

```bash
npm run build
npx wrangler deploy --config .output/server/wrangler.json --name maher-khatib
```

The explicit `--name` is required — Nitro auto-generates `.output/server/wrangler.json` with a
different, unused name each build, and deploying without the override creates a brand-new, wrong
Worker instead of updating the live one. This also requires `wrangler` to be authenticated
against the `Realtorsmbc` Cloudflare account and `.env.local` to be present with correct values
(see Prerequisites) — a manual build reads them from your local file, unlike the git-connected
build.

Live URL: **https://maher-khatib.realtorsmbc.workers.dev** (no custom domain attached yet).

## What NOT to do

- **Don't run `fix-assets.js`.** It renames the `ASSETS` binding to `STATIC_ASSETS`, which was
  written for a Cloudflare *Pages* project where `ASSETS` is a reserved name. This project is a
  plain Worker, where `ASSETS` is the correct, expected binding name — the generated
  `.output/server/index.mjs` hardcodes `env.ASSETS` internally, so renaming the binding breaks
  static asset serving. It isn't wired into any npm script; keep it that way.
- **Don't add a Cloudflare Pages project for this repo.** There isn't one, and the app's asset
  binding / Worker-only APIs (`env.ASSETS.fetch`) aren't Pages-Functions compatible as configured.
- **Don't assume `.env.local` reaches the git-connected build.** It's gitignored by design (it
  holds a Supabase key). Any change to its values must be mirrored into the Cloudflare dashboard's
  build variables, or the next dashboard-triggered build will regress even if a manual build
  worked locally.

## Verifying a deploy

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://maher-khatib.realtorsmbc.workers.dev/
curl -s -o /dev/null -w "%{http_code}\n" https://maher-khatib.realtorsmbc.workers.dev/blog
curl -s -o /dev/null -w "%{http_code}\n" https://maher-khatib.realtorsmbc.workers.dev/listings
curl -s -o /dev/null -w "%{http_code}\n" https://maher-khatib.realtorsmbc.workers.dev/admin/login
```

All four should return `200`. Note that the first requests immediately after a deploy can
transiently 500 for a few seconds while the new Worker version propagates across Cloudflare's
edge — re-check a moment later before concluding something is actually broken.

## Troubleshooting

### Site returns 500 with a generic "This page didn't load" message
That's this app's own SSR-crash fallback (`src/lib/error-page.ts`), not a raw Cloudflare error.
The most common cause is `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` being missing or wrong at
build time — `src/lib/supabase.ts` throws on module init if either is unset, which crashes SSR for
nearly every route. For the git-connected build, this means the values are missing from the
Cloudflare dashboard's build variables (not just `.env.local`, which the dashboard build never
sees). Set them there and trigger a new build.

### `wrangler deploy` creates a new Worker instead of updating the live one
You omitted `--name maher-khatib`, or you're authenticated against the wrong Cloudflare account.
Nitro's auto-generated name in `.output/server/wrangler.json` doesn't match the real Worker;
always pass the explicit name (see Manual deploy fallback above), or hand-edit the `name` field in
that generated file before deploying.

### Vercel
`vercel.json` at the repo root also configures a Vercel deployment (`npm install --legacy-peer-deps`,
`npm run build`, output `.output/public`) as an alternative target — unrelated to the Cloudflare
Worker deploy described here.
