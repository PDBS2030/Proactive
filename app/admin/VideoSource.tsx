"use client";

import { useState } from "react";
import { input, label } from "./ui";

/** Chooses where a video comes from, and shows only the matching field: a YouTube link, or a file from this computer. */
export function VideoSource({ kind: start, youtube, srcPath }: { kind: "youtube" | "file"; youtube: string; srcPath: string }) {
  const [kind, setKind] = useState(start);
  const tab = (on: boolean) =>
    `cursor-pointer border px-5 py-2.5 text-[14px] font-medium transition-colors duration-200 ${on ? "border-[#04142a] bg-[#04142a] text-white" : "border-[#082b52]/25 bg-white text-[#082b52] hover:border-[#04142a]"}`;

  return (
    <div className="min-[700px]:col-span-2">
      <p className={label}>Where is the video?</p>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Where the video comes from">
        <button type="button" role="radio" aria-checked={kind === "youtube"} onClick={() => setKind("youtube")} className={tab(kind === "youtube")}>
          A YouTube link
        </button>
        <button type="button" role="radio" aria-checked={kind === "file"} onClick={() => setKind("file")} className={tab(kind === "file")}>
          A file from this computer
        </button>
      </div>
      <input type="hidden" name="kind" value={kind} />

      {kind === "youtube" ? (
        <div className="mt-4">
          <label htmlFor="youtube" className={label}>
            YouTube address
          </label>
          <input id="youtube" name="youtube" defaultValue={youtube ? `https://youtu.be/${youtube}` : ""} placeholder="https://www.youtube.com/watch?v=…" className={input} />
          <span className="mt-1 block text-[13px] text-[#082b52]/60">Any way of writing a YouTube address works. The best choice for long films: YouTube streams them, so they cost the site nothing.</span>
        </div>
      ) : (
        <div className="mt-4">
          <label htmlFor="file" className={label}>
            Video file (MP4, WebM or MOV)
          </label>
          {srcPath && <p className="mt-1 text-[13px] text-[#082b52]/70">Current file: {srcPath}</p>}
          <input id="file" name="file" type="file" accept="video/mp4,video/webm,video/quicktime" className={`${input} !py-2`} />
          <input type="hidden" name="srcPath" value={srcPath} />
          <span className="mt-1 block text-[13px] text-[#082b52]/60">Best for short clips: compress to MP4 (H.264) and keep it under about 50 MB. The file is fetched only when someone presses play.</span>
        </div>
      )}
    </div>
  );
}
