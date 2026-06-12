import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { ServicesSection } from "@/components/sections/services";
import { AboutSection } from "@/components/sections/about";
import { PaymentPromoSection } from "@/components/sections/payment-promo";
import { NewsSection } from "@/components/sections/news";
import { InstallationsSection } from "@/components/sections/installations";
import { ReviewsSection } from "@/components/sections/reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <PaymentPromoSection />
      <NewsSection />
      <InstallationsSection />
      <ReviewsSection />
    </>
  );
}
