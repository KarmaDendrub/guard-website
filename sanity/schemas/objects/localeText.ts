import { defineType, defineField } from "sanity";

/** Bilingual long text: { uk, ru }. Used for descriptions and paragraphs. */
export const localeText = defineType({
  name: "localeText",
  title: "Опис (UA / RU)",
  type: "object",
  fields: [
    defineField({ name: "uk", title: "🇺🇦 Українська", type: "text", rows: 4 }),
    defineField({ name: "ru", title: "🇷🇺 Русский", type: "text", rows: 4 }),
  ],
  options: { collapsible: false },
});
