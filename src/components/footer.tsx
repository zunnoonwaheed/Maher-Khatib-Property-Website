import { Instagram, Facebook, Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const COLS = [
    {
      title: t('footer.workWithMaher'),
      links: [
        { label: t('nav.sellWithMaher'), href: "/sell" },
        { label: t('nav.getYourOffer'), href: "/offer" },
        { label: t('nav.contact'), href: "/contact" },
      ],
    },
    {
      title: t('footer.portfolio'),
      links: [
        { label: t('nav.investments'), href: "/investments" },
        { label: t('nav.newBuilds'), href: "/new-builds" },
        { label: t('nav.listings'), href: "/listings" },
      ],
    },
    {
      title: t('footer.about'),
      links: [
        { label: t('footer.aboutMaher'), href: "/about" },
        { label: t('aboutMaher.clientStories'), href: "#stories" },
        { label: t('footer.whereIWork'), href: "#areas" },
      ],
    },
    {
      title: t('footer.reachOut'),
      links: [
        { label: t('common.phone'), href: "tel:+14133607400" },
        { label: t('common.email'), href: "mailto:realtorsmbc@gmail.com" },
        { label: t('footer.bookCall'), href: "/contact" },
      ],
    },
  ];
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-gold/25 bg-[#0d0a06] text-white"
      style={{
        backgroundImage:
          "radial-gradient(1200px 400px at 50% -10%, rgba(212,175,55,0.14), transparent 60%), linear-gradient(180deg, #100c07 0%, #050403 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="relative mx-auto max-w-[1500px] px-6 py-24 lg:px-12">

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Maher Khatib"
                className="h-20 w-auto object-contain md:h-28 lg:h-32"
              />
            </div>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/60">
              {t('footer.description')}
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/80">
              <a href="tel:+14133607400" className="flex items-center gap-3 hover:text-gold">
                <Phone className="h-4 w-4" /> {t('common.phone')}
              </a>
              <a href="mailto:realtorsmbc@gmail.com" className="flex items-center gap-3 hover:text-gold">
                <Mail className="h-4 w-4" /> {t('common.email')}
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-all hover:border-gold hover:bg-gold hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:col-span-7">
            {COLS.map((c) => (
              <div key={c.title}>
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
                  {c.title}
                </div>
                <ul className="mt-6 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="font-serif text-lg text-white/85 transition-colors hover:text-gold"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <div>
            <div>{t('footer.license')}</div>
            <div className="mt-2">© {new Date().getFullYear()} Maher Khatib Group. {t('footer.rights')}</div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
