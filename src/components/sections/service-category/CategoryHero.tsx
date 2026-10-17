"use client";

import PageHero from "@/components/sections/shared/PageHero";
import { SITE_NAME, findCategory } from "@/lib/constants";

/** Turns `general-dentistry` into `General Dentistry` when nothing else is known. */
function humanize(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface CategoryHeroProps {
  category: string;
}

/**
 * Hub hero for a service category. Everything comes from the route param —
 * the category is looked up in constants and falls back to a humanized slug.
 * Renders through PageHero so tokens and motion stay identical to every other
 * inner page; nothing is re-styled here.
 */
export default function CategoryHero({ category }: CategoryHeroProps) {
  const categoryData = findCategory(category);
  const title = categoryData?.title ?? humanize(category);
  const subtitle =
    categoryData?.description ??
    "Have a look through the treatments below, or book a consultation and we will work out together which one you actually need.";

  return (
    <PageHero
      eyebrow="Our Services"
      title={title}
      subtitle={subtitle}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: title }
      ]}
      ctaText="Explore Treatments"
      ctaUrl="#treatments"
      secondaryText="Book a Consultation"
      secondaryUrl="/appointment"
      image={categoryData?.image}
      imageAlt={`${title} at ${SITE_NAME}`}
    />
  );
}
