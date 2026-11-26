import { BrandMark } from "@/components/BrandMark";
import { cn } from "@/lib/cn";

/**
 * The full logo: the mark, PROACTIVE, the full descriptor "Design and Building Systems, Inc." spread to the width
 * of the name, and the gold rule beneath. The header and the footer both use it, so they always match. `light`
 * sets the dark parts in white, for the header over the home page's dark hero.
 */
export function BrandLockup({ light = false }: { light?: boolean }) {
  return (
    <>
      <BrandMark light={light} className="h-[34px] md:h-[46px]" />
      <span className="inline-grid justify-items-start gap-y-[3px]">
        <span className={cn("font-montserrat text-[22px] leading-none font-extrabold tracking-[-.01em] normal-case transition-colors duration-350 md:text-[30px]", light ? "text-white" : "text-navy")}>PROACTIVE</span>
        <span className={cn("w-0 min-w-full font-montserrat text-[5.4px] leading-[1.2] font-medium tracking-[.12em] whitespace-nowrap transition-colors duration-350 [text-align-last:justify] [text-align:justify] md:text-[7.4px]", light ? "text-white/85" : "text-[#1c232c]")}>
          DESIGN AND BUILDING SYSTEMS, INC.
        </span>
        <span className="block h-0.5 w-full bg-gold" />
      </span>
    </>
  );
}
