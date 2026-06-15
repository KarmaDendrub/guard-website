import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { AboutSection } from "@/components/sections/about";
import { NewsSection } from "@/components/sections/news";
import { InstallationsSection } from "@/components/sections/installations";
import { ReviewsSection } from "@/components/sections/reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutSection />
      <NewsSection />
      <InstallationsSection />
      <ReviewsSection />
    </>
  );
}
