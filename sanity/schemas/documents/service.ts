import { defineType, defineField } from "sanity";
import { CaseIcon } from "@sanity/icons";

/** A security service shown in the "Послуги" grid and on its own detail page. */
export const service = defineType({
  name: "service",
  title: "Послуга",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Назва",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      description: "Шлях сторінки, напр. pultova-oxorona",
      options: { source: "title.uk", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Опис",
      type: "localeText",
    }),
    defineField({
      name: "icon",
      title: "Іконка (lucide)",
      type: "string",
      description: "Назва іконки lucide-react, напр. MonitorCheck",
    }),
    defineField({
      name: "image",
      title: "Фото / зображення",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "inGrid",
      title: "Показувати в сітці послуг",
      type: "boolean",
      description:
        "Увімкнено — послуга у головній сітці «Послуги». Вимкнено — лише окрема сторінка.",
      initialValue: true,
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
    select: { title: "title.uk", subtitle: "slug.current", media: "image" },
  },
});
