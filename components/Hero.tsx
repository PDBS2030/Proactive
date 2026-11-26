"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import { HeroVideo } from "@/components/HeroVideo";
import { HERO } from "@/lib/data";

const EASE = "cubic-bezier(.25,.1,.25,1)";
const DURATION = 350;
const STEP = 200;

const textShadow =
  "[text-shadow:rgba(0,0,0,.1)_0_2px_8px,rgba(0,0,0,.05)_0_4px_16px,rgba(0,0,0,.024)_0_8px_24px,rgba(0,0,0,.004)_0_16px_48px]";

/**
 * Hero: full-height film (three clips that give way to one another) with the headline (60% of the arcodb.com sizes: 54px, 34.2px, 22.4px) revealed word by word, one line at a time
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
      className="hero-vars relative flex h-[100svh] min-h-[620px] w-full flex-col overflow-hidden bg-[#04142a] text-white"
    >
      <div
        ref={mediaRef}
        className="absolute top-0 left-0 z-1 h-full w-full transform-gpu will-change-transform"
      >
        <HeroVideo />
      </div>

      {/* the dark screen: a deep navy-black over the film (the base veil lives with the clips, so each can have its own depth), with this extra depth at the top under the header and on the text side, so the picture sits far back and the words and the glow carry the screen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(180deg,rgba(2,8,18,.8)_0%,rgba(2,8,18,.4)_50%,rgba(2,8,18,0)_100%)]"
      />

      {/* the glow along the foot: deep blue, with a warm yellow at one edge */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[-6%] bottom-[-24%] left-[-6%] z-1 h-[38rem] rotate-[1.3deg]">
        <div
          className="size-full rounded-full opacity-[.85] blur-[170px]"
          style={{ background: "linear-gradient(270deg, #f7bd2f 0%, #e3a93a 9%, #2a5cf0 38%, #123f9e 70%, #082b52 100%)" }}
        />
      </div>

      <div ref={contentRef} className="absolute inset-0 z-3 flex transform-gpu items-center will-change-transform">
        <div className="mx-auto w-full max-w-[1472px] px-4 min-[768px]:px-16 min-[1025px]:px-28">
          <div className="flex max-w-[70rem] flex-col gap-7 pt-[6.25rem] pb-16 min-[768px]:px-10 min-[768px]:pt-[8.75rem] min-[768px]:pb-20">
            <div className="flex flex-col gap-4">
              <p className="text-base leading-4 font-bold tracking-[.2em] uppercase">PDBS</p>
              <h1
                className={`max-w-[62.5rem] font-sans text-[34px] leading-none font-extralight tracking-normal break-words text-white normal-case [text-wrap:initial] min-[768px]:text-[56px] min-[1025px]:text-[76px] min-[1025px]:leading-[.92] ${textShadow}`}
              >
                <span ref={titleRef} aria-label={HERO.title} className="flex flex-wrap items-baseline will-change-[transform,opacity]">
                  {words.map((w, i) => (
                    <Fragment key={`${w}-${i}`}>
                      <span
                        data-word=""
                        className="mr-[.22em] inline-block max-w-full opacity-0 will-change-[transform,opacity] select-none"
                        aria-hidden="true"
                      >
                        {w}
                      </span>
                      {i === 3 && <span aria-hidden="true" className="hidden h-0 basis-full min-[768px]:block" />}
                    </Fragment>
                  ))}
                </span>
              </h1>
            </div>

            <div ref={introRef} className="-mt-3 flex flex-col gap-7">
              <p className={`max-w-[40rem] text-[17px] leading-7 font-light tracking-[.02em] text-white/90 min-[768px]:text-[22px] min-[768px]:leading-8 ${textShadow}`}>
                {HERO.intro}
              </p>
              <div className="flex flex-col items-stretch gap-[1.5625rem] min-[768px]:flex-row min-[768px]:items-center">
                <HeroCta href="/contact">Contact us</HeroCta>
                <HeroCta href="/services" outline>
                  Explore services
                </HeroCta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A hero button: the label and the arrow each roll up and are replaced by a copy of themselves on hover or focus. */
function HeroCta({ href, outline, children }: { href: string; outline?: boolean; children: string }) {
  const roll = "flex flex-col gap-2.5 transition-transform duration-300 group-hover:-translate-y-[1.875rem] group-focus-visible:-translate-y-[1.875rem] motion-reduce:transition-none";
  const arrow = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block size-5" aria-hidden="true">
      <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
    </svg>
  );
  return (
    <Link href={href} className="group inline-block w-full no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[768px]:w-auto">
      <span
        className={`flex min-h-[3.25rem] items-center justify-center overflow-hidden px-5 py-4 text-base font-medium min-[1025px]:text-lg ${
          outline ? "border border-white/95 text-white" : "bg-gold text-[#04142a]"
        }`}
      >
        <span className="inline-flex items-center gap-2.5">
          <span className="block h-5 overflow-hidden">
            <span className={roll}>
              <span className="block h-5 leading-5 whitespace-nowrap">{children}</span>
              <span aria-hidden="true" className="block h-5 leading-5 whitespace-nowrap">{children}</span>
            </span>
          </span>
          <span className="block size-5 overflow-hidden">
            <span className={roll}>
              {arrow}
              {arrow}
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}
