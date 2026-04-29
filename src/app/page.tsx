import { HeroSection } from "@/components/organisms/HeroSection";
import { ServicesSection } from "@/components/organisms/ServicesSection";
import { ProductsSection } from "@/components/organisms/ProductsSection";
import { QuoteSection } from "@/components/organisms/QuoteSection";
import { OEMTicker } from "@/components/organisms/OEMTicker";
import { AppSection } from "@/components/organisms/AppSection";
import { CTASection } from "@/components/organisms/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <QuoteSection />
      <OEMTicker />
      <AppSection />
      <CTASection />
    </>
  );
}
