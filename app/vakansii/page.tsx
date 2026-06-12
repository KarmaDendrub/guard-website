import type { Metadata } from "next";
import { Briefcase, MapPin, Banknote, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Вакансії",
  description: "Робота в Корпорації ГУАРД у Дніпрі: вакансії охоронців та фахівців.",
};

const JOBS = [
  {
    title: "Охоронець мобільної групи",
    salary: "від 18 000 грн",
    location: "м. Дніпро",
    reqs: [
      "Фізична підготовка та відповідальність",
      "Бажано наявність посвідчення водія (кат. B)",
      "Готовність до позмінної роботи 24/7",
    ],
  },
  {
    title: "Інженер-монтажник систем безпеки",
    salary: "від 22 000 грн",
    location: "м. Дніпро",
    reqs: [
      "Досвід монтажу сигналізації / відеоспостереження",
      "Знання слаботочних систем",
      "Уважність та акуратність у роботі",
    ],
  },
  {
    title: "Оператор пульта централізованого спостереження",
    salary: "від 16 000 грн",
    location: "м. Дніпро",
    reqs: [
      "Уважність та стресостійкість",
      "Впевнений користувач ПК",
      "Готовність працювати позмінно",
    ],
  },
];

export default function VakansiiPage() {
  return (
    <>
      <PageHeader
        title="Вакансії"
        subtitle="Приєднуйтесь до команди професіоналів Корпорації «ГУАРД» — стабільна робота та офіційне працевлаштування."
        breadcrumb="Вакансії"
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          {JOBS.map((job) => (
            <div
              key={job.title}
              className="flex flex-col rounded-2xl border border-border bg-light p-7 shadow-card transition-all hover:border-gold hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                <Briefcase className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-bold text-navy-dark">
                {job.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-navy/70">
                <span className="flex items-center gap-1.5">
                  <Banknote className="h-4 w-4 text-gold-dark" />
                  {job.salary}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-gold-dark" />
                  {job.location}
                </span>
              </div>
              <ul className="mt-4 flex-1 space-y-2">
                {job.reqs.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-navy/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
