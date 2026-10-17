import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import PageCTA from "@/components/sections/shared/PageCTA";
import MissionValues from "@/components/sections/about/MissionValues";
import DoctorsSnippet from "@/components/sections/about/DoctorsSnippet";
import TeamSnippet from "@/components/sections/about/TeamSnippet";
import TrustSignals from "@/components/sections/about/TrustSignals";
import { IMAGES } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "About Our Practice",
  description:
    "Fifteen years of unhurried, modern dental care in Maple Ridge — meet the clinicians, the team and the values behind Verda Dental.",
  path: "/about"
});

export default async function AboutPage() {
  const [hero, mission, doctors, team, trust, cta] = await Promise.all([
    fetchSectionContentSSR("about", "page-hero"),
    fetchSectionContentSSR("about", "mission-values"),
    fetchSectionContentSSR("about", "doctors-snippet"),
    fetchSectionContentSSR("about", "team-snippet"),
    fetchSectionContentSSR("about", "trust-signals"),
    fetchSectionContentSSR("about", "page-cta")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="About Verda"
        title="A neighbourhood practice that grew up slowly."
        subtitle="We opened in 2010 with one chair and eleven people on the list. Fifteen years later we care for more than three thousand families — and we still book appointments long enough to actually talk."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        ctaText="Book Appointment"
        ctaUrl="/appointment"
        secondaryText="Meet the Team"
        secondaryUrl="/about#team"
        image={IMAGES.reception}
        imageAlt="The reception area at Verda Dental"
      />
      <MissionValues data={mission} />
      <DoctorsSnippet data={doctors} />
      <TeamSnippet data={team} />
      <TrustSignals data={trust} />
      <PageCTA
        data={cta}
        eyebrow="Visit Us"
        heading="Come and see whether we suit you."
        subtext="No obligation, no hard sell. Book a first visit and we will tell you honestly what — if anything — needs doing."
      />
    </SiteChrome>
  );
}
