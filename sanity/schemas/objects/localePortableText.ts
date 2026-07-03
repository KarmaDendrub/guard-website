import { defineType, defineField } from "sanity";

/**
 * Bilingual rich text: { uk, ru }, each a Portable Text block array.
 * Lets editors add paragraphs, spacing, bold/italic and lists in the Studio —
 * the site renders it through <PortableText>. Replaces the old plain `localeText`
 * for service descriptions.
 */
const blocks = [
  {
    type: "block" as const,
    // Only paragraph + basic styles — keeps the editor simple for non-devs.
    styles: [
      { title: "Абзац", value: "normal" },
      { title: "Підзаголовок", value: "h3" },
    ],
    lists: [{ title: "Список", value: "bullet" }],
    marks: {
      decorators: [
        { title: "Жирний", value: "strong" },
        { title: "Курсив", value: "em" },
      ],
      annotations: [],
    },
  },
];

export const localePortableText = defineType({
  name: "localePortableText",
  title: "Опис (UA / RU)",
  type: "object",
  fields: [
    defineField({ name: "uk", title: "🇺🇦 Українська", type: "array", of: blocks }),
    defineField({ name: "ru", title: "🇷🇺 Русский", type: "array", of: blocks }),
  ],
  options: { collapsible: false },
});
