"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { PHONES as DEFAULT_PHONES } from "@/lib/site";
import type { Phone as PhoneInfo } from "@/sanity/lib/api";
import { Logo } from "./logo";

import { CallbackModal } from "@/components/callback-modal";

const NAV = [
  { key: "akcii", href: "/akcii" },
  { key: "golovna", href: "/" },
  { key: "propozicii", href: "/propoziciya" },
  { key: "grupy", href: "/mobilni-grupy" },
  { key: "kontakti", href: "/kontakti" },
  { key: "vakansii", href: "/vakansii" },
  { key: "licenzii", href: "/licenzii" },
  { key: "vidguky", href: "/#reviews" },
] as const;

export function Header({
  phones = DEFAULT_PHONES as unknown as PhoneInfo[],
  logo = "/images/logo.png",
}: {
  phones?: PhoneInfo[];
  logo?: string;
}) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar: phones + language */}
      <div className="hidden bg-navy-dark text-ink lg:block">
        <div className="container-x flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gold-dark">
            <Phone className="h-3.5 w-3.5" />
            <span className="mr-1 text-sm uppercase tracking-wider text-ink">
              {tCommon("phones")}:
            </span>
            <div className="flex items-center gap-4">
              {phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="font-medium text-ink transition-colors hover:text-gold-dark"
                >
                  {p.display}
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b bg-white/95 backdrop-blur transition-shadow",
          scrolled ? "shadow-card" : "shadow-none"
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo src={logo} />

          <nav className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => {
              const base = item.href.split("#")[0];
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : base !== "/" && pathname.startsWith(base);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-ink"
                      : "text-ink/70 hover:text-ink",
                    "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100",
                    active && "after:scale-x-100"
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <CallbackModal variant="danger" />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={`tel:${phones[0].tel}`}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-navy text-ink"
              aria-label="Зателефонувати"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-ink"
              aria-label="Меню"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-b bg-white shadow-card xl:hidden">
          <nav className="container-x flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="border-b border-border/60 py-3 text-base font-medium text-ink last:border-0"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="container-x flex flex-col gap-3 pb-4">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="text-sm font-medium text-ink hover:text-gold-dark"
                >
                  {p.display}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-between">
              
              <CallbackModal variant="danger" size="sm" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
