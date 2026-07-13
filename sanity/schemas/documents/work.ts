import { defineType, defineField } from "sanity";
import { WrenchIcon } from "@sanity/icons";

/** A "Монтажні роботи" post: an installation job shown on its own detail page. */
export const work = defineType({
  name: "work",
  title: "Монтажні роботи",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      description: "Шлях сторінки, напр. montazh-skud-ta-domofoniyi",
      options: { source: "title.uk", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Дата",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Короткий опис (для картки)",
      type: "localeText",
    }),
    defineField({
      name: "body",
      title: "Опис робіт",
      type: "localePortableText",
    }),
    defineField({
      name: "image",
      title: "Обкладинка",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Галерея фото",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "service",
      title: "Пов'язана послуга",
      type: "reference",
      to: [{ type: "service" }],
      description: "Опційно: до якої послуги відноситься ця робота.",
    }),
    defineField({
      name: "order",
      title: "Порядок",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Порядок",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Дата (нові спочатку)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title.uk", subtitle: "slug.current", media: "image" },
  },
});
