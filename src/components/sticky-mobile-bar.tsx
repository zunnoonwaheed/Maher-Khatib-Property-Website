import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function StickyMobileBar() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      // Show bar after scrolling past hero section (approximately 100vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Check initial state

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="flex items-center gap-3 border-t border-white/10 bg-black/95 px-4 py-3 backdrop-blur-xl">
        <a
          href="tel:+16045551234"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/20"
        >
          <Phone className="h-4 w-4" />
          {t('nav.call')}
        </a>
        <Link
          to="/offer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-transform hover:-translate-y-0.5"
        >
          {t('nav.getYourOffer')}
        </Link>
      </div>
    </div>
  );
}
