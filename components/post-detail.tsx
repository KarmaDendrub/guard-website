import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import type { Post } from "@/components/post-card";

export function PostDetail({
  post,
  backHref,
  backLabel,
}: {
  post: Post;
  backHref: string;
  backLabel: string;
}) {
  const formatted = new Date(post.date).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHeader title={post.title} breadcrumb={post.title} />
      <article className="bg-white py-16 sm:py-20">
        <div className="container-x max-w-3xl">
          <span className="flex items-center gap-1.5 text-sm font-medium uppercase tracking-wide text-gold-dark">
            <CalendarDays className="h-4 w-4" />
            {formatted}
          </span>
          <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
            <Image
              src={post.image}
              alt={post.title}
              fill
              unoptimized={post.image.endsWith(".svg")}
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          <p className="mt-8 text-lg leading-relaxed text-navy/80">{post.body}</p>
          <Link
            href={backHref}
            className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark transition-colors hover:text-navy-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
