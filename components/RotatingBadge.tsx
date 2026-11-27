import { BrandMark } from "@/components/BrandMark";

const RING = "proactivedbs.com •";

/**
 * A round badge: a frosted pale disc with the web address running round its edge, which turns slowly, and the
 * logo mark and PDBS standing still in the middle, all in the brand blue.
 */
export function RotatingBadge({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="PDBS, proactivedbs.com" className={`relative isolate size-[clamp(190px,17vw,260px)] rounded-full bg-white/60 shadow-[0_24px_50px_-18px_rgba(8,43,82,.45),inset_0_0_0_1px_rgba(255,255,255,.8)] backdrop-blur-[10px] ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 200 200" className="badge-spin absolute inset-0 size-full">
        <defs>
          <path id="badge-ring-path" d="M100 100 m-76 0 a76 76 0 1 1 152 0 a76 76 0 1 1 -152 0" />
        </defs>
        <text className="fill-[#082b52]" style={{ fontSize: 17, fontWeight: 400, fontFamily: "var(--font-sans)" }}>
          {/* two halves, each stretched to exactly half the circle, so the ring always closes whatever the font does */}
          {[0, 50].map((at) => (
            <textPath key={at} href="#badge-ring-path" startOffset={`${at}%`} textLength="234" lengthAdjust="spacing">
              {RING}
            </textPath>
          ))}
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <BrandMark className="h-[26%]" />
        <span className="font-montserrat text-[clamp(14px,1.3vw,19px)] leading-none font-extrabold tracking-[.04em] text-[#082b52]">PDBS</span>
      </div>
    </div>
  );
}
