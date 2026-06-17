import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  /** "light" = dark text (on white header), "dark" = light text (on navy footer) */
  variant?: "light" | "dark";
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label="Корпорація ГУАРД — на головну"
    >
      <Image
        src="/images/logo.png"
        alt="Емблема Корпорації ГУАРД"
        width={84}
        height={126}
        priority
        className="h-12 w-auto drop-shadow-sm transition-transform group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-xl font-extrabold tracking-tight",
            variant === "dark" ? "text-white" : "text-ink"
          )}
        >
          ГУАРД
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.2em]",
            variant === "dark" ? "text-gold-light" : "text-gold"
          )}
        >
          Корпорація
        </span>
      </span>
    </Link>
  );
}
