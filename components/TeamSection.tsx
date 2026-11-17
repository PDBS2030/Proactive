import Image from "next/image";
import { RotatingBadge } from "@/components/RotatingBadge";
import { HERO_H1 } from "@/lib/heroType";

type Person = { name: string; title: string; image: string };

/** Towers for the faint line drawing: left edge, width and height in a 1600 by 560 drawing */
const TOWERS = [
  { x: 30, w: 110, h: 250, crown: 0 },
  { x: 170, w: 90, h: 370, crown: 1 },
  { x: 290, w: 150, h: 290, crown: 0 },
  { x: 470, w: 100, h: 440, crown: 2 },
  { x: 600, w: 170, h: 330, crown: 0 },
  { x: 800, w: 90, h: 490, crown: 1 },
  { x: 920, w: 130, h: 270, crown: 0 },
  { x: 1080, w: 110, h: 400, crown: 2 },
  { x: 1220, w: 170, h: 310, crown: 0 },
  { x: 1420, w: 120, h: 460, crown: 1 },
];

/** An abstract skyline drawn in hairlines: outlines, floor lines, window bars and a few stepped or slanted crowns */
function Skyline() {
  const base = 560;
  return (
    <svg aria-hidden="true" viewBox="0 0 1600 560" preserveAspectRatio="xMidYMax slice" className="pointer-events-none absolute inset-x-0 bottom-0 h-[85%] w-full text-[#082b52] opacity-[.04]" fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M0 559.5 H1600" />
      {TOWERS.map((t, i) => {
        const top = base - t.h;
        const floors = Math.floor(t.h / 34);
        const bars = Math.max(2, Math.floor(t.w / 26));
        return (
          <g key={i}>
            <rect x={t.x} y={top} width={t.w} height={t.h} />
            {Array.from({ length: floors }, (_, k) => (
              <path key={`f${k}`} d={`M${t.x} ${top + 34 * (k + 1)} H${t.x + t.w}`} opacity=".55" />
            ))}
            {Array.from({ length: bars }, (_, k) => (
              <path key={`v${k}`} d={`M${t.x + ((k + 1) * t.w) / (bars + 1)} ${top} V${base}`} opacity=".35" />
            ))}
            {t.crown === 1 && <path d={`M${t.x} ${top} L${t.x + t.w * 0.35} ${top - 46} H${t.x + t.w} V${top}`} />}
            {t.crown === 2 && (
              <>
                <rect x={t.x + t.w * 0.2} y={top - 38} width={t.w * 0.6} height={38} />
                <path d={`M${t.x + t.w * 0.5} ${top - 38} V${top - 90}`} />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * "Our team": a recessed off-white section with a skyline of faint lines behind it, the title and a rotating badge
 * on the left, and a grid of portrait cards on the right, each with the name and the title under it.
 */
export function TeamSection({ id, people }: { id: string; people: Person[] }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate scroll-mt-[130px] overflow-hidden bg-[#ebeef3] px-4 py-[94px] text-[#082b52] shadow-[inset_0_26px_34px_-22px_rgba(8,43,82,.42),inset_0_-26px_34px_-22px_rgba(8,43,82,.3)] min-[768px]:px-[124px] min-[768px]:py-[120px]"
    >
      <Skyline />

      <div className="mx-auto grid w-full max-w-[1680px] gap-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-14">
        <div className="relative min-[992px]:col-span-4">
          <h2 id={`${id}-title`} className={HERO_H1}>
            Our Team
          </h2>
          {/* on wide screens the badge sits level with the gap between the upper and the lower pictures */}
          <RotatingBadge className="mt-14 min-[992px]:absolute min-[992px]:top-1/2 min-[992px]:left-0 min-[992px]:-mt-[4.3rem] min-[992px]:-translate-y-1/2" />
        </div>

        <div className="grid gap-5 min-[640px]:grid-cols-2 min-[992px]:col-span-8">
          {people.map((p) => (
            <article key={p.name} className="group relative overflow-hidden shadow-[0_24px_50px_-22px_rgba(8,43,82,.55)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_40px_70px_-24px_rgba(8,43,82,.7)]">
              <div className="relative aspect-[1.245/1] overflow-hidden bg-[#0e365c]">
                <Image
                  src={p.image}
                  alt={`${p.name}, ${p.title}`}
                  fill
                  sizes="(max-width: 992px) 50vw, 330px"
                  quality={90}
                  className="scale-100 object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
              </div>
              {/* the name and the title on a very dark blue panel */}
              <div className="flex min-h-[8.6rem] flex-col justify-center bg-[#04142a] px-5 py-5 text-center">
                <h3 className="text-[22px] leading-snug font-medium text-white">{p.name}</h3>
                <p className="mt-1 text-[20px] leading-snug font-normal text-white/65">{p.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
