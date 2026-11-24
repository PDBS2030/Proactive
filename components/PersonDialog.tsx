"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ui } from "@/components/PageIntro";
import { FOOTER } from "@/lib/data";

export const OPEN_PERSON = "open-person";

export type Person = { name: string; title: string; image: string; bio: string[] };

/**
 * A profile popup for one team member, after the leadership profile on the reference site: the portrait on a
 * raised card with the name on a dark panel, then a row of tags, a rule, the biography and two buttons.
 * It opens as a circle from the card that was pressed and closes the same way back.
 */
export function PersonDialog({ people }: { people: Person[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const hide = useCallback(() => {
    const d = ref.current;
    if (!d || !d.open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      d.close();
      return;
    }
    d.setAttribute("data-closing", "");
    window.setTimeout(() => d.close(), 1000);
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const { i, x, y } = (e as CustomEvent<{ i: number; x: number; y: number }>).detail;
      const d = ref.current;
      if (!d) return;
      opener.current = document.activeElement as HTMLElement | null;
      d.style.setProperty("--ox", `${x}px`);
      d.style.setProperty("--oy", `${y}px`);
      d.style.setProperty("--r", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 40}px`);
      d.removeAttribute("data-closing");
      setIndex(i);
    };
    window.addEventListener(OPEN_PERSON, onOpen);
    return () => window.removeEventListener(OPEN_PERSON, onOpen);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d || index === null) return;
    if (!d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
  }, [index]);

  useEffect(() => () => void (document.body.style.overflow = ""), []);

  const p = index === null ? null : people[index];
  const first = p?.name.split(" ")[0] ?? "";

  return (
    <dialog
      ref={ref}
      className="film-dialog person-dialog offerings-vars"
      aria-labelledby="person-name"
      onCancel={(e) => {
        e.preventDefault();
        hide();
      }}
      onClose={() => {
        setIndex(null);
        document.body.style.overflow = "";
        ref.current?.removeAttribute("data-closing");
        opener.current?.focus?.();
      }}
      onClick={(e) => {
        if (e.target === ref.current) hide();
      }}
    >
      {p && (
        <div className="vision-panel relative m-4 grid max-h-[calc(100dvh-2rem)] w-[min(1240px,calc(100vw-2rem))] gap-8 overflow-y-auto rounded-2xl border border-[#082b52]/10 bg-[#f6f8fb] p-6 text-[#082b52] shadow-[0_50px_140px_-20px_rgba(0,0,0,.7)] min-[860px]:grid-cols-[minmax(0,420px)_1fr] min-[860px]:gap-14 min-[860px]:p-12">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 rounded-l-2xl bg-gold" />
          <button
            type="button"
            onClick={hide}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 inline-flex size-11 cursor-pointer items-center justify-center text-[#082b52] transition-[color,transform] duration-300 outline-none hover:rotate-90 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2356e5]"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.6" />
              <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          {/* the portrait on a raised card, with a block of shadow set behind it */}
          <div className="vision-rise relative self-start" style={{ ["--d" as string]: "300ms" }}>
            <span aria-hidden="true" className="absolute top-3 left-3 size-full rounded-xl bg-[#082b52]/12" />
            <div className="relative overflow-hidden rounded-xl bg-[#04142a] shadow-[0_18px_40px_-18px_rgba(8,43,82,.55)]">
              <div className="relative aspect-[4/4.4]">
                <Image src={p.image} alt={`${p.name}, ${p.title}`} fill sizes="(max-width: 860px) 90vw, 420px" quality={92} className="object-cover object-top" />
              </div>
              <div className="px-6 py-5 text-white">
                <h2 id="person-name" className={ui.tile}>
                  {p.name}
                </h2>
                <p className="mt-1 text-[15px] text-white/75">{p.title}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center min-[860px]:py-4">
            <div className="vision-rise flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold tracking-[.15em] uppercase" style={{ ["--d" as string]: "500ms" }}>
              <span className="rounded-md bg-[#04142a] px-3.5 py-2.5 font-semibold text-white">Team profile</span>
              <span className="text-[#082b52]/55">| PDBS</span>
              <span className="text-[#082b52]/55">| Design-Build</span>
            </div>
            <hr className="vision-rise my-8 border-0 border-t border-[#082b52]/15" style={{ ["--d" as string]: "650ms" }} />
            <div className="grid max-w-[64ch] gap-5">
              {p.bio.map((t, k) => (
                <p key={k} className="vision-rise font-mulish text-[17px] leading-[1.65] text-[#082b52]/85" style={{ ["--d" as string]: `${800 + k * 160}ms` }}>
                  {t}
                </p>
              ))}
            </div>
            <div className="vision-rise mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: `${800 + p.bio.length * 160 + 120}ms` }}>
              <a
                href={`mailto:${FOOTER.email}?subject=${encodeURIComponent(`For ${p.name}`)}`}
                className="inline-flex min-h-[54px] items-center gap-3 rounded-md bg-[#04142a] px-6 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline outline-none transition-colors duration-200 hover:bg-[#082b52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2356e5]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Contact {first}
              </a>
              <a
                href="#inquiry"
                data-start-project
                onClick={hide}
                className="inline-flex min-h-[54px] items-center rounded-md border border-[#082b52]/15 bg-white px-6 text-[.8125rem] font-medium tracking-[.08em] text-[#04142a] uppercase no-underline outline-none transition-colors duration-200 hover:border-[#082b52]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2356e5]"
              >
                Request consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
