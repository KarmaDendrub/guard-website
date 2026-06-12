import type { Metadata } from "next";
import { notFound } from "next/navigation";
import newsData from "@/data/news.json";
import { PostDetail } from "@/components/post-detail";
import type { Post } from "@/components/post-card";

const posts = newsData as Post[];

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  return { title: post?.title ?? "Новини", description: post?.excerpt };
}

export default function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return <PostDetail post={post} backHref="/#news" backLabel="Усі новини" />;
}
