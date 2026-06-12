import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const locales = ["uk", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";
export const LOCALE_COOKIE = "GUARD_LOCALE";

export default getRequestConfig(async () => {
  const store = cookies();
  const cookieLocale = store.get(LOCALE_COOKIE)?.value;
  const locale: Locale =
    cookieLocale && (locales as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
