"use client";

import { FaintVideo } from "@/components/FaintVideo";
import { HERO_H1 } from "@/lib/heroType";

/**
 * A page-header band, after the company pages of the reference: a film plays behind a dark tint, the title is
 * centred.
 */
export function AboutHero({ title }: { title: string }) {
  return (
    <section aria-label={title} className="relative isolate overflow-hidden bg-[#061a33] px-4 pt-[96px] text-center text-white min-[768px]:px-[124px] min-[768px]:pt-[110px]">
      <FaintVideo src="/assets/service-video.mp4" poster="/assets/service-video-poster.jpg" className="absolute inset-0 -z-20 size-full object-cover" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[#061a33]/66" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,26,51,.55)_0%,rgba(6,26,51,0)_40%,rgba(6,26,51,.5)_100%)]" />

      <div className="mx-auto flex min-h-[480px] w-full max-w-[1680px] flex-col items-center justify-center py-14 min-[768px]:min-h-[530px]">
        <h1 className={`hero-in ${HERO_H1}`}>{title}</h1>
      </div>
    </section>
  );
}
