import { getTranslations } from "next-intl/server";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Олександр М.",
    role: "Власник магазину, Дніпро",
    text: "Сигналізація спрацювала миттєво, група приїхала за лічені хвилини. Зловмисника затримали ще до того, як він встиг щось винести. Дякую за професійну роботу!",
  },
  {
    name: "Ірина К.",
    role: "Клієнтка послуги «Я дома»",
    text: "Встановили AJAX у квартирі — все працює бездоганно, керую з телефону. Спокій за родину безцінний. Рекомендую ГУАРД усім знайомим.",
  },
  {
    name: "ТОВ «Експо-Сервіс»",
    role: "Корпоративний клієнт",
    text: "Співпрацюємо вже кілька років: пультова охорона, відеоспостереження та контроль доступу на наших об'єктах. Надійний партнер у питаннях безпеки.",
  },
];

export async function ReviewsSection() {
  const t = await getTranslations("reviews");

  return (
    <section id="reviews" className="bg-navy-dark py-16 sm:py-24">
      <div className="absolute inset-x-0 bg-shield-grid" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <div className="gold-divider" />
          <p className="mt-4 text-light/60">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur"
            >
              <Quote className="h-9 w-9 text-gold/40" />
              <div className="mt-3 flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-light/80">{r.text}</blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{r.name}</p>
                <p className="text-sm text-gold-light">{r.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
