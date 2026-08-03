import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, BedDouble, Bath, Square, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  badgeLabel,
  formatBaths,
  formatPrice,
  formatSqft,
  getPublishedListings,
  type Listing,
} from "@/lib/listings";

export const Route = createFileRoute("/listings")({
  loader: () => getPublishedListings(),
  head: () => ({
    meta: [
      { title: "Listings | Featured Homes & Investments — Maher Khatib" },
      {
        name: "description",
        content:
          "Featured homes, new builds, recent sales and investment opportunities across Massachusetts and Connecticut.",
      },
      { property: "og:title", content: "Listings — Maher Khatib" },
      {
        property: "og:description",
        content: "Featured homes, new builds and investment opportunities.",
      },
    ],
  }),
  component: ListingsPage,
});

// Compatibility shim: the current 7 listings drive category filter pills that
// predate the `listings` table (which has no category column, only a free-text
// `tag`). This maps today's exact tags to those categories so the pills keep
// working unchanged. A future listing with a new/unmapped tag will still show
// under "All", just not under a specific category pill.
const TAG_TO_CATEGORY: Record<string, FilterKey> = {
  Featured: "featured",
  "Just Listed": "featured",
  Available: "available",
  "New Build": "build",
  Investment: "commercial",
};

function categoryOf(listing: Listing): FilterKey | undefined {
  if (listing.status === "sold") return "sold";
  if (listing.tag && TAG_TO_CATEGORY[listing.tag]) return TAG_TO_CATEGORY[listing.tag];
  return undefined;
}

// The hero's editorial "story" paragraph and the secondary section's fixed
// sentence aren't part of the listings schema (no such column was
// specified). They're preserved here as static copy keyed to the specific
// address that currently occupies each slot, matching today's exact
// appearance — if the lead listing ever changes, this copy won't follow it.
const HERO_STORY: Record<string, string> = {
  "Ridgeview Estate":
    "A hilltop estate with unobstructed valley views, walnut millwork, and a private wooded acre.",
};
const SECONDARY_COPY = "Cedar cladding. Glass on three sides. Salt in the air.";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "available", label: "Available" },
  { key: "sold", label: "Recent Sales" },
  { key: "build", label: "New Builds" },
  { key: "commercial", label: "Investment" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function ListingsPage() {
  const { t } = useLanguage();
  const listings = Route.useLoaderData();
  const [filter, setFilter] = useState<FilterKey>("all");

  const hero = listings[0];
  const secondary = listings[1];
  const rest =
    filter === "all" ? listings.slice(2) : listings.filter((l) => categoryOf(l) === filter);

  if (!hero || !secondary) {
    return (
      <main className="relative bg-black">
        <SiteHeader transparentOnTop />
        <div className="flex min-h-screen items-center justify-center px-6">
          <p className="text-white/50">No listings available yet.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Cinematic featured listing hero */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          {hero.featured_image_url ? (
            <img
              src={hero.featured_image_url}
              alt={hero.address}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1700px] flex-col justify-end px-6 pb-24 lg:px-12 lg:pb-32">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Featured Listing
            </span>
          </div>
          <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[7rem]">
            {hero.address}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-white/80">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em]">
              <MapPin className="h-4 w-4 text-gold" /> {hero.city_state}
            </span>
            <span className="font-serif text-3xl text-white">{formatPrice(hero.price)}</span>
          </div>
          {HERO_STORY[hero.address] ? (
            <p className="mt-6 max-w-xl text-lg text-white/70">{HERO_STORY[hero.address]}</p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-white/70">
            <span className="rounded-full border border-white/20 px-5 py-3">
              {hero.beds} {t("common.bed")}
            </span>
            <span className="rounded-full border border-white/20 px-5 py-3">
              {formatBaths(hero.baths)} {t("common.bath")}
            </span>
            <span className="rounded-full border border-white/20 px-5 py-3">
              {formatSqft(hero.sqft)} {t("common.sqft")}
            </span>
          </div>
        </div>
      </section>

      {/* Editorial second feature — split screen */}
      <section className="grid grid-cols-1 border-b border-white/5 lg:grid-cols-12">
        <div className="relative min-h-[600px] overflow-hidden lg:col-span-7">
          {secondary.featured_image_url ? (
            <img
              src={secondary.featured_image_url}
              alt={secondary.address}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>
        <div className="flex items-start bg-black px-8 py-16 lg:col-span-5 lg:px-16">
          <div>
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {badgeLabel(secondary)}
            </div>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              {secondary.address}
            </h2>
            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-white/60">
              <MapPin className="h-4 w-4 text-gold" /> {secondary.city_state}
            </div>
            <p className="mt-8 text-lg leading-relaxed text-white/60">{SECONDARY_COPY}</p>
            <div className="mt-8 font-serif text-4xl text-white">
              {formatPrice(secondary.price)}
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-b border-white/5 bg-[#080808] py-8">
        <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <span className="flex-shrink-0 text-[0.65rem] uppercase tracking-[0.4em] text-white/40">
              Collection
            </span>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`flex-shrink-0 rounded-full border px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] transition-colors ${
                  filter === f.key
                    ? "border-gold bg-gold text-black"
                    : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial gallery — asymmetric */}
      <section className="px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {rest.map((l, i) => (
            <article
              key={l.id}
              className={`group relative overflow-hidden ${
                i % 5 === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/5 ${
                  i % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                {l.featured_image_url ? (
                  <img
                    src={l.featured_image_url}
                    alt={l.address}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/60 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                  {badgeLabel(l)}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <div className="font-serif text-3xl leading-tight text-white lg:text-4xl">
                    {l.address}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/70">
                    <MapPin className="h-3 w-3 text-gold" /> {l.city_state}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="font-serif text-2xl text-white">{formatPrice(l.price)}</div>
                <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.24em] text-white/50">
                  {l.beds > 0 ? (
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble className="h-3.5 w-3.5" /> {l.beds}
                    </span>
                  ) : null}
                  {l.baths > 0 ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Bath className="h-3.5 w-3.5" /> {formatBaths(l.baths)}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5">
                    <Square className="h-3.5 w-3.5" /> {formatSqft(l.sqft)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA cinematic */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[520px] w-full">
          <img
            src="/Get Your Offer/Private sale.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1400px] flex-col items-start justify-center px-6 py-24 lg:px-12">
            <h2 className="max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Looking for something <span className="italic">not yet listed</span>?
            </h2>
            <p className="mt-6 max-w-lg text-white/70">
              A private list of homes and land coming soon.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-1"
            >
              Private Buyer Inquiry <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
