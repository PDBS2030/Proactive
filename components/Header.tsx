"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLockup } from "@/components/BrandLockup";
import { NAV } from "@/lib/data";
import { cn } from "@/lib/cn";

const navLink =
  "inline-flex min-h-11 items-center px-3 py-2 text-[.8125rem] leading-[1.4286] font-medium tracking-[.08em] uppercase underline decoration-transparent decoration-2 underline-offset-8 outline-none transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold";

/**
 * One bar for every page, solid white as on Services. On the home page (`dark`) it begins clear over the dark hero, with
 * white links and the white logo, and turns to the white bar once the hero has gone past it.
 */
export function Header({ dark = false }: { dark?: boolean }) {
  const [over, setOver] = useState(dark);
  const solid = !over;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!dark) return;
    const onScroll = () => setOver(window.scrollY < window.innerHeight - 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [dark]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const lastFocused = useRef<Element | null>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus && lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => linksRef.current[0]?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const links = linksRef.current;
      const first = links[0];
      const last = links[links.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = (e: MediaQueryListEvent) => e.matches && close(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-60 border-b py-[29.5px] transition-[background-color,border-color] duration-350 ease-out md:py-[19.5px]",
          solid ? "border-foreground/6 bg-white" : "border-transparent bg-transparent",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -bottom-7 -z-10 bg-linear-to-b from-white/94 via-white/88 via-60% to-white/0 transition-opacity duration-350 ease-out",
            (solid || dark) && "opacity-0",
          )}
        />
        <div className="px-4 md:px-[124px]">
        <div className="mx-auto flex w-full max-w-[1680px] items-center">
          <Link href="/" aria-label="Proactive Design and Building Systems — home" className="flex min-h-11 min-w-11 items-center gap-3 focus-visible:outline-2 focus-visible:outline-navy/40">
            <BrandLockup light={over} className="w-[158px] md:w-[220px]" />
          </Link>

          <nav aria-label="Main" className="-mr-3 ml-auto hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={cn(navLink, "transition-colors duration-350", over ? "text-white" : "text-navy")}>
                {n.label}
              </Link>
            ))}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => {
              if (!open) lastFocused.current = document.activeElement;
              setOpen((v) => !v);
            }}
            className={cn("relative z-70 ml-auto inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center transition-colors duration-500 ease-out outline-none focus-visible:bg-foreground/5 md:hidden", over && !open ? "text-white" : "text-foreground")}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.4" />
                <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            ) : (
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
                <line x1="0" y1="2" x2="22" y2="2" stroke="currentColor" strokeWidth="1.4" />
                <line x1="0" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            )}
          </button>
        </div>
        </div>
      </header>

      <div
        id="main-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-55 bg-background transition-opacity duration-500 ease-out md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav aria-label="Main" className="mx-auto flex h-full max-w-7xl flex-col justify-center gap-5 px-6">
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              ref={(el) => {
                if (el) linksRef.current[i] = el;
              }}
              onClick={() => close(false)}
              className="block border-t border-border py-5 text-[clamp(2rem,8vw,3rem)] leading-[1.1] font-normal tracking-[-.03em] text-foreground transition-colors duration-500 ease-out outline-none hover:text-muted-foreground focus-visible:text-muted-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
