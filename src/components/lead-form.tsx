import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Field = { name: string; label: string; type?: string; placeholder?: string; full?: boolean; textarea?: boolean };

type Props = {
  title: string;
  description?: string;
  fields: Field[];
  submitLabel: string;
  variant?: "dark" | "charcoal";
};

export function LeadForm({ title, description, fields, submitLabel, variant = "charcoal" }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const bg = variant === "dark" ? "bg-black" : "bg-[#0f0f0f]";

  return (
    <div className={`rounded-3xl border border-white/10 ${bg} p-8 sm:p-12`}>
      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
        {title}
      </div>
      {description ? (
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60">{description}</p>
      ) : null}
      <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {fields.map((f) => (
          <label
            key={f.name}
            className={`flex flex-col gap-2 ${f.full || f.textarea ? "sm:col-span-2" : ""}`}
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
              {f.label}
            </span>
            {f.textarea ? (
              <textarea
                name={f.name}
                placeholder={f.placeholder}
                rows={4}
                className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-serif text-lg text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
              />
            ) : (
              <input
                name={f.name}
                type={f.type ?? "text"}
                placeholder={f.placeholder}
                className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-serif text-lg text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
              />
            )}
          </label>
        ))}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            {submitted ? t('getYourOffer.thankYou') : submitLabel}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
