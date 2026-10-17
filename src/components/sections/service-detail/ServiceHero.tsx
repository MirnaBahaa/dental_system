"use client";

import PageHero from "@/components/sections/shared/PageHero";
import { findTreatment } from "@/lib/constants";

/** Turns `teeth-cleaning` into `Teeth Cleaning` when nothing else is known. */
function humanize(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface ServiceHeroProps {
  category: string;
  slug: string;
}

/**
 * Builds the breadcrumb and heading from the route params, looking the
 * treatment up in constants and falling back to a humanized slug. It renders
 * through PageHero so the tokens and motion stay identical to every other
 * inner page — nothing is re-styled here.
 */
export default function ServiceHero({ category, slug }: ServiceHeroProps) {
  const match = findTreatment(category, slug);
  const title = match?.treatment.title ?? humanize(slug);
  const categoryTitle = match?.category.title ?? humanize(category);
  const subtitle =
    match?.treatment.summary ??
    "Ask us anything about this treatment — we will talk you through what it involves before you commit to anything.";

  return (
    <PageHero
      eyebrow={categoryTitle}
      title={title}
      subtitle={subtitle}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: categoryTitle, href: `/services/${category}` },
        { label: title }
      ]}
      ctaText="Book a Consultation"
      ctaUrl="/appointment"
      secondaryText="Ask a Question"
      secondaryUrl="/contact"
      image={match?.treatment.image}
      imageAlt={`${title} at Verda Dental`}
    />
  );
}
