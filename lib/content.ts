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
import newsData from "@/data/news.json";
import installData from "@/data/installations.json";
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
  getNewsList,
  getNewsBySlug,
  getWorksList,
  getWorkBySlug,
  getLicenses,
  pick,
  pickBlocks,
  imageUrl,
  type Phone,
  type Social,
} from "@/sanity/lib/api";
import type { Lang } from "@/sanity/env";
import { textToBlocks, type Blocks } from "@/lib/portable";
import type { Post } from "@/components/post-card";

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
  description: Blocks;
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
    description: textToBlocks(s.description),
    image: s.image,
    icon: s.icon,
  }));
  const data = await getServicesGrid();
  if (!data || data.length === 0) return fallback;
  return data.map((s) => ({
    key: s._id,
    href: `/${s.slug}`,
    title: pick(s.title, lang),
    description: pickBlocks(s.description, lang),
    image: imageUrl(s.image as never) || "/images/services/pult.jpg",
    icon: s.icon || "MonitorCheck",
  }));
}

export type ServiceDetailContent = {
  title: string;
  description: Blocks;
  image: string;
};

/** Look up a single service for its detail page, by the legacy lib `key`. */
export async function getServiceDetailContent(
  serviceKey: string,
  lang: Lang
): Promise<ServiceDetailContent | null> {
  const fb = ALL_SERVICES.find((s) => s.key === serviceKey);
  const fallback: ServiceDetailContent | null = fb
    ? { title: fb.title, description: textToBlocks(fb.description), image: fb.image }
    : null;
  // Sanity services were migrated with _id `service-${key}` and the same slug.
  const slug = fb ? fb.href.replace(/^\//, "") : serviceKey;
  const data = await getServiceBySlug(slug);
  if (!data) return fallback;
  const blocks = pickBlocks(data.description, lang);
  return {
    title: pick(data.title, lang) || fallback?.title || "",
    description: blocks.length ? blocks : fallback?.description || [],
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

// ---- news -------------------------------------------------------------

type RawPost = Omit<Post, "body"> & { body: string };

function fallbackPost(p: RawPost): Post {
  return { ...p, body: textToBlocks(p.body) };
}

export async function getNewsListContent(lang: Lang): Promise<Post[]> {
  const fallback = (newsData as RawPost[]).map(fallbackPost);
  const data = await getNewsList();
  if (!data || data.length === 0) return fallback;
  return data.map((n) => ({
    slug: n.slug,
    title: pick(n.title, lang),
    date: n.date,
    image: imageUrl(n.image as never) || "/images/news/placeholder.jpg",
    excerpt: pick(n.excerpt, lang),
    body: pickBlocks(n.body, lang),
  }));
}

export async function getNewsBySlugContent(
  slug: string,
  lang: Lang
): Promise<Post | null> {
  const fb = (newsData as RawPost[]).map(fallbackPost).find((p) => p.slug === slug) ?? null;
  const data = await getNewsBySlug(slug);
  if (!data) return fb;
  const body = pickBlocks(data.body, lang);
  return {
    slug: data.slug,
    title: pick(data.title, lang) || fb?.title || "",
    date: data.date || fb?.date || "",
    image: imageUrl(data.image as never) || fb?.image || "",
    excerpt: pick(data.excerpt, lang) || fb?.excerpt || "",
    body: body.length ? body : fb?.body || [],
    gallery: (data.gallery ?? [])
      .map((g) => imageUrl(g as never))
      .filter((u): u is string => !!u),
  };
}

// ---- works (Монтажні роботи) --------------------------------------------

export async function getWorksListContent(lang: Lang): Promise<Post[]> {
  const fallback = (installData as RawPost[]).map(fallbackPost);
  const data = await getWorksList();
  if (!data || data.length === 0) return fallback;
  return data.map((w) => ({
    slug: w.slug,
    title: pick(w.title, lang),
    date: w.date || "",
    image: imageUrl(w.image as never) || "/images/installations/placeholder.svg",
    excerpt: pick(w.excerpt, lang),
    body: pickBlocks(w.body, lang),
  }));
}

export async function getWorkBySlugContent(
  slug: string,
  lang: Lang
): Promise<Post | null> {
  const fb = (installData as RawPost[]).map(fallbackPost).find((p) => p.slug === slug) ?? null;
  const data = await getWorkBySlug(slug);
  if (!data) return fb;
  const body = pickBlocks(data.body, lang);
  return {
    slug: data.slug,
    title: pick(data.title, lang) || fb?.title || "",
    date: data.date || fb?.date || "",
    image: imageUrl(data.image as never) || fb?.image || "",
    excerpt: pick(data.excerpt, lang) || fb?.excerpt || "",
    body: body.length ? body : fb?.body || [],
    gallery: (data.gallery ?? [])
      .map((g) => imageUrl(g as never))
      .filter((u): u is string => !!u),
  };
}

// ---- licenses (Ліцензії) --------------------------------------------------

export type LicenseContent = {
  title: string;
  issuedBy: string;
  validity: string;
  image: string;
};

const LICENSES_FALLBACK: LicenseContent[] = [
  {
    title: "Офіційний представник ТОВ «Охорона і Безпека»",
    issuedBy: "ТМ «Орлан», «Лунь», «Алет» та «Granat», м. Дніпро",
    validity: "2026 р.",
    image: "/images/licenses/license-1.jpg",
  },
  {
    title: "Ajax Authorized Security Company",
    issuedBy: "Сертифікат Ajax Systems · № UA20262003858",
    validity: "дійсний до 31.12.2026",
    image: "/images/licenses/license-2.jpg",
  },
  {
    title: "Офіційний дилер ТОВ «Охоронні системи»",
    issuedBy: "ТМ «GSN Electronic», «Elmes electronic» та «CROW»",
    validity: "дійсний до 31.12.2027",
    image: "/images/licenses/license-3.jpg",
  },
];

export async function getLicensesContent(lang: Lang): Promise<LicenseContent[]> {
  const data = await getLicenses();
  if (!data || data.length === 0) return LICENSES_FALLBACK;
  return data.map((l) => ({
    title: pick(l.title, lang),
    issuedBy: pick(l.issuedBy, lang),
    validity: pick(l.validity, lang),
    image: imageUrl(l.image as never) || "",
  }));
}
