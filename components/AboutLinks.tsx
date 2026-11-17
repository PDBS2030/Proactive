"use client";

import { goToSection } from "@/components/Stack";
import { OPEN_VISION } from "@/components/VisionDialog";

const ICONS: Record<string, React.ReactNode> = {
  people: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" />
      <path d="M16 4.5a4 4 0 0 1 0 7" />
      <path d="M19 14.5a6 6 0 0 1 3 5.5v1" />
    </>
  ),
  idea: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.4 1 2.5h6c0-1.1.3-1.8 1-2.5A6 6 0 0 0 12 3z" />
    </>
  ),
  group: (
    <>
      <circle cx="12" cy="6" r="3" />
      <circle cx="5" cy="9" r="2.2" />
      <circle cx="19" cy="9" r="2.2" />
      <path d="M7 20v-3a5 5 0 0 1 10 0v3" />
      <path d="M1.5 18v-2a3.5 3.5 0 0 1 3.5-3.5" />
      <path d="M22.5 18v-2a3.5 3.5 0 0 0-3.5-3.5" />
    </>
  ),
};

/** Three round icons, each with a link to a section further down the page, as on the reference's about page */
export function AboutLinks({ items }: { items: { id: string; label: string; icon: keyof typeof ICONS; dialog?: boolean }[] }) {
  return (
    <ul className="relative left-1/2 mt-[86px] grid w-full max-w-[1400px] -translate-x-1/2 gap-10 min-[640px]:grid-cols-3 min-[1100px]:w-[min(1400px,calc(100%+96px))]">
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            onClick={(e) => {
              if (it.dialog) {
                // opens the dialog from the middle of the icon that was pressed
                e.preventDefault();
                const r = (e.currentTarget.firstElementChild as HTMLElement).getBoundingClientRect();
                window.dispatchEvent(new CustomEvent(OPEN_VISION, { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }));
              } else goToSection(e, it.id);
            }}
            className="group flex flex-col items-center text-[#082b52] no-underline outline-none"
          >
            <span className="flex size-24 items-center justify-center rounded-full border border-[#082b52]/12 bg-white text-[#082b52]/35 transition-[border-color,color,box-shadow,transform] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-gold group-hover:text-[#082b52] group-hover:shadow-[0_14px_28px_-14px_rgba(8,43,82,.45)] group-focus-visible:border-gold group-focus-visible:text-[#082b52]">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[it.icon]}
              </svg>
            </span>
            <span className="mt-4 text-[26px] leading-snug font-bold underline decoration-2 underline-offset-[6px] transition-colors duration-300 group-hover:text-gold group-focus-visible:text-gold">{it.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
