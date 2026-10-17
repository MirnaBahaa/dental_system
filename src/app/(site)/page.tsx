import Hero from "@/components/sections/home/Hero";
import About from "@/components/sections/home/About";
import Partners from "@/components/sections/home/Partners";
import Services from "@/components/sections/home/Services";
import Process from "@/components/sections/home/Process";
import Portfolio from "@/components/sections/home/Portfolio";
import Testimonials from "@/components/sections/home/Testimonials";
import Team from "@/components/sections/home/Team";
import Blog from "@/components/sections/home/Blog";
import FAQ from "@/components/sections/home/FAQ";
import BookSection from "@/components/sections/home/BookSection";
import Gallery from "@/components/sections/home/Gallery";
import GSAPGlobal from "@/components/sections/home/GSAPGlobal";
import PageShell from "@/components/layout/PageShell";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";

export default function HomePage() {
  return (
    <PageShell>
      <GSAPGlobal />
      <StickyCTA />
      <Hero />
      <About />
      <Partners />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <Team />
      <Blog />
      <FAQ />
      <BookSection />
      <Gallery />
      <Footer />
    </PageShell>
  );
}
