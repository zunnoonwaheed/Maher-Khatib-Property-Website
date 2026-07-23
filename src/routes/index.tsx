import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { WhyMaher } from "@/components/why-maher";
import { Testimonials } from "@/components/testimonials";
import { AboutMaher } from "@/components/about-maher";
import { WhatIDo } from "@/components/what-i-do";
import { ServiceAreas } from "@/components/service-areas";
import { FindYourPlace } from "@/components/find-your-place";
import { FeaturedListings } from "@/components/featured-listings";
import { AskMe } from "@/components/ask-me";
import { GetYourOffer } from "@/components/get-your-offer";
import { Footer } from "@/components/footer";
import { CountUp } from "@/components/count-up";
import { StickyMobileBar } from "@/components/sticky-mobile-bar";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/")({
  component: Index,
});

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4";

// STATS will be defined inside the component to access t()

function Index() {
  const { t } = useLanguage();

  const STATS = [
    { value: "$200M+", label: t('home.statSold') },
    { value: "Top 3%", label: t('home.statAgents') },
    { value: "450+", label: t('home.statClosed') },
    { value: "300+", label: t('home.statReviews') },
  ];

  return (
    <main className="relative">
      <SiteHeader transparentOnTop />
      <StickyMobileBar />



      {/* ===== Full-screen video hero ===== */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-hero-overlay/55" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-linear-to-b from-hero-overlay/70 via-transparent to-hero-overlay/80"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-10 text-center">
          <div className="animate-hero-fade-up delay-200 mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
            {t('home.heroEyebrow')}
          </div>
          <h1 className="font-serif text-hero-foreground">
            <span className="animate-hero-fade-up delay-300 block text-5xl leading-[1.05] font-medium tracking-tight sm:text-7xl lg:text-[5.5rem]">
              {t('home.heroTitle')}
            </span>
            <span className="animate-hero-fade-up delay-500 mt-2 block text-4xl leading-[1.1] font-normal sm:text-6xl lg:text-[4.5rem]">
              {t('home.heroSubtitle')}
            </span>
          </h1>
          <p className="animate-hero-fade-up delay-700 mt-8 max-w-3xl text-lg leading-relaxed text-hero-foreground-soft sm:text-xl">
            {t('home.heroDescription')}
          </p>

          <div className="animate-hero-fade-up delay-900 mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link to="/sell" className="btn-hero-solid">
              {t('nav.sellWithMaher')}
            </Link>
            <Link to="/offer" className="btn-hero-ghost">
              {t('nav.getYourOffer')}
            </Link>
          </div>

        </div>

        <div className="relative z-10 px-6 pb-16">
          <div className="animate-hero-fade delay-1100 mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-5xl font-medium text-hero-foreground sm:text-6xl">
                  <CountUp value={stat.value} duration={2000} />
                </div>
                <div className="mt-3 text-xs font-medium tracking-[0.08em] text-hero-foreground-soft sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
          <div className="animate-scroll-pulse flex h-10 w-6 items-start justify-center rounded-full border border-hero-foreground/40 pt-2">
            <span className="h-2 w-0.5 rounded-full bg-hero-foreground/80" />
          </div>
        </div>
      </section>

      <AboutMaher />
      <WhatIDo />
      <FindYourPlace />
      <WhyMaher />
      <ServiceAreas />
      <FeaturedListings />
      <Testimonials />
      <AskMe />
      <GetYourOffer />
      
      <Footer />
    </main>
  );
}
