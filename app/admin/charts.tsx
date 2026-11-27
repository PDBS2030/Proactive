/** Small hand-drawn charts for the overview: no library, just shapes. */

/** A row of bars, the last one in gold. */
export function Spark({ values, labels }: { values: number[]; labels?: string[] }) {
  const max = Math.max(1, ...values);
  return (
    <div className="flex h-12 items-end gap-1.5" role="img" aria-label={labels ? labels.map((l, i) => `${l}: ${values[i]}`).join(", ") : values.join(", ")}>
      {values.map((v, i) => (
        <span
          key={i}
          title={labels ? `${labels[i]}: ${v}` : String(v)}
          className={`w-full min-w-1.5 ${i === values.length - 1 ? "bg-gold" : "bg-[#082b52]/70"}`}
          style={{ height: `${Math.max(8, (v / max) * 100)}%`, opacity: v === 0 ? 0.25 : 1 }}
        />
      ))}
    </div>
  );
}

export const SERIES = ["#04142a", "#2356e5", "#b58f48", "#7e9bd6", "#0e365c"];

/** A ring chart with a legend that carries the numbers. */
export function Donut({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = 52;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg width="148" height="148" viewBox="0 0 148 148" role="img" aria-label={data.map((d) => `${d.label}: ${d.value}`).join(", ")} className="flex-none -rotate-90">
        <circle cx="74" cy="74" r={r} fill="none" stroke="#082b52" strokeOpacity=".08" strokeWidth="20" />
        {data.map((d, i) => {
          const len = (d.value / total) * c;
          const seg = (
            <circle
              key={d.label}
              cx="74"
              cy="74"
              r={r}
              fill="none"
              stroke={SERIES[i % SERIES.length]}
              strokeWidth="20"
              strokeDasharray={`${Math.max(0, len - 2)} ${c - Math.max(0, len - 2)}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return seg;
        })}
        <text x="74" y="74" textAnchor="middle" dominantBaseline="central" className="rotate-90 origin-center fill-[#04142a] font-jost text-[30px]" style={{ transformBox: "fill-box" }}>
          {total === 1 && data.every((d) => d.value === 0) ? 0 : data.reduce((s, d) => s + d.value, 0)}
        </text>
      </svg>
      <ul className="grid flex-1 gap-2 text-[14px]">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2.5">
            <i className="size-3 flex-none" style={{ background: SERIES[i % SERIES.length] }} />
            <span className="flex-1 text-[#082b52]/85">{d.label}</span>
            <span className="font-semibold tabular-nums text-[#04142a]">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Horizontal bars with the value at the end. */
export function BarList({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <ul className="grid gap-3">
      {data.map((d, i) => (
        <li key={d.label}>
          <div className="flex items-baseline justify-between gap-3 text-[14px]">
            <span className="text-[#082b52]/85">{d.label}</span>
            <span className="font-semibold tabular-nums text-[#04142a]">{d.value}</span>
          </div>
          <div className="mt-1.5 h-2 bg-[#082b52]/8">
            <div className="h-full" style={{ width: `${(d.value / max) * 100}%`, background: SERIES[i % SERIES.length] }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
