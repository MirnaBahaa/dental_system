import { notFound } from "next/navigation";
import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageCTA from "@/components/sections/shared/PageCTA";
import CategoryHero from "@/components/sections/service-category/CategoryHero";
import CategoryIntro from "@/components/sections/service-category/CategoryIntro";
import TreatmentGrid from "@/components/sections/service-category/TreatmentGrid";
import ProcedureSteps from "@/components/sections/service-detail/ProcedureSteps";
import ServiceFAQ from "@/components/sections/service-detail/ServiceFAQ";
import ServiceMenu from "@/components/sections/service-detail/ServiceMenu";
import { SERVICE_CATEGORIES, findCategory } from "@/lib/constants";

interface Props {
  params: Promise<{ category: string }>;
}

/** Pre-render every category listed in constants. */
export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const match = findCategory(category);
  if (!match) return generatePageMetadata({ title: "Category Not Found", noIndex: true });

  return generatePageMetadata({
    title: match.title,
    description: match.description,
    path: `/services/${category}`
  });
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params;

  // Unknown categories must 404 rather than render an empty shell.
  if (!findCategory(category)) notFound();

  const [intro, treatments, steps, faq, menu, cta] = await Promise.all([
    fetchSectionContentSSR("service-category", `${category}-intro`),
    fetchSectionContentSSR("service-category", `${category}-treatments`),
    fetchSectionContentSSR("service-category", `${category}-steps`),
    fetchSectionContentSSR("service-category", `${category}-faq`),
    fetchSectionContentSSR("service-category", "services-menu"),
    fetchSectionContentSSR("service-category", "page-cta")
  ]);

  return (
    <SiteChrome>
      <CategoryHero category={category} />
      <CategoryIntro data={intro} category={category} />
      <TreatmentGrid data={treatments} category={category} />
      <ProcedureSteps data={steps} category={category} />
      <ServiceFAQ data={faq} category={category} />
      <ServiceMenu data={menu} category={category} />
      <PageCTA data={cta} />
    </SiteChrome>
  );
}
