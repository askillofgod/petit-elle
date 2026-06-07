import { HeroSection } from "@/components/sections/hero-section";
import { BrandStorySection } from "@/components/sections/brand-story-section";
import { SignatureSection } from "@/components/sections/signature-section";
import { ProgramSection } from "@/components/sections/program-section";
import { WhySection } from "@/components/sections/why-section";
import { SpaceGallerySection } from "@/components/sections/space-gallery-section";
import { ReservationCtaSection } from "@/components/sections/reservation-cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { LocationSection } from "@/components/sections/location-section";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HeroSection />
      <BrandStorySection />
      <SignatureSection />
      <ProgramSection />
      <WhySection />
      <SpaceGallerySection />
      <ReservationCtaSection />
      <FaqSection />
      <LocationSection />
    </>
  );
}
