import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/lead-form";
import { useLanguage } from "@/contexts/LanguageContext";

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

function OfferPage() {
  const { t } = useLanguage();

  const HOW = [
    {
      n: "01",
      t: t('offer.step1Title'),
      d: t('offer.step1Desc'),
      img: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      n: "02",
      t: t('offer.step2Title'),
      d: t('offer.step2Desc'),
      img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      n: "03",
      t: t('offer.step3Title'),
      d: t('offer.step3Desc'),
      img: "https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      n: "04",
      t: t('offer.step4Title'),
      d: t('offer.step4Desc'),
      img: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  const COMPARE = [
    { row: t('offer.compareRowRepairs'), direct: t('offer.compareDirectRepairs'), listing: t('offer.compareListingRepairs') },
    { row: t('offer.compareRowShowings'), direct: t('offer.compareDirectShowings'), listing: t('offer.compareListingShowings') },
    { row: t('offer.compareRowCommission'), direct: t('offer.compareDirectCommission'), listing: t('offer.compareListingCommission') },
    { row: t('offer.compareRowClosing'), direct: t('offer.compareDirectClosing'), listing: t('offer.compareListingClosing') },
    { row: t('offer.compareRowTimeline'), direct: t('offer.compareDirectTimeline'), listing: t('offer.compareListingTimeline') },
  ];

  const WHO = [
    {
      t: t('offer.whoForInherited'),
      img: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1400",
    },
    {
      t: t('offer.whoForNeedsRepairs'),
      img: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1400",
    },
    {
      t: t('offer.whoForRelocation'),
      img: "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1400",
    },
    {
      t: t('offer.whoForTiredRental'),
      img: "https://images.pexels.com/photos/1029611/pexels-photo-1029611.jpeg?auto=compress&cs=tinysrgb&w=1400",
    },
    {
      t: t('offer.whoForPrivate'),
      img: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1400",
    },
  ];

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
                {t('offer.eyebrow')}
              </span>
            </div>
            <h1 className="mt-8 font-serif text-6xl leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-[8.5rem]">
              {t('offer.heroTitle')} <br />
              <span className="italic">{t('offer.heroTitleItalic')}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
              {t('offer.heroSubtitle')}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#offer-form"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5"
              >
                {t('offer.requestOffer')} <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:border-gold hover:text-gold"
              >
                {t('offer.bookCall')}
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
              {t('offer.howItWorksEyebrow')}
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-7xl">
            {t('offer.howItWorksTitle')} <span className="italic text-white/70">{t('offer.howItWorksTitleItalic')}</span>
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
            "{t('offer.quote')}{" "}
            <span className="italic text-gold">{t('offer.quoteItalic')}</span> {t('offer.quoteEnd')}"
          </blockquote>
        </div>
      </section>

      {/* Direct vs Traditional comparison — split screen with vertical video */}
      <section className="relative border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('offer.compareEyebrow')}
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-7xl">
            {t('offer.compareTitle')} <span className="italic">{t('offer.compareTitleItalic')}</span>.
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
                  {t('offer.compareDirectPath')}
                </div>
                <div className="mt-3 font-serif text-3xl text-white lg:text-4xl">
                  {t('offer.compareSold')} <span className="italic text-white/70">{t('offer.compareSoldItalic')}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-[140px_1fr_1fr] gap-6 border-b border-white/10 bg-white/[0.02] px-6 py-4 text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
                  <span />
                  <span>{t('offer.compareDirectPath')}</span>
                  <span>{t('offer.listingOnMarket')}</span>
                </div>
                {COMPARE.map((c) => (
                  <div
                    key={c.row}
                    className="grid grid-cols-[140px_1fr_1fr] gap-6 border-b border-white/5 px-6 py-6 last:border-0"
                  >
                    <span className="font-serif text-lg text-gold lg:text-xl">{c.row}</span>
                    <span className="text-base text-white/80">{c.direct}</span>
                    <span className="text-base text-white/60">{c.listing}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-base leading-relaxed text-white/60">
                {t('offer.compareDisclaimer')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for — imagery bento */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto mb-16 max-w-[1600px] px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('offer.whoForEyebrow')}
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-7xl">
            {t('offer.whoForTitle')} <span className="italic text-white/70">{t('offer.whoForTitleItalic')}</span>.
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
              {t('offer.timelineEyebrow')}
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-7xl">
            {t('offer.timelineTitle')} <span className="italic">{t('offer.timelineTitleItalic')}</span>.
          </h2>

          <div className="relative mt-20">
            <div className="absolute left-0 right-0 top-6 h-px bg-white/10" />
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              {[
                { h: t('offer.timelineHour0'), t: t('offer.timelineHour0Label') },
                { h: t('offer.timelineHour24'), t: t('offer.timelineHour24Label') },
                { h: t('offer.timelineHour48'), t: t('offer.timelineHour48Label') },
                { h: t('offer.timelineDay14'), t: t('offer.timelineDay14Label') },
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
              {t('offer.formTitle')} <span className="italic">{t('offer.formTitleItalic')}</span>.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              title={t('offer.formTitle')}
              submitLabel={t('offer.formSubmit')}
              variant="dark"
              fields={[
                { name: "name", label: t('form.name'), placeholder: t('form.fullName') },
                { name: "phone", label: t('form.phone'), placeholder: t('form.phonePlaceholder') },
                { name: "email", label: t('form.email'), type: "email", placeholder: t('form.emailPlaceholder') },
                { name: "address", label: t('form.propertyAddress'), placeholder: t('form.propertyAddressPlaceholder') },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
