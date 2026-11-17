import Image from "next/image";
import Link from "next/link";
import { HERO_H1 } from "@/lib/heroType";
import { SECTOR_BLURB, SERVICE_LINE, projectPlace, type Project } from "@/lib/pages";

/**
 * The top of a project's own page. The type of project is the heading; the project's name, its place and a short
 * description sit under it; and the project's own photograph runs from the middle of the page to the right edge
 * of the screen, on a deep blue field.
 */
export function ProjectHero({ project: p }: { project: Project }) {
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

        {/* on wide screens the photograph is laid against the right edge and fills the height under the header; on narrow ones it runs the full width below the text */}
        <div className="min-[992px]:col-span-7" aria-hidden="true">
          <div className="min-[992px]:h-[min(46vw,700px)]" />
        </div>
      </div>

      <div className="collage-in relative -mx-4 mt-14 aspect-[16/10] overflow-hidden bg-[#0e365c] min-[768px]:-mx-[124px] min-[992px]:absolute min-[992px]:top-[104px] min-[992px]:bottom-0 min-[992px]:right-0 min-[992px]:mx-0 min-[992px]:mt-0 min-[992px]:aspect-auto min-[992px]:w-[54%]" style={{ ["--d" as string]: "250ms" }}>
        <Image src={p.hero ?? p.image} alt={`${p.title}, ${p.city}`} fill sizes="(max-width: 992px) 100vw, 54vw" priority quality={90} className="object-cover" />
        {/* the picture melts into the blue where it meets the text */}
        <span aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-[14%] bg-gradient-to-r from-[#04142a] to-transparent min-[992px]:block" />
      </div>
    </section>
  );
}
