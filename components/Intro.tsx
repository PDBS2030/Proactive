"use client";

import { useEffect, useRef } from "react";

const KEY = "define-rhythm-v1";
const DURATION = 5400;

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
      className="group open:animate-[rhythm-veil_.55s_4.85s_ease-in-out_both] fixed inset-0 z-100 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-(--intro-bg) p-0"
    >
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center [perspective:1100px]">
        <div className="flex [transform-style:preserve-3d] group-open:animate-[rhythm-space_4s_var(--ease-out)_both]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/intro-mark.png"
            alt=""
            width={600}
            height={663}
            className="block h-[36vh] w-auto [transform-origin:bottom] group-open:animate-[rhythm-build_3.1s_var(--ease-out)_both] md:h-[min(46vh,440px)]"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-open:animate-[rhythm-name_5.4s_both]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/intro-lockup.png"
          alt="PROACTIVE — Design and Building Systems, Inc."
          width={1400}
          height={380}
          className="h-auto w-[min(86vw,980px)]"
        />
      </div>
    </dialog>
  );
}
