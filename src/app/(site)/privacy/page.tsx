import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import PrivacyContent from "@/components/sections/privacy/PrivacyContent";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description:
    "How Verda Dental collects, uses and protects your personal information — and how health records are handled under HIPAA.",
  path: "/privacy"
});

export default async function PrivacyPage() {
  const [hero, content] = await Promise.all([
    fetchSectionContentSSR("privacy", "page-hero"),
    fetchSectionContentSSR("privacy", "privacy-content")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="What we collect through this website, why we collect it, and the choices you have. Clinical records are covered separately by our Notice of Privacy Practices under HIPAA."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        showCta={false}
      />
      <PrivacyContent data={content} />
    </SiteChrome>
  );
}
