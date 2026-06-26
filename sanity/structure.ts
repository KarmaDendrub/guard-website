import type { StructureResolver } from "sanity/structure";

/** Singletons appear as a single editable document (no list); the rest as lists. */
const SINGLETONS: { type: string; title: string }[] = [
  { type: "siteSettings", title: "Налаштування сайту" },
  { type: "heroSection", title: "Головний банер" },
  { type: "aboutSection", title: "Про компанію" },
  { type: "contactInfo", title: "Контактна інформація" },
];

const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Контент")
    .items([
      ...SINGLETONS.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type))
      ),
      S.divider(),
      S.documentTypeListItem("service").title("Послуги"),
      S.documentTypeListItem("statistic").title("Статистика"),
      S.documentTypeListItem("photoGallery").title("Галерея фото"),
      // any other (non-singleton) types, just in case
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETON_TYPES.has(item.getId() ?? "") &&
          !["service", "statistic", "photoGallery"].includes(item.getId() ?? "")
      ),
    ]);
