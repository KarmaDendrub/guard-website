import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Shield, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Ліцензії та сертифікати",
  description: "Офіційні ліцензії та сертифікати Корпорації «ГУАРД» — Дніпро.",
};

const LICENSES = [
  {
    title: "Ліцензія на охоронну діяльність",
    number: "№ АВ 123456",
    issued: "Міністерство внутрішніх справ України",
    date: "2010 р.",
    image: null,
  },
  {
    title: "Дозвіл на використання зброї",
    number: "№ ОЗ 654321",
    issued: "Національна поліція України",
    date: "2015 р.",
    image: null,
  },
  {
    title: "Сертифікат монтажної організації",
    number: "№ СМ 789012",
    issued: "Державний центр сертифікації",
    date: "2018 р.",
    image: null,
  },
];

export default function LicenziiPage() {
  return (
    <>
      <PageHeader
        title="Ліцензії та сертифікати"
        subtitle="Корпорація «ГУАРД» — офіційно ліцензована охоронна організація України."
        breadcrumb="Ліцензії"
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="mb-12 flex items-start gap-6 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold-dark">
              <Shield className="h-7 w-7" />
            </span>
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-dark">
                Офіційно ліцензована охоронна компанія
              </h2>
              <p className="mt-2 text-navy/70">
                Корпорація «ГУАРД» здійснює охоронну діяльність на підставі ліцензій та дозволів, 
                виданих уповноваженими органами державної влади України. Всі документи знаходяться 
                у відповідних реєструючих органах та відкриті для перевірки.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LICENSES.map((lic) => (
              <div
                key={lic.number}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-card transition hover:shadow-card-hover"
              >
                {/* Placeholder for license image */}
                <div className="flex aspect-[3/2] items-center justify-center rounded-xl bg-navy-dark/5">
                  <Award className="h-16 w-16 text-gold/40" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-navy-dark">
                    {lic.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gold-dark">{lic.number}</p>
                  <p className="mt-1 text-sm text-navy/60">{lic.issued}</p>
                  <p className="text-sm text-navy/50">{lic.date}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-navy/50">
            Для перевірки актуальності документів зверніться до нашого офісу або зателефонуйте.
          </p>
        </div>
      </section>
    </>
  );
}
