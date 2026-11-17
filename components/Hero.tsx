"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import { HERO } from "@/lib/data";
import { SERVICES_PAGE, SERVICE_LIST } from "@/lib/services";

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
  // The Services hero is the pattern: the same frame, so the headline and the paragraph land on the same spots.
  const sample = SERVICE_LIST[0];
  const para =
    "font-mulish text-[20px] leading-[31px] font-normal min-[992px]:text-[length:clamp(14px,calc((50vw-184px)/32.5),20px)] min-[992px]:leading-[1.55]";

  return (
    <section
      ref={heroRef}
      className="hero-vars relative flex h-[100svh] min-h-[620px] w-full flex-col overflow-hidden bg-foreground text-white"
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

      <div ref={contentRef} className="absolute inset-0 z-3 flex transform-gpu flex-col will-change-transform">
        {/* the soft dark wash behind the text */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-2 bg-[url(/assets/hero-background-filter-mobile.svg)] bg-cover bg-position-[center_65%] bg-no-repeat min-[810px]:bg-[url(/assets/hero-background-filter.svg)] min-[810px]:bg-position-[center_50%]"
        />

        <div className="flex flex-1 items-center px-4 pt-28 min-[768px]:absolute min-[768px]:inset-x-0 min-[768px]:top-1/2 min-[768px]:flex-none min-[768px]:-translate-y-1/2 min-[768px]:px-[124px] min-[768px]:pt-0">
          <div className="mx-auto grid w-full max-w-[1680px] gap-8 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
            <div className="min-[992px]:col-span-7">
              {/* holds the place of the line above the headline on the Services page */}
              <p aria-hidden="true" className="invisible text-xs leading-4 font-semibold tracking-[.15em] uppercase">
                {SERVICES_PAGE.eyebrow}
              </p>
              <h1
                className={`mt-4 font-jost text-[22.4px] leading-[22px] font-medium tracking-normal break-words text-white uppercase [text-wrap:initial] min-[690px]:text-[34.2px] min-[690px]:leading-[32px] min-[992px]:text-[length:min(54px,calc((100vw-299px)/12.55))] min-[992px]:leading-[.92] ${textShadow}`}
              >
                <span ref={titleRef} aria-label={HERO.title} className="flex flex-wrap items-baseline will-change-[transform,opacity]">
                  {words.map((w, i) => (
                    <Fragment key={`${w}-${i}`}>
                      <span
                        data-word=""
                        className="mr-(--hero-word-gap) inline-block max-w-full opacity-0 will-change-[transform,opacity] select-none"
                        aria-hidden="true"
                      >
                        {w}
                      </span>
                      {i === 2 && <span aria-hidden="true" className="hidden h-0 basis-full min-[992px]:block" />}
                    </Fragment>
                  ))}
                </span>
              </h1>
            </div>

            <div className="flex flex-col justify-end min-[992px]:col-span-5 min-[1280px]:col-span-4 min-[1280px]:col-start-9">
              <div className="relative">
                {/* an unseen copy of the Services column (name, paragraph, link and buttons), so the whole block is the same size and sits on the same line as on that page */}
                <div aria-hidden="true" className="invisible">
                  <p className="text-sm font-semibold tracking-[.04em]">{sample.name}</p>
                  <p className={`mt-2 ${para}`}>{sample.headline}</p>
                  <span className="mt-3 inline-block border-b-2 pb-0.5 text-[14px] font-medium">Explore {sample.name.toLowerCase()}</span>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="inline-flex min-h-12 items-center border px-7 text-[.8125rem] font-medium tracking-[.08em] uppercase">{SERVICES_PAGE.primaryCta.label}</span>
                    <span className="inline-flex min-h-12 items-center border px-7 text-[.8125rem] font-medium tracking-[.08em] uppercase">{SERVICES_PAGE.secondaryCta.label}</span>
                  </div>
                </div>
                {/* the intro paragraph begins where the Services paragraph begins */}
                <div ref={introRef} className="absolute inset-x-0 top-7">
                  <p className={`${para} text-white/95 ${textShadow}`}>{HERO.intro}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-10 min-[768px]:pb-14" />
      </div>
    </section>
  );
}
