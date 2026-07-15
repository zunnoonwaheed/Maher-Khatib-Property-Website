import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  media: string;
  isVideo?: boolean;
  children?: ReactNode;
  height?: "tall" | "medium";
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  media,
  isVideo,
  children,
  height = "medium",
}: Props) {
  const heightCls = height === "tall" ? "min-h-[92vh]" : "min-h-[72vh]";
  return (
    <section
      className={`relative flex ${heightCls} items-end overflow-hidden bg-black`}
    >
      {isVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <img
          src={media}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-20 pt-40 lg:px-12 lg:pb-28 lg:pt-48">
        {eyebrow ? (
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {eyebrow}
            </span>
          </div>
        ) : null}
        <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[5.5rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
