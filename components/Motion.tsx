"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR =
  'main[data-motion] :is(h2, ul > li:not(nav li), ol > li:not(nav li), dl > div, [data-up], [data-wipe], [data-rule], [data-words])';

/**
 * Adds the .in class to marked elements as they scroll into view; the CSS does the animating.
 * Siblings get a short stagger. Elements added later (tab panels, filtered lists) are picked up too.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("rv-ready");
    if (reduced || typeof IntersectionObserver === "undefined") return;

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          const above = e.boundingClientRect.bottom < 0;
          if (!e.isIntersecting && !above) continue;
          io.unobserve(el);
          // stagger by position among the siblings that appear together
          const sibs = [...(el.parentElement?.children ?? [])].filter((c) => c.matches(SELECTOR));
          const idx = Math.min(sibs.indexOf(el), 6);
          if (!above && idx > 0 && !el.style.getPropertyValue("--d")) el.style.setProperty("--d", `${idx * 90}ms`);
          el.classList.add("in");
          window.setTimeout(() => el.style.removeProperty("--d"), 2200);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el) || el.classList.contains("in")) return;
        seen.add(el);
        // Anything already on screen is revealed straight away, without waiting for the observer
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight * 0.92) {
          requestAnimationFrame(() => el.classList.add("in"));
          window.setTimeout(() => el.style.removeProperty("--d"), 2200);
          return;
        }
        io.observe(el);
      });
    };
    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
