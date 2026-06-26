import { defineType, defineField } from "sanity";

const ICONS = [
  "instagram",
  "facebook",
  "telegram",
  "viber",
  "youtube",
  "map-pin",
] as const;

/** A social-network / messenger link with an icon key. */
export const social = defineType({
  name: "social",
  title: "Соцмережа",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Назва",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Посилання",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Іконка",
      type: "string",
      options: { list: ICONS.map((v) => ({ title: v, value: v })) },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "icon" },
  },
});
