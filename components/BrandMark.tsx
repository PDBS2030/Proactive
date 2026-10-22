import { cn } from "@/lib/cn";

export const MARK_PATHS = [
  { d: "M217 619L369 529V1103H217Z", gold: false },
  { d: "M414 498L598 388V1103H414Z", gold: true },
  { d: "M641 422L809 526V1103H641Z", gold: false },
  { d: "M856 772L1040 882V1103H856Z", gold: false },
  {
    d: "M628 178L1040 420V648L856 731V615L879 602V489L625 327L442 441V293Z",
    gold: false,
  },
] as const;

/** The PROACTIVE logo mark in its brand colours. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="217 178 823 925" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={cn("block w-auto flex-none", className)}>
      {MARK_PATHS.map((p) => (
        <path key={p.d} d={p.d} fill={p.gold ? "#b58f48" : "#0e365c"} />
      ))}
    </svg>
  );
}
