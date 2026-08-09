import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Story } from "@/components/Story";
import { Signatures } from "@/components/Signatures";
import { ValueBand } from "@/components/ValueBand";
import { MenuSection } from "@/components/MenuSection";
import { Deals } from "@/components/Deals";
import { Gallery } from "@/components/Gallery";
import { OrderSection } from "@/components/OrderSection";
import { Testimonials } from "@/components/Testimonials";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { OrderProvider } from "@/components/OrderProvider";
import { OrderDrawer } from "@/components/OrderDrawer";

export default function Home() {
  return (
    <OrderProvider>
      <a href="#menu" className="skip-link btn btn-primary px-6 py-3">
        Skip to the menu
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Story />
        <Signatures />
        <ValueBand />
        <MenuSection />
        <Deals />
        <Gallery />
        <OrderSection />
        <Testimonials />
        <Visit />
      </main>
      <Footer />
      <OrderDrawer />
    </OrderProvider>
  );
}
