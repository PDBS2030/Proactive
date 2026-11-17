import Image from "next/image";
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

/** The picture that opens under each commitment, in the same order as the items */
const IMAGES: { src: string; alt: string; pos?: string }[] = [
  { src: "/assets/commitments/c-1.jpg", alt: "Two orange hard hats set down on a white metal roof." },
  { src: "/assets/commitments/c-2.jpg", alt: "Two people shaking hands beside a signed agreement on a balcony rail." },
  { src: "/assets/commitments/c-3.jpg", alt: "A site inspector in a yellow hard hat checking a window with a clipboard.", pos: "50% 22%" },
  { src: "/assets/commitments/c-4.jpg", alt: "The dark solar-clad corner of a modern building against a deep blue sky." },
  { src: "/assets/commitments/c-5.jpg", alt: "An aerial view of a tree-lined neighborhood of houses and streets." },
  { src: "/assets/commitments/c-6.jpg", alt: "Two women in hard hats and safety vests smiling and giving a thumbs up.", pos: "50% 30%" },
];

/**
 * "Our commitments" on a deep blue band: the title and the lead stay to the left while the six commitments
 * sit in a ruled grid. At rest a cell shows only its title and a gold icon; pointed at, it opens onto a picture and the text.
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

        <ul className="grid border-t border-l border-white/25 min-[640px]:grid-cols-2 min-[992px]:col-span-8">
          {items.map((c, i) => (
            <li key={c.title} className="border-r border-b border-white/25">
              {/* at rest only the title and the icon show; on hover the card opens downward onto its picture and text */}
              <div tabIndex={0} className="group h-full bg-white/[.04] outline-none transition-colors duration-500 hover:bg-white/[.08] focus-visible:bg-white/[.08] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2356e5]">
                <div className="flex h-[160px] items-end justify-between gap-6 px-8 pb-9">
                  <h3 className="font-jost text-[27px] leading-[1.15] font-medium">{c.title}</h3>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mb-0.5 shrink-0 text-gold/75 transition-colors duration-500 group-hover:text-gold group-focus-visible:text-gold">
                    {ICONS[i]}
                  </svg>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,.8,.2,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="relative mx-8 aspect-[16/9] overflow-hidden bg-[#0e365c]">
                      <Image
                        src={IMAGES[i].src}
                        alt={IMAGES[i].alt}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 992px) 45vw, 420px"
                        quality={85}
                        className="scale-110 object-cover opacity-0 transition-[opacity,scale] duration-[900ms] ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100"
                        style={{ objectPosition: IMAGES[i].pos ?? "center" }}
                      />
                    </div>
                    <p className="px-8 pt-6 pb-9 text-[16px] leading-[1.65] text-white/75">{c.text}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
