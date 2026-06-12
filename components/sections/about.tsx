import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-dark">
            <ShieldCheck className="h-5 w-5" />
            {t("title")}
          </span>
          <div className="mt-3 h-1 w-20 rounded-full bg-gold" />
          <p className="mt-6 text-lg leading-relaxed text-navy/80">{t("text")}</p>
          <Button asChild variant="default" size="lg" className="mt-8">
            <Link href="/mobilni-grupy">
              <MapPin />
              {t("cta")}
            </Link>
          </Button>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card-hover">
            <Image
              src="/images/about/main.jpg"
              alt="Мобільні групи Корпорації ГУАРД"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-navy-dark/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
