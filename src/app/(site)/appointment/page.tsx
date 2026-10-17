import { fetchSectionContentSSR } from "@/lib/api";
import { generatePageMetadata } from "@/lib/metadata";
import SiteChrome from "@/components/layout/SiteChrome";
import PageHero from "@/components/sections/shared/PageHero";
import TrustBar from "@/components/sections/appointment/TrustBar";
import BookingForm from "@/components/sections/appointment/BookingForm";
import { IMAGES } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Book an Appointment",
  description:
    "Request an appointment at Verda Dental. New patients welcome, most insurance accepted, and same-day slots held open every working day.",
  path: "/appointment"
});

export default async function AppointmentPage() {
  const [hero, trust, form] = await Promise.all([
    fetchSectionContentSSR("appointment", "page-hero"),
    fetchSectionContentSSR("appointment", "trust-bar"),
    fetchSectionContentSSR("appointment", "booking-form")
  ]);

  return (
    <SiteChrome>
      <PageHero
        data={hero}
        eyebrow="Book a Visit"
        title="Let's find you a time."
        subtitle="Send a request and the front desk will call to confirm — usually within a couple of hours during opening hours. Nothing is booked until you have heard from us."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Book Appointment" }]}
        image={IMAGES.consult}
        imageAlt="A dentist greeting a patient before their appointment"
      />
      <TrustBar data={trust} />
      <BookingForm data={form} />
    </SiteChrome>
  );
}
