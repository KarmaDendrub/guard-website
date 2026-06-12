import { getTranslations } from "next-intl/server";
import newsData from "@/data/news.json";
import { PostCard, type Post } from "@/components/post-card";

export async function NewsSection() {
  const t = await getTranslations("news");
  const posts = (newsData as Post[]).slice(0, 3);

  return (
    <section id="news" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="text-center">
          <h2 className="section-title">{t("title")}</h2>
          <div className="gold-divider" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} basePath="/novyny" more={t("more")} />
          ))}
        </div>
      </div>
    </section>
  );
}
