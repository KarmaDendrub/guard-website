import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Shield } from "lucide-react";
import { currentLang, getLicensesContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ліцензії та сертифікати",
  description: "Офіційні ліцензії та сертифікати Корпорації «ГУАРД» — Дніпро.",
};

export default async function LicenziiPage() {
  const lang = await currentLang();
  const licenses = await getLicensesContent(lang);
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
              <h2 className="font-heading text-xl font-bold text-ink">
                Офіційно ліцензована охоронна компанія
              </h2>
              <p className="mt-2 text-ink/70">
                Корпорація «ГУАРД» здійснює охоронну діяльність на підставі ліцензій та дозволів,
                виданих уповноваженими органами державної влади України. Всі документи знаходяться
                у відповідних реєструючих органах та відкриті для перевірки.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {licenses.map((lic) => (
              <div
                key={lic.title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-card transition hover:shadow-card-hover"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-light">
                  <Image
                    src={lic.image}
                    alt={lic.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-ink">
                    {lic.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">{lic.issuedBy}</p>
                  <p className="mt-1 text-sm font-semibold text-gold-dark">{lic.validity}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-ink/50">
            Для перевірки актуальності документів зверніться до нашого офісу або зателефонуйте.
          </p>
        </div>
      </section>
    </>
  );
}
