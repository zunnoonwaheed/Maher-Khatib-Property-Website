import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutMaher() {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative overflow-hidden bg-black py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[160px]"
      />
      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 xl:gap-24 lg:px-12">
        <div className="relative">
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
            <img
              src="/maher-portrait.webp"
              alt={t('aboutMaher.imageAlt')}
              className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              loading="lazy"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
            />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between rounded-2xl border border-white/20 bg-black/40 p-5 backdrop-blur-md">
              <div>
                <div className="font-serif text-2xl text-white">{t('aboutMaher.title')}</div>
                <div className="text-[0.65rem] uppercase tracking-[0.32em] text-white/80">
                  {t('aboutMaher.subtitle')}
                </div>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-black">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('aboutMaher.eyebrow')}
            </span>
          </div>
          <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            {t('aboutMaher.title')} · <span className="italic">{t('aboutMaher.subtitle')}</span>
          </h2>
          <p className="mt-8 text-base leading-relaxed text-white/60 sm:text-lg">
            {t('aboutMaher.para1')}
          </p>
          <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
            {t('aboutMaher.para2')}
          </p>
          <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
            {t('aboutMaher.para3')}
          </p>
          <div className="mt-12 flex items-center gap-6">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t('aboutMaher.meetMaher')}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#stories"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70 underline-offset-8 hover:text-gold hover:underline"
            >
              {t('aboutMaher.clientStories')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
