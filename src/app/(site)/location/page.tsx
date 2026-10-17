import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import PageCTA from "@/components/sections/shared/PageCTA";
import MapEmbed from "@/components/sections/shared/MapEmbed";
import HoursAddress from "@/components/sections/location/HoursAddress";
import DirectionsSnippet from "@/components/sections/location/DirectionsSnippet";
import { CONTACT_INFO, IMAGES } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Location & Hours",
  description: `Find us at ${CONTACT_INFO.address.full} — free patient parking, step-free access, and Saturday morning appointments.`,
  path: "/location"
});

export default async function LocationPage() {
  const [hero, map, hours, directions, cta] = await Promise.all([
    fetchSectionContentSSR("location", "page-hero"),
    fetchSectionContentSSR("location", "map-embed"),
    fetchSectionContentSSR("location", "hours-address"),
    fetchSectionContentSSR("location", "directions"),
    fetchSectionContentSSR("location", "page-cta")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="Find Us"
        title="On the corner opposite the library."
        subtitle={`${CONTACT_INFO.address.full}. Free patient parking behind the building, a step-free entrance, and two bus routes stopping a two-minute walk away.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Location" }]}
        ctaText="Book Appointment"
        ctaUrl="/appointment"
        secondaryText="Contact Us"
        secondaryUrl="/contact"
        image={IMAGES.exterior}
        imageAlt="The building housing Verda Dental"
      />
      <MapEmbed data={map} variant="tall" showHeading={false} />
      <HoursAddress data={hours} />
      <DirectionsSnippet data={directions} />
      {/* Uses the new-patient offer default — the footer directly below
          already carries the "book your visit" message. */}
      <PageCTA data={cta} />
    </SiteChrome>
  );
}
