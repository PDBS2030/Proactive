"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/services";

/**
 * The three services as one scene: on desktop the picture stays pinned and changes as each
 * service scrolls into place; on small screens every service carries its own picture.
 */
export function ServiceStage({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const pick = () => {
      const line = window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;
      blocks.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - line);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  return (
    <div className="mx-auto grid w-full max-w-[1680px] px-4 min-[992px]:grid-cols-12 min-[992px]:gap-x-16 min-[768px]:px-[124px]">
      <div className="hidden min-[992px]:col-span-5 min-[992px]:block">
        <div className="sticky top-[168px] h-[calc(100vh-208px)] max-h-[760px] min-h-[420px]">
          {services.map((s, i) => (
            <figure
              key={s.id}
              aria-hidden={active !== i}
              className={cn(
                "absolute inset-0 m-0 transition-opacity duration-700 ease-out motion-reduce:transition-none",
                active === i ? "opacity-100" : "opacity-0",
              )}
            >
              <Image src={s.image} alt={s.alt} fill sizes="40vw" className="object-cover" priority={i === 0} />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#082b52]/85 to-transparent px-6 pt-16 pb-5 text-[15px] leading-snug text-white">
                {s.short}
              </figcaption>
            </figure>
          ))}
          <span aria-hidden="true" className="absolute top-0 -left-3 h-16 w-1 bg-gold" />
        </div>
      </div>

      <div className="min-[992px]:col-span-7">
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            ref={(el) => {
              blocks.current[i] = el;
            }}
            aria-labelledby={`${s.id}-title`}
            className="scroll-mt-[170px] border-t border-[#143275]/12 py-12 first:border-t-0 min-[992px]:flex min-[992px]:min-h-[84vh] min-[992px]:flex-col min-[992px]:justify-center min-[992px]:py-16"
          >
            <div className="relative mb-8 aspect-[4/3] overflow-hidden min-[992px]:hidden">
              <Image src={s.image} alt={s.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <p className="text-sm font-semibold tracking-[.04em] text-gold">{s.name}</p>
            <h2
              id={`${s.id}-title`}
              className="mt-3 font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal text-balance text-[#143275] uppercase [text-wrap:initial]"
            >
              {s.headline}
            </h2>
            <p className="mt-5 max-w-[60ch] font-mulish text-[17px] leading-[1.65] text-[#143275]/85">{s.body}</p>

            <ul className="mt-8 max-w-[60ch] border-t border-[#143275]/15">
              {s.includes.map((x) => (
                <li key={x} className="border-b border-[#143275]/15 py-3 text-[15px] leading-snug">
                  {x}
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid max-w-[60ch] gap-5 min-[640px]:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-gold">Best for</dt>
                <dd className="mt-1 text-[15px] leading-snug">{s.bestFor}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gold">You receive</dt>
                <dd className="mt-1 text-[15px] leading-snug">{s.outcome}</dd>
              </div>
            </dl>

            <Link
              href="#inquiry"
              className="mt-9 inline-flex min-h-12 w-fit items-center justify-center border border-[#143275] bg-[#143275] px-7 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline transition-colors duration-300 outline-none hover:bg-transparent hover:text-[#143275] focus-visible:bg-transparent focus-visible:text-[#143275]"
            >
              Ask about {s.name.toLowerCase()}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
