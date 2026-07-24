import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STATES = ["Massachusetts", "Connecticut"];

const AREA_CARDS: Record<string, { id: string; name: string; image: string }[]> = {
  Massachusetts: [
    { id: "ma-1", name: "Springfield, MA", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80" },
    { id: "ma-2", name: "Granby, MA", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80" },
    { id: "ma-3", name: "Longmeadow, MA", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80" },
    { id: "ma-4", name: "Westfield, MA", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80" },
    { id: "ma-5", name: "Chicopee, MA", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
  ],
  Connecticut: [
    { id: "ct-1", name: "Hartford, CT", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80" },
    { id: "ct-2", name: "New Haven, CT", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
    { id: "ct-3", name: "Stamford, CT", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80" },
    { id: "ct-4", name: "Greenwich, CT", image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=80" },
  ],
};

export function FindYourPlace() {
  const { t } = useLanguage();
  const [active, setActive] = useState("Massachusetts");
  const scrollRef = useRef<HTMLDivElement>(null);
  const cards = AREA_CARDS[active] || [];

  return (
    <section id="find-your-place" className="relative overflow-hidden bg-black py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('findYourPlace.eyebrow')}
            </span>
            <span className="h-px w-10 bg-gold/70" />
          </div>
          <h2 className="mx-auto mt-8 max-w-4xl font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
            {t('findYourPlace.title')}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            {t('findYourPlace.description')}
          </p>
        </div>

        {/* State tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {STATES.map((state) => {
            const isActive = state === active;
            return (
              <button
                key={state}
                onClick={() => {
                  setActive(state);
                  scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                }}
                className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/5"
                }`}
              >
                {state}
                <ArrowUpRight
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    isActive ? "translate-x-0.5 -translate-y-0.5" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mx-auto mt-14 max-w-[1600px] px-6 lg:px-12">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 scrollbar-hide"
        >
          {cards.map((card) => (
            <article
              key={card.id}
              className="relative w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-[#111] sm:w-[320px] lg:w-[380px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.name}
                  loading="lazy"
                  className="pointer-events-none h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-5">
                  <span className="font-serif text-xl text-white sm:text-2xl">
                    {card.name}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent sm:w-24" />
      </div>
    </section>
  );
}
