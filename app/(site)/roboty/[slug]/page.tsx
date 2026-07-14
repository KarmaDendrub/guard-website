import type { Metadata } from "next";
import { notFound } from "next/navigation";
import installData from "@/data/installations.json";
import { PostDetail } from "@/components/post-detail";
import { currentLang, getWorkBySlugContent } from "@/lib/content";

export function generateStaticParams() {
  return installData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const lang = await currentLang();
  const post = await getWorkBySlugContent(params.slug, lang);
  return { title: post?.title ?? "Монтажні роботи", description: post?.excerpt };
}

export default async function InstallationPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const lang = await currentLang();
  const post = await getWorkBySlugContent(params.slug, lang);
  if (!post) notFound();
  return <PostDetail post={post} backHref="/#installations" backLabel="Усі роботи" />;
}
