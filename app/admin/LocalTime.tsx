"use client";

import { useSyncExternalStore } from "react";

const never = () => () => {};

/** The server only knows its own clock and time zone, so these read the clock of the computer that is looking at the page. */
function useLocal(read: () => string, fallback: string) {
  return useSyncExternalStore(never, read, () => fallback);
}

const greetingNow = () => {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
};

const dateNow = () => new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

/** "Good morning", "Good afternoon" or "Good evening" by the viewer's own time. Until the page reaches the browser it says "Welcome back". */
export function Greeting({ className }: { className?: string }) {
  return <h1 className={className}>{useLocal(greetingNow, "Welcome back")}.</h1>;
}

/** Today's date as the viewer's computer has it. */
export function TodayLabel({ className, fallback }: { className?: string; fallback: string }) {
  return <p className={className}>{useLocal(dateNow, fallback)}</p>;
}
