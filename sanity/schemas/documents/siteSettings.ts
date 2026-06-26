import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

/** Singleton: global site identity — logo, name, phones, socials, payment. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Налаштування сайту",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "brand", title: "Бренд", default: true },
    { name: "contacts", title: "Контакти" },
    { name: "links", title: "Посилання" },
  ],
  fields: [
    defineField({
      name: "logo",
      title: "Логотип",
      type: "image",
      group: "brand",
      options: { hotspot: true },
    }),
    defineField({
      name: "companyName",
      title: "Назва компанії",
      type: "localeString",
      group: "brand",
    }),
    defineField({
      name: "slogan",
      title: "Слоган",
      type: "localeString",
      group: "brand",
    }),
    defineField({
      name: "phones",
      title: "Телефони",
      type: "array",
      of: [{ type: "phone" }],
      group: "contacts",
    }),
    defineField({
      name: "socials",
      title: "Соцмережі",
      type: "array",
      of: [{ type: "social" }],
      group: "contacts",
    }),
    defineField({
      name: "paymentUrl",
      title: "Посилання на оплату (Приват24)",
      type: "url",
      group: "links",
      validation: (r) =>
        r.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "legacyUrl",
      title: "Старий сайт",
      type: "url",
      group: "links",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Налаштування сайту" }),
  },
});
