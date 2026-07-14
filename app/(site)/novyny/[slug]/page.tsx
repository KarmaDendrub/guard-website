import type { Metadata } from "next";
import { notFound } from "next/navigation";
import newsData from "@/data/news.json";
import { PostDetail } from "@/components/post-detail";
import { currentLang, getNewsBySlugContent } from "@/lib/content";

export function generateStaticParams() {
  return newsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const lang = await currentLang();
  const post = await getNewsBySlugContent(params.slug, lang);
  return { title: post?.title ?? "Новини", description: post?.excerpt };
}

export default async function NewsPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const lang = await currentLang();
  const post = await getNewsBySlugContent(params.slug, lang);
  if (!post) notFound();
  return <PostDetail post={post} backHref="/#news" backLabel="Усі новини" />;
}
