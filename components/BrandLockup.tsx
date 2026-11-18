import { BrandMark } from "@/components/BrandMark";

/**
 * The full logo: the mark, PROACTIVE, the full descriptor "Design and Building Systems, Inc." spread to the width
 * of the name, and the gold rule beneath. The header and the footer both use it, so they always match.
 */
export function BrandLockup() {
  return (
    <>
      <BrandMark className="h-[34px] md:h-[46px]" />
      <span className="inline-grid justify-items-start gap-y-[3px]">
        <span className="font-montserrat text-[22px] leading-none font-extrabold tracking-[-.01em] text-navy normal-case md:text-[30px]">PROACTIVE</span>
        <span className="w-0 min-w-full font-montserrat text-[5.4px] leading-[1.2] font-medium tracking-[.12em] whitespace-nowrap text-[#1c232c] [text-align-last:justify] [text-align:justify] md:text-[7.4px]">
          DESIGN AND BUILDING SYSTEMS, INC.
        </span>
        <span className="block h-0.5 w-full bg-gold" />
      </span>
    </>
  );
}
