"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Bars are placed on a 12-unit scale. The single animation on the page: both schedules draw once, when seen. */
const TRADITIONAL = [
  { label: "Design", from: 0, to: 4, tone: "bg-white/25" },
  { label: "Bid", from: 4, to: 5.6, tone: "bg-white/12" },
  { label: "Build", from: 5.6, to: 12, tone: "bg-white/45" },
];
const PDBS = [
  { label: "Design", from: 0, to: 4, tone: "bg-white/25" },
  { label: "Build", from: 3, to: 9.2, tone: "bg-gold" },
];

const pct = (n: number) => `${(n / 12) * 100}%`;

function Lane({
  title,
  note,
  bars,
  shown,
  delay,
}: {
  title: string;
  note: string;
  bars: typeof TRADITIONAL;
  shown: boolean;
  delay: number;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-[19px] font-medium">{title}</h3>
        <p className="text-[14px] text-white/65">{note}</p>
      </div>
      <div className="relative mt-4 h-16 w-full min-[768px]:h-20">
        {bars.map((b, i) => (
          <div
            key={b.label}
            className={cn(
              "absolute top-0 flex h-full origin-left items-center overflow-hidden px-3 text-[13px] font-medium whitespace-nowrap transition-transform duration-[1100ms] ease-out motion-reduce:transition-none min-[768px]:text-[15px]",
              b.tone,
              b.tone === "bg-gold" ? "text-[#082b52]" : "text-white",
              shown ? "scale-x-100" : "scale-x-0",
            )}
            style={{
              left: pct(b.from),
              width: pct(b.to - b.from),
              transitionDelay: `${delay + i * 450}ms`,
              // In design-build the two bars overlap in time, so they sit in two half-height rows
              ...(bars === PDBS ? { height: "50%", top: i === 0 ? 0 : "50%" } : { top: 0 }),
            }}
          >
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimelineDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className="m-0">
      <div className="grid gap-12">
        <Lane title="Design, bid, then build" note="Design stops, bidding starts, building waits" bars={TRADITIONAL} shown={shown} delay={0} />
        <div>
          <Lane title="PDBS design-build" note="Building planning starts while design is finishing" bars={PDBS} shown={shown} delay={900} />
          <div
            aria-hidden="true"
            className={cn(
              "relative mt-3 h-6 transition-opacity duration-700 delay-[2200ms] motion-reduce:transition-none",
              shown ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="absolute top-0 h-3 border-x border-b border-dashed border-gold/80" style={{ left: pct(9.2), width: pct(2.8) }} />
            <span className="absolute top-4 text-[13px] font-medium whitespace-nowrap text-gold" style={{ left: pct(9.2) }}>
              Time returned to you
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-14 max-w-[60ch] text-[13px] leading-snug text-white/60">
        Illustration of the sequence, not a promise of dates. Savings vary with project size and complexity.
      </figcaption>
    </figure>
  );
}
