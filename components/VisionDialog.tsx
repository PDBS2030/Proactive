"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_H1 } from "@/lib/heroType";

export const OPEN_VISION = "open-vision";

/** The three verbs in the vision statement, each with a line from what the site already says (DRAFT wording) */
const PILLARS = [
  { word: "Plan", text: "Goals, site and budget settled before design begins." },
  { word: "Design", text: "Architecture and engineering that are buildable and priced." },
  { word: "Build", text: "One accountable team, from the first sketch to handover." },
];

const RING = "BUILD FOR A BETTER SOCIETY • ";

/**
 * The Our Vision dialog. It opens as a circle that grows from the link that was pressed, over a blurred, darkened
 * page. Inside, a film drifts behind a huge outlined word and a slowly turning ring of text, and follows the pointer
 * with a soft light; the statement, its three verbs and the paragraphs rise into place one after another.
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
    d.removeAttribute("data-skip");
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
    window.setTimeout(() => d.close(), 1300);
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

  // the pointer moves the light and nudges the layers of the film side
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    e.currentTarget.style.setProperty("--px", px.toFixed(3));
    e.currentTarget.style.setProperty("--py", py.toFixed(3));
  };

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
        <>
        <div className="vision-panel relative m-4 grid h-[min(800px,calc(100dvh-2rem))] w-[min(1220px,calc(100vw-2rem))] overflow-y-auto bg-white text-[#082b52] shadow-[0_50px_140px_-20px_rgba(0,0,0,.75)] min-[860px]:grid-cols-[5fr_6fr] min-[860px]:overflow-hidden">
          {/* the film side */}
          <div onPointerMove={onMove} className="vision-film relative min-h-[300px] overflow-hidden bg-[#061a33] [--px:.5] [--py:.5] min-[860px]:min-h-0">
            <video className="vision-drift absolute inset-0 size-full object-cover" src="/assets/about-video.mp4" poster="/assets/about-video-poster.jpg" muted loop playsInline autoPlay aria-hidden="true" />
            <span aria-hidden="true" className="absolute inset-0 bg-[#061a33]/60" />
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#061a33]/85 via-transparent to-[#061a33]/35" />
            <span aria-hidden="true" className="vision-leak absolute inset-0" />
            <span aria-hidden="true" className="vision-grain" />
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_45%,rgba(2,8,18,.6)_100%)]" />
            <span aria-hidden="true" className="vision-flare" />
            {/* a soft light that follows the pointer */}
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(380px_circle_at_calc(var(--px)*100%)_calc(var(--py)*100%),rgba(255,255,255,.2),transparent_62%)] mix-blend-soft-light" />

            {/* a huge outlined word that slides against the film */}
            <span
              aria-hidden="true"
              className="vision-rise pointer-events-none absolute -bottom-6 -left-4 font-jost text-[clamp(120px,17vw,230px)] leading-none font-medium tracking-tight text-transparent select-none [-webkit-text-stroke:1.5px_rgba(255,255,255,.28)]"
              style={{ ["--d" as string]: "700ms", translate: "calc((var(--px) - .5) * -46px) calc((var(--py) - .5) * -22px)" }}
            >
              VISION
            </span>

            {/* a ring of text that turns slowly */}
            <svg aria-hidden="true" viewBox="0 0 200 200" className="vision-ring absolute top-6 right-6 size-[120px] text-white/85 min-[860px]:top-10 min-[860px]:right-10 min-[860px]:size-[150px]">
              <defs>
                <path id="vision-ring-path" d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0" />
              </defs>
              <text className="fill-current text-[15px] font-semibold tracking-[.22em]">
                <textPath href="#vision-ring-path" textLength="447" lengthAdjust="spacing">
                  {RING}
                </textPath>
              </text>
              <circle cx="100" cy="100" r="4" className="fill-gold" />
            </svg>

            <span aria-hidden="true" className="vision-rise absolute top-0 left-0 h-1 w-24 bg-gold" style={{ ["--d" as string]: "500ms" }} />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white min-[860px]:p-10">
              <h2 id="vision-title" className={`vision-rise ${HERO_H1} text-white`} style={{ ["--d" as string]: "900ms" }}>
                Our Vision
              </h2>
            </div>
          </div>

          {/* the words side */}
          <div className="relative flex flex-col justify-center p-7 min-[860px]:overflow-y-auto min-[860px]:p-12">
            <span aria-hidden="true" className="vision-line absolute top-0 left-0 hidden h-full w-px bg-gold/70 min-[860px]:block" />
            <button
              type="button"
              onClick={hide}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 inline-flex size-11 cursor-pointer items-center justify-center text-[#082b52] transition-[color,transform] duration-300 outline-none hover:rotate-90 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2356e5] min-[860px]:top-5 min-[860px]:right-5"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.6" />
                <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>

            <p className="vision-rise max-w-[22ch] font-jost text-[clamp(26px,2.6vw,40px)] leading-[1.12] font-normal text-[#082b52]" style={{ ["--d" as string]: "1000ms" }}>
              {statement}
            </p>

            <ul className="mt-8 border-t border-[#082b52]/12">
              {PILLARS.map((p, i) => (
                <li key={p.word} className="vision-rise group relative flex items-baseline gap-5 border-b border-[#082b52]/12 py-4" style={{ ["--d" as string]: `${1200 + i * 150}ms` }}>
                  <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-0.5 w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full" />
                  <span className="w-[5.5rem] shrink-0 font-jost text-[26px] leading-none text-[#082b52] transition-colors duration-300 group-hover:text-gold">{p.word}</span>
                  <span className="text-[15px] leading-snug text-[#082b52]/85">{p.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 grid gap-4">
              {paragraphs.map((t, i) => (
                <p key={t} className="vision-rise font-mulish text-[16px] leading-[1.6] text-[#082b52]/90" style={{ ["--d" as string]: `${1700 + i * 140}ms` }}>
                  {t}
                </p>
              ))}
            </div>
            <div className="vision-rise mt-8" style={{ ["--d" as string]: "2050ms" }}>
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
        </>
      )}
    </dialog>
  );
}
