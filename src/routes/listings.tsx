import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, BedDouble, Bath, Square, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/listings")({
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

type Listing = {
  price: string;
  address: string;
  city: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  tag: string;
  category: "featured" | "available" | "sold" | "build" | "commercial";
  story?: string;
};

const LISTINGS: Listing[] = [
  {
    price: "$1,850,000",
    address: "48 Ridgeview Lane",
    city: "Longmeadow, MA",
    beds: 5,
    baths: 4,
    sqft: "5,200",
    image:
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=2000",
    tag: "Featured",
    category: "featured",
    story:
      "A hilltop estate with unobstructed valley views, walnut millwork, and a private wooded acre.",
  },
  {
    price: "$925,000",
    address: "230 Amherst Rd",
    city: "Granby, MA",
    beds: 4,
    baths: 3,
    sqft: "3,100",
    image:
      "https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=2000",
    tag: "Just Listed",
    category: "featured",
  },
  {
    price: "$675,000",
    address: "9 Elm Court",
    city: "Springfield, MA",
    beds: 3,
    baths: 2,
    sqft: "2,400",
    image:
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tag: "Available",
    category: "available",
  },
  {
    price: "$540,000",
    address: "78 Pine Ridge",
    city: "Wilbraham, MA",
    beds: 3,
    baths: 2,
    sqft: "2,100",
    image:
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tag: "Available",
    category: "available",
  },
  {
    price: "Sold · $1,120,000",
    address: "14 Sunset Ave",
    city: "Longmeadow, MA",
    beds: 4,
    baths: 3,
    sqft: "3,400",
    image:
      "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tag: "Recent Sale",
    category: "sold",
  },
  {
    price: "From $980,000",
    address: "The Granby Reserve",
    city: "Granby, MA",
    beds: 4,
    baths: 3,
    sqft: "3,200",
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tag: "New Build",
    category: "build",
  },
  {
    price: "$2,650,000",
    address: "Mixed-Use Development",
    city: "Springfield, MA",
    beds: 0,
    baths: 0,
    sqft: "18,000",
    image:
      "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tag: "Investment",
    category: "commercial",
  },
];

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
  const [filter, setFilter] = useState<FilterKey>("all");
  const hero = LISTINGS[0];
  const secondary = LISTINGS[1];
  const rest =
    filter === "all"
      ? LISTINGS.slice(2)
      : LISTINGS.filter((l) => l.category === filter);

  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Cinematic featured listing hero */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src={hero.image}
            alt={hero.address}
            className="h-full w-full object-cover"
          />
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
              <MapPin className="h-4 w-4 text-gold" /> {hero.city}
            </span>
            <span className="font-serif text-3xl text-white">{hero.price}</span>
          </div>
          {hero.story && <p className="mt-6 max-w-xl text-lg text-white/70">{hero.story}</p>}
          <div className="mt-10 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-white/70">
            <span className="rounded-full border border-white/20 px-5 py-3">
              {hero.beds} {t('common.bed')}
            </span>
            <span className="rounded-full border border-white/20 px-5 py-3">
              {hero.baths} {t('common.bath')}
            </span>
            <span className="rounded-full border border-white/20 px-5 py-3">
              {hero.sqft} {t('common.sqft')}
            </span>
          </div>
        </div>
      </section>

      {/* Editorial second feature — split screen */}
      <section className="grid grid-cols-1 border-b border-white/5 lg:grid-cols-12">
        <div className="relative min-h-[600px] overflow-hidden lg:col-span-7">
          <img
            src={secondary.image}
            alt={secondary.address}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>
        <div className="flex items-center bg-black px-8 py-24 lg:col-span-5 lg:px-16">
          <div>
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {secondary.tag}
            </div>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              {secondary.address}
            </h2>
            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-white/60">
              <MapPin className="h-4 w-4 text-gold" /> {secondary.city}
            </div>
            <p className="mt-8 text-lg leading-relaxed text-white/60">
              Cedar cladding. Glass on three sides. Salt in the air.
            </p>
            <div className="mt-8 font-serif text-4xl text-white">
              {secondary.price}
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-b border-white/5 bg-[#080808] py-8">
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center gap-3 px-6 lg:px-12">
          <span className="mr-4 text-[0.65rem] uppercase tracking-[0.4em] text-white/40">
            Collection
          </span>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] transition-colors ${
                filter === f.key
                  ? "border-gold bg-gold text-black"
                  : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Editorial gallery — asymmetric */}
      <section className="px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {rest.map((l, i) => (
            <article
              key={l.address}
              className={`group relative overflow-hidden ${
                i % 5 === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/5 ${
                  i % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={l.image}
                  alt={l.address}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/60 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                  {l.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <div className="font-serif text-3xl leading-tight text-white lg:text-4xl">
                    {l.address}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/70">
                    <MapPin className="h-3 w-3 text-gold" /> {l.city}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="font-serif text-2xl text-white">{l.price}</div>
                <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.24em] text-white/50">
                  {l.beds > 0 ? (
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble className="h-3.5 w-3.5" /> {l.beds}
                    </span>
                  ) : null}
                  {l.baths > 0 ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Bath className="h-3.5 w-3.5" /> {l.baths}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5">
                    <Square className="h-3.5 w-3.5" /> {l.sqft}
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
            src="https://images.pexels.com/photos/1029611/pexels-photo-1029611.jpeg?auto=compress&cs=tinysrgb&w=2400"
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
