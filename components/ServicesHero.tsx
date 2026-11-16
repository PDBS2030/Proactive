"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Words } from "@/components/PageIntro";
import { goToSection } from "@/components/Stack";

/** The service the popup form chooses for each slide */
const START_SERVICE: Record<string, string> = {
  architecture: "Architecture and design",
  "design-build": "Design-build",
  "construction-management": "Construction management",
};

export type HeroSlide = {
  id: string;
  name: string;
  headline: string;
  image: string;
  alt: string;
  position?: string;
};

/**
 * Full-screen hero with one slide per service. It advances by itself, pauses on hover or focus, and
 * also responds to swiping.
 * It is pinned to the top of the page so the sections that follow slide over it.
 */
export function ServicesHero({
  eyebrow,
  title,
  slides,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  slides: HeroSlide[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const count = slides.length;
  const slide = slides[index];

  const go = (i: number) => setIndex(((i % count) + count) % count);

  // Advances by itself every few seconds, and waits while the pointer or focus is on the hero
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setIndex((v) => (v + 1) % count), 6500);
    return () => window.clearTimeout(t);
  }, [index, paused, count]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Our services"
      data-paused={paused}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
      }}
      className="sticky top-0 isolate flex h-[100svh] min-h-[620px] flex-col justify-end overflow-hidden bg-[#082b52] text-white"
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 -z-20 transition-[opacity,scale] duration-[1100ms] ease-out motion-reduce:transition-none",
            i === index ? "scale-100 opacity-100 duration-[1100ms]" : "scale-[1.07] opacity-0",
          )}
          style={i === index ? { transitionDuration: "1100ms, 7000ms" } : undefined}
        >
          <Image
            src={s.image}
            alt={i === index ? s.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: s.position ?? "center" }}
          />
        </div>
      ))}
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#082b52]/92 via-[#082b52]/45 to-[#082b52]/15" />

      <div className="flex flex-1 items-center px-4 pt-28 min-[768px]:absolute min-[768px]:inset-x-0 min-[768px]:top-1/2 min-[768px]:flex-none min-[768px]:-translate-y-1/2 min-[768px]:px-[124px] min-[768px]:pt-0">
        <div className="mx-auto grid w-full max-w-[1680px] gap-8 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
          <div className="min-[992px]:col-span-7">
            <p className="text-xs leading-4 font-semibold tracking-[.15em] text-white uppercase">{eyebrow}</p>
            <h1
              data-words
              className="mt-4 font-jost text-[22.4px] leading-[27px] font-medium tracking-normal uppercase min-[690px]:text-[34.2px] min-[690px]:leading-[39px] min-[992px]:text-[length:min(54px,calc((100vw-299px)/12.55))] min-[992px]:leading-[1.11]"
            >
              <Words text={title} />
            </h1>
          </div>

          <div className="flex flex-col justify-end min-[992px]:col-span-5 min-[1280px]:col-span-4 min-[1280px]:col-start-9">
            <div key={slide.id} className="hero-in" aria-live={paused ? "polite" : "off"}>
              <p className="text-sm font-semibold tracking-[.04em] text-gold">{slide.name}</p>
              <p className="mt-2 font-mulish text-[20px] leading-[31px] font-normal text-white/95 min-[992px]:text-[length:clamp(14px,calc((50vw-184px)/32.5),20px)] min-[992px]:leading-[1.55]">
                {slide.headline}
              </p>
              <a
                href={`#${slide.id}`}
                onClick={(e) => goToSection(e, slide.id)}
                className="mt-3 inline-block border-b-2 border-gold pb-0.5 text-[14px] font-medium text-white no-underline transition-[padding] duration-300 outline-none hover:pr-3 focus-visible:pr-3"
              >
                Explore {slide.name.toLowerCase()}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={primary.href}
                data-start-project
                data-service={START_SERVICE[slide.id]}
                className="btn-sweep inline-flex min-h-12 items-center justify-center border border-white bg-white bg-[linear-gradient(#143275,#143275)] px-7 text-[.8125rem] font-medium tracking-[.08em] text-[#143275] uppercase no-underline outline-none hover:text-white focus-visible:text-white"
              >
                {primary.label}
              </a>
              <Link
                href={secondary.href}
                className="btn-sweep inline-flex min-h-12 items-center justify-center border border-white/60 bg-[linear-gradient(#fff,#fff)] px-7 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline outline-none hover:border-white hover:text-[#143275] focus-visible:border-white focus-visible:text-[#143275]"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-10 min-[768px]:pb-14" />
    </section>
  );
}
