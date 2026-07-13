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
          <p className="mt-8 text-lg leading-relaxed text-ink/80">{post.body}</p>
          {post.gallery && post.gallery.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {post.gallery.map((src, i) => (
                <div
                  key={src + i}
                  className="relative aspect-square overflow-hidden rounded-xl shadow-card"
                >
                  <Image
                    src={src}
                    alt={`${post.title} — фото ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          <Link
            href={backHref}
            className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-dark transition-colors hover:text-ink"
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
