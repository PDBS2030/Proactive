"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { SERVICE_SLUGS, type Project, type Region, type Sector, type ServiceType } from "@/lib/pages";
import { cn } from "@/lib/cn";

const ALL = "All";
const slugify = (v: string) => v.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const select =
  "field-line mt-2 block w-full min-h-12 cursor-pointer appearance-none border border-[#082b52]/25 bg-white bg-[url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%23082b52' stroke-width='1.5'><path d='m1 1 5 5 5-5'/></svg>\")] bg-[length:12px_8px] bg-[position:right_16px_center] bg-no-repeat px-4 pr-10 text-[15px] text-[#082b52] outline-none transition-colors duration-200 focus:border-gold focus-visible:border-gold";
const label = "block text-sm font-medium text-[#082b52]";

function Field({
  id,
  name,
  value,
  options,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {name}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={select}>
        {[ALL, ...options].map((o) => (
          <option key={o} value={o}>
            {o === ALL ? `All ${name.toLowerCase()}s` : o}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Portfolio with the filters used by large builders: sector, region, service, search and sort. */
export function ProjectsPortfolio({ projects }: { projects: Project[] }) {
  const [sector, setSector] = useState(ALL);
  const [region, setRegion] = useState(ALL);
  const [service, setService] = useState(ALL);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Featured");

  const sectors = useMemo(() => [...new Set(projects.map((p) => p.sector))] as Sector[], [projects]);
  const regions = useMemo(() => [...new Set(projects.map((p) => p.region))] as Region[], [projects]);
  const services = useMemo(() => [...new Set(projects.map((p) => p.service))] as ServiceType[], [projects]);

  // Open with the filters named in the address, e.g. /projects?service=design-build, and keep it in step
  const ready = useRef(false);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pick = (list: string[], value: string | null) => list.find((x) => slugify(x) === value) ?? ALL;
    const svc = SERVICE_SLUGS[q.get("service") ?? ""];
    if (svc) setService(svc);
    setSector(pick(sectors, q.get("sector")));
    setRegion(pick(regions, q.get("region")));
    setQuery(q.get("q") ?? "");
  }, [sectors, regions]);
  useEffect(() => {
    if (!ready.current) {
      ready.current = true;
      return;
    }
    const q = new URLSearchParams();
    const svcKey = Object.keys(SERVICE_SLUGS).find((k) => SERVICE_SLUGS[k] === service);
    if (svcKey) q.set("service", svcKey);
    if (sector !== ALL) q.set("sector", slugify(sector));
    if (region !== ALL) q.set("region", slugify(region));
    if (query.trim()) q.set("q", query.trim());
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [sector, region, service, query]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter(
      (p) =>
        (sector === ALL || p.sector === sector) &&
        (region === ALL || p.region === region) &&
        (service === ALL || p.service === service) &&
        (!q || `${p.title} ${p.city} ${p.region} ${p.sector} ${p.service}`.toLowerCase().includes(q)),
    );
    return sort === "A to Z" ? [...list].sort((a, b) => a.title.localeCompare(b.title)) : list;
  }, [projects, sector, region, service, query, sort]);

  const filtered = sector !== ALL || region !== ALL || service !== ALL || query !== "";
  const clear = () => {
    setSector(ALL);
    setRegion(ALL);
    setService(ALL);
    setQuery("");
  };

  return (
    <div>
      <form role="search" aria-label="Filter projects" onSubmit={(e) => e.preventDefault()} className="grid gap-4 border-y border-[#082b52]/15 py-6 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-[repeat(3,1fr)_1.4fr_1fr]">
        <Field id="f-sector" name="Sector" value={sector} options={sectors} onChange={setSector} />
        <Field id="f-region" name="Region" value={region} options={regions} onChange={setRegion} />
        <Field id="f-service" name="Service" value={service} options={services} onChange={setService} />
        <div>
          <label htmlFor="f-search" className={label}>
            Search
          </label>
          <input
            id="f-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Project or city"
            className={cn(select, "bg-none pr-4 placeholder:text-[#082b52]/40")}
          />
        </div>
        <div>
          <label htmlFor="f-sort" className={label}>
            Sort by
          </label>
          <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value)} className={select}>
            <option>Featured</option>
            <option>A to Z</option>
          </select>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-[15px] text-[#082b52]/80">
          Showing {shown.length} of {projects.length} projects
        </p>
        {filtered && (
          <button
            type="button"
            onClick={clear}
            className="cursor-pointer text-[14px] font-medium text-[#082b52] underline decoration-gold decoration-2 underline-offset-[6px] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2356e5]"
          >
            Clear filters
          </button>
        )}
      </div>

      {shown.length === 0 ? (
        <div className="mt-10 border border-[#082b52]/15 px-6 py-14 text-center">
          <p className="text-[19px] font-medium">No projects match these filters</p>
          <p className="mt-2 text-[15px] text-[#082b52]/80">Try a different sector or region, or clear the filters to see everything.</p>
          <button
            type="button"
            onClick={clear}
            className="mt-6 inline-flex min-h-12 cursor-pointer items-center justify-center border border-[#082b52] px-7 text-[.8125rem] font-medium tracking-[.08em] text-[#082b52] uppercase outline-none transition-colors duration-300 hover:bg-[#082b52] hover:text-white focus-visible:bg-[#082b52] focus-visible:text-white"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-x-8 gap-y-12 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {shown.map((p) => (
            <li key={p.id}>
              <article className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f6fa]">
                  <span aria-hidden="true" className="absolute bottom-0 left-0 z-10 h-1 w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full" />
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                  />
                </div>
                <h3 className="mt-4 text-(length:--h5) leading-(--h5-lh) font-(--h5-weight) transition-colors duration-300 group-hover:text-gold">{p.title}</h3>
                <p className="mt-1 text-[15px] text-[#082b52]/80">
                  {p.city}, {p.region}
                </p>
                <p className="mt-2 text-[14px] leading-snug text-[#082b52]/75">{p.scope}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#082b52]/12 pt-3 text-[13px] text-[#082b52]/70">
                  <span>{p.service}</span>
                  <span>{p.sector}</span>
                  <span>{p.size}</span>
                  <span>{p.year}</span>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
