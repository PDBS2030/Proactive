"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { NAV } from "@/lib/data";
import { cn } from "@/lib/cn";

const navLink =
  "inline-flex min-h-11 items-center px-3 py-2 text-[.8125rem] leading-[1.4286] font-medium tracking-[.08em] text-navy uppercase underline decoration-transparent decoration-2 underline-offset-8 outline-none transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const lastFocused = useRef<Element | null>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

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
          "fixed inset-x-0 top-0 z-60 border-b py-[calc(1rem+20px)] transition-[background-color,border-color] duration-350 ease-out md:py-[calc(.5rem+20px)]",
          scrolled ? "border-foreground/6 bg-white" : "border-transparent bg-transparent",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -bottom-7 -z-10 bg-linear-to-b from-white/94 via-white/88 via-60% to-white/0 transition-opacity duration-350 ease-out",
            scrolled && "opacity-0",
          )}
        />
        <div className="flex items-center px-4 md:px-[calc(1.5rem+100px)]">
          <Link href="/" aria-label="PROACTIVE — home" className="flex min-h-11 min-w-11 items-center gap-3 focus-visible:outline-2 focus-visible:outline-navy/40">
            <BrandMark className="h-[34px] md:h-[46px]" />
            <span className="inline-grid justify-items-start gap-y-[3px]">
              <span className="font-montserrat text-[22px] leading-none font-extrabold tracking-[-.01em] text-navy md:text-[30px]">
                PROACTIVE
              </span>
              <span className="w-0 min-w-full text-[5.4px] leading-[1.2] font-medium tracking-[.12em] whitespace-nowrap text-[#1c232c] [text-align-last:justify] [text-align:justify] font-montserrat md:text-[7.4px]">
                DESIGN AND BUILDING SYSTEMS, INC.
              </span>
              <span className="block h-0.5 w-full bg-gold" />
            </span>
          </Link>

          <nav aria-label="Main" className="-mr-3 ml-auto hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={navLink}>
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
            className="relative z-70 ml-auto inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-foreground transition-colors duration-500 ease-out outline-none focus-visible:bg-foreground/5 md:hidden"
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
