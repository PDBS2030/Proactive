import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { logout } from "../actions";
import { CommandPalette, PaletteButton } from "../CommandPalette";
import { Icons } from "../icons";
import { Nav } from "../Nav";
import { grid } from "../ui";
import { BrandLockup } from "@/components/BrandLockup";
import { isAdmin } from "@/lib/admin-auth";
import { readDb } from "@/lib/db";

async function Gate({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const unread = readDb().messages.filter((m) => !m.handled).length;
  return (
    <div className="min-[900px]:grid min-[900px]:min-h-screen min-[900px]:grid-cols-[272px_1fr]">
      <aside className="relative isolate flex flex-col gap-8 overflow-hidden bg-[#04142a] px-3 py-8 text-white min-[900px]:sticky min-[900px]:top-0 min-[900px]:h-screen">
        {/* drafting grid and a glow from the foot, as on the home page */}
        <span aria-hidden="true" className="absolute inset-0 -z-10" style={grid("dark")} />
        <span aria-hidden="true" className="absolute -right-24 -bottom-24 -z-10 size-[420px] rounded-full bg-[#2356e5]/30 blur-[110px]" />
        <span aria-hidden="true" className="absolute -bottom-10 -left-20 -z-10 size-[260px] rounded-full bg-gold/25 blur-[100px]" />

        <div className="px-3">
          <BrandLockup light className="w-[190px]" />
          <p className="mt-4 text-[11px] font-semibold tracking-[.24em] text-gold uppercase">Admin</p>
        </div>

        <Nav unread={unread} />

        <div className="mt-auto grid gap-4 px-3">
          <p className="flex items-center gap-2.5 border border-white/12 bg-white/5 px-3 py-2.5 text-[12px] leading-snug text-white/75 backdrop-blur">
            <span className="relative flex size-2.5 flex-none">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-gold" />
            </span>
            Local mode: saved on this computer, not on the live site.
          </p>
          <form action={logout}>
            <button type="submit" className="flex cursor-pointer items-center gap-2 text-sm text-white/65 transition-colors duration-200 hover:text-gold">
              {Icons.out}
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="relative min-w-0 bg-[#eef2f8]" style={grid("light")}>
        <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[#082b52]/10 bg-[#eef2f8]/85 px-5 py-3 backdrop-blur min-[900px]:px-10">
          <p className="hidden text-[13px] text-[#082b52]/60 min-[640px]:block">Proactive Design and Building Systems</p>
          <div className="ml-auto flex items-center gap-3">
            <PaletteButton />
            <Link href="/" target="_blank" className="flex min-h-10 items-center gap-2 border border-[#082b52]/20 bg-white/70 px-3.5 text-[14px] text-[#082b52] no-underline backdrop-blur transition-colors duration-200 hover:border-[#04142a] hover:bg-[#04142a] hover:text-white">
              View site
              {Icons.external}
            </Link>
          </div>
        </div>
        <main id="main-content">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p className="p-10 text-sm text-[#082b52]/70">Loading…</p>}>
      <Gate>{children}</Gate>
    </Suspense>
  );
}
