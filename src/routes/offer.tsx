import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, X, Check, Minus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/lead-form";

export const Route = createFileRoute("/offer")({
  head: () => ({
    meta: [
      { title: "Get an Offer on Your Home | Maher Khatib" },
      {
        name: "description",
        content:
          "No repairs. No showings. No waiting. A direct offer on your home in 48 hours.",
      },
      { property: "og:title", content: "Get an Offer on Your Home" },
      {
        property: "og:description",
        content: "A direct, private offer in 48 hours. On your timeline.",
      },
    ],
  }),
  component: OfferPage,
});

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/8721935/8721935-hd_1920_1080_25fps.mp4";
const BAND_VIDEO =
  "https://videos.pexels.com/video-files/5495847/5495847-uhd_2560_1440_30fps.mp4";
const FORM_VIDEO =
  "https://videos.pexels.com/video-files/6474226/6474226-hd_1920_1080_24fps.mp4";

const HOW = [
  {
    n: "01",
    t: "Reach Out",
    img: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    n: "02",
    t: "Walkthrough",
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    n: "03",
    t: "Offer",
    img: "https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    n: "04",
    t: "Close",
    img: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const COMPARE = [
  { row: "Repairs required", trad: false, direct: true },
  { row: "Public showings", trad: false, direct: true },
  { row: "Commissions", trad: false, direct: true },
  { row: "Close on your date", trad: true, direct: false },
  { row: "Offer in 48 hours", trad: true, direct: false },
];

const WHO = [
  {
    t: "Inherited",
    img: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    t: "Needs repairs",
    img: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    t: "Relocation",
    img: "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    t: "Tired rental",
    img: "https://images.pexels.com/photos/1029611/pexels-photo-1029611.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    t: "Private sale",
    img: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
];

function OfferEstimator() {
  const [value, setValue] = useState(450);
  const low = Math.round(value * 0.86);
  const high = Math.round(value * 0.94);
  const fmt = (n: number) => `$${n.toLocaleString()}K`;
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#050505] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-[1700px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Instant Estimate
            </span>
          </div>
          <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
            A rough range, <br />
            <span className="italic">in seconds.</span>
          </h2>
          <p className="mt-6 max-w-md text-white/60">
            Slide to your rough home value. The exact number comes after a 20-minute walkthrough.
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0e0e] to-black p-8 lg:p-12">
            <div className="flex items-baseline justify-between">
              <div className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
                Estimated home value
              </div>
              <div className="font-serif text-4xl text-white lg:text-5xl">{fmt(value)}</div>
            </div>
            <input
              type="range"
              min={150}
              max={2000}
              step={10}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="mt-8 w-full accent-[oklch(0.78_0.11_85)]"
              aria-label="Estimated home value"
            />
            <div className="mt-3 flex justify-between text-[0.6rem] uppercase tracking-[0.28em] text-white/30">
              <span>$150K</span>
              <span>$2M</span>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
                <div className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
                  Direct offer — low
                </div>
                <div className="mt-4 font-serif text-4xl text-white">{fmt(low)}</div>
              </div>
              <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-black to-[#141008] p-6">
                <div className="text-[0.6rem] uppercase tracking-[0.32em] text-gold">
                  Direct offer — high
                </div>
                <div className="mt-4 font-serif text-4xl text-white">{fmt(high)}</div>
              </div>
            </div>
            <a
              href="#offer-form"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5"
            >
              Lock in the Exact Number <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferPage() {
  const [popup, setPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed || popup) return;
      const scrolled = window.scrollY + window.innerHeight;
      const threshold = document.body.scrollHeight * 0.66;
      if (scrolled >= threshold) setPopup(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [popup, dismissed]);

  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Cinematic video hero */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2400"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1700px] flex-col justify-center px-6 pt-32 pb-16 lg:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                Direct Buyer
              </span>
            </div>
            <h1 className="mt-8 font-serif text-6xl leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-[8.5rem]">
              Get an offer <br />
              <span className="italic">on your home.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
              No repairs. No showings. In 48 hours.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#offer-form"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5"
              >
                Request Offer <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:border-gold hover:text-gold"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video-tile 4-step strip (autoplay muted) */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto mb-16 max-w-[1600px] px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              How It Works
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-7xl">
            Four steps. <span className="italic text-white/70">That's it.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {HOW.map((s) => (
            <div
              key={s.n}
              className="group relative min-h-[440px] overflow-hidden border-l border-white/5"
            >
              <img
                src={s.img}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-[1500ms] group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative flex h-full min-h-[440px] flex-col justify-between p-8">
                <div className="font-serif text-7xl text-gold/80">{s.n}</div>
                <div className="font-serif text-3xl text-white">{s.t}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full-bleed cinematic quote band */}
      <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-6 lg:px-12">
          <blockquote className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            "A private offer,{" "}
            <span className="italic text-gold">on your timeline</span> — with none of the theatre."
          </blockquote>
        </div>
      </section>

      {/* Direct vs Traditional comparison — split screen with vertical video */}
      <section className="relative border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Direct vs Traditional
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-7xl">
            One route is <span className="italic">quieter</span>.
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:col-span-5">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source
                  src="https://videos.pexels.com/video-files/7578550/7578550-hd_1920_1080_30fps.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
                  The Direct Path
                </div>
                <div className="mt-3 font-serif text-3xl text-white lg:text-4xl">
                  Sold. <span className="italic text-white/70">Quietly.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-6 border-b border-white/10 bg-white/[0.02] px-6 py-4 text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
                  <span />
                  <span className="w-24 text-center">Traditional</span>
                  <span className="w-24 text-center text-gold">Direct</span>
                </div>
                {COMPARE.map((c) => (
                  <div
                    key={c.row}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-6 border-b border-white/5 px-6 py-6 last:border-0"
                  >
                    <span className="font-serif text-xl text-white lg:text-2xl">{c.row}</span>
                    <span className="flex w-24 justify-center">
                      {c.trad ? (
                        <Check className="h-5 w-5 text-white/50" />
                      ) : (
                        <Minus className="h-5 w-5 text-white/20" />
                      )}
                    </span>
                    <span className="flex w-24 justify-center">
                      {c.direct ? (
                        <Check className="h-5 w-5 text-gold" />
                      ) : (
                        <Minus className="h-5 w-5 text-white/20" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature: Instant Offer Estimator */}
      <OfferEstimator />

      {/* Who this is for — imagery bento */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto mb-16 max-w-[1600px] px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Who This Is For
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-7xl">
            Owners who want <span className="italic text-white/70">out cleanly</span>.
          </h2>
        </div>
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-2 px-6 md:grid-cols-3 lg:grid-cols-5 lg:px-12">
          {WHO.map((w) => (
            <div key={w.t} className="group relative aspect-[4/5] overflow-hidden">
              <img
                src={w.img}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-serif text-2xl text-white lg:text-3xl">{w.t}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 48-Hour Timeline ribbon */}
      <section className="relative overflow-hidden border-y border-white/5 bg-[#050505] py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              48-Hour Timeline
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-7xl">
            From call <span className="italic">to closing table</span>.
          </h2>

          <div className="relative mt-20">
            <div className="absolute left-0 right-0 top-6 h-px bg-white/10" />
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              {[
                { h: "Hour 0", t: "First call" },
                { h: "Hour 24", t: "Walkthrough" },
                { h: "Hour 48", t: "Written offer" },
                { h: "Day 14", t: "Cash at close" },
              ].map((row) => (
                <div key={row.h} className="relative">
                  <span className="relative z-10 flex h-3 w-3 -translate-y-[5px] items-center justify-center rounded-full bg-gold shadow-[0_0_0_6px_rgba(0,0,0,1)]" />
                  <div className="mt-6 text-[0.65rem] uppercase tracking-[0.32em] text-gold">
                    {row.h}
                  </div>
                  <div className="mt-3 font-serif text-2xl text-white lg:text-3xl">{row.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form on cinematic video backdrop */}
      <section id="offer-form" className="relative overflow-hidden py-24 lg:py-32">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        >
          <source src={FORM_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              Request your <span className="italic">offer</span>.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              title="Get Your Offer"
              submitLabel="Request My Offer"
              variant="dark"
              fields={[
                { name: "name", label: "Name", placeholder: "Full name" },
                { name: "phone", label: "Phone", placeholder: "(413) 555-0100" },
                { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
                { name: "address", label: "Property Address", placeholder: "Street, City" },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />

      {popup && !dismissed ? (
        <div className="fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md">
          <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-black/95 p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <button
              type="button"
              aria-label="Close"
              onClick={() => {
                setPopup(false);
                setDismissed(true);
              }}
              className="absolute right-4 top-4 rounded-full border border-white/15 p-2 text-white/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
              Instant Offer
            </div>
            <h3 className="mt-4 font-serif text-2xl leading-tight text-white">
              A direct offer on your home in 48 hours?
            </h3>
            <a
              href="#offer-form"
              onClick={() => {
                setPopup(false);
                setDismissed(true);
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black"
            >
              Request My Offer <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      ) : null}
    </main>
  );
}
