"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO } from "@/lib/data";

const EASE = "cubic-bezier(.25,.1,.25,1)";
const DURATION = 350;
const STEP = 200;

const textShadow =
  "[text-shadow:rgba(0,0,0,.1)_0_2px_8px,rgba(0,0,0,.05)_0_4px_16px,rgba(0,0,0,.024)_0_8px_24px,rgba(0,0,0,.004)_0_16px_48px]";

/**
 * Hero: full-height photo with the headline (sized like arcodb.com: 90px, 56.95px, 37.2px) revealed word by word, one line at a time
 * (0.35s per line, 0.2s apart), then the intro paragraph. Photo and text drift on scroll.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = Array.from(titleRef.current?.querySelectorAll<HTMLElement>("[data-word]") ?? []);
    const intro = introRef.current;
    let played = false;
    const cleanups: Array<() => void> = [];

    if (intro && !reduced) intro.style.opacity = ".01";

    const play = () => {
      if (played) return;
      played = true;
      if (reduced) {
        words.forEach((w) => (w.style.opacity = "1"));
        if (intro) intro.style.opacity = "1";
        return;
      }
      const top0 = titleRef.current!.getBoundingClientRect().top;
      const lines = new Map<number, HTMLElement[]>();
      words.forEach((w) => {
        const k = Math.round((w.getBoundingClientRect().top - top0) / 5);
        lines.set(k, [...(lines.get(k) ?? []), w]);
      });
      const keys = [...lines.keys()].sort((a, b) => a - b);
      keys.forEach((k, i) => {
        lines.get(k)!.forEach((w) => {
          w.style.willChange = "opacity, transform";
          const a = w.animate(
            [
              { opacity: 0, transform: "translate3d(0,20px,0)" },
              { opacity: 1, transform: "translate3d(0,0,0)" },
            ],
            { duration: DURATION, easing: EASE, delay: i * STEP, fill: "both" },
          );
          a.onfinish = () => {
            w.style.opacity = "1";
            w.style.transform = "translate3d(0,0,0)";
            w.style.willChange = "auto";
            a.cancel();
          };
        });
      });
      if (intro) {
        const b = intro.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: DURATION,
          easing: EASE,
          delay: keys.length * STEP,
          fill: "both",
        });
        b.onfinish = () => {
          intro.style.opacity = "1";
          b.cancel();
        };
      }
    };

    const onDone = () => requestAnimationFrame(play);
    if (document.documentElement.dataset.intro !== "play") onDone();
    else document.addEventListener("intro:done", onDone, { once: true });
    cleanups.push(() => document.removeEventListener("intro:done", onDone));

    // Parallax: the photo drifts 0–30% and the text 0–20% of their height over one hero height of scroll.
    if (!reduced) {
      let ticking = false;
      const update = () => {
        ticking = false;
        const hero = heroRef.current;
        if (!hero || !mediaRef.current || !contentRef.current) return;
        const p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
        mediaRef.current.style.transform = `translateY(${p * 30}%) translateZ(0)`;
        contentRef.current.style.transform = `translateY(${p * 20}%) translateZ(0)`;
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }
    return () => cleanups.forEach((c) => c());
  }, []);

  const words = HERO.title.split(" ");

  return (
    <section
      ref={heroRef}
      className="hero-vars relative flex h-screen w-full flex-col overflow-hidden bg-foreground text-white"
    >
      <div
        ref={mediaRef}
        className="absolute top-0 left-0 z-1 h-full w-full transform-gpu will-change-transform"
      >
        <Image
          src="/assets/hero.jpg"
          alt={HERO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-3 box-border flex h-screen transform-gpu flex-col justify-between p-(--hero-pad) will-change-transform"
      >
        <div
          className={[
            "relative mx-auto mt-auto mb-20 grid w-full grid-cols-12 items-end gap-x-(--hero-gap)",
            "after:pointer-events-none after:absolute after:bottom-[calc(0px-var(--hero-pad)-5rem)] after:left-1/2 after:-z-2 after:h-screen after:w-screen after:-translate-x-1/2 after:bg-cover after:bg-no-repeat after:content-['']",
            "after:bg-[url(/assets/hero-background-filter-mobile.svg)] after:bg-position-[center_65%]",
            "min-[810px]:after:bg-[url(/assets/hero-background-filter.svg)] min-[810px]:after:bg-position-[center_50%]",
          ].join(" ")}
        >
          <div className="col-span-12 mb-[18px] flex flex-col gap-3 min-[810px]:col-span-8 min-[810px]:mb-0">
            <h1
              className={`font-mulish text-[37.2px] leading-[45.2px] font-extrabold tracking-[1px] break-words text-white uppercase [text-wrap:initial] min-[690px]:text-[56.95px] min-[690px]:leading-[65.45px] min-[690px]:tracking-[.5px] min-[992px]:text-[90px] min-[992px]:leading-[100px] min-[992px]:tracking-[3.5px] ${textShadow}`}
            >
              <span ref={titleRef} aria-label={HERO.title} className="inline-block will-change-[transform,opacity]">
                {words.map((w, i) => (
                  <span
                    key={`${w}-${i}`}
                    data-word=""
                    className="mr-(--hero-word-gap) inline-block max-w-full opacity-0 will-change-[transform,opacity] select-none"
                    aria-hidden="true"
                  >
                    {w}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div
            ref={introRef}
            className="col-span-12 flex flex-col justify-end gap-6 min-[810px]:col-span-8 min-[1240px]:col-span-4"
          >
            <p
              className={`font-mulish text-[20px] leading-[31px] font-normal text-white min-[810px]:mt-[15px] ${textShadow}`}
            >
              {HERO.intro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
