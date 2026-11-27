"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";

const NAV = [
  { href: "/admin", label: "Overview", icon: Icons.overview },
  { href: "/admin/projects", label: "Projects", icon: Icons.projects },
  { href: "/admin/featured", label: "Featured property", icon: Icons.featured },
  { href: "/admin/news", label: "News & events", icon: Icons.news },
  { href: "/admin/videos", label: "Videos", icon: Icons.videos },
  { href: "/admin/messages", label: "Messages", icon: Icons.messages },
];

/** The sidebar links: the screen you are on carries a gold edge and a soft glow. */
export function Nav({ unread }: { unread: number }) {
  const path = usePathname();
  return (
    <nav aria-label="Admin" className="flex flex-wrap gap-1 min-[900px]:flex-col">
      {NAV.map((n) => {
        const on = n.href === "/admin" ? path === "/admin" : path.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={on ? "page" : undefined}
            className={`relative flex min-h-11 items-center gap-3 px-4 text-[15px] no-underline transition-colors duration-200 ${
              on ? "bg-gradient-to-r from-gold/20 to-transparent text-white" : "text-white/65 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-0.5 bg-gold transition-transform duration-300 ${on ? "scale-y-100" : "scale-y-0"}`} />
            <span className={on ? "text-gold" : ""}>{n.icon}</span>
            <span className="flex-1">{n.label}</span>
            {n.href === "/admin/messages" && unread > 0 && (
              <span className="inline-grid min-w-6 place-items-center rounded-full bg-gold px-1.5 text-xs font-semibold text-[#04142a]">{unread}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
