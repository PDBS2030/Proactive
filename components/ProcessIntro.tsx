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

const PLATE =
  "shadow-[inset_0_1px_0_#fff,0_1px_1px_rgba(8,43,82,.08),0_6px_12px_rgba(8,43,82,.08),0_20px_36px_rgba(8,43,82,.12),0_44px_70px_-16px_rgba(8,43,82,.28)]";

/**
 * A statement with a few words in the accent colour, then a row of figures. The section is built in layers so it
 * has depth: a drafting grid that recedes toward a horizon, raised plates for the figures, and a slight difference
 * in how fast the layers move as you scroll past.
 */
export function ProcessIntro() {
  const parts = INTRO.statement.split(/(\[\[.*?\]\])/g).filter(Boolean);
  const root = useRef<HTMLElement>(null);

  // How far the section has travelled through the window (-1 to 1), shared with the layers as --p
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      el.style.setProperty("--p", Math.max(-1, Math.min(1, (mid - window.innerHeight / 2) / window.innerHeight)).toFixed(3));
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
      ref={root}
      aria-label="The process in figures"
      style={{ ["--p" as string]: 0 }}
      className="relative isolate overflow-clip bg-linear-to-b from-white via-white to-[#e9eff7] px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[120px]"
    >
      {/* the floor: a drafting grid laid flat and receding to a horizon */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[78%] [perspective:760px]">
        <div
          className="absolute -inset-x-[60%] top-0 bottom-0 origin-bottom bg-[linear-gradient(rgba(8,43,82,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(8,43,82,.9)_1px,transparent_1px)] bg-[length:72px_72px] opacity-[.12] [mask-image:linear-gradient(to_top,#000_10%,transparent_92%)] [transform:rotateX(62deg)]"
          style={{ backgroundPosition: "0 calc(var(--p) * 90px)" }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1250px]">
        <div className="[container-type:inline-size]" style={{ transform: "translate3d(0, calc(var(--p) * -14px), 0)" }}>
          <p
            className="font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal text-[#082b52] uppercase"
            style={{ textWrap: "balance" }}
          >
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
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-5 min-[992px]:grid-cols-[repeat(5,minmax(0,1fr))]" style={{ transform: "translate3d(0, calc(var(--p) * 22px), 0)" }}>
          {INTRO.stats.map((s) => (
            <div
              key={s.label}
              className={`flex flex-col items-center border border-[#082b52]/10 bg-white px-4 pt-9 pb-8 text-center transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_2px_2px_rgba(8,43,82,.12),0_12px_22px_rgba(8,43,82,.16),0_30px_52px_rgba(8,43,82,.22),0_56px_88px_-16px_rgba(8,43,82,.36)] ${PLATE}`}
            >
              <dd className="order-1 mt-6 text-xs leading-4 font-semibold tracking-[.15em] text-[#082b52] uppercase">{s.label}</dd>
              <dt className="order-0 font-jost text-[clamp(36px,3.3vw,52px)] leading-none font-normal text-[#7d9bc1]">
                {"text" in s && s.text ? s.text : <Figure value={s.value as number} suffix={s.suffix} />}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
