import { defineType, defineField } from "sanity";
import { DocumentPdfIcon } from "@sanity/icons";

/** A license/certificate card shown on the "Ліцензії" page. */
export const license = defineType({
  name: "license",
  title: "Ліцензія / сертифікат",
  type: "document",
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: "title",
      title: "Назва",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "issuedBy",
      title: "Ким видано / за якими ТМ",
      description: 'Напр. «ТМ «Орлан», «Лунь», «Алет» та «Granat», м. Дніпро».',
      type: "localeString",
    }),
    defineField({
      name: "validity",
      title: "Термін дії",
      description: 'Напр. «2026 р.» або «дійсний до 31.12.2027».',
      type: "localeString",
    }),
    defineField({
      name: "image",
      title: "Скан / фото документа",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
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
    select: { title: "title.uk", subtitle: "validity.uk", media: "image" },
  },
});
