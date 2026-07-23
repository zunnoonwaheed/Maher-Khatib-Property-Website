import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/lead-form";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/investments")({
  head: () => ({
    meta: [
      { title: "Investment Opportunities | Maher Khatib Group" },
      {
        name: "description",
        content:
          "Capital partnership opportunities in land, spec builds, and small multifamily across Massachusetts and Connecticut.",
      },
      { property: "og:title", content: "Investment Opportunities" },
      {
        property: "og:description",
        content: "Strategic real estate investments with disciplined returns.",
      },
    ],
  }),
  component: InvestmentsPage,
});

function InvestmentsPage() {
  const { t } = useLanguage();

  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Hero */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1700px] flex-col items-start justify-center px-6 pt-32 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('investments.eyebrow')}
            </span>
          </div>
          <h1 className="mt-8 max-w-6xl font-serif text-6xl leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[7.5rem]">
            {t('investments.heroTitle')} <br />
            <span className="italic">{t('investments.heroTitleItalic')}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/70">
            {t('investments.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* What We Bring */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('investments.whatWeBringEyebrow')}
            </span>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: t('investments.whatWeBring1'),
                desc: t('investments.whatWeBring1Desc'),
              },
              {
                title: t('investments.whatWeBring2'),
                desc: t('investments.whatWeBring2Desc'),
              },
              {
                title: t('investments.whatWeBring3'),
                desc: t('investments.whatWeBring3Desc'),
              },
              {
                title: t('investments.whatWeBring4'),
                desc: t('investments.whatWeBring4Desc'),
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e0e0e] to-black p-8"
              >
                <div className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold">
                  0{i + 1}
                </div>
                <h3 className="mt-6 font-serif text-2xl text-white lg:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record Section - PLACEHOLDER */}
      <section className="relative overflow-hidden border-t border-white/5 bg-[#050505] py-24 lg:py-32">
        <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t('investments.trackRecordEyebrow')}
              </span>
            </div>
            <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              {t('investments.trackRecordTitle')} <span className="italic">{t('investments.trackRecordTitleItalic')}</span>.
            </h2>
            <p className="mt-6 text-lg text-white/60">
              {t('investments.trackRecordDesc')}
            </p>
          </div>

          {/* Placeholder for case studies */}
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0e0e] to-black p-10">
              <div className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold">
                {t('investments.trackRecordCase1')}
              </div>
              <h3 className="mt-4 font-serif text-3xl text-white">
                {t('investments.trackRecordCase1Title')}
              </h3>
              <p className="mt-4 text-white/60">
                {t('investments.trackRecordCase1Desc')}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0e0e] to-black p-10">
              <div className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold">
                {t('investments.trackRecordCase2')}
              </div>
              <h3 className="mt-4 font-serif text-3xl text-white">
                {t('investments.trackRecordCase2Title')}
              </h3>
              <p className="mt-4 text-white/60">
                {t('investments.trackRecordCase2Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Deal Book */}
      <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
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
                  {t('investments.dealBookEyebrow')}
                </span>
              </div>
              <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-tight text-white lg:text-[5rem]">
                {t('investments.dealBookTitle')} <span className="italic">{t('investments.dealBookTitleItalic')}</span>.
              </h2>
            </div>
            <div className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
              {t('investments.dealBookUpdated')}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                tag: "Ground-Up Spec",
                loc: "Longmeadow, MA",
                price: "$2.8M",
                img: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1400",
                metrics: [
                  { k: "Land basis", v: "$420K" },
                  { k: "Build cost", v: "$1.6M" },
                  { k: "Target ARV", v: "$3.4M" },
                  { k: "Projected IRR", v: "22%" },
                ],
              },
              {
                tag: "Small Multifamily",
                loc: "Springfield, MA",
                price: "$1.15M",
                img: "https://images.pexels.com/photos/2029731/pexels-photo-2029731.jpeg?auto=compress&cs=tinysrgb&w=1400",
                metrics: [
                  { k: "Units", v: "6" },
                  { k: "Gross rent", v: "$11.4K/mo" },
                  { k: "Cap rate", v: "8.1%" },
                  { k: "Cash-on-cash", v: "14%" },
                ],
              },
              {
                tag: "Land Assembly",
                loc: "Granby, MA",
                price: "$1.8M",
                img: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1400",
                metrics: [
                  { k: "Parcels", v: "8 lots" },
                  { k: "Entitled", v: "Yes" },
                  { k: "Sellout", v: "$4.2M" },
                  { k: "Projected IRR", v: "26%" },
                ],
              },
            ].map((d) => (
              <article
                key={d.tag + d.loc}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0e0e] to-black transition-colors hover:border-gold/40"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={d.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold">
                      {d.tag}
                    </span>
                    <span className="rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[0.55rem] uppercase tracking-[0.28em] text-white/70 backdrop-blur-md">
                      {t('investments.open')}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-10">
                  <div className="font-serif text-2xl text-white">{d.loc}</div>
                  <div className="mt-2 font-serif text-5xl text-white">{d.price}</div>
                  <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-white/10 pt-6">
                    {d.metrics.map((m) => (
                      <div key={m.k}>
                        <dt className="text-[0.55rem] uppercase tracking-[0.32em] text-white/40">
                          {m.k}
                        </dt>
                        <dd className="mt-1 font-serif text-xl text-white">{m.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href="#investor"
                    className="mt-8 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/70 transition-colors hover:text-gold"
                  >
                    {t('investments.dealBookRequestDeck')} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Investor form */}
      <section id="investor" className="relative overflow-hidden py-24 lg:py-32">
        <img
          src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t('investments.formEyebrow')}
              </span>
            </div>
            <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              {t('investments.formTitle')} <span className="italic">{t('investments.formTitleItalic')}</span>.
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              {t('investments.formDesc')}
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white hover:border-gold hover:text-gold"
            >
              {t('investments.formOrBookCall')} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              title={t('investments.formTitle')}
              submitLabel={t('investments.formSubmit')}
              fields={[
                { name: "name", label: t('form.name'), placeholder: t('form.fullName') },
                { name: "phone", label: t('form.phone'), placeholder: t('form.phonePlaceholder') },
                { name: "email", label: t('form.email'), type: "email", placeholder: t('form.emailPlaceholder') },
                { name: "focus", label: t('investments.formFocusLabel'), placeholder: t('investments.formFocusPlaceholder') },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
