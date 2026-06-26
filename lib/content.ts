/**
 * Server-side content resolver.
 *
 * Each function returns ready-to-render, locale-resolved content. It prefers
 * data from Sanity but falls back to the original hardcoded content (messages,
 * lib/site, lib/services) whenever Sanity is empty or unreachable — so the live
 * site never breaks, and editors' changes in /studio take over automatically.
 */
import { getLocale } from "next-intl/server";
import uk from "@/messages/uk.json";
import ru from "@/messages/ru.json";
import { COMPANY, PHONES, SOCIALS } from "@/lib/site";
import { SERVICES, ALL_SERVICES } from "@/lib/services";
import {
  getHero,
  getStats,
  getAbout,
  getServicesGrid,
  getServiceBySlug,
  getSiteSettings,
  getContact,
  pick,
  imageUrl,
  type Phone,
  type Social,
} from "@/sanity/lib/api";
import type { Lang } from "@/sanity/env";

const messages = { uk, ru } as const;

export async function currentLang(): Promise<Lang> {
  const l = await getLocale();
  return l === "ru" ? "ru" : "uk";
}

// ---- hero -----------------------------------------------------------------

export type HeroContent = { title: string; subtitle: string; slides: string[] };

export async function getHeroContent(lang: Lang): Promise<HeroContent> {
  const m = messages[lang].hero;
  const fallback: HeroContent = {
    title: m.title,
    subtitle: m.subtitle,
    slides: [
      "/images/hero/hero1.jpg",
      "/images/hero/hero2.jpg",
      "/images/hero/hero3.jpg",
    ],
  };
  const data = await getHero();
  if (!data) return fallback;
  const slides =
    (data.slides ?? [])
      .map((s) => imageUrl(s))
      .filter((u): u is string => !!u) ?? [];
  return {
    title: pick(data.title, lang) || fallback.title,
    subtitle: pick(data.subtitle, lang) || fallback.subtitle,
    slides: slides.length ? slides : fallback.slides,
  };
}

// ---- stats ----------------------------------------------------------------

export type StatContent = {
  value: number;
  suffix: string;
  label: string;
  icon: string;
};

export async function getStatsContent(lang: Lang): Promise<StatContent[]> {
  const m = messages[lang].stats;
  const fallback: StatContent[] = [
    { value: 70, suffix: "", label: m.groups, icon: "Car" },
    { value: 20, suffix: "+", label: m.years, icon: "Award" },
    { value: 20000, suffix: "+", label: m.objects, icon: "Building2" },
    { value: 24, suffix: "/7", label: m.react, icon: "Clock" },
  ];
  const data = await getStats();
  if (!data || data.length === 0) return fallback;
  return data.map((s) => ({
    value: s.value,
    suffix: s.suffix ?? "",
    label: pick(s.label, lang),
    icon: s.icon || "Car",
  }));
}

// ---- about ----------------------------------------------------------------

export type AboutContent = {
  title: string;
  text: string;
  image: string;
  cta: string;
};

export async function getAboutContent(lang: Lang): Promise<AboutContent> {
  const m = messages[lang].about;
  const fallback: AboutContent = {
    title: m.title,
    text: m.text,
    image: "/images/about/main.jpg",
    cta: m.cta,
  };
  const data = await getAbout();
  if (!data) return fallback;
  return {
    title: pick(data.title, lang) || fallback.title,
    text: pick(data.text, lang) || fallback.text,
    image: imageUrl(data.image as never) || fallback.image,
    cta: fallback.cta, // button label stays a UI string (next-intl)
  };
}

// ---- services -------------------------------------------------------------

export type ServiceContent = {
  key: string;
  href: string;
  title: string;
  description: string;
  image: string;
  icon: string;
};

export async function getServicesGridContent(
  lang: Lang
): Promise<ServiceContent[]> {
  const fallback: ServiceContent[] = SERVICES.map((s) => ({
    key: s.key,
    href: s.href,
    title: s.title,
    description: s.description,
    image: s.image,
    icon: s.icon,
  }));
  const data = await getServicesGrid();
  if (!data || data.length === 0) return fallback;
  return data.map((s) => ({
    key: s._id,
    href: `/${s.slug}`,
    title: pick(s.title, lang),
    description: pick(s.description, lang),
    image: imageUrl(s.image as never) || "/images/services/pult.jpg",
    icon: s.icon || "MonitorCheck",
  }));
}

export type ServiceDetailContent = {
  title: string;
  description: string;
  image: string;
};

/** Look up a single service for its detail page, by the legacy lib `key`. */
export async function getServiceDetailContent(
  serviceKey: string,
  lang: Lang
): Promise<ServiceDetailContent | null> {
  const fb = ALL_SERVICES.find((s) => s.key === serviceKey);
  const fallback: ServiceDetailContent | null = fb
    ? { title: fb.title, description: fb.description, image: fb.image }
    : null;
  // Sanity services were migrated with _id `service-${key}` and the same slug.
  const slug = fb ? fb.href.replace(/^\//, "") : serviceKey;
  const data = await getServiceBySlug(slug);
  if (!data) return fallback;
  return {
    title: pick(data.title, lang) || fallback?.title || "",
    description: pick(data.description, lang) || fallback?.description || "",
    image: imageUrl(data.image as never) || fallback?.image || "",
  };
}

// ---- site settings (logo, phones, socials) --------------------------------

export type SiteContent = {
  logo: string;
  companyName: string;
  phones: Phone[];
  socials: Social[];
  city: string;
};

export async function getSiteContent(lang: Lang): Promise<SiteContent> {
  const fallback: SiteContent = {
    logo: "/images/logo.png",
    companyName: COMPANY.name,
    phones: PHONES.map((p) => ({ ...p })),
    socials: SOCIALS.map((s) => ({ ...s })),
    city: COMPANY.city,
  };
  const data = await getSiteSettings();
  if (!data) return fallback;
  return {
    logo: imageUrl(data.logo as never) || fallback.logo,
    companyName: pick(data.companyName, lang) || fallback.companyName,
    phones: data.phones?.length ? data.phones : fallback.phones,
    socials: data.socials?.length ? data.socials : fallback.socials,
    city: fallback.city,
  };
}

// ---- contact --------------------------------------------------------------

export type ContactContent = {
  address: string;
  phones: Phone[];
  email: string;
  telegram: string;
  mapUrl: string;
};

export async function getContactContent(lang: Lang): Promise<ContactContent> {
  const fallback: ContactContent = {
    address: COMPANY.city,
    phones: PHONES.map((p) => ({ ...p })),
    email: "",
    telegram: "https://t.me/guardua",
    mapUrl: "https://goo.gl/maps/pBTZmMgtrvTHkua3A",
  };
  const data = await getContact();
  if (!data) return fallback;
  return {
    address: pick(data.address, lang) || fallback.address,
    phones: data.phone ? [data.phone] : fallback.phones,
    email: data.email || fallback.email,
    telegram: data.telegram || fallback.telegram,
    mapUrl: data.mapUrl || fallback.mapUrl,
  };
}
