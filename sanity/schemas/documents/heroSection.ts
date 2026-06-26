import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";

/** Singleton: the homepage hero — bilingual title/subtitle + background slides. */
export const heroSection = defineType({
  name: "heroSection",
  title: "Головний банер (Hero)",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Підзаголовок",
      type: "localeString",
    }),
    defineField({
      name: "slides",
      title: "Фонові фото (слайдшоу)",
      description: "Одне або декілька фото, що змінюються в банері.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    select: { title: "title.uk", media: "slides.0" },
    prepare: ({ title, media }) => ({
      title: title || "Головний банер",
      media,
    }),
  },
});
