import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Testimonials } from "@/components/testimonials";
import { LeadForm } from "@/components/lead-form";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell With Maher | Sell Your Home for What It's Worth" },
      {
        name: "description",
        content:
          "White-glove listing strategy across Springfield, Granby and Maine. Cinematic marketing, sharper pricing, firm negotiation.",
      },
      { property: "og:title", content: "Sell With Maher" },
      {
        property: "og:description",
        content: "A boutique listing practice. Fewer clients, sharper strategy, better outcomes.",
      },
    ],
  }),
  component: SellPage,
});

const PILLARS = [
  {
    n: "01",
    t: "Pricing Strategy",
    b: "A defensible number. Priced to win the first fourteen days.",
    proof: ["Comparative market analysis", "Buyer-pool modeling", "Weekly re-read"],
    img: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    n: "02",
    t: "Cinematic Marketing",
    b: "Editorial photography, drone film, targeted paid reach.",
    proof: ["Twilight photography", "Cinematic drone film", "Paid social + Google"],
    img: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    n: "03",
    t: "Firm Negotiation",
    b: "Price, terms and timing — protected without theatrics.",
    proof: ["Multi-offer strategy", "Contingency management", "Repair credit calibration"],
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    n: "04",
    t: "Calm Closing",
    b: "No drama. No surprises. No midnight emails.",
    proof: ["Weekly checkpoints", "Vendor coordination", "Post-close support"],
    img: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const CHECKLIST = [
  "Editorial photo + drone shoot",
  "Twilight and lifestyle imagery",
  "3D floor plan and matterport",
  "Print brochure with copywriting",
  "Custom listing microsite",
  "Paid social + Google Ads",
  "Broker preview event",
  "Weekly seller report",
];

const RESULTS = [
  { k: "$150M+", v: "Sold" },
  { k: "98%", v: "List-to-close" },
  { k: "17 days", v: "Median DOM" },
  { k: "104%", v: "Of asking" },
];

function SellPage() {
  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Full-screen image hero */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1700px] flex-col items-start justify-center px-6 pt-32 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Seller's Agent
            </span>
          </div>
          <h1 className="mt-8 max-w-6xl font-serif text-6xl leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[7.5rem]">
            Sell for what it's <br />
            <span className="italic">actually worth.</span>
          </h1>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#sell-form"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start the Conversation <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md transition-colors hover:border-gold hover:text-gold"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>

      {/* Results ribbon — unique to Sell */}
      <section className="border-y border-white/5 bg-[#080808]">
        <div className="mx-auto grid max-w-[1700px] grid-cols-2 divide-x divide-white/5 lg:grid-cols-4">
          {RESULTS.map((r) => (
            <div key={r.v} className="px-6 py-10 lg:px-10 lg:py-14">
              <div className="font-serif text-5xl text-white lg:text-6xl">{r.k}</div>
              <div className="mt-3 text-[0.65rem] uppercase tracking-[0.32em] text-white/50">
                {r.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky scroll pillars — pinned title, columns scrolling next to it */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-12 lg:gap-24 lg:px-12 lg:py-32">
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                  The Four Pillars
                </span>
              </div>
              <h2 className="mt-8 font-serif text-5xl leading-[0.98] tracking-tight text-white lg:text-[5.5rem]">
                Fewer clients. <br />
                <span className="italic text-white/80">Sharper outcomes.</span>
              </h2>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-white/60">
                A boutique listing practice. Homes sell better when someone cares.
              </p>
              <div className="mt-10 h-px w-24 bg-gold/50" />
              <div className="mt-6 font-serif text-xl italic text-white/50">
                "The details are the strategy."
              </div>
            </div>
          </aside>

          <div className="space-y-6 lg:col-span-7">
            {PILLARS.map((p) => (
              <article
                key={p.n}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d0d0d] to-black transition-colors hover:border-gold/40"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[220px,1fr]">
                  <div className="relative min-h-[220px] overflow-hidden sm:min-h-full">
                    <img
                      src={p.img}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/70" />
                    <div className="absolute left-6 top-6 font-serif text-6xl text-gold/80 lg:text-7xl">
                      {p.n}
                    </div>
                  </div>
                  <div className="p-8 lg:p-10">
                    <h3 className="font-serif text-3xl leading-tight tracking-tight text-white lg:text-4xl">
                      {p.t}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                      {p.b}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.proof.map((x) => (
                        <li
                          key={x}
                          className="rounded-full border border-white/15 px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-white/70"
                        >
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing checklist — dual column list with cinematic imagery */}
      <section className="relative overflow-hidden border-t border-white/5 bg-[#070707] py-24 lg:py-32">
        <img
          src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                  Every Listing Includes
                </span>
              </div>
              <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
                The full <span className="italic">marketing suite</span>.
              </h2>
              <p className="mt-6 max-w-md text-white/60">
                No tiers. No upsells. Every home gets the full treatment.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2">
                {CHECKLIST.map((c, i) => (
                  <li
                    key={c}
                    className="group flex items-center gap-4 border-b border-white/10 py-5"
                  >
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-gold/40 text-gold">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-serif text-xl text-white/90 group-hover:text-white">
                      {c}
                    </span>
                    <span className="ml-auto text-[0.6rem] uppercase tracking-[0.32em] text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Signature: Live Market Pulse — mini editorial dashboard */}
      <section className="relative overflow-hidden border-t border-white/5 bg-black py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1700px] px-6 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                  Live Market Pulse
                </span>
              </div>
              <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-tight text-white lg:text-[5rem]">
                What the market is <br />
                <span className="italic text-white/80">actually doing.</span>
              </h2>
            </div>
            <div className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
              Updated weekly · Springfield · Granby · Longmeadow · Southern Maine
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Median sale price", v: "$542K", d: "+6.8% YoY", w: "82%" },
              { k: "Days on market", v: "17", d: "−9 days vs. 2024", w: "34%" },
              { k: "Over-asking rate", v: "62%", d: "of listings closed", w: "62%" },
              { k: "Buyer demand index", v: "High", d: "3.1 offers avg.", w: "88%" },
            ].map((m) => (
              <div
                key={m.k}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0e0e] to-black p-8 transition-colors hover:border-gold/40"
              >
                <div className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
                  {m.k}
                </div>
                <div className="mt-6 font-serif text-6xl text-white">{m.v}</div>
                <div className="mt-3 text-sm text-gold/90">{m.d}</div>
                <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold/50 to-gold transition-all duration-1000 group-hover:opacity-100"
                    style={{ width: m.w }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-[#080808] p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="max-w-xl">
              <div className="font-serif text-2xl text-white lg:text-3xl">
                Curious what <span className="italic text-gold">your home</span> would land at today?
              </div>
            </div>
            <a
              href="#sell-form"
              className="inline-flex flex-none items-center gap-3 rounded-full bg-gold px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5"
            >
              Get My Number <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Testimonials />


      {/* Cinematic form section */}
      <section id="sell-form" className="relative overflow-hidden py-24 lg:py-32">
        <img
          src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                Start the Conversation
              </span>
            </div>
            <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              Tell me about your <span className="italic">home</span>.
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              Private. Zero pressure.
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              title="Sell With Maher"
              submitLabel="Send Details"
              fields={[
                { name: "name", label: "Name", placeholder: "Full name" },
                { name: "phone", label: "Phone", placeholder: "(413) 555-0100" },
                { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
                { name: "address", label: "Property Address", placeholder: "Street, City" },
                { name: "message", label: "Message", placeholder: "Anything I should know?", textarea: true },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
