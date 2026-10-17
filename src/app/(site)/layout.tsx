import {
  GoogleAnalytics,
  MetaPixel,
  ScrollDepthTracker,
  ClickIdCapture
} from "@/components/Analytics";
import {
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateOrganizationSchema
} from "@/lib/schema";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main>{children}</main>

      <GoogleAnalytics />
      <MetaPixel />
      <ClickIdCapture />
      <ScrollDepthTracker />
    </>
  );
}
