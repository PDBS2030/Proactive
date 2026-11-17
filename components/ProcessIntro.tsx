"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { INTRO } from "@/lib/process";

/** Counts up to its figure once, the first time it is on screen (shows the figure straight away with reduced motion) */
function Figure({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1400);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        setN(0);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/** A statement with a few words in the accent colour, then a row of figures divided by hairlines */
export function ProcessIntro() {
  const parts = INTRO.statement.split(/(\[\[.*?\]\])/g).filter(Boolean);
  return (
    <section aria-label="The process in figures" className="bg-white px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[120px]">
      <div className="mx-auto w-full max-w-[1680px]">
        <p className="max-w-[26ch] font-jost text-[clamp(26px,2.9vw,44px)] leading-[1.14] font-medium text-[#082b52] min-[992px]:max-w-[24ch]">
          {parts.map((p, i) =>
            p.startsWith("[[") ? (
              <span key={i} className="text-[#7d9bc1]">
                {p.slice(2, -2)}
              </span>
            ) : (
              <Fragment key={i}>{p}</Fragment>
            ),
          )}
        </p>

        <dl className="mt-14 grid grid-cols-2 min-[992px]:grid-cols-5">
          {INTRO.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center border-[#082b52]/15 px-4 pt-2 pb-8 text-center nth-even:border-l min-[992px]:border-l min-[992px]:first:border-l-0"
            >
              <dd className="order-1 mt-5 max-w-[16ch] text-[13px] leading-snug font-medium tracking-[.03em] text-[#082b52] uppercase">{s.label}</dd>
              <dt className="order-0 font-jost text-[clamp(44px,4.4vw,68px)] leading-none font-normal text-[#7d9bc1]">
                {"text" in s && s.text ? s.text : <Figure value={s.value as number} suffix={s.suffix} />}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
