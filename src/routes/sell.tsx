import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Testimonials } from "@/components/testimonials";
import { LeadForm } from "@/components/lead-form";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell With Maher | Sell Your Home for What It's Worth" },
      {
        name: "description",
        content:
          "White-glove listing strategy across Massachusetts and Connecticut. Cinematic marketing, sharper pricing, firm negotiation.",
      },
      { property: "og:title", content: "Sell With Maher" },
      {
        property: "og:description",
        content: "A boutique listing practice. Fewer clients, sharper strategy, better outcomes.",
      },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const { t } = useLanguage();

  const PILLARS = [
    {
      n: "01",
      t: t('sell.pillar1Title'),
      b: t('sell.pillar1Desc'),
      proof: [t('sell.pillar1Proof1'), t('sell.pillar1Proof2'), t('sell.pillar1Proof3')],
      img: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      n: "02",
      t: t('sell.pillar2Title'),
      b: t('sell.pillar2Desc'),
      proof: [t('sell.pillar2Proof1'), t('sell.pillar2Proof2'), t('sell.pillar2Proof3')],
      img: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      n: "03",
      t: t('sell.pillar3Title'),
      b: t('sell.pillar3Desc'),
      proof: [t('sell.pillar3Proof1'), t('sell.pillar3Proof2'), t('sell.pillar3Proof3')],
      img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      n: "04",
      t: t('sell.pillar4Title'),
      b: t('sell.pillar4Desc'),
      proof: [t('sell.pillar4Proof1'), t('sell.pillar4Proof2'), t('sell.pillar4Proof3')],
      img: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  const RESULTS = [
    { k: "$150M+", v: t('sell.resultsSold') },
    { k: "98%", v: t('sell.resultsListToClose') },
    { k: "17 days", v: t('sell.resultsDOM') },
    { k: "104%", v: t('sell.resultsAsking') },
  ];
  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Full-screen image hero */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1700px] flex-col items-start justify-center px-6 pt-32 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('sell.eyebrow')}
            </span>
          </div>
          <h1 className="mt-8 max-w-6xl font-serif text-6xl leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[7.5rem]">
            {t('sell.heroTitle')} <span className="italic">{t('sell.heroTitleItalic')}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/80">
            {t('sell.heroSubtitle')}
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#sell-form"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t('sell.bookCall')} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Results ribbon — unique to Sell */}
      <section className="border-y border-white/5 bg-[#080808]">
        <div className="mx-auto grid max-w-[1700px] grid-cols-2 divide-x divide-white/5 lg:grid-cols-4">
          {RESULTS.map((r) => (
            <div key={r.v} className="px-6 py-10 lg:px-10 lg:py-14">
              <div className="font-serif text-5xl text-white lg:text-6xl">{r.k}</div>
              <div className="mt-3 text-[0.65rem] uppercase tracking-[0.32em] text-white/50">
                {r.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky scroll pillars — pinned title, columns scrolling next to it */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-12 lg:gap-24 lg:px-12 lg:py-32">
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                  {t('sell.pillarsEyebrow')}
                </span>
              </div>
              <h2 className="mt-8 font-serif text-5xl leading-[0.98] tracking-tight text-white lg:text-[5.5rem]">
                {t('sell.pillarsTitle')} <br />
                <span className="italic text-white/80">{t('sell.pillarsTitleItalic')}</span>
              </h2>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-white/60">
                {t('sell.pillarsDescription')}
              </p>
              <div className="mt-10 h-px w-24 bg-gold/50" />
              <div className="mt-6 font-serif text-xl italic text-white/50">
                "{t('sell.pillarsQuote')}"
              </div>
            </div>
          </aside>

          <div className="space-y-6 lg:col-span-7">
            {PILLARS.map((p) => (
              <article
                key={p.n}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d0d0d] to-black transition-colors hover:border-gold/40"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[220px,1fr]">
                  <div className="relative min-h-[220px] overflow-hidden sm:min-h-full">
                    <img
                      src={p.img}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/70" />
                    <div className="absolute left-6 top-6 font-serif text-6xl text-gold/80 lg:text-7xl">
                      {p.n}
                    </div>
                  </div>
                  <div className="p-8 lg:p-10">
                    <h3 className="font-serif text-3xl leading-tight tracking-tight text-white lg:text-4xl">
                      {p.t}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                      {p.b}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.proof.map((x) => (
                        <li
                          key={x}
                          className="rounded-full border border-white/15 px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-white/70"
                        >
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Signature: Live Market Pulse — mini editorial dashboard */}
      <section className="relative overflow-hidden border-t border-white/5 bg-black py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1700px] px-6 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                  {t('sell.marketEyebrow')}
                </span>
              </div>
              <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-tight text-white lg:text-[5rem]">
                {t('sell.marketTitle')} <br />
                <span className="italic text-white/80">{t('sell.marketTitleItalic')}</span>
              </h2>
            </div>
            <div className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
              {t('sell.marketUpdated')}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: t('sell.marketMedianPrice'), v: "$542K", d: "+6.8% YoY", w: "82%" },
              { k: t('sell.marketDaysOnMarket'), v: "17", d: "−9 days vs. 2024", w: "34%" },
              { k: t('sell.marketOverAsking'), v: "62%", d: "of listings closed", w: "62%" },
              { k: t('sell.marketDemand'), v: "High", d: "3.1 offers avg.", w: "88%" },
            ].map((m) => (
              <div
                key={m.k}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0e0e] to-black p-8 transition-colors hover:border-gold/40"
              >
                <div className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
                  {m.k}
                </div>
                <div className="mt-6 font-serif text-6xl text-white">{m.v}</div>
                <div className="mt-3 text-sm text-gold/90">{m.d}</div>
                <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold/50 to-gold transition-all duration-1000 group-hover:opacity-100"
                    style={{ width: m.w }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-[#080808] p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="max-w-xl">
              <div className="font-serif text-2xl text-white lg:text-3xl">
                {t('sell.marketCTA')} <span className="italic text-gold">{t('sell.marketCTAItalic')}</span> {t('sell.marketCTAEnd')}
              </div>
            </div>
            <a
              href="#sell-form"
              className="inline-flex flex-none items-center gap-3 rounded-full bg-gold px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5"
            >
              {t('sell.marketCTAButton')} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Testimonials />


      {/* Cinematic form section */}
      <section id="sell-form" className="relative overflow-hidden py-24 lg:py-32">
        <img
          src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t('sell.formEyebrow')}
              </span>
            </div>
            <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              {t('sell.formTitle')} <span className="italic">{t('sell.formTitleItalic')}</span>.
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              {t('sell.formSubtitle')}
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              title={t('sell.eyebrow')}
              submitLabel={t('sell.formSubmit')}
              fields={[
                { name: "name", label: t('form.name'), placeholder: t('form.fullName') },
                { name: "phone", label: t('form.phone'), placeholder: t('form.phonePlaceholder') },
                { name: "email", label: t('form.email'), type: "email", placeholder: t('form.emailPlaceholder') },
                { name: "address", label: t('form.propertyAddress'), placeholder: t('form.propertyAddressPlaceholder') },
                { name: "message", label: t('form.message'), placeholder: t('form.messagePlaceholder'), textarea: true },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
