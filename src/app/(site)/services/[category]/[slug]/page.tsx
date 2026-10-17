import { notFound } from "next/navigation";
import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageCTA from "@/components/sections/shared/PageCTA";
import ServiceHero from "@/components/sections/service-detail/ServiceHero";
import ServiceOverview from "@/components/sections/service-detail/ServiceOverview";
import ServiceGallery from "@/components/sections/service-detail/ServiceGallery";
import ProcedureSteps from "@/components/sections/service-detail/ProcedureSteps";
import ServiceBenefits from "@/components/sections/service-detail/ServiceBenefits";
import ServiceReviews from "@/components/sections/service-detail/ServiceReviews";
import ServiceFAQ from "@/components/sections/service-detail/ServiceFAQ";
import RelatedServices from "@/components/sections/service-detail/RelatedServices";
import ServiceMenu from "@/components/sections/service-detail/ServiceMenu";
import { ALL_TREATMENTS, findTreatment } from "@/lib/constants";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

/** Pre-render every treatment listed in constants. */
export function generateStaticParams() {
  return ALL_TREATMENTS.map((treatment) => ({
    category: treatment.category,
    slug: treatment.slug
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const match = findTreatment(category, slug);
  if (!match) return generatePageMetadata({ title: "Service Not Found", noIndex: true });

  return generatePageMetadata({
    title: `${match.treatment.title} — ${match.category.title}`,
    description: match.treatment.summary,
    path: `/services/${category}/${slug}`
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { category, slug } = await params;

  // Unknown category/slug combinations must 404 rather than render an empty shell.
  if (!findTreatment(category, slug)) notFound();

  const [overview, gallery, steps, benefits, reviews, faq, related, menu, cta] = await Promise.all([
    fetchSectionContentSSR("service-detail", `${slug}-overview`),
    fetchSectionContentSSR("service-detail", `${slug}-gallery`),
    fetchSectionContentSSR("service-detail", `${slug}-steps`),
    fetchSectionContentSSR("service-detail", `${slug}-benefits`),
    fetchSectionContentSSR("service-detail", `${slug}-reviews`),
    fetchSectionContentSSR("service-detail", `${slug}-faq`),
    fetchSectionContentSSR("service-detail", `${slug}-related`),
    fetchSectionContentSSR("service-detail", "services-menu"),
    fetchSectionContentSSR("service-detail", "page-cta")
  ]);

  return (
    <SiteChrome>
      <ServiceHero category={category} slug={slug} />
      <ServiceOverview data={overview} category={category} slug={slug} />
      <ServiceGallery data={gallery} category={category} slug={slug} />
      <ProcedureSteps data={steps} category={category} />
      <ServiceBenefits data={benefits} category={category} slug={slug} />
      <ServiceReviews data={reviews} category={category} />
      <ServiceFAQ data={faq} category={category} />
      <RelatedServices data={related} category={category} currentSlug={slug} />
      <ServiceMenu data={menu} category={category} currentSlug={slug} />
      <PageCTA data={cta} />
    </SiteChrome>
  );
}
