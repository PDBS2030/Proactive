"use client";

import { useEffect, useRef } from "react";

/** Space taken by the fixed nav bar and, once it is pinned, the section menu under it. */
function reservedTop() {
  const header = document.querySelector("header")?.getBoundingClientRect().height ?? 104;
  const bar = document.querySelector("[data-section-bar]")?.getBoundingClientRect().height ?? 0;
  return Math.round(header + bar);
}

/**
 * A section that stays in place once it is fully on screen while the next one slides over it.
 * A section taller than the window is pinned by its bottom edge, so all of it can still be read.
 */
export function StackSection({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      el.style.top = `${Math.min(reservedTop(), window.innerHeight - el.offsetHeight)}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-stack
      style={{ position: "sticky", zIndex: index + 1 }}
      className="bg-white shadow-[0_-28px_48px_-30px_rgba(8,43,82,.4)]"
    >
      {children}
    </div>
  );
}

/**
 * Scrolls to a section by its natural place in the page. A plain #link would do nothing for a section
 * that is already pinned behind a later one, because the browser sees it as already on screen.
 */
function sectionTop(id: string) {
  const el = document.getElementById(id);
  if (!el) return null;
  const stack = el.closest<HTMLElement>("[data-stack]");
  if (stack?.parentElement) {
    let before = 0;
    for (const child of Array.from(stack.parentElement.children)) {
      if (child === stack) break;
      before += (child as HTMLElement).offsetHeight;
    }
    return stack.parentElement.getBoundingClientRect().top + window.scrollY + before - reservedTop();
  }
  return el.getBoundingClientRect().top + window.scrollY - reservedTop();
}

export function goToSection(e: React.MouseEvent, id: string) {
  const y = sectionTop(id);
  if (y === null) return;
  e.preventDefault();
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

/**
 * Opens the page at the section named in the address, e.g. /services#design-build, using the same place the
 * section menu scrolls to, because the browser's own jump lands badly on pinned, overlapping sections.
 */
export function HashScroll() {
  useEffect(() => {
    const timers: number[] = [];
    const run = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      // wait for the sections to set their pinned positions, and once more for images to settle
      const go = () => {
        const y = sectionTop(id);
        if (y !== null) window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
      };
      timers.push(window.setTimeout(go, 150), window.setTimeout(go, 700));
    };
    run();
    window.addEventListener("hashchange", run);
    return () => {
      window.removeEventListener("hashchange", run);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);
  return null;
}
