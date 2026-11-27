"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icons } from "./icons";

const COMMANDS = [
  { label: "Go to Overview", hint: "G O", href: "/admin", icon: Icons.overview },
  { label: "Go to Projects", hint: "G P", href: "/admin/projects", icon: Icons.projects },
  { label: "Add a project", hint: "N P", href: "/admin/projects/new", icon: Icons.plus },
  { label: "Go to Featured property", hint: "G F", href: "/admin/featured", icon: Icons.featured },
  { label: "Go to News & events", hint: "G N", href: "/admin/news", icon: Icons.news },
  { label: "Add news or an event", hint: "N N", href: "/admin/news/new", icon: Icons.plus },
  { label: "Go to Videos", hint: "G V", href: "/admin/videos", icon: Icons.videos },
  { label: "Add a video", hint: "N V", href: "/admin/videos/new", icon: Icons.plus },
  { label: "Open the Messages inbox", hint: "G M", href: "/admin/messages", icon: Icons.messages },
  { label: "View the live site", hint: "", href: "/", icon: Icons.external, external: true },
];

/** Press Ctrl or Cmd + K anywhere in the dashboard to jump to a screen or start something new. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const field = useRef<HTMLInputElement>(null);

  const shown = useMemo(() => COMMANDS.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase())), [query]);

  useEffect(() => {
    // two-key shortcuts, as the hints say: G then a letter to go somewhere, N then a letter to add something
    let lead = "";
    let leadAt = 0;
    const SHORT: Record<string, string> = {
      go: "/admin",
      gp: "/admin/projects",
      gf: "/admin/featured",
      gn: "/admin/news",
      gm: "/admin/messages",
      gv: "/admin/videos",
      nv: "/admin/videos/new",
      np: "/admin/projects/new",
      nn: "/admin/news/new",
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = !!t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable);
      if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.length === 1) {
        const k = e.key.toLowerCase();
        if ((k === "g" || k === "n") && !lead) {
          lead = k;
          leadAt = Date.now();
          return;
        }
        if (lead && Date.now() - leadAt < 900 && SHORT[lead + k]) {
          e.preventDefault();
          router.push(SHORT[lead + k]);
        }
        lead = "";
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setActive(0);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => {
      setOpen(true);
      setQuery("");
      setActive(0);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("admin:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("admin:palette", onOpen);
    };
  }, [router]);

  useEffect(() => {
    if (open) field.current?.focus();
  }, [open]);

  const go = (i: number) => {
    const c = shown[i];
    if (!c) return;
    setOpen(false);
    if (c.external) window.open(c.href, "_blank");
    else router.push(c.href);
  };

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Quick jump" className="fixed inset-0 z-50 grid place-items-start justify-items-center bg-[#04142a]/60 px-4 pt-[14vh] backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
      <div className="w-full max-w-[560px] overflow-hidden border border-gold/60 bg-[#071a33] text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <span className="text-gold">{Icons.search}</span>
          <input
            ref={field}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(shown.length - 1, a + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === "Enter") go(active);
            }}
            placeholder="Jump to a screen, or start something new"
            className="h-14 w-full bg-transparent text-[16px] outline-none placeholder:text-white/40"
          />
          <kbd className="border border-white/20 px-1.5 py-0.5 text-[11px] text-white/60">Esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-auto py-2">
          {shown.map((c, i) => (
            <li key={c.label}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(i)}
                className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-[15px] ${i === active ? "bg-gold/15 text-white" : "text-white/75"}`}
              >
                <span className={i === active ? "text-gold" : "text-white/50"}>{c.icon}</span>
                <span className="flex-1">{c.label}</span>
                {c.hint && <span className="text-[11px] tracking-[.14em] text-white/40">{c.hint}</span>}
              </button>
            </li>
          ))}
          {shown.length === 0 && <li className="px-4 py-6 text-[15px] text-white/55">Nothing matches that.</li>}
        </ul>
      </div>
    </div>
  );
}

/** The button in the top bar that opens the palette. */
export function PaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("admin:palette"))}
      className="flex min-h-10 cursor-pointer items-center gap-3 border border-[#082b52]/20 bg-white/70 px-3.5 text-[14px] text-[#082b52]/70 backdrop-blur transition-colors duration-200 hover:border-[#04142a] hover:text-[#04142a]"
    >
      {Icons.search}
      <span className="hidden min-[560px]:inline">Quick jump</span>
      <kbd className="hidden border border-[#082b52]/25 px-1.5 py-0.5 text-[11px] min-[560px]:inline">Ctrl K</kbd>
    </button>
  );
}
