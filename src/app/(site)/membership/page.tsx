import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import PageCTA from "@/components/sections/shared/PageCTA";
import MembershipPlans from "@/components/sections/membership/MembershipPlans";
import MembershipFAQ from "@/components/sections/membership/MembershipFAQ";
import { IMAGES } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Membership Plan",
  description:
    "An in-house dental savings plan for patients without insurance — cleanings, exams and X-rays included, with no waiting periods or annual maximum.",
  path: "/membership"
});

export default async function MembershipPage() {
  const [hero, plans, faqs, cta] = await Promise.all([
    fetchSectionContentSSR("membership", "page-hero"),
    fetchSectionContentSSR("membership", "membership-plans"),
    fetchSectionContentSSR("membership", "membership-faq"),
    fetchSectionContentSSR("membership", "page-cta")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="Membership"
        title="No insurance? This costs less than putting it off."
        subtitle="A plan run directly by this practice — no claim forms, no waiting periods, no annual maximum. Join today and book your cleaning today."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Membership" }]}
        ctaText="Join the Plan"
        ctaUrl="/contact"
        secondaryText="Ask a Question"
        secondaryUrl="/contact"
        image={IMAGES.hygiene}
        imageAlt="A hygienist preparing for a cleaning appointment"
      />
      <MembershipPlans data={plans} />
      <MembershipFAQ data={faqs} />
      <PageCTA
        data={cta}
        eyebrow="Join Today"
        heading="Join in about five minutes."
        subtext="Mention it at your next visit or call the front desk. Lila will confirm exactly what is included before you commit to anything."
        primaryCta="Join the Plan"
        primaryUrl="/contact"
      />
    </SiteChrome>
  );
}
