"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { OFFERINGS } from "@/lib/data";
import { cn } from "@/lib/cn";

/** Core offerings: four equal cards at rest. The card you hover or focus grows wider and taller while the others narrow. */
export function Offerings() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="offerings-vars relative z-4 bg-white px-4 py-16 text-[#143275] min-[768px]:px-[124px] min-[768px]:py-[110px]">
      <div className="mx-auto grid w-full max-w-[1680px] grid-cols-12 gap-x-(--gap)">
        <h2 className="col-span-12 mb-4 font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase text-[#143275] [text-wrap:initial] min-[810px]:col-span-8 min-[1440px]:mb-[52px]">
          {OFFERINGS.heading}
        </h2>

        {/* The outer box is the size reference for the cqw units used by the row inside it */}
        <div className="col-span-12 w-full min-[810px]:[container-type:inline-size]">
        <div
          onMouseLeave={() => setActive(null)}
          className="flex w-full flex-col gap-y-9 min-[810px]:h-[calc((100cqw-36px)/3+96px)] min-[810px]:flex-row min-[810px]:items-start min-[810px]:gap-x-3 min-[810px]:gap-y-0"
        >
          {OFFERINGS.items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={cn(
                "group block aspect-[3/2] min-w-0 text-inherit no-underline outline-offset-[3px] focus-visible:outline-2 focus-visible:outline-[#2356e5]",
                "min-[810px]:aspect-auto min-[810px]:basis-0 min-[810px]:transition-[flex-grow] min-[810px]:duration-500 min-[810px]:ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
                active === i ? "min-[810px]:grow-[1.9]" : "min-[810px]:grow",
              )}
            >
              <div
                className={cn(
                  "relative aspect-[3/2] w-full overflow-hidden min-[810px]:aspect-auto min-[810px]:transition-[height] min-[810px]:duration-500 min-[810px]:ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
                  active === i ? "min-[810px]:h-[calc((100cqw-36px)/3)]" : "min-[810px]:h-[calc((100cqw-36px)/4)]",
                )}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 810px) 100vw, 40vw"
                  className="object-cover object-[center_top] transition-transform duration-500 min-[810px]:group-hover:scale-105 min-[810px]:group-focus-visible:scale-105 motion-reduce:transform-none"
                />
              </div>
              <h3 className="flex w-full items-center justify-between gap-3 pt-[15px] text-(length:--h5) leading-(--h5-lh) font-(--h5-weight) text-balance text-[#143275] min-[810px]:pt-[21px] min-[1240px]:tracking-[-.028em]">
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
      </div>
    </section>
  );
}
