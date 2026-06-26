"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin, Phone } from "lucide-react";
import {
  COMPANY,
  PHONES as DEFAULT_PHONES,
  SOCIALS as DEFAULT_SOCIALS,
  NAV_LINKS,
} from "@/lib/site";
import { SERVICES } from "@/lib/services";
import type { Phone as PhoneInfo, Social } from "@/sanity/lib/api";
import { Logo } from "./logo";
import { SocialIcon } from "@/components/social-icon";

type FooterLink = { title: string; href: string };

export function Footer({
  phones = DEFAULT_PHONES as unknown as PhoneInfo[],
  socials = DEFAULT_SOCIALS as unknown as Social[],
  services = SERVICES.map((s) => ({ title: s.title, href: s.href })),
  logo = "/images/logo.png",
  companyName = COMPANY.name,
  city = COMPANY.city,
}: {
  phones?: PhoneInfo[];
  socials?: Social[];
  services?: FooterLink[];
  logo?: string;
  companyName?: string;
  city?: string;
} = {}) {
  const t = useTranslations("footer");
  const tSocial = useTranslations("social");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-ink/80">
      {/* Socials strip */}
      <div className="border-b border-black/10">
        <div className="container-x flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
          <span className="font-heading text-lg font-semibold text-ink">
            {tSocial("title")}
          </span>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-all hover:bg-gold hover:text-ink"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="container-x grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo src={logo} />
          <p className="max-w-xs text-sm leading-relaxed text-ink/60">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold-dark">
            {t("services")}
          </h3>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 7).map((s, i) => (
              <li key={i}>
                <Link href={s.href} className="transition-colors hover:text-gold-dark">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold-dark">
            {t("company")}
          </h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.filter((l) => l.href !== "/").map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-dark">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold-dark">
            {t("contacts")}
          </h3>
          <ul className="space-y-2 text-sm">
            {phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="flex items-center gap-2 transition-colors hover:text-gold-dark"
                >
                  <Phone className="h-3.5 w-3.5 text-gold-dark" />
                  {p.display}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2 pt-2 text-ink/60">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" />
              {city}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 text-sm text-ink/50 sm:flex-row">
          <p>
            © {year} {companyName}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
