import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  location: string;
  quote: string;
  image: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Celia & David Salas",
    role: "Sold in Granby, MA",
    location: "Granby, Massachusetts",
    quote:
      "Maher guided us through every step with unmatched patience and honesty. His pricing strategy brought us three offers in a weekend — well over asking. He treats you like family, not a transaction.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=80",
    initials: "CS",
  },
  {
    name: "Jonathan Pereira",
    role: "Bought in Portland, ME",
    location: "Portland, Maine",
    quote:
      "Relocating from Springfield to Maine felt impossible until we met Maher. He knew every neighborhood, negotiated firmly on our behalf and made the whole process feel effortless. A true professional.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    initials: "JP",
  },
  {
    name: "Amelia Whitcomb",
    role: "Sold & Bought · Western Mass",
    location: "Springfield, Massachusetts",
    quote:
      "We interviewed four agents before choosing Maher — and we're so glad we did. Beautiful marketing, thoughtful staging advice and a closing that landed exactly when he promised. Pure luxury service.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=80",
    initials: "AW",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setRevealed(true);
      },
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  const active = TESTIMONIALS[index];

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="relative overflow-hidden bg-black py-24 lg:py-32"
    >
      {/* soft ambient gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[160px]"
      />

      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        {/* header */}
        <div
          className={`grid grid-cols-1 items-start gap-12 lg:grid-cols-12 transition-all duration-1000 ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                Testimonials
              </span>
            </div>
            <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
              Real Results.
              <br />
              <span className="italic text-white/85">Real Relationships.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Our clients are at the heart of everything we do. From first
              showings to final signatures, hear why families across
              Springfield, Granby and Maine trust Maher Khatib with their most
              important move.
            </p>
          </div>

          {/* decorative circular monogram badge */}
          <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
            <div className="relative h-64 w-64 animate-[spin_40s_linear_infinite]">
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full text-white/40"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="mk-circle"
                    d="M 100,100 m -85,0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  className="text-[11px] uppercase tracking-[0.5em]"
                  style={{ letterSpacing: "0.35em" }}
                >
                  <textPath href="#mk-circle" startOffset="0">
                    Relationships · Community · Leadership ·
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-serif text-6xl italic text-white/70">
                  mk
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* slider */}
        <div
          className={`relative mt-20 transition-all duration-1000 delay-200 ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-0">
            {/* image */}
            <div className="relative lg:col-span-5 lg:z-10">
              <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] lg:aspect-[4/5]">
                {TESTIMONIALS.map((t, i) => (
                  <img
                    key={t.name}
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out ${
                      i === index
                        ? "translate-x-0 opacity-100"
                        : i < index
                          ? "-translate-x-8 opacity-0"
                          : "translate-x-8 opacity-0"
                    }`}
                  />
                ))}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div>
                    <div className="font-serif text-xl text-white">
                      {active.name}
                    </div>
                    <div className="text-xs uppercase tracking-[0.28em] text-white/70">
                      {active.location}
                    </div>
                  </div>
                  <div className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
                    {index + 1} / {TESTIMONIALS.length}
                  </div>
                </div>
              </div>
            </div>

            {/* content panel */}
            <div className="relative lg:col-span-7 lg:-ml-24 lg:pl-32">
              <div className="relative flex h-full min-h-[420px] flex-col justify-between rounded-3xl border border-white/10 bg-[#141414] p-8 sm:p-12 lg:p-16">
                <Quote
                  className="h-14 w-14 text-gold/80"
                  aria-hidden="true"
                  strokeWidth={1.2}
                />

                <div className="relative mt-6 min-h-[220px]">
                  {TESTIMONIALS.map((t, i) => (
                    <blockquote
                      key={t.name}
                      className={`absolute inset-0 transition-all duration-700 ${
                        i === index
                          ? "translate-x-0 opacity-100"
                          : i < index
                            ? "pointer-events-none -translate-x-8 opacity-0"
                            : "pointer-events-none translate-x-8 opacity-0"
                      }`}
                    >
                      <p className="font-serif text-2xl italic leading-relaxed text-white/90 sm:text-3xl lg:text-[2rem] lg:leading-[1.35]">
                        “{t.quote}”
                      </p>
                    </blockquote>
                  ))}
                </div>

                <div className="mt-12 flex items-center justify-between gap-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 bg-black font-serif text-sm tracking-wide text-gold">
                      {active.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-serif text-lg text-white">
                        {active.name}
                      </div>
                      <div className="text-xs uppercase tracking-[0.28em] text-white/50">
                        {active.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous testimonial"
                      className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next testimonial"
                      className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* progress dots */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-gold" : "w-5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
