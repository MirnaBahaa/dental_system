import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import PageCTA from "@/components/sections/shared/PageCTA";
import CategoryTabs from "@/components/sections/services/CategoryTabs";
import CategoryGrid from "@/components/sections/services/CategoryGrid";
import WhyUs from "@/components/sections/services/WhyUs";
import { IMAGES } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Dental Services",
  description:
    "General, restorative, cosmetic, implant, orthodontic, surgical, emergency and children's dentistry — all under one roof in Maple Ridge.",
  path: "/services"
});

export default async function ServicesPage() {
  const [hero, tabs, categories, whyUs, cta] = await Promise.all([
    fetchSectionContentSSR("services", "page-hero"),
    fetchSectionContentSSR("services", "category-tabs"),
    fetchSectionContentSSR("services", "category-grid"),
    fetchSectionContentSSR("services", "why-us"),
    fetchSectionContentSSR("services", "page-cta")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="Our Services"
        title="Everything your family needs, under one roof."
        subtitle="From a child's first check-up to a full-arch reconstruction — including the lab work most practices send out. Pick a treatment below to read how it actually goes."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        ctaText="Book a Consultation"
        ctaUrl="/appointment"
        secondaryText="Ask a Question"
        secondaryUrl="/contact"
        image={IMAGES.tools}
        imageAlt="Treatment instruments laid out at Verda Dental"
      />
      <CategoryGrid data={categories} tabs={<CategoryTabs data={tabs} />} />
      <WhyUs data={whyUs} />
      <PageCTA
        data={cta}
        eyebrow="Free Consultation"
        heading="Not sure which one you need?"
        subtext="That is what the consultation is for. Book one and we will work it out together — including whether the answer is to do nothing yet."
      />
    </SiteChrome>
  );
}
