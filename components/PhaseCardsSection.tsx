"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FaintVideo } from "@/components/FaintVideo";
import type { Phase } from "@/lib/process";
import { cn } from "@/lib/cn";

const LIFT =
  "shadow-[inset_0_1px_0_#fff,0_1px_1px_rgba(2,12,28,.18),0_8px_14px_rgba(2,12,28,.2),0_26px_44px_rgba(2,12,28,.3),0_64px_100px_-18px_rgba(2,12,28,.6)]";

/** One step: a plus that opens its description, what you decide and what we deliver */
function Row({ step, open, onToggle, id }: { step: Phase["steps"][number]; open: boolean; onToggle: () => void; id: string }) {
  return (
    <div className="border-t border-[#082b52]/12 first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-btn`}
        className="group flex w-full cursor-pointer items-start gap-4 py-4 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2356e5]"
      >
        <span aria-hidden="true" className="relative mt-[3px] block size-[18px] shrink-0 text-gold">
          <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-current" />
          <span className={cn("absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-current transition-transform duration-300 ease-out", open && "scale-y-0")} />
        </span>
        <span className="text-[17px] leading-snug text-[#082b52] underline decoration-[#082b52]/25 decoration-1 underline-offset-[5px] transition-[text-decoration-color] duration-300 group-hover:decoration-gold">
          {step.title}
        </span>
      </button>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} className={cn("grid transition-[grid-template-rows] duration-400 ease-out motion-reduce:transition-none", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="pr-2 pb-5 pl-[34px]">
            <p className="text-[15px] leading-[1.6] text-[#082b52]/85">{step.text}</p>
            <p className="mt-3 text-[15px] leading-[1.55] text-[#082b52]">
              <span className="font-semibold text-gold">You decide: </span>
              {step.decide}
            </p>
            <p className="mt-2 text-[15px] leading-[1.55] text-[#082b52]">
              <span className="font-semibold text-gold">We deliver: </span>
              {step.deliver}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ phase, tilt }: { phase: Phase; tilt: string }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <article
      id={phase.id}
      aria-labelledby={`${phase.id}-title`}
      className={cn("relative min-h-[var(--card-h,0px)] scroll-mt-[130px] border border-white/60 bg-white/90 p-7 backdrop-blur-[3px] [transform:translate3d(0,var(--lift,0px),0)] min-[768px]:p-9 min-[1100px]:[transform:perspective(1200px)_rotateY(var(--ry,0deg))_translate3d(0,var(--lift,0px),0)]", LIFT)}
      style={{ ["--ry" as string]: tilt }}
    >
      <span aria-hidden="true" className="absolute top-0 left-0 h-1 w-20 bg-gold" />
      <p className="text-xs leading-4 font-semibold tracking-[.15em] text-gold uppercase">{phase.range}</p>
      <h3 id={`${phase.id}-title`} className="mt-3 font-jost text-[clamp(24px,2vw,32px)] leading-[1.08] font-medium tracking-normal text-[#082b52] uppercase">
        {phase.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.6] text-[#082b52]/85">{phase.summary}</p>
      <div className="mt-6 border-y border-[#082b52]/12">
        {phase.steps.map((s, k) => (
          <Row key={s.title} id={`${uid}-${k}`} step={s} open={open === k} onToggle={() => setOpen(open === k ? null : k)} />
        ))}
      </div>
    </article>
  );
}

/**
 * The three phases as cards lifted off a full-screen, blue-tinted film. The cards float at slightly different
 * heights and drift against each other as you scroll; each step inside opens with its plus.
 */
export function PhaseCardsSection({ phases }: { phases: Phase[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
      el.style.setProperty("--p", p.toFixed(3));
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
    <section ref={root} id="phases" aria-labelledby="phases-heading" style={{ ["--p" as string]: 0 }} className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#082b52] px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[120px] [--phase-card-h:0px] min-[1100px]:[--phase-card-h:667px]">
      <FaintVideo src="/assets/service-video.mp4" poster="/assets/service-video-poster.jpg" className="absolute inset-0 -z-20 size-full object-cover" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[#082b52]/62" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,43,82,.55)_0%,rgba(8,43,82,0)_28%,rgba(8,43,82,0)_72%,rgba(8,43,82,.6)_100%)]" />
      <h2 id="phases-heading" className="sr-only">
        The three phases
      </h2>

      {/* the cards sit in the middle of the film, all on one level */}
      <div className="mx-auto grid w-full max-w-[1680px] items-start gap-8 min-[1100px]:grid-cols-3 min-[1100px]:gap-x-12" style={{ ["--lift" as string]: "calc(var(--p) * -34px)", ["--card-h" as string]: "var(--phase-card-h)" }}>
        {phases.map((p, i) => (
          <Card key={p.id} phase={p} tilt={["16deg", "0deg", "-16deg"][i] ?? "0deg"} />
        ))}
      </div>
    </section>
  );
}
