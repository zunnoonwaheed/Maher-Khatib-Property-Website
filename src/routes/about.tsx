import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Testimonials } from "@/components/testimonials";
import { ImageMarquee } from "@/components/image-marquee";
import { CountUp } from "@/components/count-up";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Maher Khatib | Broker and Real Estate Expert" },
      {
        name: "description",
        content:
          "Over 20 years selling, buying and building homes across Massachusetts and Connecticut. Meet Maher Khatib.",
      },
      { property: "og:title", content: "About Maher Khatib" },
      {
        property: "og:description",
        content: "Broker and Real Estate Expert. Over 20 years helping families across Massachusetts and Connecticut.",
      },
    ],
  }),
  component: AboutPage,
});

const MARQUEE_A = [
  "/about/Broker & Real Estate Expert.png",
  "/about/Construction.png",
  "/investment-hero.jpg",
];

function AboutPage() {
  const { t } = useLanguage();

  const CHAPTERS = [
    {
      n: "01",
      year: t('about.chapter1Year'),
      title: t('about.chapter1Title'),
      body: t('about.chapter1Body'),
      img: "/about/Brokerage.png",
    },
    {
      n: "02",
      year: t('about.chapter2Year'),
      title: t('about.chapter2Title'),
      body: t('about.chapter2Body'),
      img: "/about/Construction.png",
    },
    {
      n: "03",
      year: t('about.chapter3Year'),
      title: t('about.chapter3Title'),
      body: t('about.chapter3Body'),
      img: "/about/Broker & Real Estate Expert.png",
    },
  ];

  const STATS = [
    { v: "$175M+", l: t('about.statsSold') },
    { v: "Top 3%", l: t('about.statsAgents') },
    { v: "30+", l: t('about.statsExperience') },
  ];

  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Cinematic full-bleed hero — video */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/about/Broker & Real Estate Expert.png"
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

        <div className="relative z-10 mx-auto flex h-full max-w-[1700px] flex-col items-start justify-center px-6 pt-32 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('about.eyebrow')}
            </span>
          </div>
          <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[8rem]">
            {t('about.heroTitle')}
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-white/70">
            {t('about.heroSubtitle')}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div
            className="mx-auto grid max-w-[1700px] grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/10 lg:px-12"
            data-stagger
          >
            {STATS.map((s) => (
              <div key={s.l} className="text-center sm:px-4 sm:py-0 lg:px-8">
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

      {/* Bio Section */}
      <section className="relative mt-8 overflow-hidden bg-black py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('about.bioEyebrow')}
            </span>
          </div>
          <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/70">
            <p>
              {t('about.bioPara1')}
            </p>
            <p>
              {t('about.bioPara2')}
            </p>
            <p>
              {t('about.bioPara3')}
            </p>
            <p>
              {t('about.bioPara4')}
            </p>
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
      <section className="mt-8 py-24 lg:py-32">
        <div className="mx-auto mb-12 max-w-[1500px] px-6 lg:px-12">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t('about.marqueeEyebrow')}
              </span>
            </div>
            <div className="hidden text-[0.65rem] uppercase tracking-[0.32em] text-white/40 sm:block">
              {t('about.marqueeLocation')}
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
                  {t('about.principlesEyebrow')}
                </span>
              </div>
              <h2 className="mt-8 font-serif text-5xl leading-[0.98] tracking-tight text-white lg:text-[4.5rem]">
                {t('about.principlesTitle')} <br />
                <span className="italic text-white/80">{t('about.principlesTitleItalic')}</span>
              </h2>
              <p className="mt-8 max-w-sm text-white/55">
                {t('about.principlesDesc')}
              </p>
            </div>
          </div>
          <ol className="lg:col-span-8">
            {[
              { n: "I.", t: t('about.principle1') },
              { n: "II.", t: t('about.principle2') },
              { n: "III.", t: t('about.principle3') },
              { n: "IV.", t: t('about.principle4') },
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
            src="/about/Ready to talk about your next move_.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1400px] flex-col items-start justify-center px-6 py-24 lg:px-12">
            <h2 className="max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t('about.ctaTitle')} <span className="text-white/40">/ </span><span className="italic">{t('about.ctaTitleItalic')}</span>
            </h2>
            <Link
              to="/contact"
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-1"
            >
              {t('about.ctaCTA')}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
