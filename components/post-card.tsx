import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

export type Post = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  body: string;
  gallery?: string[];
};

export function PostCard({
  post,
  basePath,
  more,
}: {
  post: Post;
  /** route prefix for the detail page, e.g. "/novyny" */
  basePath: string;
  more: string;
}) {
  const href = `${basePath}/${post.slug}`;
  const formatted = new Date(post.date).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-hover">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          unoptimized={post.image.endsWith(".svg")}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gold-dark">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatted}
        </span>
        <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-ink">
          <Link href={href} className="transition-colors hover:text-gold-dark">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
          {post.excerpt}
        </p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark"
        >
          {more}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
