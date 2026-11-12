"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Phase = {
  key: string;
  title: string;
  range: string;
  summary: string;
  steps: { title: string; text: string }[];
};

/** The 15 steps, one phase at a time. Step numbers run 1 to 15 across the phases because the order matters. */
export function PhaseSteps({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % phases.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + phases.length) % phases.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = phases.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const phase = phases[active];
  const offset = phases.slice(0, active).reduce((n, p) => n + p.steps.length, 0);

  return (
    <div>
      <div role="tablist" aria-label="Project phases" className="grid border-b border-[#143275]/20 min-[768px]:grid-cols-3">
        {phases.map((p, i) => (
          <button
            key={p.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "-mb-px cursor-pointer border-b-2 px-1 py-5 text-left outline-none transition-colors duration-300 focus-visible:bg-[#f3f6fa] min-[768px]:pr-8",
              active === i ? "border-gold" : "border-transparent hover:border-[#143275]/30",
            )}
          >
            <span className="block text-sm font-semibold text-gold">
              Phase {i + 1}, {p.range.toLowerCase()}
            </span>
            <span className="mt-1 block font-jost text-[22px] leading-tight uppercase min-[992px]:text-[26px]">{p.title}</span>
          </button>
        ))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} tabIndex={0} className="pt-10 outline-none">
        <p className="max-w-[60ch] font-mulish text-[17px] leading-[1.65] text-[#143275]/90">{phase.summary}</p>
        <ol className="mt-10 border-t border-[#143275]/15">
          {phase.steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-[#143275]/15 py-6 min-[768px]:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.4fr)] min-[768px]:gap-x-10">
              <span className="font-jost text-[26px] leading-none text-gold min-[768px]:text-[32px]">{String(offset + i + 1).padStart(2, "0")}</span>
              <h3 className="text-(length:--h5) leading-(--h5-lh) font-(--h5-weight)">{s.title}</h3>
              <p className="col-start-2 mt-2 max-w-[52ch] text-[15px] leading-[1.6] text-[#143275]/85 min-[768px]:col-start-3 min-[768px]:mt-0">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
