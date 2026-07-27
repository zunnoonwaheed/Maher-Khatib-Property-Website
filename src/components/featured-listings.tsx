import { ArrowUpRight, Bed, Bath, Square } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturedListings() {
  const { t } = useLanguage();

  const LISTINGS = [
    {
      price: "$1,485,000",
      address: "Longmeadow, MA",
      beds: 5,
      baths: 4,
      sqft: "4,820",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      tag: t('featuredListings.tagNewListing'),
    },
    {
      price: "$925,000",
      address: "Granby, MA",
      beds: 4,
      baths: 3,
      sqft: "3,240",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      tag: t('featuredListings.tagFeatured'),
    },
    {
      price: "$2,150,000",
      address: "Portland, ME",
      beds: 6,
      baths: 5,
      sqft: "5,410",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
      tag: t('featuredListings.tagCoastal'),
    },
    {
      price: "$675,000",
      address: "Springfield, MA",
      beds: 3,
      baths: 2,
      sqft: "2,180",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
      tag: t('featuredListings.tagDowntown'),
    },
  ];

  return (
    <section id="featured" className="relative bg-black py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t('featuredListings.eyebrow')}
              </span>
            </div>
            <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
              {t('featuredListings.title')} <span className="italic">{t('featuredListings.titleItalic')}</span>.
            </h2>
          </div>
          <a
            href="#search"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-gold hover:text-black hover:border-gold"
          >
            {t('featuredListings.viewAll')}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LISTINGS.map((l) => (
            <article
              key={l.address}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={l.image}
                  alt={l.address}
                  loading="lazy"
                  className="pointer-events-none h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-gold backdrop-blur-md">
                  {l.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="font-serif text-2xl text-white">{l.price}</div>
                <div className="mt-2 text-sm text-white/55">{l.address}</div>
                <div className="mt-auto flex items-center gap-4 pt-6 text-[0.7rem] uppercase tracking-[0.16em] text-white/55">
                  <span className="inline-flex items-center gap-1.5">
                    <Bed className="h-3.5 w-3.5" /> {l.beds}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bath className="h-3.5 w-3.5" /> {l.baths}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Square className="h-3.5 w-3.5" /> {l.sqft}
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
