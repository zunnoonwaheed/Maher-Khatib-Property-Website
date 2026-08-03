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

**Environment variables**: `.env` holds `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` and `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID`. Neither is referenced anywhere in `src/` — they're consumed by Lovable's own connector tooling (injected through `@lovable.dev/vite-tanstack-config`'s `VITE_*` env injection), not by application code. `src/components/service-areas.tsx`'s map uses `react-simple-maps` (client-side SVG), unrelated to the Google Maps key.

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
