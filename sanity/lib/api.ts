import { client } from "./client";
import { urlForImage } from "./image";
import { DEFAULT_LANG, type Lang } from "../env";
import {
  siteSettingsQuery,
  heroQuery,
  aboutQuery,
  statsQuery,
  servicesGridQuery,
  allServicesQuery,
  serviceBySlugQuery,
  galleryQuery,
  contactQuery,
  newsListQuery,
  newsBySlugQuery,
  worksListQuery,
  workBySlugQuery,
  licensesQuery,
} from "./queries";

/** Revalidate cached content this often (seconds). Edits appear within ~1 min. */
const REVALIDATE = 60;

type LocaleField = { uk?: string | null; ru?: string | null } | null | undefined;
type Blocks = Array<{ _type: string; [key: string]: unknown }>;
type LocaleBlockField =
  | { uk?: Blocks | null; ru?: Blocks | null }
  | null
  | undefined;
type Img = { url?: string | null } | null | undefined;

/** Pick the active-language value from a {uk, ru} field, with sensible fallback. */
export function pick(field: LocaleField, lang: Lang): string {
  if (!field) return "";
  return field[lang] || field[DEFAULT_LANG] || field.uk || field.ru || "";
}

/** Pick the active-language Portable Text blocks from a {uk, ru} rich-text field. */
export function pickBlocks(field: LocaleBlockField, lang: Lang): Blocks {
  if (!field) return [];
  return field[lang] || field[DEFAULT_LANG] || field.uk || field.ru || [];
}

/**
 * Fetch from Sanity, but never throw: if the dataset is empty, unreachable, or
 * the credentials are missing, return null so callers fall back to built-in
 * content and the live site keeps rendering.
 */
async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE },
    });
  } catch (err) {
    console.warn("[sanity] fetch failed, using fallback:", (err as Error).message);
    return null;
  }
}

// ---- typed shapes returned by the queries --------------------------------

export type Phone = { display: string; tel: string };
export type Social = { name: string; href: string; icon: string };

export type SiteSettings = {
  logo?: { asset?: unknown } | null;
  companyName?: LocaleField;
  slogan?: LocaleField;
  phones?: Phone[] | null;
  socials?: Social[] | null;
  paymentUrl?: string | null;
  legacyUrl?: string | null;
} | null;

export type Hero = {
  title?: LocaleField;
  subtitle?: LocaleField;
  slides?: (Img & { asset?: unknown })[] | null;
} | null;

export type About = {
  title?: LocaleField;
  text?: LocaleField;
  image?: Img;
} | null;

export type Stat = {
  _id: string;
  value: number;
  suffix?: string | null;
  icon?: string | null;
  label?: LocaleField;
};

export type ServiceDoc = {
  _id: string;
  slug: string;
  icon?: string | null;
  inGrid?: boolean;
  title?: LocaleField;
  description?: LocaleBlockField;
  image?: Img;
};

export type GalleryItem = {
  _id: string;
  category?: string | null;
  title?: LocaleField;
  image?: Img;
};

export type Contact = {
  address?: LocaleField;
  phone?: Phone | null;
  email?: string | null;
  telegram?: string | null;
  mapUrl?: string | null;
  workingHours?: LocaleField;
} | null;

export type NewsDoc = {
  _id: string;
  slug: string;
  date: string;
  title?: LocaleField;
  excerpt?: LocaleField;
  body?: LocaleBlockField;
  image?: Img;
  gallery?: Img[] | null;
};

export type WorkDoc = {
  _id: string;
  slug: string;
  date?: string | null;
  title?: LocaleField;
  excerpt?: LocaleField;
  body?: LocaleBlockField;
  image?: Img;
  gallery?: Img[] | null;
};

export type LicenseDoc = {
  _id: string;
  title?: LocaleField;
  issuedBy?: LocaleField;
  validity?: LocaleField;
  image?: Img;
};

// ---- fetchers ------------------------------------------------------------

export const getSiteSettings = () => fetchSanity<SiteSettings>(siteSettingsQuery);
export const getHero = () => fetchSanity<Hero>(heroQuery);
export const getAbout = () => fetchSanity<About>(aboutQuery);
export const getStats = () => fetchSanity<Stat[]>(statsQuery);
export const getServicesGrid = () => fetchSanity<ServiceDoc[]>(servicesGridQuery);
export const getAllServices = () => fetchSanity<ServiceDoc[]>(allServicesQuery);
export const getServiceBySlug = (slug: string) =>
  fetchSanity<ServiceDoc | null>(serviceBySlugQuery, { slug });
export const getGallery = () => fetchSanity<GalleryItem[]>(galleryQuery);
export const getContact = () => fetchSanity<Contact>(contactQuery);
export const getNewsList = () => fetchSanity<NewsDoc[]>(newsListQuery);
export const getNewsBySlug = (slug: string) =>
  fetchSanity<NewsDoc | null>(newsBySlugQuery, { slug });
export const getWorksList = () => fetchSanity<WorkDoc[]>(worksListQuery);
export const getWorkBySlug = (slug: string) =>
  fetchSanity<WorkDoc | null>(workBySlugQuery, { slug });
export const getLicenses = () => fetchSanity<LicenseDoc[]>(licensesQuery);

/** Resolve a Sanity image object to a URL (or null). */
export function imageUrl(source: { asset?: unknown } | null | undefined) {
  const b = urlForImage(source as never);
  return b ? b.url() : null;
}
