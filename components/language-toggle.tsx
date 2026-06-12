"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "uk", flag: "🇺🇦", label: "Українська", short: "UA" },
  { code: "ru", flag: "🇷🇺", label: "Русский", short: "RU" },
] as const;

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function setLocale(code: string) {
    if (code === locale) return;
    // store choice in a year-long cookie read by i18n/request.ts
    document.cookie = `GUARD_LOCALE=${code}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-gold/40 p-0.5",
        isPending && "opacity-60",
        className
      )}
      role="group"
      aria-label="Перемикач мови"
    >
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          title={l.label}
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            locale === l.code
              ? "bg-gold text-navy-dark"
              : "text-current opacity-70 hover:opacity-100"
          )}
        >
          <span aria-hidden>{l.flag}</span>
          <span>{l.short}</span>
        </button>
      ))}
    </div>
  );
}
