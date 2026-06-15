import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const locales = ["uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";
export const LOCALE_COOKIE = "GUARD_LOCALE";

export default getRequestConfig(async () => {
  return {
    locale: "uk",
    messages: (await import(`../messages/uk.json`)).default,
  };
});
