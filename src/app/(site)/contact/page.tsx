import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import MapEmbed from "@/components/sections/shared/MapEmbed";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import { CONTACT_INFO, IMAGES } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Contact Us",
  description: `Call ${CONTACT_INFO.phone}, email ${CONTACT_INFO.email}, or send a message — we reply to every enquiry within one working day.`,
  path: "/contact"
});

export default async function ContactPage() {
  const [hero, form, info, map] = await Promise.all([
    fetchSectionContentSSR("contact", "page-hero"),
    fetchSectionContentSSR("contact", "contact-form"),
    fetchSectionContentSSR("contact", "contact-info"),
    fetchSectionContentSSR("contact", "map-embed")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="Contact"
        title="Talk to a person, not a portal."
        subtitle="The phone is answered by the front desk during opening hours — no queue, no menu. Or send a message below and we will come back to you within a working day."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        ctaText="Book Appointment"
        ctaUrl="/appointment"
        secondaryText="Find Us"
        secondaryUrl="/location"
        image={IMAGES.reception}
        imageAlt="The front desk at Verda Dental"
      />

      <section className="section dark" id="contact">
        <div className="container">
          <div className="split-grid reverse">
            <ContactForm data={form} />
            <ContactInfo data={info} />
          </div>
        </div>
      </section>

      <MapEmbed data={map} variant="wide" />
    </SiteChrome>
  );
}
