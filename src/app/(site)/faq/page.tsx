import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/schema";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import PageCTA from "@/components/sections/shared/PageCTA";
import FAQAccordion from "@/components/sections/faq/FAQAccordion";

export const metadata = generatePageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Insurance, first visits, sedation, emergencies, costs and cancellations — the questions patients ask us most, answered properly.",
  path: "/faq"
});

export default async function FAQPage() {
  const [hero, faqs, cta] = await Promise.all([
    fetchSectionContentSSR("faq", "page-hero"),
    fetchSectionContentSSR("faq", "faq-accordion"),
    fetchSectionContentSSR("faq", "page-cta")
  ]);

  const faqSchema = generateFAQSchema();

  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        data={hero}
        eyebrow="FAQs"
        title="The questions we get asked most."
        subtitle="Answered properly, without the hedging. If yours is not here, call the front desk — nobody minds explaining something twice."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        ctaText="Book Appointment"
        ctaUrl="/appointment"
        secondaryText="Ask Us Directly"
        secondaryUrl="/contact"
      />
      <FAQAccordion data={faqs} />
      <PageCTA
        data={cta}
        eyebrow="Ask Us Directly"
        heading="Still have a question?"
        subtext="Call the practice and ask. We would rather spend five minutes on the phone than have you put off a visit."
      />
    </SiteChrome>
  );
}
