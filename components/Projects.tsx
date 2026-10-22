"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { GALLERY_LAYOUT, PROJECT_TABS } from "@/lib/data";
import { cn } from "@/lib/cn";

const TAB_BG = [
  "bg-[#305073]",
  "bg-[linear-gradient(90deg,#305074_0%,#0e2e55_100%)]",
  "bg-[linear-gradient(90deg,#0d2f56_1.1%,#04274c_96.6%)]",
  "",
  "",
];

function Gallery({ folder }: { folder: string }) {
  let n = 0;
  return GALLERY_LAYOUT.map((slide, si) => (
    <div
      key={si}
      className={cn(
        "flex h-full flex-none flex-col",
        slide.kind === "big" ? "w-[62vw] min-[768px]:w-[31.95cqw]" : "w-[31vw] min-[768px]:w-[16cqw]",
      )}
    >
      {Array.from({ length: slide.count }, () => {
        n += 1;
        return (
          <div
            key={n}
            className="relative min-h-0 flex-1 after:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_0_0_0_.5px_rgba(169,191,216,.9)] after:content-['']"
          >
            <Image
              src={`/assets/gallery/${folder}/${n}.jpg`}
              alt=""
              fill
              sizes={slide.kind === "big" ? "(max-width: 768px) 62vw, 32vw" : "(max-width: 768px) 31vw, 16vw"}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  ));
}

/** Explore Projects: each tab features a different property and swaps the gallery. */
export function Projects() {
  const [selected, setSelected] = useState(0);
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [max, setMax] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const busy = useRef(false);

  const measure = useCallback(() => {
    const v = viewportRef.current;
    const t = trackRef.current;
    if (!v || !t) return;
    const m = Math.max(0, t.scrollWidth - v.clientWidth);
    setMax(m);
    setViewportW(v.clientWidth);
    setOffset((o) => Math.min(Math.max(0, o), m));
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, shown]);

  useEffect(() => {
    const v = viewportRef.current;
    if (!v) return;
    const ro = new ResizeObserver(measure);
    ro.observe(v);
    return () => ro.disconnect();
  }, [measure]);

  const select = (i: number) => {
    if (busy.current || i === selected) return;
    busy.current = true;
    setSelected(i);
    setFading(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setShown(i);
        setOffset(0);
        setFading(false);
        busy.current = false;
      },
      reduced ? 0 : 350,
    );
  };

  // One gold border at a time: it follows the pointer or keyboard focus and rests on the selected tab.
  const active = hovered ?? focused ?? selected;
  const tab = PROJECT_TABS[selected];

  return (
    <section className="relative z-4 bg-[#ececf0] pt-40 pr-[4vw] pb-[6vw] pl-[4vw] min-[768px]:pr-[3.15vw] min-[768px]:pl-[2.9vw]">
      <div className="mx-auto w-full [container-type:inline-size]">
        <div
          role="tablist"
          aria-label="Project categories"
          className="relative grid grid-cols-1 bg-[#04274c] min-[768px]:h-[12cqw] min-[768px]:grid-cols-5"
        >
          {PROJECT_TABS.map((t, i) => (
            <button
              key={t.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={selected === i}
              aria-controls="gallery-panel"
              tabIndex={selected === i ? 0 : -1}
              onClick={() => select(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={(e) => e.currentTarget.matches(":focus-visible") && setFocused(i)}
              onBlur={() => setFocused(null)}
              onKeyDown={(e) => {
                const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
                if (!d) return;
                e.preventDefault();
                const next = (i + d + PROJECT_TABS.length) % PROJECT_TABS.length;
                tabRefs.current[next]?.focus();
                select(next);
              }}
              className={cn(
                "relative flex min-h-16 cursor-pointer items-center justify-center border-t border-[rgba(162,194,223,.35)] px-[1.6cqw] text-center text-[17px] leading-[1.22] tracking-[.015em] transition-colors duration-300 outline-none",
                "min-[768px]:min-h-0 min-[768px]:border-t-0 min-[768px]:border-l min-[768px]:text-[length:clamp(14px,1.28cqw,24px)]",
                i === 0 && "border-t-0 text-[18px] font-bold min-[768px]:border-l-0 min-[768px]:text-[length:clamp(15px,1.33cqw,25px)]",
                TAB_BG[i],
                active === i || i === 0 ? "text-white" : "text-[#a2c2df]",
              )}
            >
              <span>{t.label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 border-[3px] transition-[border-color] duration-250",
                  active === i ? "border-gold" : "border-transparent",
                )}
              />
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2 font-sans min-[768px]:mt-[1.65cqw] min-[768px]:flex-row min-[768px]:items-stretch min-[768px]:gap-[.75cqw]">
          <p className="flex h-14 w-full items-center justify-center bg-[#3b608a] text-xl font-semibold text-[#c9dbec] min-[768px]:h-[3.99cqw] min-[768px]:w-[21.24cqw] min-[768px]:text-[1.7cqw]">
            Featured:
          </p>
          <p
            aria-live="polite"
            className="flex h-14 w-full items-center justify-center border border-[#8ea6c4] text-xl font-medium text-[#001f45] min-[768px]:h-[4.04cqw] min-[768px]:w-[41.99cqw] min-[768px]:text-[1.7cqw]"
          >
            {tab.featured}
          </p>
          <Link
            href="/projects"
            className="flex items-center py-2 text-sm font-semibold tracking-[.08em] whitespace-nowrap text-[#001f45] underline decoration-transparent decoration-2 underline-offset-[6px] outline-none transition-[text-decoration-color] duration-250 hover:decoration-gold focus-visible:decoration-gold min-[768px]:ml-auto min-[768px]:h-[3.99cqw] min-[768px]:py-0 min-[768px]:text-[.95cqw] min-[768px]:underline-offset-[.5cqw]"
          >
            VIEW PROJECT GALLERY
          </Link>
        </div>

        <div
          id="gallery-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab.key}`}
          className="relative mt-4 h-[62vw] w-full min-[768px]:mt-[1.95cqw] min-[768px]:h-[26.34cqw] min-[768px]:w-[100cqw]"
        >
          <div ref={viewportRef} className="absolute inset-0 overflow-hidden border border-[#a9bfd8]">
            <div
              ref={trackRef}
              className={cn(
                "flex h-full w-max will-change-transform [transition:opacity_.35s_ease,transform_.6s_cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none",
                fading && "opacity-0",
              )}
              style={{ transform: `translateX(${-offset}px)` }}
            >
              <Gallery folder={PROJECT_TABS[shown].key} />
            </div>
          </div>
          {offset > 0 && (
            <button
              type="button"
              aria-label="Previous item"
              onClick={() => setOffset((o) => Math.max(0, o - viewportW))}
              className="absolute top-1/2 left-[.6cqw] z-2 grid h-14 w-11 -translate-y-1/2 cursor-pointer place-items-center text-[#0b3a6b] transition-transform duration-300 outline-none hover:-translate-x-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b3a6b]"
            >
              <svg width="23" height="39" viewBox="0 0 23 39" fill="none">
                <path d="M21 2 3 19.5 21 37" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          )}
          {offset < max - 1 && (
            <button
              type="button"
              aria-label="Next item"
              onClick={() => setOffset((o) => Math.min(max, o + viewportW))}
              className="absolute top-1/2 right-[.6cqw] z-2 grid h-14 w-11 -translate-y-1/2 cursor-pointer place-items-center text-[#0b3a6b] transition-transform duration-300 outline-none hover:translate-x-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b3a6b]"
            >
              <svg width="23" height="39" viewBox="0 0 23 39" fill="none">
                <path d="M2 2l18 17.5L2 37" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
