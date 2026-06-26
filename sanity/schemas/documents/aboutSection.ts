import { defineType, defineField } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

/** Singleton: the homepage "About" block — bilingual heading/text + photo. */
export const aboutSection = defineType({
  name: "aboutSection",
  title: "Блок «Про компанію»",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({ name: "title", title: "Заголовок", type: "localeString" }),
    defineField({ name: "text", title: "Текст", type: "localeText" }),
    defineField({
      name: "image",
      title: "Фото",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title.uk", media: "image" },
    prepare: ({ title, media }) => ({
      title: title || "Про компанію",
      media,
    }),
  },
});
