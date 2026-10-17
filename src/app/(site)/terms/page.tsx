import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import TermsContent from "@/components/sections/terms/TermsContent";

export const metadata = generatePageMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply to using the Verda Dental website, including what the content is and is not, and how appointment requests work.",
  path: "/terms"
});

export default async function TermsPage() {
  const [hero, content] = await Promise.all([
    fetchSectionContentSSR("terms", "page-hero"),
    fetchSectionContentSSR("terms", "terms-content")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="Legal"
        title="Terms of Use"
        subtitle="The ground rules for using this site. In short: everything here is general information, not a diagnosis — and an appointment request is a request until we have confirmed it."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
        showCta={false}
      />
      <TermsContent data={content} />
    </SiteChrome>
  );
}
