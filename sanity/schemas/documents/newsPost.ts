import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

/** A news item shown in the "Новини" section and on its own detail page. */
export const newsPost = defineType({
  name: "newsPost",
  title: "Новини",
  type: "document",
  icon: DocumentTextIcon,
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
      description: "Шлях сторінки, напр. zatrymannya-porushnyka",
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
      title: "Текст новини",
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
  ],
  orderings: [
    {
      title: "Дата (нові спочатку)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title.uk", subtitle: "date", media: "image" },
  },
});
