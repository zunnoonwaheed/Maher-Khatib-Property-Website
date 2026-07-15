import { ArrowUpRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/70" />
      <div className="relative mx-auto max-w-[1500px] px-6 text-center lg:px-12">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
          Your Next Chapter
        </span>
        <h2 className="mx-auto mt-8 max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-[6rem]">
          Thinking About Your <span className="italic">Next Move</span>?
        </h2>
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#offer"
            className="inline-flex items-center gap-3 rounded-full bg-white px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-1"
          >
            Get Your Offer
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full border border-white/50 px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
          >
            Let's Talk
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
