import { groq } from "next-sanity";

/** A localized field is fetched whole ({uk, ru}); the locale is picked in code. */
const LOCALE = `{ uk, ru }`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  "logo": logo,
  companyName ${LOCALE},
  slogan ${LOCALE},
  phones[]{ display, tel },
  socials[]{ name, href, icon },
  paymentUrl,
  legacyUrl
}`;

export const heroQuery = groq`*[_type == "heroSection"][0]{
  title ${LOCALE},
  subtitle ${LOCALE},
  "slides": slides[]{ ..., "url": asset->url }
}`;

export const aboutQuery = groq`*[_type == "aboutSection"][0]{
  title ${LOCALE},
  text ${LOCALE},
  "image": image{ ..., "url": asset->url }
}`;

export const statsQuery = groq`*[_type == "statistic"] | order(order asc){
  _id, value, suffix, icon, label ${LOCALE}
}`;

export const servicesGridQuery = groq`*[_type == "service" && inGrid == true] | order(order asc){
  _id, "slug": slug.current, icon,
  title ${LOCALE}, description ${LOCALE},
  "image": image{ ..., "url": asset->url }
}`;

export const allServicesQuery = groq`*[_type == "service"] | order(order asc){
  _id, "slug": slug.current, icon, inGrid,
  title ${LOCALE}, description ${LOCALE},
  "image": image{ ..., "url": asset->url }
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id, "slug": slug.current, icon,
  title ${LOCALE}, description ${LOCALE},
  "image": image{ ..., "url": asset->url }
}`;

export const galleryQuery = groq`*[_type == "photoGallery"] | order(order asc){
  _id, category, title ${LOCALE},
  "image": image{ ..., "url": asset->url }
}`;

export const contactQuery = groq`*[_type == "contactInfo"][0]{
  address ${LOCALE},
  phone{ display, tel },
  email, telegram, mapUrl,
  workingHours ${LOCALE}
}`;
