# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/lead-gen website for the Maher Khatib Group (Massachusetts & Connecticut real estate). This is a **Lovable** project (see `AGENTS.md`) — commits pushed to the connected branch sync back into the Lovable editor, so never rewrite published history (no force-push, rebase, or amend on commits already pushed) and keep the branch buildable.

## Commands

```bash
npm run dev        # vite dev server
npm run build      # production build -> .output/public (Nitro/Cloudflare target)
npm run build:dev  # build in development mode
npm run preview    # preview the production build locally
npm run lint       # eslint .
npm run format     # prettier --write .
```

There is no test suite/command configured in this repo.

**Environment variables**: `.env` holds `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` and `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID`. Neither is referenced anywhere in `src/` — they're consumed by Lovable's own connector tooling (injected through `@lovable.dev/vite-tanstack-config`'s `VITE_*` env injection), not by application code. `src/components/service-areas.tsx`'s map uses `react-simple-maps` (client-side SVG), unrelated to the Google Maps key. `.env.local` holds the Supabase credentials the admin/blog/listings feature needs: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (used client-side, see `src/lib/supabase.ts`), and `SUPABASE_SERVICE_ROLE_KEY` (server-only, see below).

Package manager: `bun.lock` is present (bunfig.toml sets a 24h supply-chain guard via `minimumReleaseAge`), but `package-lock.json` also exists and `vercel.json` installs with `npm install --legacy-peer-deps`. Match whichever lockfile you're already touching; don't add a third. `bunfig.toml`'s `minimumReleaseAgeExcludes` list (currently just `@lovable.dev/*` packages) bypasses that guard per-package — confirm with the user before adding an entry.

## Architecture

- **Framework**: TanStack Start (React 19 + TanStack Router, file-based routes) on Vite, built with Nitro targeting Cloudflare. Deployed to Cloudflare Pages (see `DEPLOYMENT.md`) and configured for Vercel too (`vercel.json`).
- **Vite config** (`vite.config.ts`) is a thin wrapper around `@lovable.dev/vite-tanstack-config`, which already bundles TanStack devtools, `tanstackStart`, `viteReact`, `tailwindcss`, `tsConfigPaths`, Nitro, `VITE_*` env injection, the `@` path alias, and error-logging/sandbox-detection plugins. Do not re-add any of those plugins manually — the comment at the top of the file explains this breaks the app with duplicate plugins. The only customization here redirects TanStack Start's server entry to `src/server.ts`.
- **Routing**: `src/routes/` is TanStack Router's file-based routing; `src/routeTree.gen.ts` is generated — don't hand-edit it. `src/routes/__root.tsx` defines the HTML shell (`RootShell`), global `<head>` (meta/OG tags, Google Fonts, the Go High Level chat widget loader script), the 404/error boundary components, and wraps every route in `QueryClientProvider` + `LanguageProvider`. It also globally tags section-level elements (`main section h1/h2/h3/p/...`) with a `reveal`/`is-visible` scroll-reveal animation via `IntersectionObserver` — new page sections get this behavior automatically as long as they live under `main section`.
- **SSR error handling** is layered and deliberate, not accidental duplication:
  - `src/lib/error-capture.ts` installs global `error`/`unhandledrejection` listeners to stash the last real error (5s TTL) because h3 sometimes swallows in-handler throws into an opaque `{"unhandled":true,"message":"HTTPError"}` JSON 500.
  - `src/start.ts` wraps server requests in middleware that catches thrown errors and renders `src/lib/error-page.ts`'s static HTML instead of letting them leak.
  - `src/server.ts` is the actual Cloudflare fetch entry: it lazy-loads `@tanstack/react-start/server-entry`, and `normalizeCatastrophicSsrResponse` detects the h3-swallowed-error shape on any 5xx JSON response and swaps in the same static error page, pulling the real error out of `error-capture.ts` for logging.
  - `src/lib/lovable-error-reporting.ts` forwards client-side errors to `window.__lovableEvents.captureException` (Lovable's own error tracking) — used from the root error boundary.
  - When touching error handling, keep all four pieces consistent rather than adding a fifth mechanism.
- **i18n**: `src/contexts/LanguageContext.tsx` is a hand-rolled context (no i18n library) with `en`/`es` dictionaries keyed by dotted paths (e.g. `t('common.notFoundTitle')`), persisted to `localStorage`. Missing keys fall back to returning the key itself. All new user-facing copy should go through `t(...)` and be added to both language blocks in this file.
- **UI components**: `src/components/ui/` is shadcn/ui (`components.json`, style "new-york", Tailwind v4, `src/styles.css` as the CSS entry, `@/*` aliases per `tsconfig.json`). Page sections live directly in `src/components/` (e.g. `about-maher.tsx`, `featured-listings.tsx`, `stats-section.tsx`) and are composed into route files under `src/routes/`.
- **Styling/theme**: Tailwind v4 CSS-based config in `src/styles.css` using `@theme`/`@theme inline`. Brand fonts are `--font-serif: "Cormorant Garamond"` and `--font-sans: "Plus Jakarta Sans"`; the accent color is `--color-gold` (oklch), used throughout via utilities like `gold-underline`, `gold-pulse`, `hairline-gold`. There's also a manual override block near the end of the file to restyle the third-party Go High Level chat widget to match the gold theme — check it if the chat widget's appearance needs to change.
- **Lead capture**: `LeadForm` (`src/components/lead-form.tsx`) and `InstantEstimatePopup` (`src/components/instant-estimate-popup.tsx`, mounted globally in `__root.tsx`) are the primary conversion UI. Forms currently only manage local `submitted` state on the client — they are not wired to a backend/CRM endpoint (lead capture goes through the Go High Level chat widget instead).
- **Sitemap**: `src/routes/sitemap[.]xml.ts` is a server route (`GET` handler) generating XML on the fly; `BASE_URL` is still a placeholder empty string — fill it in once a production domain is finalized.

### Blog & listings (Supabase)

Blog posts and property listings are backed by Supabase, with a client-rendered `/admin` panel for managing both. Everything else on the site is static/marketing content — this is the one part of the app with real backend state.

- **Schema & migrations**: `supabase/migrations/` defines `blog_posts` and `listings` tables plus a public `blog-images` storage bucket. Both tables use RLS with the same shape: `anon` can `select` only published/public rows; any `authenticated` Supabase Auth user gets full read/write. **There is no roles table** — auth is single-tier, so any account that can sign in has full CRUD over posts and listings. Treat new Supabase Auth users as full admins.
- **Data access**: `src/lib/blog.ts` and `src/lib/listings.ts` are the typed query layers (public reads: published-only, ordered) used by both the public pages and the admin panel. `src/lib/supabase.ts` exports the anon-key client — safe for browser and SSR use; RLS decides what it can actually do, and it inherits the signed-in user's `authenticated` grants after login.
- **Server-only client**: `src/lib/supabase-admin.server.ts` creates a service-role client that bypasses RLS. The `.server.ts` suffix is load-bearing: `eslint.config.js`'s `no-restricted-imports` rule (aimed at accidental use of Next's `server-only` package) is the enforcement mechanism TanStack Start relies on to keep server-only modules out of the client bundle — name any new server-secret module `*.server.ts` the same way. Nothing currently imports this client; it's reserved for future work that must bypass RLS.
- **Admin auth**: `src/lib/use-admin-session.ts` (`useAdminSession`) wraps `supabase.auth` session state; `src/components/admin/admin-guard.tsx` (`AdminGuard`) redirects to `/admin/login` when unauthenticated and wraps every `admin.*` route's component. There is no SSR/cookie-based auth check — protection is entirely client-side, which is an accepted tradeoff for a single-admin internal tool, not an oversight.
- **Admin routes**: `src/routes/admin.index.tsx` (post list), `admin.posts.new.tsx` / `admin.posts.$id.edit.tsx`, `admin.listings.index.tsx`, `admin.listings.new.tsx` / `admin.listings.$id.edit.tsx`, and `admin.login.tsx`. Shared admin UI (`AdminNav`, `AdminGuard`, `post-editor-form.tsx`, `listing-editor-form.tsx`, `rich-text-editor.tsx` built on Tiptap) lives in `src/components/admin/`.
- Public-facing consumers: `src/routes/blog.index.tsx` / `blog.$slug.tsx` and `src/components/featured-listings.tsx` / `src/routes/listings.tsx` read through the same `src/lib/blog.ts` / `listings.ts` functions as the admin panel.
