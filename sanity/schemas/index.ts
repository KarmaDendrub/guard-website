import { type SchemaTypeDefinition } from "sanity";

// object types
import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { localePortableText } from "./objects/localePortableText";
import { phone } from "./objects/phone";
import { social } from "./objects/social";

// document types
import { siteSettings } from "./documents/siteSettings";
import { heroSection } from "./documents/heroSection";
import { aboutSection } from "./documents/aboutSection";
import { statistic } from "./documents/statistic";
import { service } from "./documents/service";
import { photoGallery } from "./documents/photoGallery";
import { contactInfo } from "./documents/contactInfo";
import { newsPost } from "./documents/newsPost";
import { work } from "./documents/work";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  localeString,
  localeText,
  localePortableText,
  phone,
  social,
  // documents
  siteSettings,
  heroSection,
  aboutSection,
  statistic,
  service,
  photoGallery,
  contactInfo,
  newsPost,
  work,
];
