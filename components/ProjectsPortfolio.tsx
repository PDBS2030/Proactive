"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { SERVICE_LINE, SERVICE_SLUGS, projectPlace, projectSlug, type Project, type Region } from "@/lib/pages";
import { cn } from "@/lib/cn";
import { HERO_H1 } from "@/lib/heroType";
import { ui } from "@/components/PageIntro";

const PAGE = 24;

/** How many cards stand in a row at this width, as the grid used to decide with its breakpoints. */
const BREAKPOINTS: [string, number][] = [
  ["(min-width: 1100px)", 4],
  ["(min-width: 768px)", 3],
  ["(min-width: 520px)", 2],
];
const subscribeColumns = (notify: () => void) => {
  const lists = BREAKPOINTS.map(([q]) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", notify));
  return () => lists.forEach((l) => l.removeEventListener("change", notify));
};
const columnsNow = () => BREAKPOINTS.find(([q]) => window.matchMedia(q).matches)?.[1] ?? 1;
const useColumns = () => useSyncExternalStore(subscribeColumns, columnsNow, () => 4);
const REGIONS: Region[] = ["Maryland", "DC"];
const slugify = (v: string) => v.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type Group = { heading?: string; options: string[] };
type Sort = "Date" | "Featured" | "Name";

/** Every control on the bar: the same outline, height and capital letters */
const control =
  "h-[41px] w-full rounded-md border border-[#c7c8ca] bg-white px-3 text-[.8125rem] leading-[1.4] font-medium tracking-[.08em] text-[#082b52] uppercase outline-none transition-colors duration-200 hover:border-[#082b52]/50 focus-visible:border-[#082b52] focus-visible:ring-2 focus-visible:ring-[#2356e5]/35";

const chevron = (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
    <path d="m1 1 5 5 5-5" />
  </svg>
);

/** A filter that opens a panel of check boxes, as on the reference: several values can be ticked at once. */
function MultiFilter({
  name,
  groups,
  value,
  onChange,
  open,
  onToggle,
}: {
  name: string;
  groups: Group[];
  value: string[];
  onChange: (v: string[]) => void;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative w-full md:max-w-[250px]">
      <button type="button" onClick={onToggle} aria-expanded={open} aria-haspopup="true" className={cn(control, "relative cursor-pointer pr-9 text-left")}>
        {name}
        {value.length > 0 && <span className="ml-1.5 text-[#082b52]/60">({value.length})</span>}
        {chevron}
      </button>
      {open && (
        <div className="absolute top-full left-0 z-30 mt-1 max-h-[min(60vh,420px)] w-full min-w-[250px] overflow-y-auto rounded-md border border-[#c7c8ca] bg-white py-2 shadow-[0_18px_40px_-18px_rgba(8,43,82,.4)]">
          {groups.map((g, gi) => (
            <div key={g.heading ?? gi} className={cn(gi > 0 && "mt-1 border-t border-[#c7c8ca]/70 pt-1")}>
              {g.heading && <p className="px-4 pt-2 pb-1 text-xs font-semibold tracking-[.15em] text-gold uppercase">{g.heading}</p>}
              {g.options.map((o) => {
                const on = value.includes(o);
                return (
                  <label key={o} className="flex cursor-pointer items-start gap-3 px-4 py-1.5 text-[15px] leading-snug text-[#082b52] hover:bg-[#f3f6fa]">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])}
                      className="mt-[3px] size-4 shrink-0 cursor-pointer rounded-sm border border-[#c7c8ca] accent-[#082b52]"
                    />
                    {o}
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** The grid is round-robin through the sectors for "Featured", so no one kind of project runs on for a whole row */
function featured(list: Project[]) {
  const by = new Map<string, Project[]>();
  for (const p of list) by.set(p.sector, [...(by.get(p.sector) ?? []), p]);
  const queues = [...by.values()];
  const out: Project[] = [];
  for (let i = 0; queues.some((q) => i < q.length); i++) for (const q of queues) if (q[i]) out.push(q[i]);
  return out;
}

/**
 * The portfolio, laid out like the reference builder's project index: a centered title, a bar of filters that
 * stays under the header, the number of results, a grid of portrait cards with the name over the foot of each
 * picture, a Load more button and a closing note.
 */
export function ProjectsPortfolio({ projects }: { projects: Project[] }) {
  const [types, setTypes] = useState<string[]>([]);
  const [places, setPlaces] = useState<string[]>([]);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("Date");
  const [count, setCount] = useState(PAGE);
  const [open, setOpen] = useState<"type" | "place" | "exp" | null>(null);
  const [mobile, setMobile] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  const typeOptions = useMemo(() => [...new Set(projects.map((p) => p.sector))].sort(), [projects]);
  const expOptions = useMemo(() => [...new Set(projects.map((p) => p.service))].sort(), [projects]);
  const placeGroups = useMemo<Group[]>(
    () =>
      REGIONS.map((r) => ({
        heading: r === "DC" ? "Washington, D.C." : r,
        options: [...new Set(projects.filter((p) => p.region === r).map((p) => p.city))].sort(),
      })).filter((g) => g.options.length),
    [projects],
  );

  // Open with the filters named in the address, e.g. /projects?service=design-build, and keep it in step
  const ready = useRef(false);
  useEffect(() => {
    const t = window.setTimeout(() => {
      const q = new URLSearchParams(window.location.search);
      const svc = SERVICE_SLUGS[q.get("service") ?? ""];
      if (svc) setExpertise([svc]);
      const sec = typeOptions.find((x) => slugify(x) === q.get("sector"));
      if (sec) setTypes([sec]);
      const reg = REGIONS.find((x) => slugify(x) === q.get("region"));
      if (reg) setPlaces([...new Set(projects.filter((p) => p.region === reg).map((p) => p.city))]);
      setQuery(q.get("q") ?? "");
    }, 0);
    return () => window.clearTimeout(t);
  }, [typeOptions, projects]);
  useEffect(() => {
    if (!ready.current) {
      ready.current = true;
      return;
    }
    const q = new URLSearchParams();
    const svcKey = Object.keys(SERVICE_SLUGS).find((k) => SERVICE_SLUGS[k] === expertise[0]);
    if (expertise.length === 1 && svcKey) q.set("service", svcKey);
    if (types.length === 1) q.set("sector", slugify(types[0]));
    if (query.trim()) q.set("q", query.trim());
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [types, places, expertise, query]);

  // The bar sits just under the fixed header, whatever the header's height is at this width
  useEffect(() => {
    const set = () => {
      const h = document.querySelector("header")?.getBoundingClientRect().height ?? 86;
      bar.current?.style.setProperty("--hdr", `${Math.round(h)}px`);
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  // A panel closes on a press outside the bar or on Escape
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!bar.current?.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter(
      (p) =>
        (!types.length || types.includes(p.sector)) &&
        (!places.length || places.includes(p.city)) &&
        (!expertise.length || expertise.includes(p.service)) &&
        (!q || `${p.title} ${p.city} ${p.region} ${p.sector} ${p.service} ${p.scope}`.toLowerCase().includes(q)),
    );
    if (sort === "Name") return [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Date") return [...list].sort((a, b) => b.year - a.year);
    return featured(list);
  }, [projects, types, places, expertise, query, sort]);

  // Any change to the filters starts the list again from the first page
  const reset = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setCount(PAGE);
  };
  const filtered = types.length > 0 || places.length > 0 || expertise.length > 0 || query !== "";
  const clear = () => {
    setTypes([]);
    setPlaces([]);
    setExpertise([]);
    setQuery("");
    setCount(PAGE);
  };
  const toggle = (k: "type" | "place" | "exp") => setOpen((o) => (o === k ? null : k));
  const visible = shown.slice(0, count);
  const columns = useColumns();
  // the cards stand in rows, so that the one pointed at can widen while the others in its row narrow by the same share
  const rows = useMemo(() => {
    const out: (Project | null)[][] = [];
    for (let i = 0; i < visible.length; i += columns) {
      const row: (Project | null)[] = visible.slice(i, i + columns);
      while (row.length < columns) row.push(null);
      out.push(row);
    }
    return out;
  }, [visible, columns]);

  return (
    <div>
      <h1 className={`px-4 pt-10 text-center text-[#082b52] ${HERO_H1}`}>All Projects</h1>

      {/* the bar of filters: it stays under the header while the grid scrolls */}
      <div ref={bar} className="relative z-20 min-[768px]:sticky min-[768px]:top-(--hdr,86px) mt-10 border-b border-[#c7c8ca] bg-white min-[768px]:mt-14">
        <div className="mx-auto w-full max-w-[1928px] px-4 min-[768px]:px-[124px]">
          <button
            type="button"
            onClick={() => setMobile((m) => !m)}
            aria-expanded={mobile}
            className="my-3 flex min-h-11 w-full cursor-pointer items-center justify-center rounded-md border border-[#082b52] bg-white text-[15px] font-medium text-[#082b52] uppercase outline-none focus-visible:ring-2 focus-visible:ring-[#2356e5]/45 min-[768px]:hidden"
          >
            {mobile ? "Hide filters" : "View filters"}
          </button>

          <form
            role="search"
            aria-label="Filter projects"
            onSubmit={(e) => e.preventDefault()}
            className={cn("grid gap-3 pb-3 min-[768px]:flex min-[768px]:items-baseline min-[768px]:gap-3 min-[768px]:py-4", mobile ? "grid" : "hidden min-[768px]:flex")}
          >
            <div className="w-full md:max-w-[206px]">
              <label htmlFor="f-sort" className="sr-only">
                Sort by
              </label>
              <div className="relative">
                <select id="f-sort" value={sort} onChange={(e) => reset(setSort)(e.target.value as Sort)} className={cn(control, "cursor-pointer appearance-none pr-9")}>
                  <option>Date</option>
                  <option>Featured</option>
                  <option>Name</option>
                </select>
                {chevron}
              </div>
            </div>
            <span aria-hidden="true" className="hidden w-12 shrink-0 min-[1100px]:block" />
            <MultiFilter name="Project Type" groups={[{ options: typeOptions }]} value={types} onChange={reset(setTypes)} open={open === "type"} onToggle={() => toggle("type")} />
            <MultiFilter name="Location" groups={placeGroups} value={places} onChange={reset(setPlaces)} open={open === "place"} onToggle={() => toggle("place")} />
            <MultiFilter name="Expertise" groups={[{ options: expOptions }]} value={expertise} onChange={reset(setExpertise)} open={open === "exp"} onToggle={() => toggle("exp")} />
            <div className="relative w-full min-[768px]:ml-auto min-[768px]:max-w-[206px]">
              <label htmlFor="f-search" className="sr-only">
                Search projects
              </label>
              <input
                id="f-search"
                type="search"
                value={query}
                onChange={(e) => reset(setQuery)(e.target.value)}
                placeholder="Search"
                className={cn(control, "pr-9 text-[15px] font-normal tracking-normal normal-case placeholder:text-[#082b52]/45 [&::-webkit-search-cancel-button]:hidden")}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#082b52" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 opacity-60">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m15.5 15.5 5 5" />
              </svg>
            </div>
          </form>

          <p role="status" aria-live="polite" className="pb-2 text-right text-xs leading-4 tracking-[.15em] text-[#082b52] uppercase min-[768px]:pb-2">
            <b className="font-bold">{shown.length}</b> {shown.length === 1 ? "result" : "results"}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1928px] px-4 pt-10 pb-8 min-[768px]:px-[124px] min-[1100px]:pt-14">
        {shown.length === 0 ? (
          <div className="border border-[#c7c8ca] px-6 py-16 text-center">
            <p className={`${ui.sub} text-[#082b52]`}>No projects match these filters</p>
            <p className="mt-3 font-mulish text-[17px] leading-[1.65] text-[#082b52]/85">Try a different project type or location, or clear the filters to see everything.</p>
            {filtered && (
              <button type="button" onClick={clear} className="mt-7 inline-flex min-h-12 cursor-pointer items-center justify-center bg-[#082b52] px-7 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase outline-none transition-colors duration-200 hover:bg-[#04142a] focus-visible:ring-2 focus-visible:ring-[#2356e5]/60">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-y-12 min-[768px]:gap-y-16">
            {rows.map((row, r) => (
              <ul key={r} className="flex gap-6 min-[1100px]:gap-10">
                {row.map((p, c) =>
                  p ? (
                    <li key={p.id} className="min-w-0 grow basis-0 transition-[flex-grow] duration-500 ease-[cubic-bezier(.22,.7,.2,1)] hover:grow-[1.5] focus-within:grow-[1.5] motion-reduce:transition-none">
                      <Link
                        href={`/projects/${projectSlug(p)}`}
                        className="group relative block h-[clamp(300px,25vw,400px)] overflow-hidden bg-[#e6e6e6] no-underline shadow-[0_22px_40px_-22px_rgba(8,43,82,.55),0_2px_6px_rgba(8,43,82,.12)] outline-none transition-shadow duration-500 hover:shadow-[0_34px_56px_-24px_rgba(8,43,82,.65),0_4px_10px_rgba(8,43,82,.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2356e5]"
                      >
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="(max-width: 520px) 100vw, (max-width: 768px) 50vw, (max-width: 1100px) 33vw, 40vw"
                          priority={r === 0}
                          className="object-cover"
                        />
                        {/* the name sits over the foot of the picture; the card that is pointed at opens to show a few words about the project */}
                        <div className="absolute inset-x-0 bottom-0 bg-white/95 px-4 pt-3.5 pb-3.5">
                          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#0d4189] via-[#082b52] to-[#04142a] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                          <span aria-hidden="true" className="absolute top-0 left-0 block h-[3px] w-full bg-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                          <h2 className="relative text-[12px] leading-[1.35] font-semibold tracking-[.12em] text-[#082b52] uppercase transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">{p.title}</h2>
                          <p className="sr-only">
                            {p.city}, {p.region}. {p.sector}. {p.service}.
                          </p>
                          <div aria-hidden="true" className="relative hidden min-[768px]:[@media(hover:hover)]:grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,.7,.2,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                            <div className="overflow-hidden">
                              <p className="mt-2 text-[11px] leading-4 font-medium tracking-[.14em] text-gold uppercase">{projectPlace(p)}</p>
                              <p className="mt-2 line-clamp-4 font-mulish text-[14px] leading-[1.55] text-white/90">
                                {p.scope}. {SERVICE_LINE[p.service]}
                              </p>
                              <span className="mt-3 inline-block text-[11px] font-semibold tracking-[.14em] text-white uppercase">View project</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ) : (
                    <li key={`gap-${c}`} aria-hidden="true" className="min-w-0 grow basis-0" />
                  ),
                )}
              </ul>
            ))}
          </div>
        )}

        {shown.length > count && (
          <div className="mt-16 text-center">
            <button
              type="button"
              onClick={() => setCount((c) => c + PAGE)}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center bg-[#082b52] px-8 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase outline-none transition-colors duration-200 hover:bg-[#04142a] focus-visible:ring-2 focus-visible:ring-[#2356e5]/60"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto my-20 w-full max-w-5xl px-4 min-[1100px]:my-40">
        <div className="space-y-8 py-8">
          <h2 className={`${ui.title} text-[#082b52]`}>Didn’t find what you were looking for?</h2>
          <p className="font-mulish text-[17px] leading-[1.65] text-[#082b52]/85">
            This is just a sample of the projects that Proactive Design and Building Systems has built. If you want more information, please{" "}
            <Link href="/contact" className="text-[#082b52] underline decoration-gold decoration-2 underline-offset-[5px]">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
