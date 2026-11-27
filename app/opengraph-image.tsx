import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { MARK_PATHS } from "@/components/BrandMark";

export const alt = "Proactive Design and Building Systems: architecture, design-build and construction management in Maryland and DC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The picture shown when a link to any page is shared: the mark and name on the deep blue of the site, with the gold edge of the hero. */
export default async function Image() {
  const jost = await readFile(path.join(process.cwd(), "app", "fonts", "jost-500.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          color: "#fff",
          backgroundColor: "#04142a",
          backgroundImage:
            "radial-gradient(circle at 92% 100%, rgba(247,189,47,.55) 0%, rgba(42,92,240,.38) 28%, rgba(4,20,42,0) 62%), radial-gradient(circle at 70% 0%, rgba(35,86,229,.35) 0%, rgba(4,20,42,0) 55%)",
          fontFamily: "Jost",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="92" height="103" viewBox="217 178 823 925">
            {MARK_PATHS.map((p) => (
              <path key={p.d} d={p.d} fill={p.gold ? "#b58f48" : "#ffffff"} />
            ))}
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 52, letterSpacing: 4, lineHeight: 1 }}>PROACTIVE</div>
            <div style={{ marginTop: 10, fontSize: 19, letterSpacing: 3, color: "rgba(255,255,255,.8)" }}>DESIGN AND BUILDING SYSTEMS, INC.</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 72, height: 4, backgroundColor: "#b58f48" }} />
          <div style={{ marginTop: 30, fontSize: 74, lineHeight: 1.04, letterSpacing: 1, textTransform: "uppercase", maxWidth: 940 }}>We are redefining how America builds</div>
          <div style={{ marginTop: 34, fontSize: 28, letterSpacing: 2, color: "rgba(255,255,255,.85)" }}>ARCHITECTURE  /  DESIGN-BUILD  /  CONSTRUCTION MANAGEMENT</div>
          <div style={{ marginTop: 12, fontSize: 24, letterSpacing: 2, color: "#d9b872" }}>BALTIMORE  ·  MARYLAND AND DC</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Jost", data: jost, weight: 500, style: "normal" }] },
  );
}
