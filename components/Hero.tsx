"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import { HERO } from "@/lib/data";

const EASE = "cubic-bezier(.25,.1,.25,1)";
const DURATION = 350;
const STEP = 200;

const textShadow =
  "[text-shadow:rgba(0,0,0,.1)_0_2px_8px,rgba(0,0,0,.05)_0_4px_16px,rgba(0,0,0,.024)_0_8px_24px,rgba(0,0,0,.004)_0_16px_48px]";

/**
 * Hero: full-height photo with the headline (60% of the arcodb.com sizes: 54px, 34.2px, 22.4px) revealed word by word, one line at a time
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
  // Two lines on desktop: break after "Virginia,"
  const cut = HERO.intro.indexOf(" with a clear-cut");
  const introLine1 = HERO.intro.slice(0, cut);
  const introLine2 = HERO.intro.slice(cut + 1);

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
        className="relative z-3 box-border flex h-screen transform-gpu flex-col justify-between p-(--hero-pad) pl-4 will-change-transform min-[768px]:pl-[124px]"
      >
        <div
          className={[
            "relative mx-auto mt-auto mb-[200px] grid w-full grid-cols-12 items-end gap-x-(--hero-gap)",
            "after:pointer-events-none after:absolute after:bottom-[calc(0px-var(--hero-pad)-200px)] after:left-1/2 min-[768px]:after:left-[calc(50%-(124px-var(--hero-pad))/2)] after:-z-2 after:h-screen after:w-screen after:-translate-x-1/2 after:bg-cover after:bg-no-repeat after:content-['']",
            "after:bg-[url(/assets/hero-background-filter-mobile.svg)] after:bg-position-[center_65%]",
            "min-[810px]:after:bg-[url(/assets/hero-background-filter.svg)] min-[810px]:after:bg-position-[center_50%]",
          ].join(" ")}
        >
          <div className="col-span-12 mb-6 flex flex-col gap-3">
            <h1
              className={`font-jost text-[22.4px] leading-[24px] font-medium tracking-normal break-words text-white uppercase [text-wrap:initial] min-[690px]:text-[34.2px] min-[690px]:leading-[35px] min-[992px]:text-[length:min(54px,calc((100vw-299px)/12.55))] min-[992px]:leading-[1] ${textShadow}`}
            >
              <span ref={titleRef} aria-label={HERO.title} className="inline-block will-change-[transform,opacity]">
                {words.map((w, i) => (
                  <Fragment key={`${w}-${i}`}>
                    <span
                      data-word=""
                      className="mr-(--hero-word-gap) inline-block max-w-full opacity-0 will-change-[transform,opacity] select-none"
                      aria-hidden="true"
                    >
                      {w}
                    </span>
                    {i === 2 && <br className="hidden min-[992px]:block" />}
                  </Fragment>
                ))}
              </span>
            </h1>
          </div>

          <div
            ref={introRef}
            className="col-span-12 flex max-w-[480px] flex-col justify-end gap-6 min-[992px]:ml-[calc(50vw+16px)] min-[992px]:max-w-none"
          >
            <p
              className={`font-mulish text-[20px] leading-[31px] font-normal text-white min-[810px]:mt-[15px] min-[992px]:text-[length:clamp(14px,calc((50vw-184px)/32.5),20px)] min-[992px]:leading-[1.55] ${textShadow}`}
            >
              {introLine1} <br className="hidden min-[992px]:block" />
              {introLine2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
