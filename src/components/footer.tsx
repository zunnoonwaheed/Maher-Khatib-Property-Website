import { Instagram, Facebook, Linkedin, Mail, Phone } from "lucide-react";

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "Communities", href: "#areas" },
      { label: "Featured Listings", href: "#featured" },
      { label: "New Builds", href: "#builds" },
      { label: "Client Stories", href: "#stories" },
    ],
  },
  {
    title: "Work With Maher",
    links: [
      { label: "Sell With Maher", href: "#sell" },
      { label: "Get Your Offer", href: "#offer" },
      { label: "Buyer's Guide", href: "#buyers-guide" },
      { label: "Home Valuation", href: "#valuation" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Meet Maher", href: "#about" },
      { label: "Press", href: "#press" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-gold/25 bg-[#0d0a06] text-white"
      style={{
        backgroundImage:
          "radial-gradient(1200px 400px at 50% -10%, rgba(212,175,55,0.14), transparent 60%), linear-gradient(180deg, #100c07 0%, #050403 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="relative mx-auto max-w-[1500px] px-6 py-24 lg:px-12">

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/60 font-serif text-xl">
                MK
              </span>
              <span className="font-serif text-2xl">Maher Khatib</span>
            </div>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/60">
              A boutique Western Massachusetts real estate practice — quietly
              delivering luxury results across Springfield, Granby and beyond.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/80">
              <a href="tel:+14135550100" className="flex items-center gap-3 hover:text-gold">
                <Phone className="h-4 w-4" /> (413) 555-0100
              </a>
              <a href="mailto:hello@maherkhatib.com" className="flex items-center gap-3 hover:text-gold">
                <Mail className="h-4 w-4" /> hello@maherkhatib.com
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-all hover:border-gold hover:bg-gold hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7">
            {COLS.map((c) => (
              <div key={c.title}>
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
                  {c.title}
                </div>
                <ul className="mt-6 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="font-serif text-lg text-white/85 transition-colors hover:text-gold"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Maher Khatib Real Estate. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Fair Housing</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
