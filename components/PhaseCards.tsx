"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ui } from "@/components/PageIntro";
import { cn } from "@/lib/cn";

type Phase = { n?: string; title: string; steps?: string; text: string };
type Pic = { src: string; position: string };

/** One photograph per phase, shown inside the card when it is the active one. */
const IMAGES: Pic[] = [
  { src: "/assets/gallery/landmark/1.jpg", position: "center 40%" },
  { src: "/assets/gallery/explore/1.jpg", position: "center" },
  { src: "/assets/offerings-talent.jpg", position: "center 78%" },
];

/**
 * The three project phases as cards. The card you hover or focus opens onto a photograph set deep into it,
 * with the text floating above, and the "learn more" button slides to sit under that card.
 */
export function PhaseCards({ items, cta, images = IMAGES }: { items: Phase[]; cta?: { label: string; href: string }; images?: Pic[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [anchor, setAnchor] = useState(0);

  const choose = (i: number) => {
    setActive(i);
    setAnchor(i);
  };

  return (
    <div>
      <ol className={cn("mt-10 grid gap-8", items.length === 4 ? "min-[992px]:grid-cols-4 min-[992px]:gap-x-6" : "min-[992px]:grid-cols-3 min-[992px]:gap-x-10")} onMouseLeave={() => setActive(null)}>
        {items.map((p, i) => {
          const on = active === i;
          const img = images[i % images.length];
          return (
            <li
              key={p.title}
              tabIndex={0}
              onMouseEnter={() => choose(i)}
              onFocus={() => choose(i)}
              onBlur={() => setActive(null)}
              onClick={() => choose(i)}
              className="group relative cursor-default outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2356e5]"
            >
              {/* The list item keeps a fixed class (the scroll reveal marks it); everything that changes is inside */}
              <div
                className={cn(
                  "relative isolate h-full min-h-[236px] overflow-hidden border border-[#082b52]/10 bg-white p-8 transition-[translate,box-shadow] duration-500 ease-out motion-reduce:transition-none",
                  "shadow-[inset_0_1px_0_#fff,0_1px_1px_rgba(8,43,82,.08),0_5px_10px_rgba(8,43,82,.08),0_16px_30px_rgba(8,43,82,.12)]",
                  on && "-translate-y-1.5 shadow-[0_2px_2px_rgba(8,43,82,.14),0_12px_22px_rgba(8,43,82,.2),0_30px_56px_rgba(8,43,82,.3)]",
                )}
              >
              {/* The hollow: a photograph set back into the card, darkened toward its edges */}
              <span
                aria-hidden="true"
                className={cn("pointer-events-none absolute inset-2.5 -z-10 overflow-hidden transition-opacity duration-500 ease-out motion-reduce:transition-none", on ? "opacity-100" : "opacity-0")}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(max-width: 992px) 100vw, 33vw"
                  className={cn("object-cover transition-transform duration-[1400ms] ease-out motion-reduce:transition-none", on ? "scale-100" : "scale-[1.3]")}
                  style={{ objectPosition: img.position }}
                />
                <span className="absolute inset-0 bg-[#061a33]/55" />
                <span className="absolute inset-0 shadow-[inset_0_22px_40px_rgba(0,0,0,.7),inset_0_-18px_36px_rgba(0,0,0,.55),inset_18px_0_34px_rgba(0,0,0,.45),inset_-18px_0_34px_rgba(0,0,0,.45)]" />
              </span>

              <span aria-hidden="true" className={cn("block h-0.5 w-10 origin-left bg-gold transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none", on ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0")} />
              <div className={cn("transition-[translate] duration-500 ease-out motion-reduce:transition-none", on && "-translate-y-1")}>
                <h3
                  className={cn(
                    "mt-4 text-(length:--h5) leading-(--h5-lh) font-(--h5-weight) transition-[color,text-shadow] duration-500",
                    on ? "text-white [text-shadow:0_6px_22px_rgba(0,0,0,.7)]" : "text-[#082b52]",
                  )}
                >
                  {p.title}
                </h3>
                {p.steps && (
                  <p className={cn("mt-1 text-xs font-semibold tracking-[.15em] uppercase transition-colors duration-500", on ? "text-white/75" : "text-[#082b52]/60")}>
                    {p.steps}
                  </p>
                )}
                <p
                  className={cn(
                    "mt-3 text-[15px] leading-[1.6] transition-[color,text-shadow] duration-500",
                    on ? "text-white/95 [text-shadow:0_4px_16px_rgba(0,0,0,.65)]" : "text-[#082b52]/85",
                  )}
                >
                  {p.text}
                </p>
              </div>
              </div>
            </li>
          );
        })}
      </ol>

      {cta && (
        <>
      {/* Wide screens: the button follows the active card. Narrow screens: it sits under the cards. */}
      <div className="relative mt-10 hidden h-12 min-[992px]:block">
        <Link
          href={cta.href}
          style={{ left: `calc(${anchor} * (100% + 2.5rem) / 3)` }}
          className={cn(ui.btnGhost, "absolute top-0 transition-[left,background-size,color,border-color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none")}
        >
          {cta.label}
        </Link>
      </div>
      <Link href={cta.href} className={cn(ui.btnGhost, "mt-10 min-[992px]:hidden")}>
        {cta.label}
      </Link>
        </>
      )}
    </div>
  );
}
