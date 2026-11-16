"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const NAVY = "#143275";
const GOLD = "#b58f48";
const INTERVAL = 7500;
/** The drawing is only there to set the scene, so it does not stay as long as the photographs */
const timeFor = (k: number, slide: HeroSlide) => (slide.image ? INTERVAL : 4800);

/** Draw order for the elevation: each stroke starts a little after the one before it. */
const d = (n: number) => ({ ["--d" as string]: `${(n * 0.28).toFixed(2)}s` });

export type HeroSlide = { id: string; label: string; tab: string; title: string; text: string; image?: string; position?: string };

function Elevation({ active }: { active: boolean }) {
  // keyed on `active` so the lines draw again each time the first slide comes back
  return (
    <svg key={String(active)} viewBox="0 0 1200 760" className="size-full" fill="none" strokeLinecap="square" strokeLinejoin="miter" preserveAspectRatio="xMidYMid meet">
      <g stroke={NAVY} strokeWidth="1.6">
        <path className="draw-path" pathLength={1} style={d(0)} d="M40 640 H1160" />
        <path className="draw-path" pathLength={1} style={d(1)} d="M300 640 V300 H640 V180 H920 V640" />
        <path className="draw-path" pathLength={1} style={d(2)} d="M286 300 H654 M626 180 H934" />
        <path className="draw-path" pathLength={1} style={d(3)} d="M300 420 H920 M300 530 H920" />
        <path
          className="draw-path"
          pathLength={1}
          style={d(4)}
          d="M336 336 h96 v62 h-96 z M456 336 h96 v62 h-96 z M336 444 h96 v62 h-96 z M456 444 h96 v62 h-96 z M672 216 h72 v78 h-72 z M772 216 h72 v78 h-72 z M672 336 h72 v62 h-72 z M772 336 h72 v62 h-72 z M672 456 h72 v50 h-72 z M772 456 h72 v50 h-72 z"
        />
        <path className="draw-path" pathLength={1} style={d(5)} d="M700 640 V548 H800 V640 M826 640 V620 H856 V600 H886 V580 H916" />
        <circle className="draw-path" pathLength={1} style={d(6)} cx="300" cy="86" r="16" />
        <circle className="draw-path" pathLength={1} style={d(6)} cx="640" cy="86" r="16" />
        <circle className="draw-path" pathLength={1} style={d(6)} cx="920" cy="86" r="16" />
      </g>
      <g stroke={NAVY} strokeWidth="1" strokeDasharray="7 9" opacity=".45" className="fade-path">
        <path d="M300 102 V300 M640 102 V180 M920 102 V180 M40 180 H1160 M40 300 H300" />
      </g>
      <g stroke={GOLD} strokeWidth="1.6">
        <path className="draw-path" pathLength={1} style={d(7)} d="M300 692 H920 M300 678 V706 M610 678 V706 M920 678 V706" />
        <path className="draw-path" pathLength={1} style={d(8)} d="M990 180 V640 M976 180 H1004 M976 300 H1004 M976 640 H1004" />
      </g>
    </svg>
  );
}

/**
 * The opening: a slide show that plays by itself like a film. The first slide is a building drawn in fine
 * lines; the next three are one photograph per phase. The hero stays pinned so the page slides over it.
 */
export function ProcessHero({ slides }: { slides: HeroSlide[] }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [hold, setHold] = useState(false);
  const [still, setStill] = useState(false);
  const n = slides.length;

  const go = useCallback(
    (to: number) => {
      const next = ((to % n) + n) % n;
      if (next === i) return;
      setPrev(i);
      setI(next);
    },
    [n, i],
  );

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (hold || still) return;
    const t = window.setTimeout(() => go(i + 1), timeFor(i, slides[i]));
    return () => window.clearTimeout(t);
  }, [i, hold, still, go, slides]);

  const s = slides[i];
  const dark = !!s.image;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Our process"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      className="sticky top-0 z-0 isolate flex h-[100svh] min-h-[620px] flex-col justify-end overflow-hidden bg-white"
    >
      {/* faint drafting grid, behind the first slide */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[linear-gradient(rgba(20,50,117,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(20,50,117,.06)_1px,transparent_1px)] bg-[length:56px_56px]"
      />

      {/* Each new slide is revealed by a slow wipe over the one before it, while its photograph drifts */}
      {slides.map((sl, k) => {
        const on = k === i;
        const out = k === prev;
        return (
          <div
            key={sl.id}
            aria-hidden={!on}
            className={cn(
              "absolute inset-0 overflow-hidden bg-white",
              !sl.image && "bg-[linear-gradient(rgba(20,50,117,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(20,50,117,.06)_1px,transparent_1px)] bg-[length:56px_56px]",
              on ? "-z-[15]" : out ? "-z-[16]" : "-z-[17] invisible",
              on && prev !== null && "cine-wipe",
            )}
          >
            {sl.image ? (
              <Image
                src={sl.image}
                alt=""
                fill
                priority={k === 1}
                sizes="100vw"
                className={cn("object-cover", (on || out) && "cine-drift")}
                style={{ objectPosition: sl.position ?? "center" }}
              />
            ) : (
              <div className="absolute inset-x-0 top-[14%] h-[40%] min-[992px]:inset-x-auto min-[992px]:top-[12%] min-[992px]:right-[124px] min-[992px]:h-[min(34%,calc(50svh-190px))] min-[992px]:w-[min(640px,50%)]">
                <Elevation active={on} />
              </div>
            )}
          </div>
        );
      })}
      <span
        aria-hidden="true"
        className={cn("absolute inset-0 -z-10 bg-linear-to-t from-[#061a33]/90 via-[#061a33]/45 to-[#061a33]/30 transition-opacity duration-[1800ms] ease-in-out", dark ? "opacity-100" : "opacity-0")}
      />

      {/* Same place and scale as the Services hero: title on the left, text and button on the right, middle of the screen */}
      <div className="flex flex-1 items-center px-4 pt-28 min-[768px]:absolute min-[768px]:inset-x-0 min-[768px]:top-1/2 min-[768px]:flex-none min-[768px]:-translate-y-1/2 min-[768px]:px-[124px] min-[768px]:pt-0">
        <div
          key={s.id}
          aria-live={hold ? "polite" : "off"}
          className={cn("cine-text mx-auto grid w-full max-w-[1680px] gap-8 transition-colors duration-700 min-[992px]:grid-cols-12 min-[992px]:gap-x-10", dark ? "text-white" : "text-[#143275]")}
        >
          <div className="min-[992px]:col-span-7">
            <p className={cn("text-xs leading-4 font-semibold tracking-[.15em] uppercase", dark ? "text-white" : "text-gold")}>{s.label}</p>
            <h1 className="mt-4 font-jost text-[22.4px] leading-[27px] font-medium tracking-normal uppercase min-[690px]:text-[34.2px] min-[690px]:leading-[39px] min-[992px]:text-[length:min(54px,calc((100vw-299px)/12.55))] min-[992px]:leading-[1.11]">
              {s.title}
            </h1>
          </div>
          <div className="flex flex-col justify-end min-[992px]:col-span-5 min-[1280px]:col-span-4 min-[1280px]:col-start-9">
            <p className="font-mulish text-[20px] leading-[31px] font-normal min-[992px]:text-[length:clamp(14px,calc((50vw-184px)/32.5),20px)] min-[992px]:leading-[1.55]">{s.text}</p>
            <div className="mt-8">
              <a
                href="#inquiry"
                data-start-project
                className={cn(
                  "btn-sweep inline-flex min-h-12 items-center justify-center border px-7 text-[.8125rem] font-medium tracking-[.08em] uppercase no-underline outline-none",
                  dark
                    ? "border-white bg-white bg-[linear-gradient(#143275,#143275)] text-[#143275] hover:text-white focus-visible:text-white"
                    : "border-gold bg-gold bg-[linear-gradient(#082b52,#082b52)] text-[#082b52] hover:text-gold focus-visible:text-gold",
                )}
              >
                Start a project
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* The tabs along the bottom are also the timer, as on Services */}
      <div className="mt-8 px-4 pb-8 min-[768px]:px-[124px] min-[768px]:pb-10">
        <div role="tablist" aria-label="Choose a slide" className={cn("mx-auto grid w-full max-w-[1680px] grid-cols-4 gap-x-3 min-[768px]:gap-x-10", dark ? "text-white" : "text-[#143275]")}>
          {slides.map((sl, k) => (
            <button
              key={sl.id}
              type="button"
              role="tab"
              aria-selected={k === i}
              onClick={() => go(k)}
              className="group relative cursor-pointer pt-4 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              <span className={cn("absolute top-0 left-0 h-[3px] w-full", dark ? "bg-white/30" : "bg-[#143275]/20")} aria-hidden="true" />
              {k === i && (
                <span
                  key={`${i}-${hold}`}
                  aria-hidden="true"
                  className={cn("absolute top-0 left-0 h-[3px] w-full origin-left bg-gold", !hold && !still && "progress-bar")}
                  style={{ animationDuration: `${timeFor(k, sl)}ms` }}
                />
              )}
              <span className={cn("block text-[13px] leading-snug transition-opacity duration-300 min-[768px]:text-(length:--h5) min-[768px]:leading-(--h5-lh) min-[768px]:font-(--h5-weight)", k === i ? "opacity-100" : "opacity-65 group-hover:opacity-100")}>
                {sl.tab}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
