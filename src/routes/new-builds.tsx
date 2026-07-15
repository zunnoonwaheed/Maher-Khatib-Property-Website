import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/lead-form";

export const Route = createFileRoute("/new-builds")({
  head: () => ({
    meta: [
      { title: "New Builds & Investor Opportunities | Maher Khatib" },
      {
        name: "description",
        content:
          "Land acquisitions, ground-up development, and off-market investor opportunities across Western Mass and Maine.",
      },
      { property: "og:title", content: "New Builds & Investor Opportunities" },
      {
        property: "og:description",
        content: "Broker, builder, investor — the full lifecycle, under one roof.",
      },
    ],
  }),
  component: NewBuildsPage,
});

const PHASES = [
  {
    n: "01",
    t: "Land Acquisition",
    d: "Off-market parcels. Feasibility. Clean title.",
    img: "https://images.pexels.com/photos/1029611/pexels-photo-1029611.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    n: "02",
    t: "Design & Permitting",
    d: "Plans that actually get built.",
    img: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    n: "03",
    t: "Ground-Up Build",
    d: "Trusted trades. Disciplined budgets.",
    img: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    n: "04",
    t: "Disposition",
    d: "Editorial marketing. Private buyer network.",
    img: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const BENTO = [
  {
    span: "lg:col-span-8 lg:row-span-2",
    img: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=2000",
    tag: "Coastal Development",
    title: "Southern Maine — 8 units",
  },
  {
    span: "lg:col-span-4",
    img: "https://images.pexels.com/photos/2131970/pexels-photo-2131970.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tag: "Land",
    title: "Granby — 12 acres",
  },
  {
    span: "lg:col-span-4",
    img: "https://images.pexels.com/photos/2029731/pexels-photo-2029731.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tag: "Infill",
    title: "Springfield — Duplex",
  },
  {
    span: "lg:col-span-6",
    img: "https://images.pexels.com/photos/259593/pexels-photo-259593.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tag: "Off-Market",
    title: "Portfolio of 6 SFH",
  },
  {
    span: "lg:col-span-6",
    img: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tag: "Ground Up",
    title: "New Construction Spec",
  },
];

function NewBuildsPage() {
  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Cinematic image hero */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src="https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1700px] flex-col items-start justify-center px-6 pt-32 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              New Builds & Investors
            </span>
          </div>
          <h1 className="mt-8 max-w-6xl font-serif text-6xl leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[7.5rem]">
            Land. Build. <br />
            <span className="italic">Return.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/70">
            Off-market land. Ground-up construction. Disciplined exits.
          </p>
        </div>
      </section>


      {/* Bento gallery — mixed sizes, no cards */}
      <section className="px-6 pb-24 lg:px-12 lg:pb-32">
        <div className="mx-auto grid max-w-[1700px] auto-rows-[260px] grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-[300px]">
          {BENTO.map((b) => (
            <div
              key={b.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 ${b.span}`}
            >
              <img
                src={b.img}
                alt={b.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <div className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold">
                  {b.tag}
                </div>
                <div className="mt-2 font-serif text-2xl text-white lg:text-3xl">
                  {b.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phases — horizontal timeline ribbon (distinct from other pages) */}
      <section className="relative overflow-hidden border-t border-white/5 bg-[#050505] py-24 lg:py-32">
        <div className="mx-auto max-w-[1700px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                Development Lifecycle
              </span>
            </div>
            <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              Dirt to <span className="italic">disposition</span>.
            </h2>
          </div>

          <div className="relative mt-20">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <ol className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {PHASES.map((p) => (
                <li key={p.n} className="relative">
                  <div className="flex items-center gap-4">
                    <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-black font-serif text-lg text-gold">
                      {p.n}
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="mt-8 aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={p.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-110"
                    />
                  </div>
                  <div className="mt-6 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold">
                    Phase {p.n}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-white lg:text-3xl">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>


      {/* Signature: Live Deal Snapshot — investor-grade cards, unique to New Builds */}
      <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
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
                  Active Deal Book
                </span>
              </div>
              <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-tight text-white lg:text-[5rem]">
                What's <span className="italic">on the desk</span> right now.
              </h2>
            </div>
            <div className="text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
              Redacted addresses · Full deck on request under NDA
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                tag: "Ground-Up Spec",
                loc: "Longmeadow, MA",
                price: "$2.8M",
                img: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1400",
                metrics: [
                  { k: "Land basis", v: "$420K" },
                  { k: "Build cost", v: "$1.6M" },
                  { k: "Target ARV", v: "$3.4M" },
                  { k: "Projected IRR", v: "22%" },
                ],
              },
              {
                tag: "Small Multifamily",
                loc: "Springfield, MA",
                price: "$1.15M",
                img: "https://images.pexels.com/photos/2029731/pexels-photo-2029731.jpeg?auto=compress&cs=tinysrgb&w=1400",
                metrics: [
                  { k: "Units", v: "6" },
                  { k: "Gross rent", v: "$11.4K/mo" },
                  { k: "Cap rate", v: "8.1%" },
                  { k: "Cash-on-cash", v: "14%" },
                ],
              },
              {
                tag: "Coastal Development",
                loc: "Southern Maine",
                price: "$4.2M",
                img: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1400",
                metrics: [
                  { k: "Parcels", v: "8 lots" },
                  { k: "Entitled", v: "Yes" },
                  { k: "Sellout", v: "$9.6M" },
                  { k: "Projected IRR", v: "28%" },
                ],
              },
            ].map((d) => (
              <article
                key={d.tag + d.loc}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0e0e] to-black transition-colors hover:border-gold/40"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={d.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold">
                      {d.tag}
                    </span>
                    <span className="rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[0.55rem] uppercase tracking-[0.28em] text-white/70 backdrop-blur-md">
                      Open
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-10">
                  <div className="font-serif text-2xl text-white">{d.loc}</div>
                  <div className="mt-2 font-serif text-5xl text-white">{d.price}</div>
                  <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-white/10 pt-6">
                    {d.metrics.map((m) => (
                      <div key={m.k}>
                        <dt className="text-[0.55rem] uppercase tracking-[0.32em] text-white/40">
                          {m.k}
                        </dt>
                        <dd className="mt-1 font-serif text-xl text-white">{m.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href="#investor"
                    className="mt-8 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/70 transition-colors hover:text-gold"
                  >
                    Request Full Deck <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Investor form */}
      <section id="investor" className="relative overflow-hidden py-24 lg:py-32">

        <img
          src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                Investor Inquiry
              </span>
            </div>
            <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              Off-market <span className="italic">opportunities</span>, first look.
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              Land. Spec. Small multifamily.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white hover:border-gold hover:text-gold"
            >
              Or Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              title="Join the Investor List"
              submitLabel="Send Inquiry"
              fields={[
                { name: "name", label: "Name", placeholder: "Full name" },
                { name: "phone", label: "Phone", placeholder: "(413) 555-0100" },
                { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
                { name: "focus", label: "Focus", placeholder: "Land, spec, multifamily…" },
                { name: "message", label: "Notes", placeholder: "Budget, timeline, market", textarea: true },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
