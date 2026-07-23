import { useEffect, useRef, useState } from "react";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CENTER_VIDEO =
  "/videos/why-maher-center.mp4";
const CENTER_VIDEO_WEBM = "/videos/why-maher-center.webm";
const CENTER_POSTER = "/videos/why-maher-center.jpg";
const MEET_MAHER_VIDEO = "/videos/why-maher-meet.mp4";
const MEET_MAHER_VIDEO_WEBM = "/videos/why-maher-meet.webm";
const MEET_MAHER_POSTER = "/videos/why-maher-meet.jpg";
const SUCCESS_VIDEO = "/videos/why-maher-success.mp4";
const SUCCESS_VIDEO_WEBM = "/videos/why-maher-success.webm";
const SUCCESS_POSTER = "/videos/why-maher-success.jpg";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

type SideCardProps = {
  label: string;
  video: string;
  videoWebm: string;
  poster: string;
  href: string;
  side: "left" | "right";
  delay?: string;
  labelNum: string;
};

function SideCard({ label, video, videoWebm, poster, href, side, delay, labelNum }: SideCardProps) {
  const { ref, shown } = useReveal<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href={href}
      style={{ transitionDelay: delay }}
      className={`group relative block h-[620px] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-all duration-1000 ease-out will-change-transform hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_50px_120px_-40px_rgba(212,175,55,0.35)] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {/* Video */}
      <video
        className="absolute inset-0 h-full w-full scale-110 object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-100"
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src={videoWebm} type="video/webm" />
        <source src={video} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at 50% 100%, rgba(212,175,55,0.22), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Corner arrow */}
      <span
        className={`absolute top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-md transition-all duration-500 group-hover:border-[color:var(--gold)] group-hover:bg-white/15 ${
          side === "left" ? "left-6" : "right-6"
        }`}
      >
        <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>

      {/* Vertical label */}
      <div
        className={`absolute inset-y-0 flex items-center ${
          side === "left" ? "left-6" : "right-6"
        }`}
      >
        <span
          className="font-serif text-sm font-medium uppercase tracking-[0.55em] text-white/90"
          style={{
            writingMode: "vertical-rl",
            transform: side === "left" ? "rotate(180deg)" : "none",
          }}
        >
          {label}
        </span>
      </div>

      {/* Bottom accent */}
      <div className="absolute inset-x-6 bottom-6 flex items-center gap-3">
        <span className="h-px w-8 bg-[color:var(--gold)]/80 transition-all duration-500 group-hover:w-16" />
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-white/60">
          {labelNum}
        </span>
      </div>
    </a>
  );
}

export function WhyMaher() {
  const { t } = useLanguage();
  const heading = useReveal<HTMLDivElement>();
  const video = useReveal<HTMLDivElement>();
  const centerVideoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = centerVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      v.pause();
    }
  };




  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,175,55,0.15), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-10">
        {/* Intro */}
        <div
          ref={heading.ref}
          className={`mx-auto max-w-3xl text-center transition-all duration-1000 ease-out ${
            heading.shown
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[color:var(--gold)]/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-[color:var(--gold)]">
              {t('whyMaher.eyebrow')}
            </span>
            <span className="h-px w-10 bg-[color:var(--gold)]/70" />
          </div>

          <h2 className="mt-8 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t('whyMaher.title')}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {t('whyMaher.description')}
          </p>
        </div>

        {/* Grid: thin left · big video · thin right */}
        <div className="mt-24 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[180px_minmax(0,1fr)_180px] lg:gap-8">
          <div className="hidden lg:block">
            <SideCard
              label={t('whyMaher.videoTitle1')}
              video={MEET_MAHER_VIDEO}
              videoWebm={MEET_MAHER_VIDEO_WEBM}
              poster={MEET_MAHER_POSTER}
              href="#meet-maher"
              side="left"
              delay="120ms"
              labelNum="01"
            />
          </div>

          {/* Center video */}
          <div
            ref={video.ref}
            className={`group relative h-[520px] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_50px_140px_-30px_rgba(0,0,0,0.9)] transition-all duration-1000 ease-out lg:h-[620px] ${
              video.shown
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <video
              ref={centerVideoRef}
              className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-100"
              poster={CENTER_POSTER}
              muted
              loop
              playsInline
              preload="auto"
              onClick={togglePlay}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => setPlaying(false)}
              aria-hidden="true"
            >
              <source src={CENTER_VIDEO_WEBM} type="video/webm" />
              <source src={CENTER_VIDEO} type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40"
              aria-hidden="true"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-4 rounded-[1.5rem] border border-white/10"
            />

            {/* Play / pause button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause the film" : "Play the film"}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-500"
            >
              <span
                className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-xl transition-all duration-500 group-hover:scale-110 group-hover:border-[color:var(--gold)] group-hover:bg-white/20"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full"
                  style={{ animation: "gold-pulse 2.4s ease-out infinite" }}
                />
                {playing ? (
                  <Pause className="h-8 w-8 text-white" fill="currentColor" />
                ) : (
                  <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
                )}
              </span>
            </button>

            {/* Top eyebrow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[color:var(--gold)]/80" />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/80">
                  {t('whyMaher.watchFilm')}
                </span>
              </div>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/60">
                {t('whyMaher.filmDuration')}
              </span>
            </div>

            {/* Bottom title */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-8 lg:p-10">
              <h3 className="font-serif text-4xl font-medium leading-tight text-white sm:text-5xl">
                {t('whyMaher.videoTitle1')}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
                {t('whyMaher.videoDesc1')}
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <SideCard
              label={t('whyMaher.videoTitle2')}
              video={SUCCESS_VIDEO}
              videoWebm={SUCCESS_VIDEO_WEBM}
              poster={SUCCESS_POSTER}
              href="#stories"
              side="right"
              delay="220ms"
              labelNum="02"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
