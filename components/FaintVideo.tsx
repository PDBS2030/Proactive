"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet background video for a section. It loads and plays only while the section is the one on screen
 * (not before it arrives, and not once the next section has slid over it), and stays a still picture for
 * visitors who ask for reduced motion.
 */
export function FaintVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = v.closest<HTMLElement>("[data-stack]") ?? v.parentElement;
    if (!host) return;

    let raf = 0;
    let playing = false;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = host.getBoundingClientRect();
      const next = host.nextElementSibling?.getBoundingClientRect();
      // active: this section has come into view and the next one has not yet covered most of it
      const active = !document.hidden && r.top < vh * 0.6 && r.bottom > vh * 0.2 && (!next || next.top > vh * 0.45);
      if (active && !playing) {
        playing = true;
        void v.play().catch(() => {
          playing = false;
        });
      } else if (!active && playing) {
        playing = false;
        v.pause();
      }
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    document.addEventListener("visibilitychange", req);
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      document.removeEventListener("visibilitychange", req);
      if (raf) cancelAnimationFrame(raf);
      v.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}
