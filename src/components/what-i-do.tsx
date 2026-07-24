import { useLanguage } from "@/contexts/LanguageContext";

export function WhatIDo() {
  const { t } = useLanguage();

  const SERVICES = [
    {
      tag: `01 · ${t('whatIDo.sellTitle')}`,
      title: t('whatIDo.sellTitle'),
      copy: t('whatIDo.sellDesc'),
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    },
    {
      tag: `02 · ${t('whatIDo.offerTitle')}`,
      title: t('whatIDo.offerTitle'),
      copy: t('whatIDo.offerDesc'),
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    },
    {
      tag: `03 · ${t('whatIDo.investmentsTitle')}`,
      title: t('whatIDo.investmentsTitle'),
      copy: t('whatIDo.investmentsDesc'),
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    },
    {
      tag: `04 · ${t('whatIDo.newBuildsTitle')}`,
      title: t('whatIDo.newBuildsTitle'),
      copy: t('whatIDo.newBuildsDesc'),
      image:
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
    },
  ];
  return (
    <section id="services" className="relative bg-black py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t('whatIDo.eyebrow')}
              </span>
            </div>
            <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
              {t('whatIDo.title').split(' ').slice(0, -1).join(' ')} <span className="italic">{t('whatIDo.title').split(' ').slice(-1)}</span>.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/60">
            {t('whatIDo.description')}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl border border-white/10"
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40"
              />
              <div className="relative p-8">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
                  {s.tag}
                </span>
              </div>
              <div className="relative p-8">
                <h3 className="font-serif text-3xl leading-tight text-white lg:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                  {s.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
