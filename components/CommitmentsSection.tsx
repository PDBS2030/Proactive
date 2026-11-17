import type { ReactNode } from "react";
import { HERO_H1 } from "@/lib/heroType";

type Item = { title: string; text: string };

/** One hairline icon per commitment, drawn on a 24 by 24 grid and matched to the titles in order */
const ICONS: ReactNode[] = [
  // safety: a shield with a check
  <path key="safety" d="M12 3 4.5 6v5.5c0 4.4 3.1 8.1 7.5 9.5 4.4-1.4 7.5-5.1 7.5-9.5V6L12 3Zm-3 9 2.2 2.2L15.5 10" />,
  // ethics: a balance
  <path key="ethics" d="M12 4v16M7 20h10M5 8h14M5 8l-2.5 6a3 3 0 0 0 5 0L5 8Zm14 0-2.5 6a3 3 0 0 0 5 0L19 8Z" />,
  // quality: a seal with a check
  <path key="quality" d="m12 3 2.3 1.6 2.8-.2 1 2.6 2.3 1.6-.8 2.7.8 2.7-2.3 1.6-1 2.6-2.8-.2L12 21l-2.3-1.6-2.8.2-1-2.6L3.6 15.4l.8-2.7-.8-2.7 2.3-1.6 1-2.6 2.8.2L12 3Zm-3.2 9.2 2.2 2.2 4.2-4.4" />,
  // sustainability: a leaf
  <path key="sustain" d="M5 19c0-8 4-13 14-14 0 9-4 14-12 14M5 19c2-4 5-7 9-9" />,
  // community: a house
  <path key="community" d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5.5h4V20" />,
  // inclusion: three joined circles
  <path key="inclusion" d="M12 4.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-4.6 6.2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm9.2 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />,
];

/**
 * "Our commitments" on a deep blue band: the title and the lead stay to the left while the six commitments
 * sit in a grid of quiet outlined panels, each with a gold line icon that brightens when the panel is pointed at.
 */
export function CommitmentsSection({ id, heading, lead, items }: { id: string; heading: string; lead: string; items: Item[] }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate scroll-mt-[130px] overflow-hidden bg-[#04142a] px-4 py-[94px] text-white min-[768px]:px-[124px] min-[768px]:py-[120px]"
    >
      {/* a soft glow from the upper left, so the band is not one flat colour */}
      <span aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 -z-10 size-[620px] rounded-full bg-[#2356e5]/20 blur-[120px]" />
      <span aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="mx-auto grid w-full max-w-[1680px] gap-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-14">
        <div className="min-[992px]:col-span-4">
          <div className="min-[992px]:sticky min-[992px]:top-[150px]">
            <h2 id={`${id}-title`} className={HERO_H1}>
              {heading}
            </h2>
            <span aria-hidden="true" className="mt-7 block h-0.5 w-14 bg-gold" />
            <p className="mt-6 max-w-[30ch] font-mulish text-[20px] leading-[1.55] text-white/75">{lead}</p>
          </div>
        </div>

        <ul className="grid gap-5 min-[640px]:grid-cols-2 min-[992px]:col-span-8">
          {items.map((c, i) => (
            <li key={c.title}>
              <div className="group h-full rounded-sm border border-white/12 bg-white/[.035] p-8 transition-[border-color,background-color,translate] duration-500 ease-out hover:-translate-y-1.5 hover:border-gold/70 hover:bg-white/[.07]">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-gold/80 transition-colors duration-500 group-hover:text-gold">
                  {ICONS[i]}
                </svg>
                <h3 className="mt-8 font-jost text-[27px] leading-[1.15] font-medium">{c.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.65] text-white/70">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
