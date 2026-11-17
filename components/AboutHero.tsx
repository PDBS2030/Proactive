"use client";

import { FaintVideo } from "@/components/FaintVideo";
import { goToSection } from "@/components/Stack";
import { HERO_H1 } from "@/lib/heroType";

/**
 * A page-header band, after the company pages of the reference: a film plays behind a dark tint, the title is
 * centred, and a row of links to the sections of the page sits under it, divided by thin bars.
 */
export function AboutHero({ title, items }: { title: string; items: { id: string; label: string }[] }) {
  return (
    <section aria-label={title} className="relative isolate overflow-hidden bg-[#061a33] px-4 pt-[96px] text-center text-white min-[768px]:px-[124px] min-[768px]:pt-[110px]">
      <FaintVideo src="/assets/service-video.mp4" poster="/assets/service-video-poster.jpg" className="absolute inset-0 -z-20 size-full object-cover" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[#061a33]/66" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,26,51,.55)_0%,rgba(6,26,51,0)_40%,rgba(6,26,51,.5)_100%)]" />

      <div className="mx-auto flex min-h-[330px] w-full max-w-[1680px] flex-col items-center justify-center py-14 min-[768px]:min-h-[380px]">
        <h1 className={`hero-in ${HERO_H1}`}>{title}</h1>
        <nav aria-label="On this page" className="hero-in mt-9" style={{ animationDelay: "250ms" }}>
          <ul className="flex flex-wrap items-center justify-center gap-y-3">
            {items.map((it, i) => (
              <li key={it.id} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="mx-4 h-3.5 w-px bg-white/55 min-[768px]:mx-5" />}
                <a
                  href={`#${it.id}`}
                  onClick={(e) => goToSection(e, it.id)}
                  className="text-[12px] font-semibold tracking-[.06em] text-white uppercase no-underline underline-offset-[7px] outline-none decoration-2 decoration-transparent transition-[text-decoration-color] duration-300 hover:underline hover:decoration-gold focus-visible:underline focus-visible:decoration-gold min-[768px]:text-[13px]"
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
