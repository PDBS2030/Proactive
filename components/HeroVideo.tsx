"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The hero's three clips. Each is the strongest seven seconds of its film: the glass tower rising out of the city,
 * the drone pushing through the trees to reveal the house and pool, and the timber frame going up. The desktop file
 * is 1080p; phones and narrow windows get the 720p one. The second clip is 720p at the source, so its narrow file is a lighter 540p.
 */
const CLIPS = [
  {
    desktop: "/assets/hero/hero-1.mp4",
    narrow: "/assets/hero/hero-1-m.mp4",
    poster: "/assets/hero/hero-1-poster.jpg",
    alt: "Aerial view of a glass office tower, its teal facade mirroring the sky above the city.",
  },
  {
    desktop: "/assets/hero/hero-2.mp4",
    narrow: "/assets/hero/hero-2-m.mp4",
    poster: "/assets/hero/hero-2-poster.jpg",
    alt: "Aerial view over mature trees to a white house with a pool and landscaped garden.",
  },
  {
    desktop: "/assets/hero/hero-3.mp4",
    narrow: "/assets/hero/hero-3-m.mp4",
    poster: "/assets/hero/hero-3-poster.jpg",
    alt: "Aerial view of a timber-framed building under construction on a city street.",
  },
];

/**
 * How dark the veil over each clip is. The glass tower is the brightest picture, so it sits under the deepest veil;
 * the other two are a little lighter. The veil changes with the same slow move as the pictures.
 */
const VEIL = [0.9, 0.7, 0.72];

/** Seconds the two clips run together while one gives way to the next. */
const OVERLAP = 1.9;
/** Slow in, long glide, slow out. */
const GLIDE = "cubic-bezier(.65,0,.35,1)";

/**
 * The hero's moving picture. The first frame is a still, so the page paints at once; the first film fades in over
 * it. The other two are fetched only after the first is playing, one ahead of its turn. When a clip nears its end
 * the next begins underneath and takes over in a single slow move: the new picture pushes in from a soft, bright,
 * out-of-focus state to sharp, the old one drifts on and falls away, and a warm wash of light crosses the frame.
 * Reduced motion, data saver and very slow connections keep to the still. It stops playing when it is off screen or
 * the tab is hidden.
 */
export function HeroVideo() {
  const root = useRef<HTMLDivElement>(null);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const wash = useRef<HTMLSpanElement>(null);
  const veil = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let stop: (() => void) | undefined;
    let waiting = 0;
    let cancelled = false;

    // The page, its pictures and its type come first; the film only starts once they have arrived
    const run = () => {
      waiting = window.setTimeout(() => {
        if (!cancelled) stop = init();
      }, 800);
    };
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", run);
      window.clearTimeout(waiting);
      stop?.();
    };

    function init(): (() => void) | undefined {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || conn?.saveData || /(^|-)2g$|3g$/.test(conn?.effectiveType ?? "");
    const vids = videos.current.filter((v): v is HTMLVideoElement => !!v);
    const area = root.current;
    const light = wash.current;
    const shade = veil.current;
    if (still || vids.length !== CLIPS.length || !area || !light || !shade) return undefined;

    const narrow = window.matchMedia("(max-width: 900px)").matches;
    // a phone gets one film, played over and over: that is a quarter of the download on mobile data
    const count = narrow ? 1 : CLIPS.length;
    if (count === 1) vids[0].loop = true;
    // a soft focus pull is lovely on a big screen and costly on a small one
    const pull = !narrow;

    let current = 0;
    let moving = false;
    let onScreen = true;
    let poll = 0;
    let disposed = false;
    const timers: number[] = [];

    const fetchClip = (i: number) => {
      const v = vids[i];
      if (v.getAttribute("src")) return;
      v.src = narrow ? CLIPS[i].narrow : CLIPS[i].desktop;
      v.preload = "auto";
      v.load();
    };

    const settle = (v: HTMLVideoElement, shown: boolean) => {
      v.style.opacity = shown ? "1" : "0";
      v.style.transform = "none";
      v.style.filter = "none";
    };

    const begin = async (to: number) => {
      const from = current;
      const next = vids[to];
      const prev = vids[from];
      moving = true;
      next.currentTime = 0;
      try {
        await next.play();
      } catch {
        moving = false;
        return;
      }
      const time = OVERLAP * 1000;
      next.style.zIndex = "2";
      prev.style.zIndex = "1";
      next.style.willChange = prev.style.willChange = "opacity, transform, filter";

      const arriving = next.animate(
        [
          { opacity: 0, transform: "scale(1.16)", filter: pull ? "blur(14px) brightness(1.3)" : "brightness(1.2)" },
          { opacity: 1, transform: "scale(1)", filter: "blur(0) brightness(1)" },
        ],
        { duration: time, easing: GLIDE, fill: "both" },
      );
      const leaving = prev.animate(
        [
          { opacity: 1, transform: "scale(1)", filter: "blur(0) brightness(1)" },
          { opacity: 0, transform: "scale(1.08)", filter: pull ? "blur(6px) brightness(.9)" : "brightness(.9)" },
        ],
        { duration: time, easing: GLIDE, fill: "both" },
      );
      light.animate([{ opacity: 0 }, { opacity: 0.4, offset: 0.45 }, { opacity: 0 }], { duration: time, easing: "ease-in-out" });
      const deepening = shade.animate([{ opacity: VEIL[from] }, { opacity: VEIL[to] }], { duration: time, easing: GLIDE, fill: "both" });

      arriving.onfinish = () => {
        settle(next, true);
        settle(prev, false);
        next.style.willChange = prev.style.willChange = "auto";
        arriving.cancel();
        leaving.cancel();
        shade.style.opacity = String(VEIL[to]);
        deepening.cancel();
        // park the film that has just left on its first frame, decoded and waiting for its next turn
        prev.pause();
        prev.currentTime = 0;
        current = to;
        moving = false;
        fetchClip((to + 1) % CLIPS.length);
      };
    };

    const watch = () => {
      if (moving || !onScreen || disposed) return;
      const v = vids[current];
      if (count === 1 || !v.duration || (v.paused && !v.ended)) return;
      if (v.duration - v.currentTime > OVERLAP) return;
      const to = (current + 1) % CLIPS.length;
      fetchClip(to);
      // the next film must be ready to play through before it is allowed to take over
      if (vids[to].readyState >= 3) {
        void begin(to);
      } else if (v.ended) {
        // it has not arrived yet and this one has run out: keep the picture moving instead of holding the last frame
        v.currentTime = 0;
        void v.play().catch(() => {});
      }
    };

    const resume = () => {
      if (!onScreen || document.hidden) return;
      vids.forEach((v, i) => {
        if (v.getAttribute("src") && (i === current || moving) && v.paused && !v.ended) void v.play().catch(() => {});
      });
    };
    const pause = () => vids.forEach((v) => !v.paused && v.pause());

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) resume();
      else pause();
    });
    io.observe(area);
    const onVisibility = () => (document.hidden ? pause() : resume());
    document.addEventListener("visibilitychange", onVisibility);

    // the first film starts, then fades in over the still
    fetchClip(0);
    const first = vids[0];
    first.addEventListener(
      "playing",
      () => {
        first.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, easing: "ease-out", fill: "both" }).onfinish = () => {
          settle(first, true);
        };
        if (count > 1) {
          timers.push(window.setTimeout(() => fetchClip(1), 600));
          vids[1].addEventListener("canplaythrough", () => fetchClip(2), { once: true });
        }
      },
      { once: true },
    );
    void first.play().catch(() => {});
    // a steady check, not a frame loop: it only has to notice when a clip is within its last two seconds
    poll = window.setInterval(watch, 100);
    // and if a clip somehow reaches its end first (a stalled tab, a slow fetch), the next one takes over then
    vids.forEach((v, i) => v.addEventListener("ended", () => i === current && !moving && void watch()));

    return () => {
      disposed = true;
      window.clearInterval(poll);
      timers.forEach(clearTimeout);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      pause();
    };
    }
  }, []);

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden bg-[#04142a]">
      {/* the still: this is what paints first, and what stays for anyone who has asked for less motion */}
      <Image src={CLIPS[0].poster} alt={CLIPS[0].alt} fill priority sizes="100vw" quality={85} className="object-cover object-center" />

      {CLIPS.map((clip, i) => (
        <video
          key={clip.desktop}
          ref={(node) => {
            videos.current[i] = node;
          }}
          aria-hidden="true"
          tabIndex={-1}
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 size-full object-cover object-center"
          style={{ opacity: 0 }}
        />
      ))}

      {/* the dark veil over whichever picture is showing */}
      <span ref={veil} aria-hidden="true" className="pointer-events-none absolute inset-0 z-3 bg-[#020812]" style={{ opacity: VEIL[0] }} />

      {/* a warm wash of light that crosses the frame as one film gives way to the next */}
      <span
        ref={wash}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-4 bg-[radial-gradient(ellipse_at_28%_42%,rgba(255,214,150,.75),rgba(255,214,150,0)_62%)] mix-blend-screen"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
