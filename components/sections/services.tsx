import { getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/service-card";
import { currentLang, getServicesGridContent } from "@/lib/content";

export async function ServicesSection() {
  const t = await getTranslations("services");
  const tNews = await getTranslations("news");
  const lang = await currentLang();
  const services = await getServicesGridContent(lang);

  return (
    <section id="services" className="bg-light py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">{t("title")}</h2>
          <div className="gold-divider" />
          <p className="mt-4 text-base text-ink/60">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.key} service={service} more={tNews("more")} />
          ))}
        </div>
      </div>
    </section>
  );
}
