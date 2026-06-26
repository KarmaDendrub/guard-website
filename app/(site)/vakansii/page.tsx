import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, Banknote, CheckCircle2, Clock, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Вакансії",
  description: "Робота в Корпорації ГУАРД у Дніпрі: вакансії охоронців та фахівців.",
};

const REQUIREMENTS = [
  "відповідально ставляться до своєї роботи",
  "орієнтовані на результат та професійний розвиток",
  "готові навчатися та вдосконалювати свої навички",
  "цінують командну роботу та взаємоповагу",
  "бажають працювати в стабільній компанії з бездоганною репутацією",
];

const BENEFITS = [
  "стабільну та своєчасну виплату заробітної плати",
  "офіційне працевлаштування",
  "професійне навчання та підвищення кваліфікації",
  "підтримку та адаптацію нових співробітників",
  "можливість кар'єрного зростання",
  "сучасні умови праці",
  "дружню команду та корпоративну культуру",
  "роботу в компанії, якій довіряють клієнти по всій Україні",
];

const JOBS = [
  {
    title: "Водій-охоронник мобільної групи",
    salary: "1 400 грн / добу",
    schedule: "Добові зміни 2/2",
    reqs: [
      "Відсутність судимості",
      "Добра фізична підготовка",
      "Відповідальність",
      "Стаж керування авто від 2-х років",
    ],
    extra: ["Забезпечення спецодягом", "Оформлення згідно чинного законодавства України"],
  },
  {
    title: "Охоронник мобільної групи",
    salary: "1 290 грн / зміну",
    schedule: "Добові зміни 2/2",
    reqs: ["Відсутність судимості", "Добра фізична підготовка", "Відповідальність"],
    extra: ["Забезпечення спецодягом", "Оформлення згідно чинного законодавства України"],
  },
  {
    title: "Охоронник об'єкта",
    salary: "своєчасна оплата праці",
    schedule: "Змінний, добовий, вахта",
    reqs: ["Відсутність судимості", "Відповідальність", "Вік від 18 років"],
    extra: ["Забезпечення спецодягом", "Об'єкти у місті та області"],
  },
  {
    title: "Диспетчер пульта централізованої охорони",
    salary: "офіційне оформлення",
    schedule: "Добові зміни 1/2 · Лівий берег",
    reqs: [
      "Знання міста та області",
      "Володіння ПК та телефоном",
      "Чітка мова, вільне володіння державною мовою",
    ],
    extra: [
      "Оперативне реагування на сигнали тривоги",
      "Подача команд групам швидкого реагування",
    ],
  },
  {
    title: "Автослюсар",
    salary: "від 20 000 грн (ставка + відсотки)",
    schedule: "Будні дні, 8:30–18:00",
    reqs: ["Досвід роботи з легковим транспортом", "Стаж від 5 років"],
    extra: ["Повний соцпакет"],
  },
  {
    title: "Інженер з обслуговування систем охоронно-пожежної сигналізації",
    salary: "20 000 — 30 000 грн",
    schedule: "5-денний робочий тиждень, 8:30–18:00",
    reqs: [
      "Профільна середньо-спеціальна або вища освіта",
      "Досвід роботи від 1 року",
      "Знання слабкострумових систем і електротехніки",
      "Водійське посвідчення категорії «В»",
    ],
    extra: ["Оформлення згідно чинного законодавства України"],
  },
];

export default function VakansiiPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative">
        <div className="relative aspect-[16/9] w-full sm:aspect-[16/7]">
          <Image
            src="/images/vakansii/banner.jpg"
            alt="Будуй кар'єру разом із «ГУАРД»"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          {/* Intro */}
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-3xl font-extrabold text-ink sm:text-4xl">
              Вакансії в Корпорації «ГУАРД»
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Корпорація «ГУАРД» — одна з провідних охоронних компаній України, яка щодня
              забезпечує безпеку тисяч людей, підприємств та об'єктів. У зв'язку з розвитком
              компанії та розширенням напрямків діяльності ми запрошуємо до своєї команди
              відповідальних, енергійних та цілеспрямованих фахівців.
            </p>
          </div>

          {/* Who we're looking for + benefits */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-light p-7">
              <h2 className="font-heading text-xl font-bold text-ink">Кого ми шукаємо</h2>
              <ul className="mt-4 space-y-2.5">
                {REQUIREMENTS.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-ink/70">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-light p-7">
              <h2 className="font-heading text-xl font-bold text-ink">Чому обирають «ГУАРД»</h2>
              <ul className="mt-4 space-y-2.5">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-ink/70">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Open positions */}
          <div className="mt-16">
            <h2 className="text-center font-heading text-2xl font-bold text-ink sm:text-3xl">
              Актуальні вакансії
            </h2>
            <div className="mt-3 mx-auto h-1 w-20 rounded-full bg-gold" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {JOBS.map((job) => (
                <div
                  key={job.title}
                  className="flex flex-col rounded-2xl border border-border bg-light p-7 shadow-card transition-all hover:border-gold hover:shadow-card-hover"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-ink">
                    <Briefcase className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-ink">
                    {job.title}
                  </h3>
                  <div className="mt-3 flex flex-col gap-1.5 text-sm text-ink/70">
                    <span className="flex items-center gap-1.5">
                      <Banknote className="h-4 w-4 shrink-0 text-gold-dark" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0 text-gold-dark" />
                      {job.schedule}
                    </span>
                  </div>
                  <ul className="mt-4 flex-1 space-y-2">
                    {job.reqs.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-ink/70">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  {job.extra.length > 0 && (
                    <div className="mt-3 border-t border-border pt-3">
                      {job.extra.map((e) => (
                        <p key={e} className="text-xs text-ink/50">
                          {e}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-ink/60">
              Якщо ви не знайшли потрібну вакансію, надсилайте своє резюме — ми завжди раді
              знайомству з перспективними кандидатами.
            </p>
          </div>

          {/* HR contact */}
          <div className="mt-16 rounded-2xl bg-navy-gradient p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
              Надішліть резюме вже сьогодні
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink/70">
              Наші фахівці зв'яжуться з вами та нададуть детальну інформацію про відкриті
              вакансії, умови праці та можливості професійного розвитку.
            </p>
            <p className="mt-6 font-heading text-sm font-bold uppercase tracking-wider text-gold-dark">
              Відділ кадрів
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-ink/90">
              <a href="tel:+380567660719" className="flex items-center gap-2 hover:text-gold-dark">
                <Phone className="h-4 w-4" />
                +38 (056) 766-07-19
              </a>
              <a href="tel:+380675773865" className="flex items-center gap-2 hover:text-gold-dark">
                <Phone className="h-4 w-4" />
                +38 (067) 577-38-65
              </a>
              <a href="tel:+380633477864" className="flex items-center gap-2 hover:text-gold-dark">
                <Phone className="h-4 w-4" />
                +38 (063) 347-78-64
              </a>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-ink/90">
              <a href="mailto:kadry@guard.ua" className="flex items-center gap-2 hover:text-gold-dark">
                <Mail className="h-4 w-4" />
                kadry@guard.ua
              </a>
              <a href="mailto:personal@guard.ua" className="flex items-center gap-2 hover:text-gold-dark">
                <Mail className="h-4 w-4" />
                personal@guard.ua
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
