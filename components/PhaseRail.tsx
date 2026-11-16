"use client";

import { useEffect, useState } from "react";
import { goToSection } from "@/components/Stack";
import { cn } from "@/lib/cn";

/** A rail at the right edge that shows which phase is on screen. It appears only while the phases are. */
export function PhaseRail({ items, endId }: { items: { id: string; label: string }[]; endId: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let found: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) found = it.id;
      }
      // the next section slides over the last phase, which stays pinned behind it
      const end = document.getElementById(endId)?.getBoundingClientRect().top;
      setActive(end !== undefined && end <= mid ? null : found);
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items, endId]);

  return (
    <nav
      aria-label="Phases"
      className={cn(
        "fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 transition-opacity duration-300 min-[992px]:block",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ul className="grid gap-5">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => goToSection(e, it.id)}
                aria-current={on ? "true" : undefined}
                className="group flex items-center justify-end gap-3 text-[#143275] no-underline outline-none"
              >
                <span
                  className={cn(
                    "bg-white px-2 py-1 text-xs font-semibold tracking-[.12em] uppercase shadow-[0_4px_14px_rgba(8,43,82,.2)] transition-[opacity,translate] duration-300",
                    on ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                  )}
                >
                  {it.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn("block size-3 border-2 border-gold shadow-[0_0_0_2px_#fff] transition-colors duration-300", on ? "bg-gold" : "bg-white")}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
