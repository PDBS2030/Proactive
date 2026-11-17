import Image from "next/image";
import Link from "next/link";
import { HERO_H1 } from "@/lib/heroType";
import { SECTOR_BLURB, SERVICE_LINE, projectGallery, projectPlace, type Project } from "@/lib/pages";

/** Where each photograph sits in the collage on wide screens, as grid areas of a 12 by 12 grid, with its drift and delay */
const SPOTS = [
  { area: "1 / 4 / 8 / 13", delay: 250 }, // the project's own photograph, the largest
  { area: "6 / 1 / 11 / 6", delay: 450 },
  { area: "9 / 7 / 13 / 13", delay: 650 },
  { area: "1 / 1 / 5 / 4", delay: 850 },
  { area: "11 / 3 / 13 / 7", delay: 1050 },
];

/**
 * The top of a project's own page. The type of project is the heading; the project's name, its place and a short
 * description sit under it; and the photographs are laid out as a collage that overlaps itself, the project's own
 * picture largest, on a deep blue field.
 */
export function ProjectHero({ project: p }: { project: Project }) {
  const photos = [p.image, ...projectGallery(p)];
  return (
    <section aria-labelledby="project-type" className="relative isolate overflow-hidden bg-[#04142a] px-4 pt-[132px] pb-[90px] text-white min-[768px]:px-[124px] min-[768px]:pt-[150px] min-[768px]:pb-[120px]">
      {/* a soft light from the upper right and a hairline of gold along the foot */}
      <span aria-hidden="true" className="pointer-events-none absolute -top-40 -right-24 -z-10 size-[640px] rounded-full bg-[#2356e5]/20 blur-[130px]" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="mx-auto grid w-full max-w-[1680px] items-center gap-14 min-[992px]:grid-cols-12 min-[992px]:gap-x-14">
        <div className="min-[992px]:col-span-5">
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-[14px] font-medium tracking-[.08em] text-white/70 uppercase no-underline outline-none transition-colors duration-200 hover:text-gold focus-visible:text-gold">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13 5H1M5 1 1 5l4 4" />
            </svg>
            All Projects
          </Link>

          <h1 id="project-type" className={`${HERO_H1} mt-6`}>
            {p.sector}
          </h1>
          <span aria-hidden="true" className="mt-7 block h-0.5 w-14 bg-gold" />

          <p className="mt-8 font-bodoni text-[30px] leading-[1.15] min-[768px]:text-[38px]">{p.title}</p>
          <p className="mt-3 text-[16px] tracking-[.04em] text-white/70">
            {projectPlace(p)}
          </p>

          <p className="mt-8 max-w-[46ch] font-mulish text-[18px] leading-[1.65] text-white/85">
            {p.scope}. {SERVICE_LINE[p.service]}
          </p>
          <p className="mt-4 max-w-[46ch] font-mulish text-[16px] leading-[1.65] text-white/65">{SECTOR_BLURB[p.sector]}</p>
        </div>

        {/* the collage: one wide grid with overlapping photographs on large screens, a simple stack below that */}
        <div className="min-[992px]:col-span-7">
          <div className="hidden h-[min(46vw,700px)] grid-cols-12 grid-rows-12 gap-3 min-[992px]:grid">
            {SPOTS.map((s, i) => (
              <div
                key={i}
                className="collage-in relative overflow-hidden bg-[#0e365c] shadow-[0_30px_60px_-26px_rgba(0,0,0,.75)] outline-[6px] outline-[#04142a] transition-transform duration-700 ease-out hover:z-10 hover:scale-[1.03]"
                style={{ gridArea: s.area, ["--d" as string]: `${s.delay}ms`, zIndex: i === 0 ? 1 : 2 }}
              >
                <Image
                  src={photos[i]}
                  alt={i === 0 ? `${p.title}, ${p.city}` : ""}
                  fill
                  sizes="(max-width: 1680px) 40vw, 680px"
                  priority={i < 2}
                  quality={85}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 min-[992px]:hidden">
            {photos.slice(0, 5).map((src, i) => (
              <div key={i} className={`collage-in relative overflow-hidden bg-[#0e365c] ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"}`} style={{ ["--d" as string]: `${200 + i * 150}ms` }}>
                <Image src={src} alt={i === 0 ? `${p.title}, ${p.city}` : ""} fill sizes="(max-width: 992px) 100vw, 50vw" priority={i === 0} className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
