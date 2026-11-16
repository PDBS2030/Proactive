"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen opening: a muted film loops behind a dark wash, with a large headline and one line under it
 * low on the left, and a scroll cue running down the right edge. Pinned, so the page slides over it.
 */
export function ProcessHero({ title, tagline }: { title: string; tagline: string }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // play while the hero is on screen, rest when the page has covered it
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Our process" className="sticky top-0 z-0 isolate h-[100svh] min-h-[620px] overflow-hidden bg-[#061a33] text-white">
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/service-video-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 -z-20 size-full object-cover"
      >
        <source src="/assets/service-video.mp4" type="video/mp4" />
      </video>
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,16,34,.55)_0%,rgba(4,16,34,.42)_45%,rgba(4,16,34,.62)_100%)]" />

      <div className="absolute inset-x-0 top-[48%] px-4 min-[768px]:px-[124px]">
        <div className="mx-auto w-full max-w-[1680px]">
          <h1 className="hero-in max-w-[11ch] font-jost text-[clamp(40px,5.6vw,92px)] leading-[.96] font-medium tracking-[-.01em]">{title}</h1>
          <p className="hero-in mt-6 font-mulish text-[clamp(18px,1.7vw,26px)] leading-[1.3] font-bold" style={{ animationDelay: "250ms" }}>
            {tagline}
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#phase-1"
        aria-label="Scroll to the first phase"
        className="absolute top-[18%] right-4 bottom-[7%] hidden w-6 flex-col items-center gap-4 text-white no-underline outline-none min-[768px]:flex min-[768px]:right-8"
      >
        <span aria-hidden="true" className="w-px flex-1 bg-white/45" />
        <span aria-hidden="true" className="rotate-180 text-[11px] font-semibold tracking-[.3em] uppercase [writing-mode:vertical-rl]">
          Scroll →
        </span>
      </a>
    </section>
  );
}
