/**
 * Central Sanity environment config.
 * Public values (projectId, dataset, apiVersion) are exposed to the browser via
 * NEXT_PUBLIC_* and are safe to ship. The write token is server-only.
 */

// projectId/dataset are public config (they ship in the browser bundle anyway),
// so we fall back to the known project values. This keeps the build working even
// if NEXT_PUBLIC_* env vars are not set on the host.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "t1v1zdls";

/** Server-only editor/read token (optional). Never reference from a client component. */
export const token = process.env.SANITY_API_TOKEN;

/** Supported content languages (must match next-intl locales). */
export const SUPPORTED_LANGS = ["uk", "ru"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = "uk";
