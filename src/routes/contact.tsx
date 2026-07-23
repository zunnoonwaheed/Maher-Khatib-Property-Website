import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ArrowUpRight, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/lead-form";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Maher Khatib | Massachusetts & Connecticut Real Estate" },
      {
        name: "description",
        content:
          "A direct line to Maher for listings, offers, new builds and investment opportunities.",
      },
      { property: "og:title", content: "Contact Maher Khatib" },
      {
        property: "og:description",
        content: "One person. One conversation. A direct line to Maher.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();

  const CHANNELS = [
    {
      icon: Phone,
      label: t('contact.channelCall'),
      value: t('contact.channelCallValue'),
      href: "tel:+16045551234",
      detail: t('contact.channelCallDetail'),
    },
    {
      icon: Mail,
      label: t('contact.channelEmail'),
      value: t('contact.channelEmailValue'),
      href: "mailto:maher@mbcrealtors.ca",
      detail: t('contact.channelEmailDetail'),
    },
    {
      icon: Calendar,
      label: t('contact.channelBook'),
      value: t('contact.channelBookValue'),
      href: "#contact-form",
      detail: t('contact.channelBookDetail'),
    },
  ];

  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Full-bleed cinematic hero with floating channel cards — distinct pattern */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src="https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1700px] flex-col justify-center px-6 pt-32 pb-16 lg:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t('contact.eyebrow')}
              </span>
            </div>
            <h1 className="mt-8 font-serif text-6xl leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-[8.5rem]">
              {t('contact.heroTitle')} <br />
              <span className="italic">{t('contact.heroTitleItalic')}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
              {t('contact.heroSubtitle')}
            </p>
          </div>

          {/* Floating channel cards */}
          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
            {CHANNELS.map(({ icon: Icon, label, value, href, detail }) => (
              <a
                key={label}
                href={href}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black/50 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-gold/50"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-gold" />
                </div>
                <div className="mt-8 text-[0.6rem] uppercase tracking-[0.4em] text-white/40">
                  {label}
                </div>
                <div className="mt-3 font-serif text-2xl text-white lg:text-3xl">
                  {value}
                </div>
                <div className="mt-3 text-sm text-white/50">{detail}</div>
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* Form — plain, no background image (differentiates from other pages) */}
      <section id="contact-form" className="border-t border-white/5 bg-[#070707] py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                {t('contact.formEyebrow')}
              </span>
            </div>
            <h2 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-white lg:text-6xl">
              {t('contact.formTitle')} <span className="italic">{t('contact.formTitleItalic')}</span>.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-3">
              <a
                href="tel:+16045551234"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white hover:border-gold hover:text-gold"
              >
                <Phone className="h-3.5 w-3.5" /> {t('contact.channelCall')}
              </a>
              <a
                href="mailto:maher@mbcrealtors.ca"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white hover:border-gold hover:text-gold"
              >
                <Mail className="h-3.5 w-3.5" /> {t('contact.channelEmail')}
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              title={t('contact.formTitle')}
              submitLabel={t('contact.formSubmit')}
              fields={[
                { name: "name", label: t('form.name'), placeholder: t('form.fullName') },
                { name: "phone", label: t('form.phone'), placeholder: t('form.phonePlaceholder') },
                { name: "email", label: t('form.email'), type: "email", placeholder: t('form.emailPlaceholder') },
                { name: "message", label: t('form.whatCanIHelp'), placeholder: t('form.whatCanIHelpPlaceholder'), textarea: true },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Map — cinematic, full width */}
      <section className="relative border-t border-white/5">
        <div className="relative h-[600px] w-full overflow-hidden bg-[#0a0a0a]">
          <iframe
            title="Service area map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1500000!2d-71.5!3d43.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000"
            className="absolute inset-0 h-full w-full opacity-70 grayscale invert"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
          <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center lg:left-16">
            <div className="max-w-md">
              <div className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">
                {t('contact.mapEyebrow')}
              </div>
              <h3 className="mt-6 font-serif text-5xl leading-[1.02] text-white lg:text-6xl">
                {t('contact.mapTitle')} <br />
                <span className="italic">{t('contact.mapTitleItalic')}</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
