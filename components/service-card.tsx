import Image from "next/image";
import Link from "next/link";
import {
  MonitorCheck,
  Wifi,
  Cable,
  UserCheck,
  Fence,
  ScanLine,
  Home,
  Smartphone,
  Cctv,
  Flame,
  Car,
  MessageSquare,
  Satellite,
  Wrench,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/services";

const ICONS: Record<string, LucideIcon> = {
  MonitorCheck,
  Wifi,
  Cable,
  UserCheck,
  Fence,
  ScanLine,
  Home,
  Smartphone,
  Cctv,
  Flame,
  Car,
  MessageSquare,
  Satellite,
  Wrench,
};

export function ServiceCard({ service, more }: { service: Service; more: string }) {
  const Icon = ICONS[service.icon] ?? MonitorCheck;

  return (
    <Link
      href={service.href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-olive hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          unoptimized={service.image.endsWith(".svg")}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent opacity-60" />
        <span className="absolute bottom-0 left-4 flex h-12 w-12 translate-y-1/2 items-center justify-center rounded-lg bg-olive text-white shadow-card">
          <Icon className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 pt-8">
        <h3 className="font-heading text-base font-bold leading-snug text-ink transition-colors group-hover:text-olive">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
          {service.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-olive">
          {more}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
