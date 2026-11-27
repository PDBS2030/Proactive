"use client";

import { useState } from "react";
import { videoPoster, type Video } from "@/lib/video";

/**
 * A video that costs nothing until it is wanted. What loads with the page is one small still picture (and not even that
 * until it is near the screen). The player itself, YouTube's or the file, is fetched only when the visitor presses
 * play, and it then starts at once, in the same place. Hovering or focusing the play button warms the connection a
 * moment early, so the start feels immediate without adding anything to the page's own load.
 */
export function VideoPlayer({ video, className = "", priorityPoster = false }: { video: Pick<Video, "title" | "kind" | "src" | "poster">; className?: string; priorityPoster?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const poster = videoPoster(video);

  const warm = () => {
    if (video.kind !== "youtube" || document.head.querySelector("link[data-yt-warm]")) return;
    for (const href of ["https://www.youtube-nocookie.com", "https://i.ytimg.com"]) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      link.setAttribute("data-yt-warm", "");
      document.head.appendChild(link);
    }
  };

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-[#04142a] ${className}`}>
      {playing ? (
        video.kind === "youtube" ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.src}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <video src={video.src} poster={poster || undefined} controls autoPlay playsInline preload="auto" className="absolute inset-0 size-full bg-black object-contain">
            <track kind="captions" />
          </video>
        )
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          onPointerEnter={warm}
          onFocus={warm}
          aria-label={`Play video: ${video.title}`}
          className="group absolute inset-0 block size-full cursor-pointer text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold"
        >
          {poster ? (
            // a plain image on purpose: it is lazy, sized by the frame, and for YouTube it comes from YouTube's own server
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              loading={priorityPoster ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
            />
          ) : (
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#0b2a4d,#04142a)]" />
          )}
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#04142a]/80 via-[#04142a]/15 to-[#04142a]/10" />
          <span className="absolute bottom-0 left-0 flex items-end gap-4 p-5 min-[640px]:p-7">
            <span className="grid size-14 flex-none place-items-center rounded-full border border-white/70 bg-[#04142a]/50 text-white backdrop-blur-sm transition-[background-color,color,transform] duration-300 group-hover:scale-105 group-hover:border-gold group-hover:bg-gold group-hover:text-[#04142a] min-[640px]:size-16 motion-reduce:transition-none">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="translate-x-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="pb-1 font-jost text-[20px] leading-tight text-white min-[640px]:text-[24px]">{video.title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
