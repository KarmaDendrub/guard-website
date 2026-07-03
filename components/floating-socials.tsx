"use client";

import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/social-icon";
import type { Social } from "@/sanity/lib/api";

/** Brand colours for each social glyph (Instagram uses its signature gradient). */
const BRAND: Record<string, string> = {
  instagram: "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]",
  facebook: "bg-[#1877F2]",
  telegram: "bg-[#26A5E4]",
  youtube: "bg-[#FF0000]",
  viber: "bg-[#7360F2]",
  "map-pin": "bg-[#EA4335]",
};

/**
 * Sticky floating panel with colour social icons, pinned to the right edge on
 * every page. Compact on mobile, larger from `sm` up.
 */
export function FloatingSocials({ socials }: { socials: Social[] }) {
  if (!socials?.length) return null;

  return (
    <nav
      aria-label="Соцмережі"
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2"
    >
      <ul className="flex flex-col gap-1.5 rounded-l-2xl bg-white/85 p-1.5 shadow-card ring-1 ring-black/5 backdrop-blur sm:gap-2 sm:p-2">
        {socials.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              title={s.name}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-200 hover:scale-110 focus-visible:scale-110 sm:h-11 sm:w-11",
                BRAND[s.icon] ?? "bg-gold"
              )}
            >
              <SocialIcon name={s.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
