import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { currentLang, getServiceDetailContent } from "@/lib/content";

const BENEFITS = [
  "Цілодобовий контроль та реагування 24/7",
  "Сертифіковане обладнання та професійні фахівці",
  "Швидке прибуття мобільних груп по всьому Дніпру",
  "Індивідуальні умови та гнучкі тарифи для кожного клієнта",
];

export async function ServiceDetail({ serviceKey }: { serviceKey: string }) {
  const lang = await currentLang();
  const service = await getServiceDetailContent(serviceKey, lang);
  if (!service) notFound();

  const related = SERVICES.filter((s) => s.key !== serviceKey).slice(0, 4);

  return (
    <>
      <PageHeader title={service.title} breadcrumb={service.title} />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card-hover">
            <Image
              src={service.image}
              alt={service.title}
              fill
              unoptimized={service.image.endsWith(".svg")}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed text-ink/80">{service.description}</p>
            <p className="mt-4 leading-relaxed text-ink/60">
              Корпорація «ГУАРД» забезпечує повний цикл послуги «{service.title}» — від
              консультації та проєктування до монтажу, підключення на пульт та
              подальшого технічного обслуговування. Ми гарантуємо надійність,
              оперативність та індивідуальний підхід до кожного об'єкта у Дніпрі та
              області.
            </p>
            <ul className="mt-6 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-ink/80">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-light py-14">
        <div className="container-x">
          <h2 className="section-title text-center">Інші послуги</h2>
          <div className="gold-divider" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((s) => (
              <Link
                key={s.key}
                href={s.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-white p-5 shadow-card transition-all hover:border-gold hover:shadow-card-hover"
              >
                <span className="font-semibold text-ink">{s.title}</span>
                <ArrowRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
