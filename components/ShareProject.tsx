"use client";

import { useRef, useState } from "react";

const icon = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

const button =
  "inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-full border border-white/25 bg-transparent text-white no-underline outline-none transition-colors duration-200 hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold";

/**
 * Share this project on Facebook, LinkedIn or Instagram. Facebook and LinkedIn open their own share windows with the
 * project's address. Instagram has no web share link, so a phone opens its share sheet (Instagram is in it) and a
 * computer copies the link, ready to paste into a post or story.
 */
export function ShareProject({ url, title }: { url: string; title: string }) {
  const [note, setNote] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const encoded = encodeURIComponent(url);

  const say = (text: string) => {
    setNote(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNote(""), 3500);
  };

  async function instagram() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      say("Link copied. Paste it into your Instagram post or story.");
    } catch {
      /* the visitor closed the share sheet */
    }
  }

  return (
    <div className="mt-10 min-[992px]:absolute min-[992px]:top-1/2 min-[992px]:right-0 min-[992px]:z-20 min-[992px]:mt-0 min-[992px]:-translate-y-1/2 min-[992px]:rounded-l-2xl min-[992px]:bg-[#04142a]/85 min-[992px]:px-3 min-[992px]:py-5 min-[992px]:shadow-[0_18px_40px_-12px_rgba(0,0,0,.55)] min-[992px]:backdrop-blur-md">
      <p className="text-xs leading-4 font-semibold tracking-[.15em] text-white/70 uppercase min-[992px]:text-center min-[992px]:[writing-mode:vertical-rl] min-[992px]:mx-auto min-[992px]:rotate-180">Share this project</p>
      <span aria-hidden="true" className="mx-auto mt-4 hidden h-px w-6 bg-white/25 min-[992px]:block" />
      <div className="mt-4 flex gap-3 min-[992px]:flex-col min-[992px]:gap-2.5">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" title="Share on Facebook" className={button}>
          <svg {...icon}>
            <path d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V3h-2.5A3.5 3.5 0 0 0 11 6.5v2H8.5V11H11v10h3V11h2.5l.5-2.5H14Z" />
          </svg>
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" title="Share on LinkedIn" className={button}>
          <svg {...icon}>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-1.7 1-3 2.75-3S17.5 11.8 17.5 13.5V17" />
          </svg>
        </a>
        <button type="button" onClick={instagram} aria-label="Share on Instagram" title="Share on Instagram" className={button}>
          <svg {...icon}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
          </svg>
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-[14px] leading-5 text-gold min-[992px]:absolute min-[992px]:top-1/2 min-[992px]:right-full min-[992px]:mt-0 min-[992px]:mr-3 min-[992px]:w-56 min-[992px]:-translate-y-1/2 min-[992px]:rounded-md min-[992px]:bg-[#04142a]/90 min-[992px]:px-3 min-[992px]:py-2 min-[992px]:empty:hidden">
        {note}
      </p>
    </div>
  );
}
