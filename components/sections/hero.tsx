"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CallbackModal } from "@/components/callback-modal";
import type { HeroContent } from "@/lib/content";

export function Hero({ content }: { content: HeroContent }) {
  const t = useTranslations("hero");
  const SLIDES = content.slides;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-navy-dark lg:min-h-[88vh]">
      {/* Slider background */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((src, i) => (
            <div className="relative h-full min-w-0 flex-[0_0_100%]" key={src}>
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlays — keep the photo visible, darken only where text/controls sit */}
      {/* light base tint for brand cohesion */}
      <div className="absolute inset-0 bg-navy-dark/10" />
      {/* darken the left side, under the heading; fades out to the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/70 via-navy-dark/20 to-transparent" />
      {/* darken the bottom, under the slider controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/45 via-transparent to-transparent" />
      {/* subtle shield grid */}
      <div className="absolute inset-0 bg-shield-grid opacity-50" />

      {/* Content */}
      <div className="container-x relative flex min-h-[600px] flex-col justify-center py-20 lg:min-h-[88vh]">
        <div className="max-w-3xl animate-fade-in-up">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-light">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            24/7 · Дніпро
          </span>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-black drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-black/80 sm:text-xl">
            {content.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <CallbackModal
              triggerLabel={t("cta")}
              variant="danger"
              size="lg"
              withIcon={false}
            />
            <Button asChild variant="outlineGold" size="lg">
              <Link href="#services">
                {t("more")}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-10">
        <div className="container-x flex items-center justify-between">
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Слайд ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  selected === i ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Попередній слайд"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Наступний слайд"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
