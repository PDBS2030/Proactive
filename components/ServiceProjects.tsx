"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/pages";

/**
 * The picture beside each service: a row of vertical strips, one per project completed under that service.
 * The strip you choose widens to show its photograph, and its details appear underneath with a link
 * to that project in the gallery.
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
  const p = projects[active];

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
    <div>
      <div data-wipe className="relative">
        <div
          role="tablist"
          aria-label={`Projects completed under ${serviceName}`}
          className="flex flex-col overflow-hidden min-[768px]:h-[clamp(340px,32vw,500px)] min-[768px]:flex-row"
        >
          {projects.map((x, i) => {
            const on = i === active;
            return (
              <button
                key={x.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "relative cursor-pointer overflow-hidden bg-[#082b52] text-left outline-none transition-[height,flex-grow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white motion-reduce:transition-none",
                  "min-[768px]:h-auto min-[768px]:basis-0",
                  on ? "h-64 min-[768px]:grow-[4.5]" : "h-14 min-[768px]:grow",
                )}
              >
                <Image
                  src={x.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={cn("object-cover transition-transform duration-700 motion-reduce:transition-none", on ? "scale-100" : "scale-110")}
                />
                <span
                  aria-hidden="true"
                  className={cn("absolute inset-0 transition-colors duration-500", on ? "bg-linear-to-t from-[#082b52]/70 via-transparent to-transparent" : "bg-[#082b52]/70")}
                />
                <span
                  className={cn(
                    "absolute left-4 text-[13px] font-medium tracking-[.1em] whitespace-nowrap text-white uppercase",
                    "max-md:top-1/2 max-md:-translate-y-1/2",
                    "min-[768px]:bottom-5 min-[768px]:left-1/2 min-[768px]:-translate-x-1/2 min-[768px]:rotate-180 min-[768px]:[writing-mode:vertical-rl]",
                  )}
                >
                  {x.title}
                </span>
              </button>
            );
          })}
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-12 w-12 border-t-2 border-l-2 border-gold" />
      </div>

      <div key={p.id} id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} aria-live="polite" className="hero-in mt-5 min-h-[7.5rem]">
        <p className="text-sm font-semibold text-gold">Completed under {serviceName.toLowerCase()}</p>
        <h3 className="mt-1 text-(length:--h5) leading-(--h5-lh) font-(--h5-weight)">
          {p.title}, {p.city}
        </h3>
        <p className="mt-1.5 max-w-[56ch] text-[15px] leading-snug text-[#143275]/85">{p.scope}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-[#143275]/70">
          <span>{p.size}</span>
          <span>{p.year}</span>
          <Link
            href={`/projects?service=${serviceId}&q=${encodeURIComponent(p.title)}`}
            className="border-b-2 border-gold pb-0.5 text-[13px] font-medium text-[#143275] no-underline transition-[padding] duration-300 outline-none hover:pr-2 focus-visible:pr-2"
          >
            View in gallery
          </Link>
          <Link href={`/projects?service=${serviceId}`} className="text-[13px] font-medium text-[#143275]/80 underline decoration-transparent decoration-2 underline-offset-[5px] transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold">
            All {projects.length === 1 ? "" : `${serviceName.toLowerCase()} `}projects
          </Link>
        </p>
      </div>
    </div>
  );
}
