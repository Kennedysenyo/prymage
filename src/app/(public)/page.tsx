import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { HeroSection } from "@/components/HeroSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ProductsSection } from "@/components/ProductSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SoftwareSolutions } from "@/components/SoftwareSolutions";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustedCompanies } from "@/components/TrustedCompaniesSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SoftwareSolutions />
      <ServicesSection />
      <ProductsSection />
      <IndustriesSection />
      <AboutSection />
      <TrustedCompanies />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
