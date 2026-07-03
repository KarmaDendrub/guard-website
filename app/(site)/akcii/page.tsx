import type { Metadata } from "next";
import { Tag, Percent, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Акції",
  description: "Актуальні акційні пропозиції та знижки на охоронні послуги Корпорації ГУАРД.",
};

const PROMOS = [
  {
    icon: Percent,
    title: "-50% на монтаж сигналізації AJAX",
    text: "Для нових клієнтів — половина вартості монтажу бездротової системи AJAX при укладенні договору на пультову охорону.",
    badge: "Хіт",
  },
  {
    icon: Tag,
    title: "Знижка 20% на комплекс «Відео + Сигналізація»",
    text: "Замовляйте відеоспостереження разом з охоронною сигналізацією та економте на комплексному рішенні безпеки.",
    badge: "Вигідно",
  },
];

export default function AkciiPage() {
  return (
    <>
      <PageHeader
        title="Акційні пропозиції"
        subtitle="Спеціальні умови та знижки на підключення охорони у Дніпрі та області."
        breadcrumb="Акції"
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROMOS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="relative flex flex-col rounded-2xl border border-border bg-light p-7 shadow-card transition-all hover:-translate-y-1 hover:border-gold hover:shadow-card-hover"
              >
                <span className="absolute right-5 top-5 rounded-full bg-danger px-3 py-1 text-xs font-bold uppercase text-white">
                  {p.badge}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-ink/60">{p.text}</p>
                <span className="mt-5 flex items-center gap-1.5 text-sm font-medium text-gold-dark">
                  <Clock className="h-4 w-4" />
                  Пропозиція обмежена в часі
                </span>
              </div>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
