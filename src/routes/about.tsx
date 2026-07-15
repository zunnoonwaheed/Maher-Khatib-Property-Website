import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Testimonials } from "@/components/testimonials";
import { ImageMarquee } from "@/components/image-marquee";
import { CountUp } from "@/components/count-up";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Maher Khatib | Real Estate in Western Mass & Maine" },
      {
        name: "description",
        content:
          "Fifteen years selling, buying and building homes across Western Massachusetts and Maine. Meet Maher Khatib.",
      },
      { property: "og:title", content: "About Maher Khatib" },
      {
        property: "og:description",
        content: "Broker. Builder. Investor. A quieter way to move a home.",
      },
    ],
  }),
  component: AboutPage,
});

const MARQUEE_A = [
  "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1029611/pexels-photo-1029611.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2129796/pexels-photo-2129796.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

const CHAPTERS = [
  {
    n: "01",
    year: "2010",
    title: "Construction",
    body: "Framing walls before writing contracts.",
    img: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    n: "02",
    year: "2015",
    title: "Brokerage",
    body: "Same discipline. Different table.",
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    n: "03",
    year: "Today",
    title: "Broker · Builder · Investor",
    body: "Springfield. Granby. Southern Maine.",
    img: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
];

const STATS = [
  { v: "98%", l: "List-to-close" },
  { v: "$150M+", l: "Volume moved" },
  { v: "450+", l: "Families served" },
  { v: "15 yrs", l: "In the field" },
];

function AboutPage() {
  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Cinematic full-bleed hero — video */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=2400"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="https://videos.pexels.com/video-files/3773486/3773486-uhd_3840_2160_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/4770382/4770382-uhd_3840_2160_24fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1700px] flex-col justify-end px-6 pb-24 lg:px-12 lg:pb-32">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Maher Khatib — Since 2010
            </span>
          </div>
          <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[8rem]">
            A quieter way <br />
            <span className="italic text-white/90">to move a home.</span>
          </h1>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div
            className="mx-auto grid max-w-[1700px] grid-cols-2 divide-x divide-white/10 px-6 lg:grid-cols-4 lg:px-12"
            data-stagger
          >
            {STATS.map((s) => (
              <div key={s.l} className="px-4 py-6 first:pl-0 lg:px-8">
                <div className="font-serif text-3xl text-white lg:text-4xl">
                  <CountUp value={s.v} />
                </div>
                <div className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote over full-width plate */}
      <section className="relative overflow-hidden py-32 lg:py-48">
        <img
          src="https://images.pexels.com/photos/1029611/pexels-photo-1029611.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-12">
          <span className="font-serif text-8xl leading-none text-gold/60">"</span>
          <p className="mx-auto mt-4 max-w-4xl font-serif text-3xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            I don't sell homes. I move <span className="italic">lives forward</span>.
          </p>
          <div className="mt-10 text-[0.65rem] uppercase tracking-[0.4em] text-white/50">
            — Maher Khatib
          </div>
        </div>
      </section>

      {/* Editorial chapters — alternating cinematic splits */}
      <section className="border-t border-white/5">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.n}
            className={`grid grid-cols-1 border-b border-white/5 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[600px]">
              <img
                src={c.img}
                alt=""
                className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute left-8 top-8 font-serif text-8xl text-white/20 sm:text-9xl">
                {c.n}
              </div>
            </div>
            <div className="flex items-center bg-black px-8 py-20 lg:px-20">
              <div className="max-w-lg">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-gold">
                  {c.year}
                </div>
                <h3 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
                  {c.title}
                </h3>
                <p className="mt-8 text-lg leading-relaxed text-white/60">
                  {c.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Marquee band — lifestyle imagery */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto mb-12 max-w-[1500px] px-6 lg:px-12">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                A Life in Homes
              </span>
            </div>
            <div className="hidden text-[0.65rem] uppercase tracking-[0.32em] text-white/40 sm:block">
              Springfield · Granby · Southern Maine
            </div>
          </div>
        </div>
        <ImageMarquee images={MARQUEE_A} height="h-[340px] lg:h-[420px]" />
      </section>

      {/* Signature: Guiding Principles — vertical index list, editorial */}
      <section className="relative border-t border-white/5 bg-[#060606] py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                  Guiding Principles
                </span>
              </div>
              <h2 className="mt-8 font-serif text-5xl leading-[0.98] tracking-tight text-white lg:text-[4.5rem]">
                Four things <br />
                <span className="italic text-white/80">I refuse to bend on.</span>
              </h2>
              <p className="mt-8 max-w-sm text-white/55">
                The private rules that decide who I take on — and when I walk away.
              </p>
            </div>
          </div>
          <ol className="lg:col-span-8">
            {[
              { n: "I.", t: "Radical honesty on price." },
              { n: "II.", t: "Fewer clients, better work." },
              { n: "III.", t: "The builder's eye stays on." },
              { n: "IV.", t: "The phone gets answered." },
            ].map((p) => (
              <li
                key={p.n}
                className="group grid grid-cols-[auto,1fr] items-center gap-8 border-b border-white/10 py-10 transition-colors hover:border-gold/40 lg:gap-14 lg:py-14"
              >
                <div className="font-serif text-4xl text-gold/70 lg:text-6xl">{p.n}</div>
                <h3 className="font-serif text-3xl leading-tight tracking-tight text-white lg:text-5xl">
                  {p.t}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials />


      {/* Cinematic CTA */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[560px] w-full">
          <img
            src="https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1400px] flex-col items-start justify-center px-6 py-24 lg:px-12">
            <h2 className="max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Ready to talk about <span className="italic">your next move</span>?
            </h2>
            <Link
              to="/contact"
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-1"
            >
              Reach Out
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
