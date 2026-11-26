import { MARK_PATHS } from "@/components/BrandMark";
import { cn } from "@/lib/cn";

/**
 * The full logo, drawn as one scalable picture: the mark, the thin gold line, PROACTIVE, the full descriptor and the
 * gold rule beneath it, and the three services along the foot. It is set in live text and vector shapes, so it stays
 * sharp at any size and can be turned white (`light`) for the header over the home page's dark hero. Pass the width
 * you need in `className`; the height follows.
 */
export function BrandLockup({ light = false, className }: { light?: boolean; className?: string }) {
  const ink = light ? "fill-white" : "fill-navy";
  const type = "font-montserrat";
  return (
    <svg viewBox="0 0 1600 465" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={cn("block h-auto w-[220px] flex-none overflow-visible", className)}>
      {/* the mark */}
      <svg x="32" y="30" width="298" height="335" viewBox="217 178 823 925">
        {MARK_PATHS.map((p) => (
          <path key={p.d} d={p.d} className={p.gold ? "fill-gold" : ink} style={{ transition: "fill 350ms" }} />
        ))}
      </svg>
      <rect x="372" y="73" width="8" height="292" className="fill-gold" />

      {/* the name, the descriptor and the rule */}
      <text x="417" y="228" fontSize="197" textLength="1135" lengthAdjust="spacingAndGlyphs" className={cn(type, "font-extrabold", ink)} style={{ transition: "fill 350ms" }}>
        PROACTIVE
      </text>
      <text x="417" y="300" fontSize="52" textLength="1146" lengthAdjust="spacingAndGlyphs" className={cn(type, "font-medium", ink)} style={{ transition: "fill 350ms" }}>
        DESIGN AND BUILDING SYSTEMS, INC.
      </text>
      <rect x="417" y="343" width="1145" height="6" className="fill-gold" />

      {/* the services: set at their natural width, with even room around each gold dot, so no word is squeezed */}
      <text x="33" y="440" fontSize="42" textLength="336" lengthAdjust="spacing" className={cn(type, "font-medium", ink)} style={{ transition: "fill 350ms" }}>
        ARCHITECTURE
      </text>
      <circle cx="413.5" cy="425" r="10" className="fill-gold" />
      <text x="458" y="440" fontSize="42" className={cn(type, "font-medium", ink)} style={{ transition: "fill 350ms" }}>
        DESIGN<tspan dx="9">-</tspan>
        <tspan dx="9">BUILD</tspan>
      </text>
      <circle cx="840.5" cy="425" r="10" className="fill-gold" />
      <text x="885" y="440" fontSize="42" textLength="682" lengthAdjust="spacing" className={cn(type, "font-medium", ink)} style={{ transition: "fill 350ms" }}>
        CONSTRUCTION MANAGEMENT
      </text>
    </svg>
  );
}
