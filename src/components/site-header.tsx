import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type NavLink = { label: string; to: string };

const useNav = () => {
  const { t } = useLanguage();
  return [
    { label: t('nav.sellWithMaher'), to: "/sell" },
    { label: t('nav.getYourOffer'), to: "/offer" },
    { label: t('nav.investments'), to: "/investments" },
    { label: t('nav.newBuilds'), to: "/new-builds" },
    { label: t('nav.listings'), to: "/listings" },
    { label: t('nav.about'), to: "/about" },
  ];
};

type Props = {
  /** When true, header sits transparent over a hero until scroll. When false, always solid. */
  transparentOnTop?: boolean;
};

export function SiteHeader({ transparentOnTop = true }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { language, setLanguage, t } = useLanguage();
  const NAV = useNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const solid = !transparentOnTop || scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid
            ? "border-b border-white/5 bg-black/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1700px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/70 font-serif text-xl leading-none text-white">
              MK
            </span>
            <span className="font-serif text-[1.35rem] font-medium tracking-wide text-white">
              Maher Khatib
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-8 xl:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group relative text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                    active ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="hidden items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2 backdrop-blur-sm md:flex">
              <button
                onClick={() => setLanguage('en')}
                className={`rounded-full px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-all ${
                  language === 'en'
                    ? 'bg-gold text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`rounded-full px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-all ${
                  language === 'es'
                    ? 'bg-gold text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                ES
              </button>
            </div>
            <Link
              to="/offer"
              className="hidden items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex"
            >
              {t('nav.getYourOffer')}
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 xl:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">
                {mobileOpen ? t('nav.close') : t('nav.menu')}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-40 xl:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`relative flex h-full flex-col justify-between px-6 pt-28 pb-10 transition-transform duration-500 ease-out ${
            mobileOpen ? "translate-y-0" : "-translate-y-6"
          }`}
        >
          <nav className="flex flex-col gap-4">
            {NAV.map((item, i) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    transitionDelay: mobileOpen ? `${100 + i * 60}ms` : "0ms",
                  }}
                  className={`font-serif text-4xl leading-tight transition-all duration-500 sm:text-5xl ${
                    mobileOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  } ${active ? "text-gold" : "text-white hover:text-gold"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10">
            <Link
              to="/offer"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black"
            >
              {t('nav.getYourOffer')}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="mt-6 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
              <a href="tel:+16045551234" className="hover:text-white">
                {t('contact.phone')}
              </a>
              <a href="mailto:maher@mbcrealtors.ca" className="hover:text-white">
                {t('contact.email')}
              </a>
            </div>
            {/* Mobile Language Selector */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <Globe className="h-4 w-4 text-white/50" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${
                  language === 'en' ? 'text-gold' : 'text-white/50'
                }`}
              >
                English
              </button>
              <span className="text-white/30">|</span>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${
                  language === 'es' ? 'text-gold' : 'text-white/50'
                }`}
              >
                Español
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
