"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaintVideo } from "@/components/FaintVideo";
import type { Phase } from "@/lib/process";
import { cn } from "@/lib/cn";

/** One photograph for each step of each phase (placeholders from the gallery until project photos are chosen). */
const IMAGES: Record<string, { src: string; position?: string }[]> = {
  "phase-1": [
    { src: "/assets/gallery/landmark/2.jpg", position: "center 55%" },
    { src: "/assets/gallery/landmark/8.jpg", position: "center" },
    { src: "/assets/gallery/landmark/9.jpg", position: "center 60%" },
    { src: "/assets/gallery/landmark/3.jpg", position: "center 35%" },
    { src: "/assets/gallery/landmark/4.jpg", position: "center 60%" },
  ],
  "phase-2": [
    { src: "/assets/gallery/explore/2.jpg", position: "center 60%" },
    { src: "/assets/gallery/explore/9.jpg", position: "center" },
    { src: "/assets/gallery/explore/5.jpg", position: "center 40%" },
    { src: "/assets/gallery/explore/7.jpg", position: "center 60%" },
    { src: "/assets/gallery/explore/3.jpg", position: "center 60%" },
  ],
  "phase-3": [
    { src: "/assets/offerings-buildings.jpg", position: "center" },
    { src: "/assets/offerings-talent.jpg", position: "center 75%" },
    { src: "/assets/offerings-development.jpg", position: "center 40%" },
    { src: "/assets/service-video-poster.jpg", position: "center" },
    { src: "/assets/offerings-infrastructure.jpg", position: "center 35%" },
  ],
};

const TONES = {
  paper: {
    section: "bg-white text-[#082b52]",
    grid: "bg-[linear-gradient(rgba(8,43,82,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(8,43,82,.06)_1px,transparent_1px)]",
    muted: "text-[#082b52]/80",
    hair: "border-[#082b52]/15",
    label: "text-gold",
    idle: "text-[#082b52]/75 hover:bg-[#082b52]/[.05] hover:text-[#082b52]",
    on: "bg-[#082b52] text-white",
    list: "bg-white",
  },
  blueprint: {
    section: "bg-[#0b3a6b] text-white",
    grid: "bg-[linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)]",
    muted: "text-white/80",
    hair: "border-white/25",
    label: "text-[#e3c98f]",
    idle: "text-white/75 hover:bg-white/[.07] hover:text-white",
    on: "bg-white text-[#0b3a6b]",
    list: "bg-[#0b3a6b]/70",
  },
  site: {
    section: "bg-[#082b52] text-white",
    grid: "",
    muted: "text-white/80",
    hair: "border-white/25",
    label: "text-[#e3c98f]",
    idle: "text-white/75 hover:bg-white/[.07] hover:text-white",
    on: "bg-white text-[#082b52]",
    list: "bg-[#082b52]/70",
  },
} as const;

/**
 * One phase as a step explorer: the five steps in a list on the left, and on the right a photograph with the
 * step's description and what you decide and what we deliver.
 */
export function PhasePanel({ phase }: { phase: Phase }) {
  const t = TONES[phase.tone];
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const imgs = IMAGES[phase.id] ?? [];
  const step = phase.steps[i];
  const n = phase.steps.length;

  const onKey = (e: React.KeyboardEvent, k: number) => {
    let next = k;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (k + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (k - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setI(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      id={phase.id}
      aria-labelledby={`${phase.id}-title`}
      className={cn("relative isolate overflow-clip px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[120px]", t.section)}
    >
      {phase.tone === "site" && (
        <>
          <FaintVideo src="/assets/service-video.mp4" poster="/assets/service-video-poster.jpg" className="absolute inset-0 -z-20 size-full object-cover opacity-[.2]" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-[#082b52]/70 via-[#082b52]/35 to-[#082b52]/70" />
        </>
      )}
      {t.grid && <span aria-hidden="true" className={cn("absolute inset-0 -z-10 bg-[length:56px_56px]", t.grid)} />}

      <div className="mx-auto w-full max-w-[1680px]">
        <div className="grid gap-6 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
          <div className="min-[992px]:col-span-5">
            <p className={cn("text-xs leading-4 font-semibold tracking-[.15em] uppercase", t.label)}>{phase.range}</p>
            <h2
              id={`${phase.id}-title`}
              className="mt-4 font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]"
            >
              {phase.title}
            </h2>
          </div>
          <p className={cn("max-w-[52ch] self-end font-mulish text-[17px] leading-[1.65] min-[992px]:col-span-6 min-[992px]:col-start-7", t.muted)}>{phase.summary}</p>
        </div>

        <div className="mt-12 grid gap-8 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
          {/* The steps */}
          <div role="tablist" aria-label={`${phase.title} steps`} aria-orientation="vertical" className={cn("self-start border shadow-[0_18px_40px_-18px_rgba(8,43,82,.45)] min-[992px]:col-span-4", t.hair, t.list)}>
            {phase.steps.map((s, k) => (
              <button
                key={s.title}
                ref={(el) => {
                  tabs.current[k] = el;
                }}
                type="button"
                role="tab"
                id={`${phase.id}-tab-${k}`}
                aria-selected={k === i}
                aria-controls={`${phase.id}-panel`}
                tabIndex={k === i ? 0 : -1}
                onClick={() => setI(k)}
                onKeyDown={(e) => onKey(e, k)}
                className={cn("relative block w-full cursor-pointer border-b text-left outline-none last:border-b-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#2356e5]", t.hair)}
              >
                <span
                  className={cn(
                    "block py-[18px] pr-5 pl-6 text-[17px] leading-snug transition-[background-color,color,padding] duration-300",
                    k === i ? cn(t.on, "pl-8 font-medium") : t.idle,
                  )}
                >
                  {s.title}
                </span>
                <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-1 origin-top bg-gold transition-transform duration-300", k === i ? "scale-y-100" : "scale-y-0")} />
              </button>
            ))}
          </div>

          {/* The step in detail */}
          <div role="tabpanel" id={`${phase.id}-panel`} aria-labelledby={`${phase.id}-tab-${i}`} className="min-[992px]:col-span-8">
            <div className="relative aspect-[16/8.5] overflow-hidden bg-[#061a33]">
              {imgs.map((im, k) => (
                <Image
                  key={im.src}
                  src={im.src}
                  alt=""
                  fill
                  sizes="(max-width: 992px) 100vw, 60vw"
                  className={cn("object-cover transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none", k === i ? "scale-100 opacity-100" : "scale-[1.05] opacity-0")}
                  style={{ objectPosition: im.position ?? "center" }}
                />
              ))}
              <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#061a33]/35 via-transparent to-transparent" />
            </div>

            <div key={step.title} className="hero-in mt-8">
              <h3 className="font-jost text-[clamp(22px,2vw,30px)] leading-[1.15] font-normal uppercase">{step.title}</h3>
              <p className={cn("mt-3 max-w-[64ch] font-mulish text-[17px] leading-[1.65]", t.muted)}>{step.text}</p>
              <div className={cn("mt-7 grid gap-x-10 gap-y-6 border-t pt-6 min-[640px]:grid-cols-2", t.hair)}>
                <div>
                  <p className={cn("text-[15px] font-semibold", t.label)}>You decide</p>
                  <p className="mt-1.5 text-[16px] leading-[1.55]">{step.decide}</p>
                </div>
                <div>
                  <p className={cn("text-[15px] font-semibold", t.label)}>We deliver</p>
                  <p className="mt-1.5 text-[16px] leading-[1.55]">{step.deliver}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
