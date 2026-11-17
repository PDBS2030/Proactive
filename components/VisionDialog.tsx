"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_H1 } from "@/lib/heroType";

export const OPEN_VISION = "open-vision";

/**
 * The Our Vision dialog. It opens as a circle that grows from the link that was pressed, over a blurred, darkened
 * page; the film inside drifts slowly and the words rise into place one after another. Closing runs it backwards.
 */
export function VisionDialog({ statement, paragraphs }: { statement: string; paragraphs: string[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const show = useCallback((x: number, y: number) => {
    const d = ref.current;
    if (!d) return;
    opener.current = document.activeElement as HTMLElement | null;
    d.style.setProperty("--ox", `${x}px`);
    d.style.setProperty("--oy", `${y}px`);
    // far enough to cover the whole window from wherever the circle starts
    d.style.setProperty("--r", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 40}px`);
    d.removeAttribute("data-closing");
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    const d = ref.current;
    if (!d || !d.open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      d.close();
      return;
    }
    d.setAttribute("data-closing", "");
    window.setTimeout(() => d.close(), 800);
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail;
      show(x, y);
    };
    window.addEventListener(OPEN_VISION, onOpen);
    return () => window.removeEventListener(OPEN_VISION, onOpen);
  }, [show]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
  }, [open]);

  useEffect(() => () => void (document.body.style.overflow = ""), []);

  return (
    <dialog
      ref={ref}
      id="vision-dialog"
      aria-labelledby="vision-title"
      onCancel={(e) => {
        e.preventDefault();
        hide();
      }}
      onClose={() => {
        setOpen(false);
        document.body.style.overflow = "";
        ref.current?.removeAttribute("data-closing");
        opener.current?.focus?.();
      }}
      onClick={(e) => {
        if (e.target === ref.current) hide();
      }}
    >
      {open && (
        <div className="relative m-4 grid max-h-[calc(100dvh-2rem)] w-[min(1180px,calc(100vw-2rem))] overflow-y-auto bg-white text-[#082b52] shadow-[0_50px_140px_-20px_rgba(0,0,0,.7)] min-[860px]:grid-cols-[5fr_6fr]">
          <div className="relative min-h-[260px] overflow-hidden bg-[#061a33] min-[860px]:min-h-[560px]">
            <video className="vision-drift absolute inset-0 size-full object-cover" src="/assets/about-video.mp4" poster="/assets/about-video-poster.jpg" muted loop playsInline autoPlay aria-hidden="true" />
            <span aria-hidden="true" className="absolute inset-0 bg-[#061a33]/62" />
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#061a33]/80 via-transparent to-[#061a33]/30" />
            <span aria-hidden="true" className="vision-rise absolute top-0 left-0 h-1 w-24 bg-gold" style={{ ["--d" as string]: "500ms" }} />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white min-[860px]:p-10">
              <h2 id="vision-title" className={`vision-rise ${HERO_H1} text-white`} style={{ ["--d" as string]: "800ms" }}>
                Our Vision
              </h2>
            </div>
          </div>

          <div className="relative flex flex-col justify-center p-7 min-[860px]:p-12">
            <button
              type="button"
              onClick={hide}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 inline-flex size-11 cursor-pointer items-center justify-center text-[#082b52] transition-colors duration-200 outline-none hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2356e5] min-[860px]:top-5 min-[860px]:right-5"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.6" />
                <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <p className="vision-rise font-jost text-[clamp(24px,2.4vw,36px)] leading-[1.14] font-normal text-[#082b52]" style={{ ["--d" as string]: "950ms" }}>
              {statement}
            </p>
            <span aria-hidden="true" className="vision-rise mt-7 block h-0.5 w-14 bg-gold" style={{ ["--d" as string]: "1100ms" }} />
            <div className="mt-7 grid gap-5">
              {paragraphs.map((t, i) => (
                <p key={t} className="vision-rise font-mulish text-[17px] leading-[1.65] text-[#082b52]/90" style={{ ["--d" as string]: `${1200 + i * 140}ms` }}>
                  {t}
                </p>
              ))}
            </div>
            <div className="vision-rise mt-9" style={{ ["--d" as string]: "1550ms" }}>
              <a
                href="#inquiry"
                data-start-project
                className="btn-sweep inline-flex min-h-12 items-center justify-center border border-[#082b52] bg-[#082b52] bg-[linear-gradient(#fff,#fff)] px-8 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline outline-none hover:text-[#082b52] focus-visible:text-[#082b52]"
              >
                Start a project
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
