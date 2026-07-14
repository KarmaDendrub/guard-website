import { getTranslations } from "next-intl/server";
import { PostCard } from "@/components/post-card";
import { ShowMoreGrid } from "@/components/show-more-grid";
import { currentLang, getNewsListContent } from "@/lib/content";

export async function NewsSection() {
  const t = await getTranslations("news");
  const lang = await currentLang();
  const posts = await getNewsListContent(lang);

  return (
    <section id="news" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="text-center">
          <h2 className="section-title">{t("title")}</h2>
          <div className="gold-divider" />
        </div>
        <ShowMoreGrid
          initialCount={3}
          step={3}
          gridClassName="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} basePath="/novyny" more={t("more")} />
          ))}
        </ShowMoreGrid>
      </div>
    </section>
  );
}
