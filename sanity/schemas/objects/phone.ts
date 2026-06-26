import { defineType, defineField } from "sanity";

/** A phone number: display form for UI, tel form for the href. */
export const phone = defineType({
  name: "phone",
  title: "Телефон",
  type: "object",
  fields: [
    defineField({
      name: "display",
      title: "Як показувати",
      type: "string",
      description: "Напр. +38 (056) 766-07-17",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tel",
      title: "Для дзвінка (tel:)",
      type: "string",
      description: "Тільки цифри з кодом країни, напр. +380567660717",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "display", subtitle: "tel" },
  },
});
