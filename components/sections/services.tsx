import { getTranslations } from "next-intl/server";
import { SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/service-card";

export async function ServicesSection() {
  const t = await getTranslations("services");
  const tNews = await getTranslations("news");

  return (
    <section id="services" className="bg-light py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">{t("title")}</h2>
          <div className="gold-divider" />
          <p className="mt-4 text-base text-navy/60">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.key} service={service} more={tNews("more")} />
          ))}
        </div>
      </div>
    </section>
  );
}
