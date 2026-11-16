"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Words } from "@/components/PageIntro";

const NAVY = "#143275";
const GOLD = "#b58f48";

/** Draw order for the elevation: each stroke starts a little after the one before it. */
const d = (n: number) => ({ ["--d" as string]: `${(n * 0.28).toFixed(2)}s` });

/**
 * The opening: a building drawn in fine lines, which dissolves into the finished photograph as you scroll.
 * The hero stays in place for about one and a half screens while that happens.
 */
export function ProcessHero({ title, lead }: { title: string; lead: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const drawing = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLSpanElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const o = outer.current;
      if (!o) return;
      const r = o.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / total));
      const e = p * p * (3 - 2 * p);
      if (photo.current) {
        photo.current.style.opacity = String(e);
        photo.current.style.transform = `scale(${(1.1 - 0.1 * e).toFixed(3)})`;
      }
      if (drawing.current) drawing.current.style.opacity = String(Math.max(0, 1 - e * 1.3));
      if (shade.current) shade.current.style.opacity = String(Math.min(1, e * 1.1));
      content.current?.style.setProperty("--p", e.toFixed(3));
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
    <div ref={outer} className="relative h-[240svh]">
      <section aria-label="Our process" className="sticky top-0 isolate h-[100svh] min-h-[620px] overflow-hidden bg-white">
        {/* faint drafting grid */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-[linear-gradient(rgba(20,50,117,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(20,50,117,.06)_1px,transparent_1px)] bg-[length:56px_56px]"
        />

        <div ref={photo} aria-hidden="true" className="absolute inset-0 -z-20 opacity-0 will-change-transform">
          <Image src="/assets/offerings-development.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_42%]" />
        </div>
        <span ref={shade} aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#061a33]/90 via-[#061a33]/45 to-[#061a33]/30 opacity-0" />

        <div ref={drawing} aria-hidden="true" className="absolute inset-x-0 top-[14%] h-[40%] min-[992px]:inset-x-auto min-[992px]:top-[11%] min-[992px]:right-[4%] min-[992px]:h-[46%] min-[992px]:w-[min(860px,60%)]">
          <svg viewBox="0 0 1200 760" className="size-full" fill="none" strokeLinecap="square" strokeLinejoin="miter" preserveAspectRatio="xMidYMid meet">
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
        </div>

        <div ref={content} className="absolute inset-x-0 bottom-0 px-4 pb-14 min-[768px]:px-[124px] min-[768px]:pb-20" style={{ ["--p" as string]: 0 }}>
          <div className="mx-auto w-full max-w-[1680px]" style={{ color: "color-mix(in srgb, #fff calc(var(--p, 0) * 100%), #143275)" }}>
            <h1
              data-words
              className="max-w-[16ch] font-jost text-[clamp(30px,5.2vw,84px)] leading-[1.02] font-normal tracking-normal uppercase"
            >
              <Words text={title} />
            </h1>
            <p className="mt-6 max-w-[48ch] font-mulish text-[17px] leading-[1.6] min-[992px]:text-[19px]">{lead}</p>
            <a
              href="#inquiry"
              data-start-project
              className="btn-sweep mt-8 inline-flex min-h-12 items-center justify-center border border-gold bg-gold bg-[linear-gradient(#082b52,#082b52)] px-8 text-[.8125rem] font-medium tracking-[.08em] text-[#082b52] uppercase no-underline outline-none hover:text-gold focus-visible:text-gold"
            >
              Start a project
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
