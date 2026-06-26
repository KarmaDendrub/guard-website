import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { AboutSection } from "@/components/sections/about";
import { NewsSection } from "@/components/sections/news";
import { InstallationsSection } from "@/components/sections/installations";
import { ReviewsSection } from "@/components/sections/reviews";
import { currentLang, getHeroContent, getStatsContent } from "@/lib/content";

export default async function HomePage() {
  const lang = await currentLang();
  const [hero, stats] = await Promise.all([
    getHeroContent(lang),
    getStatsContent(lang),
  ]);

  return (
    <>
      <Hero content={hero} />
      <StatsSection items={stats} />
      <AboutSection />
      <NewsSection />
      <InstallationsSection />
      <ReviewsSection />
    </>
  );
}
