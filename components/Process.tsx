"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PROCESS } from "@/lib/data";

const heading =
  "font-sans text-[clamp(22px,2.4vw,34px)] leading-[1.1] font-[450] uppercase [text-wrap:initial]";

/** Process: 15 steps in 3 phases over a photo that drifts at 0.3 of the scroll speed. */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const s = sectionRef.current;
      const bg = bgRef.current;
      if (!s || !bg) return;
      const r = s.getBoundingClientRect();
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      bg.style.transform = `translate3d(0,${(-offset * 0.3).toFixed(1)}px,0)`;
    };
    const req = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    update();
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-title"
      className="title-vars relative z-4 overflow-hidden bg-[#5c5834] px-5 py-14 text-white min-[768px]:px-6 min-[768px]:pt-[70px] min-[768px]:pb-[74px]"
    >
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-x-0 -top-[25vh] -bottom-[25vh] z-0 bg-[url(/assets/process-bg.jpg)] bg-cover bg-center bg-no-repeat will-change-transform"
      />
      <div className="relative z-1 mx-auto w-[min(1210px,100%)] text-center">
        <h2 id="process-title" className="font-sans text-(length:--h2) leading-(--h2-lh) font-[450] tracking-[-.028em] [text-wrap:initial]">
          {PROCESS.title}
        </h2>
        <p className="mt-[17px] text-[clamp(13px,1.4vw,20px)] leading-[1.65] tracking-[1px] uppercase">{PROCESS.lead}</p>
        <hr className="mx-auto mt-6 mb-[25px] h-0 w-full border-0 border-t border-white/90 min-[768px]:w-3/4" />

        <div className="mt-8 grid grid-cols-1 gap-y-7 min-[768px]:mt-[87px] min-[768px]:grid-cols-3 min-[768px]:gap-x-[6%] min-[768px]:gap-y-0">
          {PROCESS.phases.map((p, i) => (
            <div
              key={p.title}
              className={
                i === 1
                  ? "border-y border-[rgba(235,235,235,.5)] py-6 min-[768px]:border-y-0 min-[768px]:border-x min-[768px]:border-[#ebebeb] min-[768px]:py-0"
                  : ""
              }
            >
              <h3 className={`${heading} tracking-[3px]`}>{p.title}</h3>
              <p className="mt-9 text-[clamp(12px,1.25vw,21px)] leading-loose tracking-[2px] uppercase">
                <em className="italic">{p.steps}</em>
                <br />
                {p.name}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={PROCESS.cta.href}
          className="group mt-[53px] inline-flex items-center justify-center border border-white px-4 py-[11px] font-sans text-[clamp(13px,1.3vw,18px)] leading-[1.2] font-medium tracking-[.2em] text-white uppercase no-underline outline-none transition-[background-color,color] duration-300 hover:bg-white hover:text-[#4a4729] focus-visible:bg-white focus-visible:text-[#4a4729]"
        >
          <span>{PROCESS.cta.label}</span>
          <span
            aria-hidden="true"
            className="inline-block max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity,margin] duration-300 group-hover:ml-[.6em] group-hover:max-w-[1em] group-hover:opacity-100 group-focus-visible:ml-[.6em] group-focus-visible:max-w-[1em] group-focus-visible:opacity-100"
          >
            ›
          </span>
        </Link>
      </div>
    </section>
  );
}
