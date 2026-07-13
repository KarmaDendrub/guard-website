import { getTranslations } from "next-intl/server";
import { PostCard } from "@/components/post-card";
import { currentLang, getWorksListContent } from "@/lib/content";

export async function InstallationsSection() {
  const t = await getTranslations("install");
  const lang = await currentLang();
  const posts = (await getWorksListContent(lang)).slice(0, 2);

  return (
    <section id="installations" className="bg-light py-16 sm:py-24">
      <div className="container-x">
        <div className="text-center">
          <h2 className="section-title">{t("title")}</h2>
          <div className="gold-divider" />
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} basePath="/roboty" more={t("more")} />
          ))}
        </div>
      </div>
    </section>
  );
}
