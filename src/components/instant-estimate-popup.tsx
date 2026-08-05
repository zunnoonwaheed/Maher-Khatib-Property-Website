import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DISMISS_KEY = "instant-estimate-popup-dismissed";

export function InstantEstimatePopup() {
  const { t } = useLanguage();
  const pathname = useRouter().state.location.pathname;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "true");
  }, []);

  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    if (dismissed) return;

    const maybeShow = () => {
      if (visible) return;
      if (window.scrollY > window.innerHeight * 0.25) setVisible(true);
    };

    const onScroll = () => maybeShow();
    window.addEventListener("scroll", onScroll, { passive: true });
    maybeShow();

    const timer = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [visible, dismissed, pathname]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, "true");
  };

  if (!mounted || !visible || dismissed) return null;

  return createPortal(
    <div
      role="dialog"
      aria-labelledby="instant-estimate-title"
      className="fixed inset-x-4 bottom-20 z-[9999] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-black/95 p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <button
          type="button"
          aria-label={t("common.close")}
          onClick={dismiss}
          className="absolute right-4 top-4 rounded-full border border-white/15 p-2 text-white/70 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
          {t("offer.estimatorEyebrow")}
        </div>
        <h3
          id="instant-estimate-title"
          className="mt-4 font-serif text-2xl leading-tight text-white"
        >
          {t("offer.popupTitle")}
        </h3>
        <Link
          to="/offer"
          onClick={dismiss}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black"
        >
          {t("offer.popupCTA")} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>,
    document.body,
  );
}
