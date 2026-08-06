import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Story } from "@/components/Story";
import { Signatures } from "@/components/Signatures";
import { ValueBand } from "@/components/ValueBand";
import { MenuSection } from "@/components/MenuSection";
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
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Signatures />
        <ValueBand />
        <MenuSection />
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
