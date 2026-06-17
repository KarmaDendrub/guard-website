import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CreditCard, Tag, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/site";

export async function PaymentPromoSection() {
  const t = await getTranslations("pay");

  return (
    <section className="bg-light py-16 sm:py-20">
      <div className="container-x grid gap-6 md:grid-cols-2">
        {/* Payment */}
        <a
          href={COMPANY.paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-navy-gradient p-8 text-ink shadow-card transition-shadow hover:shadow-card-hover"
        >
          <div className="absolute inset-0 bg-shield-grid opacity-50" />
          <div className="relative">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold text-ink">
              <CreditCard className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-heading text-2xl font-bold">{t("payTitle")}</h3>
            <p className="mt-2 max-w-md text-ink/70">{t("payDesc")}</p>
          </div>
          <span className="relative mt-6 inline-flex items-center gap-2 font-semibold text-gold-dark">
            {t("payBtn")}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </a>

        {/* Promo */}
        <Link
          href="/akcii"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-gold bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <div>
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
              <Tag className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-heading text-2xl font-bold text-ink">
              {t("promoTitle")}
            </h3>
            <p className="mt-2 max-w-md text-ink/60">{t("promoDesc")}</p>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-dark">
            {t("promoBtn")}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  );
}
