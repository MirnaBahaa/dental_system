import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import PageCTA from "@/components/sections/shared/PageCTA";
import GalleryGrid from "@/components/sections/before-and-after/GalleryGrid";
import Disclaimer from "@/components/sections/before-and-after/Disclaimer";
import { IMAGES } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Before & After Gallery",
  description:
    "Veneers, implants, aligners, bonding and periodontal therapy — real cases treated at Verda Dental, published with patient consent.",
  path: "/before-and-after"
});

export default async function BeforeAndAfterPage() {
  const [hero, gallery, disclaimer, cta] = await Promise.all([
    fetchSectionContentSSR("before-and-after", "page-hero"),
    fetchSectionContentSSR("before-and-after", "gallery-grid"),
    fetchSectionContentSSR("before-and-after", "disclaimer"),
    fetchSectionContentSSR("before-and-after", "page-cta")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="Before & After"
        title="Real smiles, real results."
        subtitle="Every case below was treated here and published with written consent. Read the treatment time alongside each one — good work is rarely instant."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Before & After" }]}
        ctaText="Book a Consultation"
        ctaUrl="/appointment"
        secondaryText="Read Reviews"
        secondaryUrl="/reviews"
        image={IMAGES.smile}
        imageAlt="A patient's smile after cosmetic treatment"
      />
      <GalleryGrid data={gallery} />
      <Disclaimer data={disclaimer} />
      <PageCTA
        data={cta}
        eyebrow="Free Consultation"
        heading="Curious what is possible for you?"
        subtext="Bring a photo of a smile you like. We will tell you honestly what is achievable, what it would take, and what it would cost."
      />
    </SiteChrome>
  );
}
