import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient py-16 sm:py-20">
      <div className="absolute inset-0 bg-shield-grid opacity-60" />
      <div className="container-x relative">
        <nav className="flex items-center gap-1.5 text-sm text-light/60">
          <Link href="/" className="transition-colors hover:text-gold">
            Головна
          </Link>
          {breadcrumb && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gold-light">{breadcrumb}</span>
            </>
          )}
        </nav>
        <h1 className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-light/70">{subtitle}</p>}
        <div className="mt-5 h-1 w-20 rounded-full bg-gold" />
      </div>
    </section>
  );
}
