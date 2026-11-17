"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { Phase } from "@/lib/process";
import { cn } from "@/lib/cn";

/** A photograph behind each card (placeholders until project photos are chosen) */
const CARD_IMAGES: Record<string, { src: string; position: string }> = {
  "phase-1": { src: "/assets/gallery/landmark/2.jpg", position: "center 55%" },
  "phase-2": { src: "/assets/process-design.jpg", position: "center 40%" },
  "phase-3": { src: "/assets/offerings-talent.jpg", position: "center 70%" },
};

const LIFT =
  "shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_1px_1px_rgba(8,43,82,.22),0_10px_18px_rgba(8,43,82,.22),0_30px_50px_rgba(8,43,82,.28),0_70px_110px_-20px_rgba(8,43,82,.55)]";

/** One step: a plus that opens its description, what you decide and what we deliver */
function Row({ step, open, onToggle, id }: { step: Phase["steps"][number]; open: boolean; onToggle: () => void; id: string }) {
  return (
    <div className="border-t border-white/20 first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-btn`}
        className="group flex w-full cursor-pointer items-start gap-4 py-3 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2356e5]"
      >
        <span aria-hidden="true" className="relative mt-[3px] block size-[18px] shrink-0 text-[#e3c98f]">
          <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-current" />
          <span className={cn("absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-current transition-transform duration-300 ease-out", open && "scale-y-0")} />
        </span>
        <span className="text-[17px] leading-snug text-white underline decoration-white/35 decoration-1 underline-offset-[5px] transition-[text-decoration-color] duration-300 group-hover:decoration-gold">
          {step.title}
        </span>
      </button>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} className={cn("grid transition-[grid-template-rows] duration-400 ease-out motion-reduce:transition-none", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="pr-2 pb-5 pl-[34px]">
            <p className="text-[15px] leading-[1.6] text-white/90">{step.text}</p>
            <p className="mt-3 text-[15px] leading-[1.55] text-white">
              <span className="font-semibold text-[#e3c98f]">You decide: </span>
              {step.decide}
            </p>
            <p className="mt-2 text-[15px] leading-[1.55] text-white">
              <span className="font-semibold text-[#e3c98f]">We deliver: </span>
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
  const img = CARD_IMAGES[phase.id] ?? CARD_IMAGES["phase-1"];
  return (
    <article
      id={phase.id}
      aria-labelledby={`${phase.id}-title`}
      className={cn(
        "group relative isolate text-white [text-shadow:0_1px_12px_rgba(0,0,0,.35)] min-h-[var(--card-h,0px)] scroll-mt-[130px] overflow-hidden border border-white/25 bg-[#061a33] p-7 min-[768px]:p-8",
        "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
        "[transform:translate3d(0,calc(var(--lift,0px)+var(--hv,0px)),0)] min-[1100px]:[transform:perspective(1200px)_rotateY(var(--ry,0deg))_translate3d(0,calc(var(--lift,0px)+var(--hv,0px)),0)_scale(var(--hs,1))]",
        tilt,
        "hover:[--hs:1.03] hover:[--hv:-16px] min-[1100px]:hover:[--ry:0deg]",
        LIFT,
        "hover:shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_2px_2px_rgba(8,43,82,.26),0_18px_30px_rgba(8,43,82,.32),0_50px_80px_rgba(8,43,82,.38),0_100px_140px_-22px_rgba(8,43,82,.7)]",
      )}
    >
      {/* the photograph, washed so the text stays easy to read; it opens up and slowly zooms on hover */}
      <span aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={img.src}
          alt=""
          fill
          sizes="(max-width: 1100px) 100vw, 720px"
          quality={92} className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110 motion-reduce:transition-none"
          style={{ objectPosition: img.position }}
        />
        <span className="absolute inset-0 bg-linear-to-b from-[#061a33]/72 via-[#061a33]/66 to-[#061a33]/82 transition-opacity duration-500 group-hover:opacity-85" />
      </span>
      <p className="text-xs leading-4 font-semibold tracking-[.15em] text-[#e3c98f] uppercase">{phase.range}</p>
      <h3 id={`${phase.id}-title`} className="mt-3 font-jost text-[clamp(24px,2vw,32px)] leading-[1.08] font-medium tracking-normal text-white uppercase">
        {phase.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.6] text-white/90">{phase.summary}</p>
      <div className="mt-5 border-y border-white/20">
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
    <section ref={root} id="phases" aria-labelledby="phases-heading" style={{ ["--p" as string]: 0 }} className="relative isolate flex flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_38%,#ffffff_0%,#f4f6f9_55%,#e4eaf2_100%)] px-4 py-[164px] min-[768px]:px-[124px] min-[768px]:py-[188px] [--phase-card-h:0px] min-[1100px]:[--phase-card-h:594px]">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(8,43,82,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(8,43,82,.05)_1px,transparent_1px)] bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_at_50%_45%,#000_30%,transparent_78%)]" />
      <div className="mx-auto mb-12 w-full max-w-[1680px]">
        <h2 id="phases-heading" className="font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal text-[#082b52] uppercase [text-wrap:initial]">
          From study to handover
        </h2>
        <p className="mt-4 max-w-2xl font-mulish text-[17px] leading-[1.6] text-[#082b52]/85">Three phases, fifteen steps. Open any step to see what you decide and what we deliver.</p>
      </div>

      {/* the cards sit in the middle of the section, all on one level */}
      <div className="mx-auto grid w-full max-w-[1680px] items-start gap-8 min-[1100px]:grid-cols-3 min-[1100px]:gap-x-12" style={{ ["--lift" as string]: "calc(var(--p) * -34px)", ["--card-h" as string]: "var(--phase-card-h)" }}>
        {phases.map((p, i) => (
          <Card key={p.id} phase={p} tilt={["min-[1100px]:[--ry:16deg]", "", "min-[1100px]:[--ry:-16deg]"][i] ?? ""} />
        ))}
      </div>
    </section>
  );
}
