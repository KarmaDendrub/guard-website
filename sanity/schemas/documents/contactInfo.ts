import { defineType, defineField } from "sanity";
import { PinIcon } from "@sanity/icons";

/** Singleton: contact details for the Contacts page and footer. */
export const contactInfo = defineType({
  name: "contactInfo",
  title: "Контактна інформація",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "address",
      title: "Адреса",
      type: "localeString",
    }),
    defineField({
      name: "phone",
      title: "Основний телефон",
      type: "phone",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) =>
        r.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" }).warning(
          "Схоже на некоректний email"
        ),
    }),
    defineField({
      name: "telegram",
      title: "Telegram",
      type: "url",
    }),
    defineField({
      name: "mapUrl",
      title: "Посилання на карту",
      type: "url",
    }),
    defineField({
      name: "workingHours",
      title: "Графік роботи",
      type: "localeString",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Контактна інформація" }),
  },
});
