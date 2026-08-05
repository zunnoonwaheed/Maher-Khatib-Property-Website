import type { Faq } from "@/lib/blog";

export function BlogFaqs({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <div className="mt-16 border-t border-white/10 pt-12">
      <h2 className="font-serif text-2xl text-white sm:text-3xl">Frequently Asked Questions</h2>
      <div className="mt-8 flex flex-col divide-y divide-white/10">
        {faqs.map((faq) => (
          <details key={faq.id} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-white marker:content-none">
              {faq.question}
              <span className="shrink-0 text-xl leading-none text-gold transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
