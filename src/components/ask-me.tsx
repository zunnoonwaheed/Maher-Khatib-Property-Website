import { ArrowUpRight } from "lucide-react";

export function AskMe() {
  return (
    <section
      id="ask"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <img
        src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1800&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/65" />
      <div className="relative mx-auto max-w-[1500px] px-6 text-center lg:px-12">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
          Ask Me Anything
        </span>
        <h2 className="mx-auto mt-8 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[5rem]">
          A single conversation can <span className="italic">change everything</span>.
        </h2>
        <a
          href="#contact"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-white px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-1"
        >
          Book a Call
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
