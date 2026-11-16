"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/pages";

/**
 * The picture beside each service, as an accordion of the projects completed under that service.
 * The chosen project is a large photograph with its description laid over the bottom; the others are
 * narrow strips of their own photographs with the project name running up the side.
 */
export function ServiceProjects({
  serviceId,
  serviceName,
  projects,
}: {
  serviceId: string;
  serviceName: string;
  projects: Project[];
}) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = projects.length;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="h-full">
      <div data-wipe className="relative h-full">
        <div
          role="tablist"
          aria-label={`Projects completed under ${serviceName}`}
          className="flex flex-col gap-1 bg-[#061a33] min-[768px]:h-full min-[768px]:min-h-[clamp(440px,40vw,640px)] min-[768px]:flex-row"
        >
          {projects.map((x, i) => {
            const on = i === active;
            return (
              <div
                key={x.id}
                role="presentation"
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "relative overflow-hidden transition-[height,flex-grow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
                  "min-[768px]:h-auto min-[768px]:basis-0",
                  on ? "h-80 min-[768px]:grow-[5]" : "h-14 min-[768px]:grow",
                )}
              >
                <button
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="absolute inset-0 cursor-pointer overflow-hidden text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
                >
                  <span className="sr-only">{x.title}</span>
                  <Image
                    src={x.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className={cn("object-cover transition-transform duration-700 motion-reduce:transition-none", on ? "scale-100" : "scale-[1.08]")}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500",
                      on ? "bg-linear-to-t from-[#061a33]/90 via-[#061a33]/30 to-transparent" : "bg-linear-to-t from-[#061a33]/80 via-[#061a33]/25 to-[#061a33]/10",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-4 text-[13px] font-medium tracking-[.1em] whitespace-nowrap text-white uppercase transition-opacity duration-300",
                      "max-md:top-1/2 max-md:-translate-y-1/2",
                      "min-[768px]:bottom-6 min-[768px]:left-1/2 min-[768px]:-translate-x-1/2 min-[768px]:rotate-180 min-[768px]:text-[13px] min-[768px]:[writing-mode:vertical-rl]",
                      on ? "opacity-0" : "opacity-100",
                    )}
                  >
                    {x.title}
                  </span>
                </button>

                <div
                  id={`${uid}-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`${uid}-tab-${i}`}
                  hidden={!on}
                  className={cn(
                    "absolute bottom-5 left-5 z-10 w-[calc(100vw-3rem)] max-w-[22rem] text-white transition-opacity duration-500 min-[768px]:bottom-7 min-[768px]:left-7",
                    on ? "opacity-100 delay-200" : "pointer-events-none opacity-0",
                  )}
                >
                  <p className="text-[18px] leading-snug font-semibold tracking-[.03em] uppercase">{x.title}</p>
                  <p className="mt-1.5 text-[15px] leading-[1.5] text-white/90">{x.scope}</p>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[13px] text-white/70">
                    <span>
                      {x.city}, {x.region}
                    </span>
                    <span>{x.size}</span>
                    <span>{x.year}</span>
                  </p>
                  <Link
                    href={`/projects?service=${serviceId}&q=${encodeURIComponent(x.title)}`}
                    tabIndex={on ? 0 : -1}
                    className="mt-3 inline-block border-b-2 border-gold pb-0.5 text-[14px] font-medium text-white no-underline transition-[padding] duration-300 outline-none hover:pr-3 focus-visible:pr-3"
                  >
                    View in gallery
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
