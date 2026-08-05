import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/new-builds")({
  head: () => ({
    meta: [
      { title: "New Construction | Maher Khatib Group" },
      {
        name: "description",
        content:
          "Ground-up construction and new build projects across Massachusetts and Connecticut.",
      },
      { property: "og:title", content: "New Construction" },
      {
        property: "og:description",
        content: "Custom new builds and ground-up construction projects.",
      },
    ],
  }),
  component: NewBuildsPage,
});

function NewBuildsPage() {
  const { t } = useLanguage();

  const PHASES = [
    {
      n: "01",
      t: t('newBuilds.processPhase1Title'),
      d: t('newBuilds.processPhase1Desc'),
      img: "/new builds/Land.png",
    },
    {
      n: "02",
      t: t('newBuilds.processPhase2Title'),
      d: t('newBuilds.processPhase2Desc'),
      img: "/new builds/Permits and Plans.png",
    },
    {
      n: "03",
      t: t('newBuilds.processPhase3Title'),
      d: t('newBuilds.processPhase3Desc'),
      img: "/new builds/Build.png",
    },
    {
      n: "04",
      t: t('newBuilds.processPhase4Title'),
      d: t('newBuilds.processPhase4Desc'),
      img: "/new builds/Sale.png",
    },
  ];

  const PROJECTS = [
    {
      span: "lg:col-span-8 lg:row-span-2",
      img: "/new builds/Granby, MA.png",
      town: "Granby, MA",
      lotSize: t('newBuilds.project1LotSize'),
      status: t('newBuilds.projectStatus'),
      homes: t('newBuilds.project1Homes'),
    },
    {
      span: "lg:col-span-4",
      img: "/new builds/Springfield, MA.png",
      town: "Springfield, MA",
      lotSize: t('newBuilds.project2LotSize'),
      status: t('newBuilds.project2Status'),
      homes: t('newBuilds.project2Homes'),
    },
  ];

  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Cinematic image hero */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src="/new builds/Build.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1700px] flex-col items-start justify-center px-6 pt-32 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('newBuilds.eyebrow')}
            </span>
          </div>
          <h1 className="mt-8 max-w-6xl font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-[7.5rem]">
            {t('newBuilds.heroTitle')} <br className="hidden sm:block" />
            <span className="italic">{t('newBuilds.heroTitleItalic')}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/70">
            {t('newBuilds.heroSubtitle')}
          </p>
          <a
            href="#projects"
            className="mt-10 inline-flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-gold px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            {t('newBuilds.heroCTA')} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>


      {/* Current Projects */}
      <section id="projects" className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('newBuilds.projectsEyebrow')}
            </span>
          </div>
          <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
            {t('newBuilds.projectsTitle')} <span className="italic">{t('newBuilds.projectsTitleItalic')}</span>.
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {PROJECTS.map((p) => (
              <div
                key={p.town}
                className="group relative overflow-hidden rounded-3xl border border-white/10"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.town}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="bg-gradient-to-br from-[#0e0e0e] to-black p-10">
                  <div className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold">
                    {p.status}
                  </div>
                  <h3 className="mt-4 font-serif text-4xl text-white">{p.town}</h3>
                  <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                    <div>
                      <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
                        {t('newBuilds.projectLotSize')}
                      </dt>
                      <dd className="mt-2 font-serif text-xl text-white">{p.lotSize}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
                        {t('newBuilds.projectHomesPlanned')}
                      </dt>
                      <dd className="mt-2 font-serif text-xl text-white">{p.homes}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases — horizontal timeline ribbon (distinct from other pages) */}
      <section className="relative overflow-hidden border-t border-white/5 bg-[#050505] py-24 lg:py-32">
        <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t('newBuilds.processEyebrow')}
              </span>
            </div>
            <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              {t('newBuilds.processTitle')} <span className="italic">{t('newBuilds.processTitleItalic')}</span>.
            </h2>
          </div>

          <div className="relative mt-20">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <ol className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {PHASES.map((p) => (
                <li key={p.n} className="relative">
                  <div className="flex items-center gap-4">
                    <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-black font-serif text-lg text-gold">
                      {p.n}
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="mt-8 aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={p.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-110"
                    />
                  </div>
                  <div className="mt-6 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold">
                    {t('newBuilds.processPhase' + p.n)}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-white lg:text-3xl">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>


      {/* Contact CTA */}
      <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
        <img
          src="/new builds/Land.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
        <div className="relative mx-auto max-w-[1500px] px-6 text-center lg:px-12">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('newBuilds.ctaEyebrow')}
            </span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="mt-8 font-serif text-4xl leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('newBuilds.ctaTitle')} <span className="italic">{t('newBuilds.ctaTitleItalic')}</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            {t('newBuilds.ctaDesc')}
          </p>
          <div className="mx-auto mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-gold px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black hover:bg-gold/90 sm:w-auto"
            >
              {t('newBuilds.ctaCTA')} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+16045551234"
              className="inline-flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-full border border-white/30 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white hover:border-gold hover:text-gold sm:w-auto"
            >
              {t('common.phone')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
