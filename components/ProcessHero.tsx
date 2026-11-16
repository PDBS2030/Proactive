"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

export type HeroState = {
  word: string;
  statement: string;
  plate: string;
  accent: string;
  image: string;
  position?: string;
};

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const ease = (x: number) => {
  const t = clamp(x);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Where the left edge of the curved window sits (percent of the width) in each state: wide screens, then phones */
const EDGES = { wide: [53, 61, 69], narrow: [76, 80, 84] };

/**
 * A pinned, scroll-driven opening. It starts as a full-screen film with a headline; as you scroll, the film
 * recedes into a large curved window on the right while a colour plate and a statement take the left, then the
 * window and plate change for each of the three phases. The page carries on once the last phase has been shown.
 */
export function ProcessHero({ title, tagline, states }: { title: string; tagline: string; states: HeroState[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const shot = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const words = useRef<(HTMLSpanElement | null)[][]>([]);
  const video = useRef<HTMLVideoElement>(null);
  const [a, setA] = useState(0);
  const [ready, setReady] = useState(false);
  const still = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    if (still) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const o = outer.current;
      if (!o) return;
      const r = o.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const t = clamp(-r.top / total) * 4; // distance scrolled, in screens (0 to 4)
      const edges = window.matchMedia("(max-width: 819px)").matches ? EDGES.narrow : EDGES.wide;

      // the window: full screen at first, then a large curve whose edge steps right with each phase
      const morph = ease((t - 0.35) / 0.75);
      const slide = (from: number, to: number, start: number) => lerp(from, to, ease((t - start) / 0.4));
      const edge = t < 2.1 ? slide(edges[0], edges[1], 1.9) : slide(edges[1], edges[2], 3.0);
      const cx = lerp(50, 112, morph);
      const rx = lerp(160, 112 - (t < 1.1 ? edges[0] : edge), morph);
      const ry = lerp(160, 105, morph);
      if (shot.current) shot.current.style.clipPath = `ellipse(${rx.toFixed(2)}% ${ry.toFixed(2)}% at ${cx.toFixed(2)}% 50%)`;

      if (intro.current) {
        const o2 = 1 - ease((t - 0.25) / 0.3);
        intro.current.style.opacity = String(o2);
        intro.current.style.visibility = o2 <= 0.01 ? "hidden" : "visible";
      }

      const idx = t < 2.1 ? 0 : t < 3.2 ? 1 : 2;
      setA((v) => (v === idx ? v : idx));
      setReady((v) => (t >= 1.0) === v ? v : t >= 1.0);

      // the statement lights up word by word as you read down through each phase
      const hold = [
        [1.15, 1.9],
        [2.35, 3.0],
        [3.45, 4.0],
      ][idx];
      const q = clamp((t - hold[0]) / (hold[1] - hold[0]));
      const list = words.current[idx] ?? [];
      list.forEach((el, k) => {
        if (el) el.style.color = k / list.length < q * 1.15 ? "#fff" : "var(--accent)";
      });
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [still]);

  // the film plays while the hero is on screen
  useEffect(() => {
    const v = video.current;
    if (!v || still) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [still]);

  const st = states[a];

  return (
    <div ref={outer} className={cn("relative", still ? "h-[100svh]" : "h-[500svh]")}>
      <section
        aria-label="Our process"
        className="sticky top-0 isolate h-[100svh] min-h-[620px] overflow-hidden text-white transition-colors duration-700"
        style={{ backgroundColor: still ? "#061a33" : st.plate, ["--accent" as string]: st.accent }}
      >
        {/* the window: a film, then a photograph for each phase */}
        <div ref={shot} className="absolute inset-0 -z-10" style={{ clipPath: still ? undefined : "ellipse(160% 160% at 50% 50%)" }}>
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/service-video-poster.jpg"
            aria-hidden="true"
            className={cn("absolute inset-0 size-full object-cover transition-opacity duration-500", ready && !still ? "opacity-0" : "opacity-100")}
          >
            <source src="/assets/service-video.mp4" type="video/mp4" />
          </video>
          {!still &&
            states.map((s, k) => (
              <Image
                key={s.image}
                src={s.image}
                alt=""
                fill
                sizes="100vw"
                className={cn("object-cover transition-opacity duration-700", ready && k === a ? "opacity-100" : "opacity-0")}
                style={{ objectPosition: s.position ?? "center" }}
              />
            ))}
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,.5)_0%,rgba(0,0,0,.2)_38%,rgba(0,0,0,.05)_65%)]" />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[241px] bg-linear-to-b from-black/50 to-transparent" />
        </div>

        {/* the opening line */}
        <div ref={intro} className="absolute inset-x-0 top-[44.7%] px-4 min-[768px]:px-[124px]">
          <div className="mx-auto w-full max-w-[1680px]">
            <h1 className="hero-in max-w-[16ch] font-jost text-[22.4px] leading-[27px] font-medium tracking-normal uppercase min-[690px]:text-[34.2px] min-[690px]:leading-[39px] min-[992px]:text-[length:min(54px,calc((100vw-299px)/12.55))] min-[992px]:leading-[1.11]">{title}</h1>
            <p className="hero-in mt-5 max-w-[40ch] font-mulish text-[20px] leading-[31px] font-normal" style={{ animationDelay: "250ms" }}>
              {tagline}
            </p>
          </div>
        </div>

        {/* the phase statements, one per state */}
        {!still && (
          <div className="pointer-events-none absolute inset-x-0 top-[40%] px-4 min-[768px]:px-[124px]">
            <div className="mx-auto w-full max-w-[1680px]">
              {states.map((s, k) => (
                <div
                  key={s.word}
                  aria-hidden={k !== a}
                  className={cn("absolute max-w-[78vw] transition-opacity duration-200 ease-linear min-[820px]:max-w-[min(660px,calc(53vw-164px))]", k === a && ready ? "pointer-events-auto opacity-100" : "opacity-0")}
                  style={{ ["--accent" as string]: s.accent }}
                >
                  <p className="text-xs leading-4 font-semibold tracking-[.15em] uppercase">
                    {states.map((o, j) => (
                      <span key={o.word} className={cn("transition-opacity duration-200", j === k ? "opacity-100" : "opacity-55")}>
                        {o.word}.{" "}
                      </span>
                    ))}
                  </p>
                  <p role="heading" aria-level={2} className="mt-4 font-mulish text-[clamp(18px,1.55vw,24px)] leading-[1.6] font-normal">
                    {s.statement.split(" ").map((w, j, all) => (
                      <span
                        key={j}
                        ref={(el) => {
                          (words.current[k] ??= [])[j] = el;
                          if (el && all.length !== words.current[k].length) words.current[k].length = all.length;
                        }}
                        style={{ color: "var(--accent)" }}
                      >
                        {w}{" "}
                      </span>
                    ))}
                  </p>
                  <a
                    href="#inquiry"
                    data-start-project
                    tabIndex={k === a ? 0 : -1}
                    className="mt-9 inline-flex min-h-[55px] items-center justify-center border border-white bg-transparent px-6 text-[16px] font-medium text-white no-underline outline-none transition-colors duration-200 hover:bg-white hover:text-[#082b52] focus-visible:bg-white focus-visible:text-[#082b52]"
                  >
                    Start a project
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* scroll cue down the right edge */}
        <a
          href="#phase-1"
          aria-label="Scroll to the phases"
          className="absolute top-[16.1%] right-4 hidden w-[55px] flex-col items-center gap-8 overflow-hidden text-white no-underline opacity-60 outline-none transition-opacity duration-300 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,.45))] hover:opacity-100 focus-visible:opacity-100 min-[820px]:right-5 min-[820px]:flex"
          style={{ bottom: "7%" }}
        >
          <span aria-hidden="true" className="w-px flex-1 bg-white" />
          <span aria-hidden="true" className="flex h-24 w-24 shrink-0 rotate-90 items-center justify-center gap-2 text-base font-bold tracking-[.0625rem] whitespace-nowrap uppercase">
            Scroll <span aria-hidden="true">→</span>
          </span>
        </a>
      </section>
    </div>
  );
}
