import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/service-card";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Послуги",
  description: "Повний перелік охоронних послуг Корпорації ГУАРД у Дніпрі.",
};

export default async function PropoziciyaPage() {
  const t = await getTranslations("news");
  return (
    <>
      <PageHeader
        title="Наші послуги"
        subtitle="Повний спектр послуг безпеки для дому та бізнесу — оберіть рішення, що підходить саме вам."
        breadcrumb="Послуги"
      />
      <section className="bg-light py-16 sm:py-20">
        <div className="container-x grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.key} service={s} more={t("more")} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
