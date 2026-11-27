import type { CSSProperties, ReactNode } from "react";

/** The dashboard's shared pieces, in the site's own navy and gold, on a faint drafting grid. */
export const input =
  "mt-1.5 block w-full min-h-11 border border-[#082b52]/20 bg-white px-3.5 py-2 text-[15px] leading-snug text-[#04142a] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#082b52]/40 hover:border-[#082b52]/45 focus:border-gold focus:shadow-[0_0_0_3px_rgba(181,143,72,.2)]";
export const label = "block text-[13px] font-semibold tracking-[.02em] text-[#082b52]";
export const primary =
  "group/btn relative isolate inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 overflow-hidden border border-[#04142a] bg-[#04142a] px-6 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline transition-[color,border-color] duration-300 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-gold before:transition-transform before:duration-300 hover:border-gold hover:text-[#04142a] hover:before:scale-x-100 motion-reduce:before:transition-none";
export const ghost =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-[#082b52]/30 bg-white/60 px-6 text-[.8125rem] font-medium tracking-[.08em] text-[#082b52] uppercase no-underline backdrop-blur transition-colors duration-200 hover:border-[#04142a] hover:bg-[#04142a] hover:text-white";
export const danger =
  "inline-flex min-h-9 cursor-pointer items-center justify-center gap-1.5 border border-[#a33a3a]/40 bg-white/70 px-3.5 text-[.75rem] font-medium tracking-[.08em] text-[#a33a3a] uppercase transition-colors duration-200 hover:bg-[#a33a3a] hover:text-white";

/** The drafting-paper grid used behind pages and panels. */
export const grid = (tone: "light" | "dark" = "light"): CSSProperties => {
  const line = tone === "dark" ? "rgba(255,255,255,.055)" : "rgba(8,43,82,.055)";
  return {
    backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
    backgroundSize: "32px 32px",
  };
};

export function Page({ title, eyebrow, lead, action, children }: { title: string; eyebrow?: string; lead?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pt-8 pb-16 min-[900px]:px-10">
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-[#082b52]/15 pb-6">
        <div>
          {eyebrow && <p className="text-[12px] font-semibold tracking-[.2em] text-gold uppercase">{eyebrow}</p>}
          <h1 className="mt-1 font-jost text-[38px] leading-[1.05] font-normal tracking-[-.01em] text-[#04142a] min-[900px]:text-[46px]">{title}</h1>
          {lead && <p className="mt-3 max-w-[62ch] font-mulish text-[16px] leading-[1.6] text-[#082b52]/75">{lead}</p>}
        </div>
        {action}
      </header>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function Notice({ tone = "good", children }: { tone?: "good" | "bad"; children: ReactNode }) {
  return (
    <p
      role="status"
      className={`mb-6 flex items-center gap-3 border-l-4 px-4 py-3 text-[15px] ${tone === "good" ? "border-gold bg-gold/10 text-[#04142a]" : "border-[#a33a3a] bg-[#a33a3a]/10 text-[#7a2626]"}`}
    >
      {children}
    </p>
  );
}

export function Field({ id, name, children, className = "" }: { id: string; name: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={label}>
        {name}
      </label>
      {children}
    </div>
  );
}

/** A framed panel with a small gold heading. */
export function Panel({ title, note, children, className = "" }: { title: string; note?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`border border-[#082b52]/12 bg-white/85 p-5 shadow-[0_18px_34px_-28px_rgba(4,20,42,.55)] backdrop-blur min-[700px]:p-6 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[12px] font-semibold tracking-[.2em] text-[#082b52] uppercase">{title}</h2>
        {note && <p className="text-[12px] text-[#082b52]/55">{note}</p>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
