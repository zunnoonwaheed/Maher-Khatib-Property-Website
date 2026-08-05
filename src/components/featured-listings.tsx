import { ArrowUpRight, Bed, Bath, Square } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  formatBaths,
  formatPrice,
  formatSqft,
  localizedCityState,
  statusLabel,
  type Listing,
} from "@/lib/listings";

export function FeaturedListings({ listings }: { listings: Listing[] }) {
  const { t, language } = useLanguage();

  return (
    <section id="featured" className="relative bg-black py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t("featuredListings.eyebrow")}
              </span>
            </div>
            <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
              {t("featuredListings.title")}{" "}
              <span className="italic">{t("featuredListings.titleItalic")}</span>.
            </h2>
          </div>
          <a
            href="#search"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-gold hover:text-black hover:border-gold"
          >
            {t("featuredListings.viewAll")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((l) => (
            <article
              key={l.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {l.featured_image_url ? (
                  <img
                    src={l.featured_image_url}
                    alt={localizedCityState(l, language)}
                    loading="lazy"
                    className="pointer-events-none h-full w-full object-cover"
                  />
                ) : null}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-gold backdrop-blur-md">
                  {statusLabel(l, language)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="font-serif text-2xl text-white">{formatPrice(l.price)}</div>
                <div className="mt-2 text-sm text-white/55">{localizedCityState(l, language)}</div>
                <div className="mt-auto flex items-center gap-4 pt-6 text-[0.7rem] uppercase tracking-[0.16em] text-white/55">
                  <span className="inline-flex items-center gap-1.5">
                    <Bed className="h-3.5 w-3.5" /> {l.beds}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bath className="h-3.5 w-3.5" /> {formatBaths(l.baths)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Square className="h-3.5 w-3.5" /> {formatSqft(l.sqft)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
