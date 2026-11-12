"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Project, Region, Sector, ServiceType } from "@/lib/pages";
import { cn } from "@/lib/cn";

const ALL = "All";
const select =
  "mt-2 block w-full min-h-12 cursor-pointer appearance-none border border-[#143275]/25 bg-white bg-[url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%23143275' stroke-width='1.5'><path d='m1 1 5 5 5-5'/></svg>\")] bg-[length:12px_8px] bg-[position:right_16px_center] bg-no-repeat px-4 pr-10 text-[15px] text-[#143275] outline-none transition-colors duration-200 focus:border-gold focus-visible:border-gold";
const label = "block text-sm font-medium text-[#143275]";

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
      <form role="search" aria-label="Filter projects" onSubmit={(e) => e.preventDefault()} className="grid gap-4 border-y border-[#143275]/15 py-6 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-[repeat(3,1fr)_1.4fr_1fr]">
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
            className={cn(select, "bg-none pr-4 placeholder:text-[#143275]/40")}
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
        <p role="status" aria-live="polite" className="text-[15px] text-[#143275]/80">
          Showing {shown.length} of {projects.length} projects
        </p>
        {filtered && (
          <button
            type="button"
            onClick={clear}
            className="cursor-pointer text-[14px] font-medium text-[#143275] underline decoration-gold decoration-2 underline-offset-[6px] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2356e5]"
          >
            Clear filters
          </button>
        )}
      </div>

      {shown.length === 0 ? (
        <div className="mt-10 border border-[#143275]/15 px-6 py-14 text-center">
          <p className="text-[19px] font-medium">No projects match these filters</p>
          <p className="mt-2 text-[15px] text-[#143275]/80">Try a different sector or region, or clear the filters to see everything.</p>
          <button
            type="button"
            onClick={clear}
            className="mt-6 inline-flex min-h-12 cursor-pointer items-center justify-center border border-[#143275] px-7 text-[.8125rem] font-medium tracking-[.08em] text-[#143275] uppercase outline-none transition-colors duration-300 hover:bg-[#143275] hover:text-white focus-visible:bg-[#143275] focus-visible:text-white"
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
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                  />
                </div>
                <h3 className="mt-4 text-(length:--h5) leading-(--h5-lh) font-(--h5-weight)">{p.title}</h3>
                <p className="mt-1 text-[15px] text-[#143275]/80">
                  {p.city}, {p.region}
                </p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#143275]/12 pt-3 text-[13px] text-[#143275]/70">
                  <span>{p.sector}</span>
                  <span>{p.service}</span>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
