"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { FOOTER } from "@/lib/data";
import { cn } from "@/lib/cn";

const icon = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

const PhoneIcon = (
  <svg {...icon}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
const MailIcon = (
  <svg {...icon}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const BuildingIcon = (
  <svg {...icon}>
    <path d="M4 21V9l6-4v16M10 21V3l6 3v15M16 21V11l5 3v7M3 21h18" />
  </svg>
);
const ShareIcon = (
  <svg {...icon}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3.3-3.3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0L5 13.3A4 4 0 0 0 10.7 19l1-1" />
  </svg>
);

const item =
  "flex min-h-16 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 bg-transparent text-[11px] font-medium tracking-[.14em] text-white/85 uppercase no-underline outline-none transition-colors duration-200 active:text-gold focus-visible:text-gold";

/**
 * On phones: a bar fixed to the foot of every public page with the four things a visitor on a phone wants first,
 * call, write, look at the work, and pass the link on. It is not shown on tablets and larger screens or in the dashboard.
 */
export function MobileBar() {
  const path = usePathname();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  if (path.startsWith("/admin")) return null;

  async function share() {
    const data = { title: document.title, url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the visitor closed the share sheet */
    }
  }

  return (
    <>
      {/* keeps the last lines of the page, and the footer, clear of the bar */}
      <div aria-hidden="true" className="h-16 bg-[#04142a] min-[768px]:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
      <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-[#04142a]/96 backdrop-blur-md min-[768px]:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="mx-auto flex max-w-[520px]">
          <a href={FOOTER.phone.href} className={item}>
            {PhoneIcon}
            Call
          </a>
          <Link href="/contact" className={cn(item, path === "/contact" && "text-gold")}>
            {MailIcon}
            Contact
          </Link>
          <Link href="/projects" className={cn(item, path.startsWith("/projects") && "text-gold")}>
            {BuildingIcon}
            Projects
          </Link>
          <button type="button" onClick={share} className={item} aria-live="polite">
            {ShareIcon}
            {copied ? "Copied" : "Share"}
          </button>
        </div>
      </nav>
    </>
  );
}
