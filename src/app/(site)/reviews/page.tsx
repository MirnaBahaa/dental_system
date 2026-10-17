import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import PageCTA from "@/components/sections/shared/PageCTA";
import OverallRating from "@/components/sections/reviews/OverallRating";
import ReviewsGrid from "@/components/sections/reviews/ReviewsGrid";
import { IMAGES, OVERALL_RATING } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Patient Reviews",
  description: `${OVERALL_RATING.total.toLocaleString()} verified reviews averaging ${OVERALL_RATING.score} stars across Google, Facebook and Healthgrades.`,
  path: "/reviews"
});

export default async function ReviewsPage() {
  const [hero, rating, reviews, cta] = await Promise.all([
    fetchSectionContentSSR("reviews", "page-hero"),
    fetchSectionContentSSR("reviews", "overall-rating"),
    fetchSectionContentSSR("reviews", "reviews-grid"),
    fetchSectionContentSSR("reviews", "page-cta")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="Patient Stories"
        title="What people say when we are not in the room."
        subtitle="We do not filter, gate or chase reviews. What follows is what patients wrote, across every platform we are listed on."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
        ctaText="Book Appointment"
        ctaUrl="/appointment"
        secondaryText="See Our Results"
        secondaryUrl="/before-and-after"
        image={IMAGES.patientE}
        imageAlt="A patient smiling after their appointment"
      />
      <OverallRating data={rating} />
      <ReviewsGrid data={reviews} />
      <PageCTA
        data={cta}
        eyebrow="Your Turn"
        heading="Come and write your own."
        subtext="Most of these started with someone who had put off the dentist for years. Book a first visit and see how it goes."
      />
    </SiteChrome>
  );
}
