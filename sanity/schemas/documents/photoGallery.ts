import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

const CATEGORIES = [
  { title: "Охоронець (персонаж)", value: "guard" },
  { title: "Об'єкти", value: "objects" },
  { title: "Місто Дніпро", value: "city" },
  { title: "Інше", value: "other" },
];

/** A photo in the site gallery (guard character, objects, the city of Dnipro). */
export const photoGallery = defineType({
  name: "photoGallery",
  title: "Галерея фото",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Підпис",
      type: "localeString",
    }),
    defineField({
      name: "image",
      title: "Фото",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Категорія",
      type: "string",
      options: { list: CATEGORIES, layout: "radio" },
      initialValue: "other",
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
  ],
  preview: {
    select: { title: "title.uk", subtitle: "category", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Фото",
      subtitle,
      media,
    }),
  },
});
