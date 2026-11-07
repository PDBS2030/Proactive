"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { OFFERINGS } from "@/lib/data";
import { cn } from "@/lib/cn";

/** Core offerings: the tile you hover or focus becomes the tall one and stays tall. */
export function Offerings() {
  const [active, setActive] = useState(0);

  return (
    <section className="offerings-vars relative z-4 bg-white px-(--pad) pt-[120px] pb-[112px] text-[#143275] min-[810px]:pt-[200px]">
      <div className="grid w-full grid-cols-12 gap-x-(--gap)">
        <h2 className="col-span-12 mb-9 font-jost text-(length:--h2) leading-(--h2-lh) font-medium tracking-normal uppercase text-[#143275] [text-wrap:initial] min-[810px]:col-span-8 min-[1440px]:mb-18">
          {OFFERINGS.heading}
        </h2>

        <div className="col-span-12 grid w-full grid-cols-12 gap-x-(--gap) gap-y-9 min-[810px]:gap-y-0">
          {OFFERINGS.items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group col-span-12 block aspect-[3/2] text-inherit no-underline outline-offset-[3px] focus-visible:outline-2 focus-visible:outline-[#2356e5] min-[810px]:col-span-3 min-[810px]:aspect-[3/4] min-[810px]:min-h-min"
            >
              <div
                className={cn(
                  "relative aspect-[3/2] w-full overflow-hidden transition-[aspect-ratio] duration-300 min-[810px]:aspect-square",
                  "min-[810px]:group-hover:aspect-[3/4] min-[810px]:group-focus-visible:aspect-[3/4]",
                  "motion-reduce:transition-none motion-reduce:min-[810px]:aspect-[3/4]",
                  active === i && "min-[810px]:aspect-[3/4]",
                )}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 810px) 100vw, 25vw"
                  className="origin-[center_top] object-cover object-[center_top] transition-transform duration-500 min-[810px]:group-hover:scale-105 min-[810px]:group-focus-visible:scale-105 motion-reduce:transform-none"
                />
              </div>
              <h3 className="flex w-full items-center justify-between pt-[15px] text-(length:--h5) leading-(--h5-lh) font-(--h5-weight) text-balance text-[#143275] min-[810px]:pt-[21px] min-[1240px]:tracking-[-.028em]">
                {item.title}
                <span className="self-start">
                  <span
                    role="presentation"
                    className="teaser-arrow inline-block size-8 min-h-8 rounded-full bg-[#3ece7b] bg-[position:100%_center] bg-no-repeat transition-[color,background-position,background-color] duration-200 ease-[cubic-bezier(.25,.1,.25,1)] [transition-delay:20ms] group-hover:bg-[#143275] group-hover:bg-[position:50%_center] group-focus-visible:bg-[#143275] group-focus-visible:bg-[position:50%_center] group-active:bg-[#3cae6b]"
                  />
                </span>
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
