import { getTranslations } from "next-intl/server";
import { PostCard } from "@/components/post-card";
import { ShowMoreGrid } from "@/components/show-more-grid";
import { currentLang, getWorksListContent } from "@/lib/content";

export async function InstallationsSection() {
  const t = await getTranslations("install");
  const lang = await currentLang();
  const posts = await getWorksListContent(lang);

  return (
    <section id="installations" className="bg-light py-16 sm:py-24">
      <div className="container-x">
        <div className="text-center">
          <h2 className="section-title">{t("title")}</h2>
          <div className="gold-divider" />
        </div>
        <div className="mx-auto max-w-4xl">
          <ShowMoreGrid
            initialCount={2}
            step={2}
            gridClassName="mt-12 grid gap-6 sm:grid-cols-2"
          >
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} basePath="/roboty" more={t("more")} />
            ))}
          </ShowMoreGrid>
        </div>
      </div>
    </section>
  );
}
