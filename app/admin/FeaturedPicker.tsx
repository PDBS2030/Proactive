"use client";

import { useState } from "react";
import { saveFeatured } from "./actions";
import { Icons } from "./icons";
import { input, primary } from "./ui";

type Tab = { key: string; label: string; fallback: string; category: string };
type Choice = { id: string; title: string; city: string; image: string; sector: string };

/** One card per category of the home page gallery. Each has exactly one featured property: choose it from that category's own properties, see its photograph and the exact line visitors will read. */
export function FeaturedPicker({ tabs, projects, initial }: { tabs: Tab[]; projects: Choice[]; initial: Record<string, string> }) {
  const [picked, setPicked] = useState<Record<string, string>>(initial);

  return (
    <form action={saveFeatured}>
      <ul className="grid gap-5 min-[760px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {tabs.map((tab, i) => {
          const p = projects.find((x) => x.id === picked[tab.key]);
          const line = p ? `${p.title} – ${p.city}` : tab.fallback;
          return (
            <li key={tab.key} className="overflow-hidden border border-[#082b52]/12 bg-white/85 shadow-[0_22px_38px_-30px_rgba(4,20,42,.6)] backdrop-blur">
              <div className="flex items-center justify-between bg-[#04142a] px-4 py-2.5 text-white">
                <span className="text-[13px] font-medium">{tab.label}</span>
                <span className="text-[11px] tracking-[.18em] text-gold">{tab.category ? "CATEGORY" : "GALLERY START"}</span>
              </div>
              <div className="relative aspect-[16/9] bg-[#dfe6f1]">
                {p ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" className="absolute inset-0 size-full object-cover" />
                ) : (
                  <span className="absolute inset-0 grid place-items-center px-6 text-center text-[13px] text-[#082b52]/55">No featured property yet, so the standard wording shows. Pick one of this category's properties.</span>
                )}
              </div>
              <div className="p-4">
                <label htmlFor={`f-${tab.key}`} className="block text-[13px] font-semibold text-[#082b52]">
                  Featured property
                </label>
                <select
                  id={`f-${tab.key}`}
                  name={tab.key}
                  value={picked[tab.key] ?? ""}
                  onChange={(e) => setPicked((s) => ({ ...s, [tab.key]: e.target.value }))}
                  className={input}
                >
                  <option value="">Standard wording</option>
                  {projects
                    .filter((x) => !tab.category || x.sector === tab.category)
                    .map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.title} – {x.city}
                    </option>
                  ))}
                </select>
                <p className="mt-4 flex items-stretch text-[13px]">
                  <span className="flex items-center bg-[#3b608a] px-3 font-semibold text-[#c9dbec]">Featured:</span>
                  <span className="flex flex-1 items-center border border-[#8ea6c4] px-3 py-2 font-medium text-[#001f45]">{line}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-8">
        <button type="submit" className={primary}>
          {Icons.check}
          <span>Save featured</span>
        </button>
      </div>
    </form>
  );
}
