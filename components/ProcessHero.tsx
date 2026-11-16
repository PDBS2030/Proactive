"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const NAVY = "#143275";
const GOLD = "#b58f48";
const INTERVAL = 7500;

/** Draw order for the elevation: each stroke starts a little after the one before it. */
const d = (n: number) => ({ ["--d" as string]: `${(n * 0.28).toFixed(2)}s` });

export type HeroSlide = { id: string; label: string; title: string; text: string; image?: string; position?: string };

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
    const t = window.setTimeout(() => go(i + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [i, hold, still, go]);

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
      className="sticky top-0 z-0 isolate h-[100svh] min-h-[620px] overflow-hidden bg-white"
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
              <div className="absolute inset-x-0 top-[14%] h-[40%] min-[992px]:inset-x-auto min-[992px]:top-[11%] min-[992px]:right-[4%] min-[992px]:h-[46%] min-[992px]:w-[min(860px,60%)]">
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

      <div className="absolute inset-x-0 bottom-0 px-4 pb-14 min-[768px]:px-[124px] min-[768px]:pb-20">
        <div key={s.id} aria-live={hold ? "polite" : "off"} className={cn("cine-text mx-auto w-full max-w-[1680px] transition-colors duration-700", dark ? "text-white" : "text-[#143275]")}>
          <p className={cn("text-xs leading-4 font-semibold tracking-[.15em] uppercase", dark ? "text-[#e3c98f]" : "text-gold")}>{s.label}</p>
          <h1 className="mt-4 max-w-[16ch] font-jost text-[clamp(30px,5.2vw,84px)] leading-[1.02] font-normal tracking-normal uppercase">{s.title}</h1>
          <p className="mt-6 max-w-[48ch] font-mulish text-[17px] leading-[1.6] min-[992px]:text-[19px]">{s.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
            <a
              href="#inquiry"
              data-start-project
              className="btn-sweep inline-flex min-h-12 items-center justify-center border border-gold bg-gold bg-[linear-gradient(#082b52,#082b52)] px-8 text-[.8125rem] font-medium tracking-[.08em] text-[#082b52] uppercase no-underline outline-none hover:text-gold focus-visible:text-gold"
            >
              Start a project
            </a>
            <div className="flex items-center gap-4" role="group" aria-label="Choose a slide">
              <button type="button" onClick={() => go(i - 1)} aria-label="Previous slide" className="inline-flex size-11 cursor-pointer items-center justify-center outline-none hover:text-gold focus-visible:text-gold">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <ul className="flex items-center gap-3">
                {slides.map((sl, k) => (
                  <li key={sl.id}>
                    <button
                      type="button"
                      onClick={() => go(k)}
                      aria-label={`Slide ${k + 1}: ${sl.label}`}
                      aria-current={k === i ? "true" : undefined}
                      className="group relative flex h-11 w-12 cursor-pointer items-center outline-none"
                    >
                      <span className={cn("block h-0.5 w-full overflow-hidden", dark ? "bg-white/35" : "bg-[#143275]/25")}>
                        <span
                          key={k === i ? `${i}-${hold}` : "off"}
                          className={cn("block h-full origin-left bg-gold", k === i && !hold && !still ? "progress-bar" : k === i ? "" : "scale-x-0")}
                          style={{ animationDuration: `${INTERVAL}ms` }}
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => go(i + 1)} aria-label="Next slide" className="inline-flex size-11 cursor-pointer items-center justify-center outline-none hover:text-gold focus-visible:text-gold">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
