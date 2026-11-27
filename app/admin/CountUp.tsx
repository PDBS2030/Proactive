"use client";

import { useEffect, useState } from "react";

/** A number that counts up to its value when it appears, then stays. Reduced motion shows it at once. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (to === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const start = performance.now();
    const length = 1100;
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / length);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return <span className={className}>{n}</span>;
}
