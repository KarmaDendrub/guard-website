"use client";

import { useEffect, useRef, useState } from "react";
import {
  Car,
  Award,
  Building2,
  Clock,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { StatContent } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  Car,
  Award,
  Building2,
  Clock,
  ShieldCheck,
  Users,
};

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function StatItem({ stat, active }: { stat: StatContent; active: boolean }) {
  const count = useCountUp(stat.value, active);
  const Icon = ICONS[stat.icon] ?? Car;
  return (
    <div className="flex flex-col items-center text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
        <Icon className="h-7 w-7" />
      </span>
      <span className="font-heading text-4xl font-extrabold text-ink sm:text-5xl">
        {count.toLocaleString("uk-UA")}
        <span className="text-gold-dark">{stat.suffix}</span>
      </span>
      <span className="mt-2 text-sm font-medium uppercase tracking-wide text-ink/60">
        {stat.label}
      </span>
    </div>
  );
}

export function StatsSection({ items }: { items: StatContent[] }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-navy-dark py-16">
      <div className="absolute inset-x-0 bg-shield-grid" />
      <div ref={ref} className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
        {items.map((stat, i) => (
          <StatItem key={i} stat={stat} active={active} />
        ))}
      </div>
    </section>
  );
}
