import type { Metadata } from "next";
import { notFound } from "next/navigation";
import installData from "@/data/installations.json";
import { PostDetail } from "@/components/post-detail";
import type { Post } from "@/components/post-card";

const posts = installData as Post[];

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  return { title: post?.title ?? "Монтажні роботи", description: post?.excerpt };
}

export default function InstallationPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return <PostDetail post={post} backHref="/#installations" backLabel="Усі роботи" />;
}
