"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { SERVICE_SLUGS, type Project } from "@/lib/pages";
import { cn } from "@/lib/cn";

const TABS = [
  { id: "design-build", label: "Design-build" },
  { id: "architecture", label: "Architecture & design" },
  { id: "construction-management", label: "Construction management" },
];

/** Completed work for each service, taken from the Projects page data, with a link to the filtered gallery. */
export function RelatedProjects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const tab = TABS[active];
  const all = projects.filter((p) => p.service === SERVICE_SLUGS[tab.id]);
  const shown = all.slice(0, 3);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Projects by service" className="relative grid border-b border-[#082b52]/20 min-[768px]:grid-cols-3">
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 hidden h-0.5 w-1/3 bg-gold transition-transform duration-500 ease-out min-[768px]:block"
          style={{ transform: `translateX(${active * 100}%)` }}
        />
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "-mb-px cursor-pointer border-b-2 px-1 py-4 text-left text-(length:--h5) leading-(--h5-lh) font-(--h5-weight) outline-none transition-colors duration-300 focus-visible:bg-[#f3f6fa] min-[768px]:pr-8",
              active === i ? "border-gold text-[#082b52] min-[768px]:border-transparent" : "border-transparent text-[#082b52]/60 hover:text-[#082b52]",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} tabIndex={0} className="pt-10 outline-none">
        <ul className="grid gap-x-8 gap-y-10 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {shown.map((p) => (
            <li key={p.id}>
              <article className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f6fa]">
                  <Image src={p.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />
                </div>
                <h3 className="mt-4 text-(length:--h5) leading-(--h5-lh) font-(--h5-weight)">{p.title}</h3>
                <p className="mt-1 text-[15px] text-[#082b52]/80">
                  {p.city}, {p.region}
                </p>
                <p className="mt-2 text-[14px] leading-snug text-[#082b52]/75">{p.scope}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#082b52]/12 pt-3 text-[13px] text-[#082b52]/70">
                  <span>{p.sector}</span>
                  <span>{p.size}</span>
                  <span>{p.year}</span>
                </p>
              </article>
            </li>
          ))}
        </ul>
        <Link
          href={`/projects?service=${tab.id}`}
          className="mt-10 inline-flex min-h-12 items-center justify-center border border-[#082b52]/30 px-7 text-[.8125rem] font-medium tracking-[.08em] text-[#082b52] uppercase no-underline transition-colors duration-300 outline-none hover:border-gold focus-visible:border-gold"
        >
          See all {all.length} {tab.label.toLowerCase()} projects
        </Link>
      </div>
    </div>
  );
}
