import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function GetYourOffer() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="offer" className="relative bg-black py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Get Your Offer
            </span>
          </div>
          <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
            A discreet cash offer in <span className="italic">48 hours</span>.
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/60">
            Share a few details about your property. I'll personally review and
            reach out with a fair, no-obligation offer.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-3xl border border-white/10 bg-[#141414] p-8 sm:p-12 lg:col-span-7"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Full name" />
            <Field label="Phone" name="phone" placeholder="(413) 555-0100" />
            <Field label="Email" name="email" type="email" placeholder="you@email.com" />
            <Field label="Property Address" name="address" placeholder="Street, City" />
          </div>
          <button
            type="submit"
            className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            {submitted ? "Thank you — I'll be in touch" : "Request My Offer"}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-serif text-lg text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
      />
    </label>
  );
}
