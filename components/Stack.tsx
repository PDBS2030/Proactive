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
export function goToSection(e: React.MouseEvent, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const stack = el.closest<HTMLElement>("[data-stack]");
  let y: number;
  if (stack?.parentElement) {
    let before = 0;
    for (const child of Array.from(stack.parentElement.children)) {
      if (child === stack) break;
      before += (child as HTMLElement).offsetHeight;
    }
    y = stack.parentElement.getBoundingClientRect().top + window.scrollY + before - reservedTop();
  } else {
    y = el.getBoundingClientRect().top + window.scrollY - reservedTop();
  }
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}
