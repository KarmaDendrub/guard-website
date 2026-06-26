import { defineType, defineField } from "sanity";

/** Bilingual short text: { uk, ru }. Used for titles, labels, button text. */
export const localeString = defineType({
  name: "localeString",
  title: "Текст (UA / RU)",
  type: "object",
  fields: [
    defineField({ name: "uk", title: "🇺🇦 Українська", type: "string" }),
    defineField({ name: "ru", title: "🇷🇺 Русский", type: "string" }),
  ],
  options: { collapsible: false },
});
