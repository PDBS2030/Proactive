"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { OFFERINGS } from "@/lib/data";
import { SERVICE_LIST } from "@/lib/services";
import { cn } from "@/lib/cn";

/** One deep-blue field per service, from dark to light. */
const FIELDS = ["bg-[#04142a]", "bg-[#0b2a4d]", "bg-[#1d4470]"];
const RGB = [
  [4, 20, 42],
  [11, 42, 77],
  [29, 68, 112],
];

/** Where each change happens along the scroll (2,000px in all): about 8 wheel notches for each change, 3 held between, and only 1 at the end so the next section follows straight after. The first change starts at once. */
const CHANGE_A: [number, number] = [0, 0.4];
const CHANGE_B: [number, number] = [0.55, 0.95];

/** Which side the words sit on for each service: left, right, left. The photograph takes the other side. */
const WORDS_RIGHT = [false, true, false];

/** Where on the scroll each service rests: inside its own held stretch. */
const REST = [0, 0.475, 0.985];

const BUTTON =
  "mt-9 inline-flex min-h-[54px] items-center justify-center border border-gold px-8 text-[.8125rem] font-medium tracking-[.08em] uppercase transition-colors duration-300";

const clamp = (n: number) => Math.min(1, Math.max(0, n));
/** Slow in, long glide, slow out, but with a start you can see as soon as you scroll. */
const ease = (n: number) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(n));
const between = (p: number, [from, to]: [number, number]) => (p - from) / (to - from);

/**
 * Our services: one panel, that holds all three. On wide screens the panel stays on
 * the screen while you scroll, and the scroll itself drives the change, so it can be as slow or as quick as you
 * choose, with a little weight added so it never jerks. The photograph glides across from one edge of the screen to
 * the other while the words leave and come in on the opposite side, the photographs cross over with a slow push-in,
 * and the blue field changes shade. The words line up with the page gutter. On phones the three services are
 * stacked panels, each with its photograph above its text.
 */
export function Offerings() {
  const track = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const photos = useRef<Array<HTMLDivElement | null>>([]);
  const words = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  const [barOn, setBarOn] = useState(false);
  const stop = useRef(false);
  const h2 = useRef<HTMLHeadingElement>(null);
  const clone = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const tabsRef = useRef<HTMLElement>(null);

  // The heading becomes the bar's label: as it nears the top it travels up, shrinks and dims into the label's place,
  // and the bar and its tabs come in around it. At the end of the panel the whole bar goes again.
  useEffect(() => {
    const el = track.current;
    const pin = pinned.current;
    const head = h2.current;
    const label = clone.current;
    const bg = bgRef.current;
    const tabs = tabsRef.current;
    if (!el || !pin || !head || !label || !bg || !tabs) return;
    const wide = window.matchMedia("(min-width: 992px)");
    const update = () => {
      if (!wide.matches) {
        head.style.opacity = "1";
        return;
      }
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 104;
      const from = headerBottom + 170;
      const to = headerBottom + 20;
      const at = head.getBoundingClientRect();
      const m = clamp((from - at.top) / (from - to));
      const e = ease(m);
      // the bar stays whole for as long as the panel is pinned, and fades only over the 120px after the panel lets go
      const stuck = parseFloat(getComputedStyle(pin).top) || 0;
      const letGo = stuck + pin.offsetHeight - el.getBoundingClientRect().bottom;
      const going = 1 - clamp(letGo / 120);

      const headPx = parseFloat(getComputedStyle(head).fontSize) || 40;
      const labelPx = Math.min(22, Math.max(16, window.innerWidth * 0.016));
      const scale = 1 + (labelPx / headPx - 1) * e;
      const centre = at.top + at.height / 2;
      const y = centre + (headerBottom + 30 - centre) * e;
      label.style.transform = `translate3d(${at.left}px,${y - label.offsetHeight / 2}px,0) scale(${scale})`;
      const to255 = (from8: number) => Math.round(from8 + (255 - from8) * e);
      label.style.color = `rgba(${to255(8)},${to255(43)},${to255(82)},${1 - 0.6 * e})`;
      label.style.opacity = String(going);
      head.style.opacity = "0";

      bg.style.opacity = String(Math.min(going, clamp(m * 1.3)));
      tabs.style.opacity = String(Math.min(going, clamp((m - 0.55) / 0.45)));
      setBarOn(m > 0.7 && going > 0.5);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // A tab takes the page to the middle of that service's stretch of scroll, with the same slow glide as the panel itself.
  const goTo = (i: number) => {
    const el = track.current;
    const pin = pinned.current;
    if (!el || !pin) return;
    const distance = el.offsetHeight - pin.offsetHeight;
    // the panel starts to travel once the track's top reaches the panel's own sticky offset
    const stuckAt = parseFloat(getComputedStyle(pin).top) || 0;
    const to = el.getBoundingClientRect().top + window.scrollY - stuckAt + distance * REST[i];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: to, behavior: "instant" });
      return;
    }
    const from = window.scrollY;
    const duration = Math.min(4200, 1800 + Math.abs(to - from) * 0.3);
    const begin = performance.now();
    stop.current = false;
    const cancel = () => {
      stop.current = true;
    };
    window.addEventListener("wheel", cancel, { once: true, passive: true });
    window.addEventListener("touchstart", cancel, { once: true, passive: true });
    const step = (now: number) => {
      if (stop.current) return;
      const t = Math.min(1, (now - begin) / duration);
      window.scrollTo({ top: from + (to - from) * ease(t), behavior: "instant" });
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const el = track.current;
    const pin = pinned.current;
    const fr = frame.current;
    if (!el || !pin || !fr) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0;
    let shown = 0;
    let raf = 0;
    let last = 0;
    let lastActive = 0;

    const readTarget = () => {
      const distance = el.offsetHeight - pin.offsetHeight;
      if (distance <= 0) return 0;
      return clamp((pin.getBoundingClientRect().top - el.getBoundingClientRect().top) / distance);
    };

    const paint = (p: number) => {
      const u = ease(between(p, CHANGE_A));
      const v = ease(between(p, CHANGE_B));
      // 1 = photograph on the right, 0 = on the left
      const pos = 1 - u + v;

      fr.style.transform = `translate3d(${pos * 100}%,0,0)`;
      const round = pin.offsetHeight / 2;
      fr.style.borderRadius = `${round * pos}px ${round * (1 - pos)}px ${round * (1 - pos)}px ${round * pos}px`;

      const seen = [1 - u, u * (1 - v), v];
      photos.current.forEach((node, i) => {
        if (!node) return;
        node.style.opacity = String(seen[i]);
        node.style.transform = `translate3d(${(pos - 0.5) * -9}%,0,0) scale(${1 + 0.1 * (1 - seen[i])})`;
      });

      // the words: the old ones leave first, then the new ones come in a line at a time
      const incoming = [1, clamp(u * 2 - 1), clamp(v * 2 - 1)];
      const outgoing = [clamp(u * 2), clamp(v * 2), 0];
      words.current.forEach((node, i) => {
        if (!node) return;
        const sign = WORDS_RIGHT[i] ? 1 : -1;
        node.querySelectorAll<HTMLElement>("[data-line]").forEach((line, k) => {
          const visible = clamp((incoming[i] - k * 0.13) / 0.6) * (1 - outgoing[i]);
          line.style.opacity = String(visible);
          line.style.transform = `translate3d(${sign * 56 * (1 - visible)}px,0,0)`;
        });
      });

      const mix = (a: number, b: number, t: number) => a + (b - a) * t;
      const rgb = [0, 1, 2].map((c) => Math.round(mix(mix(RGB[0][c], RGB[1][c], u), RGB[2][c], v)));
      pin.style.backgroundColor = `rgb(${rgb.join(",")})`;

      const now = p < 0.2 ? 0 : p < 0.75 ? 1 : 2;
      if (now !== lastActive) {
        lastActive = now;
        setActive(now);
      }
    };

    const loop = (t: number) => {
      const dt = last ? Math.min(64, t - last) : 16;
      last = t;
      target = readTarget();
      // ease the scroll's position into the picture: a time constant of about a second, so even a hard flick of the wheel arrives slowly
      shown = reduced ? target : shown + (target - shown) * (1 - Math.exp(-dt / 800));
      if (Math.abs(target - shown) < 0.0004) shown = target;
      paint(shown);
      if (shown !== target) raf = requestAnimationFrame(loop);
      else {
        raf = 0;
        last = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    shown = target = readTarget();
    paint(shown);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="offerings-vars relative z-4 bg-white text-[#082b52]">
      {/* the heading as it travels into the bar: the same words, carried up and shrunk into the label's place */}
      <p
        ref={clone}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[55] hidden origin-left font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal whitespace-nowrap uppercase will-change-transform min-[992px]:block"
        style={{ opacity: 0 }}
      >
        {OFFERINGS.heading}
      </p>

      {/* tabs: while the panel is on the screen they take you straight to a service, with no scrolling */}
      <div
        aria-hidden={!barOn}
        className={cn("fixed inset-x-0 top-[104px] z-50 hidden min-[992px]:block", !barOn && "pointer-events-none")}
      >
        <span ref={bgRef} aria-hidden="true" className="absolute inset-0 bg-[#04142a]" style={{ opacity: 0 }} />
        <div className="relative px-[124px]">
          <div className="mx-auto flex h-[60px] w-full max-w-[1680px] items-center gap-[clamp(24px,3vw,48px)]">
            {/* holds the label's place; the heading itself lands here */}
            <span aria-hidden="true" className="invisible font-jost text-[clamp(16px,1.6vw,22px)] leading-none whitespace-nowrap uppercase">Our Services</span>
            <nav ref={tabsRef} aria-label="Our services" className="flex h-full items-center gap-[clamp(20px,2.6vw,40px)]" style={{ opacity: 0 }}>
              {OFFERINGS.items.map((item, i) => (
                <button
                  key={item.href}
                  type="button"
                  tabIndex={barOn ? 0 : -1}
                  aria-current={active === i ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className={cn(
                    "relative flex h-full cursor-pointer items-center text-[clamp(.7rem,.9vw,.8125rem)] font-medium tracking-[.1em] whitespace-nowrap uppercase outline-none transition-colors duration-300 focus-visible:text-white",
                    active === i ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  {item.title}
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-x-0 bottom-3.5 h-px origin-left bg-gold transition-transform duration-500", active === i ? "scale-x-100" : "scale-x-0")}
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="px-4 pt-16 pb-8 min-[768px]:px-[124px] min-[768px]:pt-[110px] min-[768px]:pb-[52px]">
        <div className="mx-auto w-full max-w-[1680px]">
          <h2 ref={h2} className="font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase text-[#082b52] [text-wrap:initial]">
            {OFFERINGS.heading}
          </h2>
        </div>
      </div>

      {/* wide screens: one panel, the height of a single service, moved on by scrolling */}
      <div
        ref={track}
        className="relative hidden h-[calc(2000px+var(--ph))] bg-[#ececf0] min-[992px]:block"
        style={{ ["--ph" as string]: "min(1000px, max(calc(clamp(460px, 36vw, 600px) + 60px), calc(100svh - 216px)))" } as CSSProperties}
      >
        <div
          ref={pinned}
          className="sticky overflow-hidden bg-[#04142a] text-white"
          style={{ height: "var(--ph)", top: "192px" }}
        >
          <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          {/* the photograph: one frame, half the screen wide and flush with the screen's edge, that glides across */}
          <div ref={frame} aria-hidden="true" className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#04142a] will-change-transform" style={{ transform: "translate3d(100%,0,0)" }}>
            {OFFERINGS.items.map((item, i) => (
              <div
                key={item.href}
                ref={(node) => {
                  photos.current[i] = node;
                }}
                className="absolute inset-y-0 -inset-x-[5%] will-change-[transform,opacity]"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Image src={item.image} alt="" fill sizes="55vw" className="object-cover object-[center_40%]" />
              </div>
            ))}
          </div>

          {/* the words sit inside the page gutter, on the side the photograph is not */}
          <div className="absolute inset-0 px-[124px]">
            <div className="relative mx-auto h-full w-full max-w-[1680px]">
              {OFFERINGS.items.map((item, i) => {
                const service = SERVICE_LIST[i];
                const on = active === i;
                return (
                  <div
                    key={item.href}
                    ref={(node) => {
                      words.current[i] = node;
                    }}
                    aria-hidden={!on}
                    className={cn("absolute inset-y-0 flex w-[calc(50%-72px)] flex-col justify-center [container-type:inline-size]", WORDS_RIGHT[i] ? "right-0 items-end text-right" : "left-0", !on && "pointer-events-none")}
                  >
                    <p data-line className="font-jost text-[length:max(18px,calc(var(--h2)*.5))] leading-[1.2] font-medium tracking-[.14em] text-gold uppercase" style={{ opacity: i === 0 ? 1 : 0 }}>
                      {item.title}
                    </p>
                    <h3 data-line className="mt-5 max-w-[22ch] font-jost text-[length:max(28px,calc(var(--h2)*1.1))] leading-[1.14] font-normal" style={{ opacity: i === 0 ? 1 : 0 }}>
                      {service?.headline}
                    </h3>
                    <p data-line className="mt-6 font-mulish text-[length:min(17px,max(12px,2.7cqw))] leading-[1.65] whitespace-nowrap text-white/75 max-[1279px]:text-[15px] max-[1279px]:whitespace-normal" style={{ opacity: i === 0 ? 1 : 0 }}>
                      {service?.bestFor}
                    </p>
                    <div data-line style={{ opacity: i === 0 ? 1 : 0 }}>
                      <Link
                        href={item.href}
                        tabIndex={on ? 0 : -1}
                        className={cn(BUTTON, "no-underline outline-offset-4 hover:bg-gold hover:text-[#04142a] focus-visible:bg-gold focus-visible:text-[#04142a] focus-visible:outline-2 focus-visible:outline-white")}
                      >
                        Explore {item.title}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* phones and tablets: three stacked panels */}
      <ul className="min-[992px]:hidden">
        {OFFERINGS.items.map((item, i) => {
          const service = SERVICE_LIST[i];
          return (
            <li key={item.href}>
              <Link href={item.href} className={`group relative isolate flex flex-col overflow-hidden text-white no-underline outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-gold ${FIELDS[i] ?? FIELDS[0]}`}>
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image src={item.image} alt={item.alt} fill sizes="100vw" className="object-cover object-[center_40%]" />
                </div>
                <div className="px-4 py-12 min-[768px]:px-[124px]">
                  <p className="font-jost text-[18px] leading-[1.2] font-medium tracking-[.14em] text-gold uppercase">{item.title}</p>
                  <h3 className="mt-5 max-w-[22ch] font-jost text-[28px] leading-[1.14] font-normal min-[768px]:text-[36px]">{service?.headline}</h3>
                  <p className="mt-6 max-w-[44ch] font-mulish text-[17px] leading-[1.65] text-white/75">{service?.bestFor}</p>
                  <span className={cn(BUTTON, "group-active:bg-gold group-active:text-[#04142a]")}>Explore {item.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
