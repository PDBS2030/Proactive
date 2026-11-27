"use client";

import { useEffect, useRef, useState } from "react";
import { Icons } from "./icons";

const PAGES = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

/** The real site, live, in a small browser frame: what you change here shows up there after a refresh. */
export function HomePreview() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [path, setPath] = useState("/");
  const [stamp, setStamp] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / 1440);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="overflow-hidden border border-[#082b52]/20 bg-white shadow-[0_30px_60px_-36px_rgba(4,20,42,.7)]">
      <div className="flex items-center gap-3 border-b border-[#082b52]/15 bg-[#e6ecf5] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-[#a33a3a]/70" />
          <i className="size-2.5 rounded-full bg-gold/80" />
          <i className="size-2.5 rounded-full bg-[#3f7d5a]/70" />
        </span>
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {PAGES.map((p) => (
            <button
              key={p.path}
              type="button"
              onClick={() => setPath(p.path)}
              aria-pressed={path === p.path}
              className={`flex-none cursor-pointer px-2.5 py-1 text-[12px] font-medium transition-colors duration-200 ${path === p.path ? "bg-[#04142a] text-white" : "text-[#082b52]/70 hover:text-[#04142a]"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setStamp((s) => s + 1)} aria-label="Refresh the preview" className="flex cursor-pointer items-center gap-1.5 px-2 py-1 text-[12px] font-medium text-[#082b52]/70 hover:text-[#04142a]">
          {Icons.refresh}
          <span className="hidden min-[560px]:inline">Refresh</span>
        </button>
      </div>
      <div ref={box} className="relative w-full overflow-hidden bg-[#04142a]" style={{ height: 900 * scale }}>
        <iframe
          key={`${path}-${stamp}`}
          src={path}
          title="Live preview of the site"
          loading="lazy"
          tabIndex={-1}
          className="absolute top-0 left-0 origin-top-left border-0 bg-white"
          style={{ width: 1440, height: 900, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}
