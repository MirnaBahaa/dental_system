import PageShell from "@/components/layout/PageShell";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import GSAPGlobal from "@/components/sections/home/GSAPGlobal";

/**
 * Shared chrome for every inner page: nav, mobile menu, the GSAP scroll-reveal
 * runtime, the sticky booking CTA and the footer.
 *
 * The home page composes these itself so its hero-specific behaviour stays
 * untouched — inner pages wrap their sections in this instead.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <GSAPGlobal />
      <StickyCTA href="/appointment" />
      {children}
      <Footer />
    </PageShell>
  );
}
