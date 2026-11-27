"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { deleteProject, toggleFeatured } from "./actions";
import { Icons } from "./icons";

type Card = { id: string; title: string; place: string; sector: string; service: string; year: number; image: string; tab: string };

/** The portfolio as a wall of photographs: search and filter, hover for the actions, and a star on each to make it the one featured property of its category on the home page gallery. */
export function ProjectGrid({ projects, featured }: { projects: Card[]; featured: Record<string, string> }) {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState("All");
  const [service, setService] = useState("All");
  const [map, setMap] = useState(featured);
  const [, start] = useTransition();

  const sectors = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.sector)))], [projects]);
  const services = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.service)))], [projects]);
  const shown = projects.filter(
    (p) =>
      (sector === "All" || p.sector === sector) &&
      (service === "All" || p.service === service) &&
      `${p.title} ${p.place}`.toLowerCase().includes(q.trim().toLowerCase()),
  );

  // the star: this project takes its category's featured slot (the one there lets go), or gives it up. The screen answers at once, the save follows.
  const toggle = (id: string, tab: string) => {
    setMap((m) => {
      const next = { ...m };
      if (next[tab] === id) delete next[tab];
      else next[tab] = id;
      return next;
    });
    start(() => {
      void toggleFeatured(id);
    });
  };

  const chip = (on: boolean) =>
    `cursor-pointer border px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${on ? "border-[#04142a] bg-[#04142a] text-white" : "border-[#082b52]/20 bg-white/70 text-[#082b52] hover:border-[#04142a]"}`;

  return (
    <div>
      <div className="grid gap-4 border border-[#082b52]/12 bg-white/70 p-4 backdrop-blur">
        <label className="flex items-center gap-3 border border-[#082b52]/20 bg-white px-3.5 focus-within:border-gold focus-within:shadow-[0_0_0_3px_rgba(181,143,72,.2)]">
          <span className="text-[#082b52]/55">{Icons.search}</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or place" aria-label="Search projects" className="min-h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-[#082b52]/40" />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          {sectors.map((s) => (
            <button key={s} type="button" aria-pressed={sector === s} onClick={() => setSector(s)} className={chip(sector === s)}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by service">
          {services.map((s) => (
            <button key={s} type="button" aria-pressed={service === s} onClick={() => setService(s)} className={chip(service === s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-[14px] text-[#082b52]/65" aria-live="polite">
        Showing {shown.length} of {projects.length}
      </p>

      <ul className="mt-3 grid gap-5 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-3">
        {shown.map((p) => {
          const isFeatured = map[p.tab] === p.id;
          const current = map[p.tab] && !isFeatured ? projects.find((x) => x.id === map[p.tab])?.title : "";
          return (
            <li key={p.id} className="group relative aspect-[4/3] overflow-hidden bg-[#04142a] shadow-[0_22px_38px_-28px_rgba(4,20,42,.7)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transition-none" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#04142a] via-[#04142a]/25 to-transparent" />
              <span className="absolute top-3 left-3 bg-[#04142a]/80 px-2.5 py-1 text-[11px] font-semibold tracking-[.12em] text-white uppercase backdrop-blur">{p.sector}</span>

              {/* the star: each category has one featured property, so this takes the place of the current one */}
              <button
                type="button"
                aria-pressed={isFeatured}
                title={isFeatured ? `The featured property of ${p.sector}. Click to give it up.` : current ? `Make this the featured ${p.sector} property (replaces ${current})` : `Make this the featured ${p.sector} property`}
                onClick={() => toggle(p.id, p.tab)}
                className={`absolute top-3 right-3 z-10 flex min-h-8 cursor-pointer items-center gap-1.5 px-2.5 text-[11px] font-semibold tracking-[.1em] uppercase transition-colors duration-200 ${
                  isFeatured ? "bg-gold text-[#04142a] hover:bg-white" : "bg-[#04142a]/80 text-white backdrop-blur hover:bg-gold hover:text-[#04142a]"
                }`}
              >
                <span className={isFeatured ? "" : "text-gold"}>{Icons.featured}</span>
                {isFeatured ? "Featured" : "Feature"}
              </button>

              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-jost text-[22px] leading-tight">{p.title}</p>
                <p className="mt-0.5 text-[13px] text-white/75">
                  {p.place} · {p.service} · {p.year}
                </p>
              </div>
              {/* the actions slide up on hover or focus */}
              <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-2 bg-[#04142a] p-3 transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0 motion-reduce:transition-none">
                <Link href={`/admin/projects/${p.id}`} className="flex min-h-9 flex-1 items-center justify-center gap-1.5 bg-gold px-3 text-[.75rem] font-semibold tracking-[.08em] text-[#04142a] uppercase no-underline">
                  {Icons.edit}
                  Edit
                </Link>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <button type="submit" className="flex min-h-9 cursor-pointer items-center gap-1.5 border border-white/30 px-3 text-[.75rem] font-semibold tracking-[.08em] text-white uppercase hover:border-[#e07a7a] hover:text-[#e07a7a]">
                    {Icons.trash}
                    Delete
                  </button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
      {shown.length === 0 && <p className="mt-6 border border-[#082b52]/12 bg-white/70 p-6 text-[15px]">No project matches. Try a different word or clear a filter.</p>}
    </div>
  );
}
