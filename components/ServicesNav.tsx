"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; label: string };

/** Sticky in-page navigation: highlights the section in view and sits just under the fixed header. */
export function ServicesNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = document.querySelector("header");
    const setTop = () => {
      if (barRef.current && header) barRef.current.style.top = `${header.getBoundingClientRect().height - 1}px`;
    };
    setTop();
    const ro = header ? new ResizeObserver(setTop) : undefined;
    if (header) ro?.observe(header);

    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = "";
      for (const el of sections) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <div ref={barRef} className="sticky top-[104px] z-50 border-y border-[#143275]/10 bg-white/95 backdrop-blur">
      <nav
        aria-label="On this page"
        className="mx-auto flex w-full max-w-[1680px] items-center gap-1 overflow-x-auto px-4 [scrollbar-width:none] min-[768px]:px-[124px] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            aria-current={active === i.id ? "true" : undefined}
            className={cn(
              "inline-flex min-h-12 shrink-0 items-center px-3 text-[.75rem] leading-none font-medium tracking-[.08em] whitespace-nowrap text-[#143275] uppercase underline decoration-transparent decoration-2 underline-offset-[14px] transition-[text-decoration-color] duration-300 outline-none hover:decoration-gold focus-visible:decoration-gold",
              active === i.id && "decoration-gold",
            )}
          >
            {i.label}
          </a>
        ))}
        <Link
          href="/contact"
          className="my-2 ml-auto hidden shrink-0 items-center border border-[#143275] px-4 py-2 text-[.75rem] leading-none font-medium tracking-[.08em] text-[#143275] uppercase no-underline transition-colors duration-300 outline-none hover:bg-[#143275] hover:text-white focus-visible:bg-[#143275] focus-visible:text-white min-[1320px]:inline-flex"
        >
          Start a project
        </Link>
      </nav>
    </div>
  );
}
