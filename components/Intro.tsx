"use client";

import { useEffect, useRef } from "react";
import { MARK_PATHS } from "@/components/BrandMark";

const KEY = "define-rhythm-v1";
const DURATION = 5400;

/** Slab order: left to right, with the roof piece last. */
const SLABS = [MARK_PATHS[0], MARK_PATHS[1], MARK_PATHS[2], MARK_PATHS[3], MARK_PATHS[4]];

export function Intro() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    let active = false;
    let prevOverflow = "";

    const done = () => document.dispatchEvent(new Event("intro:done"));

    const finish = () => {
      if (timer) window.clearTimeout(timer);
      if (!active) return;
      active = false;
      document.body.style.overflow = prevOverflow;
      if (dialog.open) dialog.close();
      document.documentElement.dataset.intro = "none";
      done();
    };

    const start = (explicit: boolean) => {
      if (dialog.open || (!explicit && reduced.matches)) return;
      prevOverflow = document.body.style.overflow;
      dialog.classList.toggle("rhythm-explicit", explicit);
      timer = window.setTimeout(finish, DURATION);
      try {
        active = true;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        try {
          sessionStorage.setItem(KEY, "seen");
        } catch {}
      } catch {
        active = false;
        if (timer) window.clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
      }
    };

    const onCancel = (e: Event) => e.preventDefault();
    const onClose = () => {
      if (!dialog.open) finish();
    };
    const onVisibility = () => {
      if (document.hidden) finish();
    };
    const onReduced = () => {
      if (reduced.matches) finish();
    };
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("close", onClose);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", finish);
    reduced.addEventListener("change", onReduced);

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "seen";
    } catch {}
    const forced = /[?&]intro\b/.test(window.location.search);
    const willPlay = forced || (!seen && !window.location.hash && (!nav || nav.type === "navigate"));

    if (forced) start(true);
    else if (willPlay) start(false);
    if (!active) {
      document.documentElement.dataset.intro = "none";
      done();
    }

    return () => {
      if (timer) window.clearTimeout(timer);
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("close", onClose);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", finish);
      reduced.removeEventListener("change", onReduced);
      if (active) {
        document.body.style.overflow = prevOverflow;
        if (dialog.open) dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={ref}
      id="rhythm-intro"
      aria-label="PROACTIVE intro"
      className="group open:animate-[rhythm-veil_.55s_4.85s_ease-in-out_both] fixed inset-0 z-100 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-foreground p-0 text-background"
    >
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center [perspective:1100px]">
        <div className="flex [transform-style:preserve-3d] group-open:animate-[rhythm-space_4s_var(--ease-out)_both]">
          <svg
            viewBox="217 178 823 925"
            xmlns="http://www.w3.org/2000/svg"
            className="block h-[36vh] w-auto overflow-visible fill-current md:h-[min(46vh,440px)]"
          >
            {SLABS.map((p, i) => (
              <path
                key={p.d}
                d={p.d}
                style={{ "--beat": i } as React.CSSProperties}
                className="[transform-box:fill-box] [transform-origin:bottom] group-open:animate-[rhythm-build_3.1s_var(--ease-out)_both] group-open:[animation-delay:calc(var(--beat)*95ms)]"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 opacity-0 group-open:animate-[rhythm-name_5.4s_both]">
        <span
          role="img"
          aria-label="PROACTIVE — Design & Building Systems"
          className="inline-grid justify-items-start gap-y-[.24em] text-[clamp(2.5rem,9vw,7.5rem)]"
        >
          <span aria-hidden="true" className="block font-montserrat text-[1em] leading-none font-extrabold tracking-[-.01em] text-background">
            PROACTIVE
          </span>
          <span
            aria-hidden="true"
            className="w-0 min-w-full text-left font-montserrat text-[.22em] leading-[1.2] font-medium tracking-[.515em] whitespace-nowrap text-background/88"
          >
            DESIGN &amp; BUILDING SYSTEMS
          </span>
          <span
            aria-hidden="true"
            className="block h-[max(2px,.025em)] w-full origin-left bg-gold group-open:animate-[rhythm-rule_.9s_3.3s_var(--ease-out)_both]"
          />
        </span>
      </div>
    </dialog>
  );
}
