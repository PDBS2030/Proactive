"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaintVideo } from "@/components/FaintVideo";
import type { Phase } from "@/lib/process";
import { cn } from "@/lib/cn";

const TONES = {
  paper: {
    section: "bg-white text-[#143275]",
    grid: "bg-[linear-gradient(rgba(20,50,117,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(20,50,117,.06)_1px,transparent_1px)]",
    muted: "text-[#143275]/80",
    rule: "bg-[#143275]/15",
    hair: "border-[#143275]/15",
    dot: "border-[#143275] bg-white",
    card: "border-[#143275]/10 bg-white",
    label: "text-gold",
  },
  blueprint: {
    section: "bg-[#0b3a6b] text-white",
    grid: "bg-[linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)]",
    muted: "text-white/80",
    rule: "bg-white/25",
    hair: "border-white/25",
    dot: "border-white bg-[#0b3a6b]",
    card: "border-white/20 bg-[#0b3a6b]/60",
    label: "text-[#e3c98f]",
  },
  site: {
    section: "bg-[#082b52] text-white",
    grid: "",
    muted: "text-white/80",
    rule: "bg-white/25",
    hair: "border-white/25",
    dot: "border-white bg-[#082b52]",
    card: "border-white/20 bg-[#082b52]/60",
    label: "text-[#e3c98f]",
  },
} as const;

/**
 * One phase: a title block that stays in view on the left, and on the right a gold route that fills as you
 * scroll, with a station for each step and a "You decide / We deliver" pair under it.
 */
export function PhasePanel({ phase }: { phase: Phase }) {
  const t = TONES[phase.tone];
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = list.current;
      if (!el || !fill.current) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
      fill.current.style.transform = `scaleY(${p.toFixed(3)})`;
      const dots = el.querySelectorAll<HTMLElement>("[data-dot]");
      dots.forEach((d) => {
        const y = d.getBoundingClientRect().top;
        d.dataset.on = y < mid ? "1" : "0";
      });
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
      {phase.tone === "paper" && (
        /* a photograph behind the title side only, washed so the text stays easy to read and faded out toward the steps */
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 -z-20 h-[460px] w-full min-[992px]:h-full min-[992px]:w-[42%] [mask-image:linear-gradient(to_bottom,#000_70%,transparent)] min-[992px]:[mask-image:linear-gradient(to_right,#000_68%,transparent)]"
        >
          <Image src="/assets/gallery/landmark/2.jpg" alt="" fill sizes="(max-width: 992px) 100vw, 42vw" className="object-cover object-[40%_center]" />
          <span className="absolute inset-0 bg-white/[.72]" />
        </span>
      )}
      {t.grid && <span aria-hidden="true" className={cn("absolute inset-0 -z-10 bg-[length:56px_56px]", t.grid)} />}

      <div className="mx-auto grid w-full max-w-[1680px] gap-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-14">
        <div className="min-[992px]:col-span-4">
          <div className="min-[992px]:sticky min-[992px]:top-[150px]">
            <p className={cn("text-xs leading-4 font-semibold tracking-[.15em] uppercase", t.label)}>{phase.range}</p>
            <h2
              id={`${phase.id}-title`}
              className="mt-4 font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]"
            >
              {phase.title}
            </h2>
            <p className={cn("mt-5 max-w-[40ch] font-mulish text-[17px] leading-[1.65]", t.muted)}>{phase.summary}</p>
          </div>
        </div>

        <ol ref={list} className="relative min-[992px]:col-span-8">
          <span aria-hidden="true" className={cn("absolute top-2 bottom-2 left-[9px] w-px", t.rule)} />
          <span ref={fill} aria-hidden="true" className="absolute top-2 bottom-2 left-[8px] w-0.5 origin-top bg-gold will-change-transform" style={{ transform: "scaleY(0)" }} />
          {phase.steps.map((s) => (
            <li key={s.title} className={cn("group/step relative border-t py-9 pl-12 first:border-t-0 first:pt-0 last:pb-0", t.hair)}>
              <span
                data-dot
                data-on="0"
                aria-hidden="true"
                className={cn("absolute left-0 size-5 border-2 transition-[background-color,border-color,transform] duration-500 data-[on=1]:scale-110 data-[on=1]:border-gold data-[on=1]:bg-gold", t.dot, "top-[39px] group-first/step:top-1.5")}
              />
              {/* The step on the left; on the right a two-line ledger of who decides and who delivers */}
              <div className="grid gap-6 min-[1100px]:grid-cols-[5fr_6fr] min-[1100px]:gap-x-12">
                <div>
                  <h3 className="font-jost text-(length:--h5) leading-(--h5-lh) font-normal uppercase">{s.title}</h3>
                  <p className={cn("mt-3 max-w-[44ch] font-mulish text-[16px] leading-[1.65]", t.muted)}>{s.text}</p>
                </div>
                <dl className={cn("grid self-start border-y", t.hair)}>
                  <div className="grid grid-cols-[104px_1fr] gap-x-5 py-4 min-[640px]:grid-cols-[120px_1fr]">
                    <dt className={cn("text-[15px] leading-snug font-semibold", t.label)}>You decide</dt>
                    <dd className="text-[16px] leading-[1.5]">{s.decide}</dd>
                  </div>
                  <div className={cn("grid grid-cols-[104px_1fr] gap-x-5 border-t py-4 min-[640px]:grid-cols-[120px_1fr]", t.hair)}>
                    <dt className={cn("text-[15px] leading-snug font-semibold", t.label)}>We deliver</dt>
                    <dd className="text-[16px] leading-[1.5]">{s.deliver}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
