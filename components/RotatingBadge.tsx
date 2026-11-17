import { BrandMark } from "@/components/BrandMark";

const RING = "proactivedbs.com • proactivedbs.com • ";

/**
 * A round badge: a frosted dark disc with the web address running round its edge, which turns slowly, and the
 * logo mark standing still in the middle. Put it over a photograph so the glass effect shows.
 */
export function RotatingBadge({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="PDBS, proactivedbs.com" className={`relative isolate size-[clamp(190px,17vw,260px)] rounded-full bg-[#2a2420]/72 shadow-[0_30px_70px_-20px_rgba(0,0,0,.65)] backdrop-blur-[10px] ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 200 200" className="badge-spin absolute inset-0 size-full">
        <defs>
          <path id="badge-ring-path" d="M100 100 m-76 0 a76 76 0 1 1 152 0 a76 76 0 1 1 -152 0" />
        </defs>
        <text className="fill-[#f4ece2]" style={{ fontSize: 17, fontWeight: 300, fontFamily: "var(--font-sans)" }}>
          <textPath href="#badge-ring-path" textLength="473" lengthAdjust="spacing">
            {RING}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <BrandMark light className="h-[26%]" />
        <span className="font-montserrat text-[clamp(14px,1.3vw,19px)] leading-none font-extrabold tracking-[.04em] text-white">PDBS</span>
      </div>
    </div>
  );
}
