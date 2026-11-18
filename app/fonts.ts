import localFont from "next/font/local";

export const hanken = localFont({
  src: "./fonts/hanken-latin.woff2",
  weight: "100 900",
  variable: "--f-hanken",
  display: "swap",
});

export const montserrat = localFont({
  src: [
    { path: "./fonts/montserrat-500.ttf", weight: "500" },
    { path: "./fonts/montserrat-800.ttf", weight: "800" },
  ],
  variable: "--f-montserrat",
  display: "swap",
});

export const mulish = localFont({
  src: [
    { path: "./fonts/mulish-400.ttf", weight: "400" },
    { path: "./fonts/mulish-800.ttf", weight: "800" },
  ],
  variable: "--f-mulish",
  display: "swap",
});

export const jost = localFont({
  src: [
    { path: "./fonts/jost-400.ttf", weight: "400" },
    { path: "./fonts/jost-500.ttf", weight: "500" },
  ],
  variable: "--f-jost",
  display: "swap",
});

export const fontVariables = [hanken, montserrat, mulish, jost].map((f) => f.variable).join(" ");
