import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { InstantEstimatePopup } from "../components/instant-estimate-popup";

function NotFoundComponent() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t('common.notFoundTitle')}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('common.notFoundDescription')}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('common.goHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useLanguage();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("common.errorTitle")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("common.errorDescription")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("common.tryAgain")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("common.goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maher Khatib Group | Massachusetts & Connecticut Real Estate" },
      {
        name: "description",
        content:
          "Real estate with Maher Khatib. Sell your home or get a cash offer across Massachusetts and Connecticut — proven results, local expertise.",
      },
      { name: "author", content: "Maher Khatib Group" },
      { property: "og:title", content: "Maher Khatib Group | Massachusetts & Connecticut Real Estate" },
      {
        property: "og:description",
        content:
          "Real estate with Maher Khatib. Sell your home or get a cash offer across Massachusetts and Connecticut — proven results, local expertise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Maher Khatib Group | Massachusetts & Connecticut Real Estate" },
      { name: "twitter:description", content: "Real estate with Maher Khatib. Sell your home or get a cash offer across Massachusetts and Connecticut — proven results, local expertise." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73482e22-bdd4-4978-ad3f-b8aaad684154/id-preview-f25d29f0--4ea5334d-6b39-4a6c-a64e-d204b9067231.lovable.app-1783703292815.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73482e22-bdd4-4978-ad3f-b8aaad684154/id-preview-f25d29f0--4ea5334d-6b39-4a6c-a64e-d204b9067231.lovable.app-1783703292815.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
    ],
    // The GHL chat widget loader is skipped entirely on /admin/* — it's an
    // internal tool, not the public-facing site, and shouldn't show lead-gen
    // chrome. Keyed off the matched route pathnames since this head() runs
    // for the whole tree, not just the leaf route.
    scripts: matches.some((m) => m.pathname.startsWith("/admin"))
      ? []
      : [
          {
            src: "https://widgets.leadconnectorhq.com/loader.js",
            "data-resources-url": "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
            "data-widget-id": "6a15f43cc10806bf1912b1c9",
            "data-source": "WEB_USER",
          },
        ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouter().state.location.pathname;

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Tag common section-level elements for scroll-reveal.
    const selectors = [
      "main section h1",
      "main section h2",
      "main section h3",
      "main section p",
      "main section blockquote",
      "main section > div > div",
      "main section img",
      "main section a[class*='rounded-']",
      "main section [data-reveal]",
    ].join(",");

    const raf = requestAnimationFrame(() => {
      const nodes = document.querySelectorAll<HTMLElement>(selectors);
      nodes.forEach((el) => {
        if (el.closest("header")) return;
        if (el.dataset.revealed === "true") return;
        // Skip absolutely-positioned overlays / video backgrounds
        const cls = el.className || "";
        if (typeof cls === "string" && /absolute inset-0/.test(cls)) return;
        el.classList.add("reveal");
        el.dataset.revealed = "true";
      });

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );

      document
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((el) => io.observe(el));
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        {pathname.startsWith("/admin") ? null : <InstantEstimatePopup />}
      </LanguageProvider>
    </QueryClientProvider>
  );
}

