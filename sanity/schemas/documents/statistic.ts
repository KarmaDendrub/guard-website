import { defineType, defineField } from "sanity";
import { BarChartIcon } from "@sanity/icons";

const STAT_ICONS = ["Car", "Award", "Building2", "Clock", "ShieldCheck", "Users"];

/** A single counter card in the stats strip (e.g. "70 mobile groups"). */
export const statistic = defineType({
  name: "statistic",
  title: "Статистика (картка)",
  type: "document",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "value",
      title: "Число",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "suffix",
      title: "Суфікс",
      description: 'Напр. «+», «/7». Залиште порожнім, якщо не потрібно.',
      type: "string",
    }),
    defineField({
      name: "label",
      title: "Підпис",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Іконка",
      type: "string",
      options: { list: STAT_ICONS.map((v) => ({ title: v, value: v })) },
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
    select: { value: "value", suffix: "suffix", label: "label.uk" },
    prepare: ({ value, suffix, label }) => ({
      title: `${value ?? ""}${suffix ?? ""} — ${label ?? ""}`,
    }),
  },
});
