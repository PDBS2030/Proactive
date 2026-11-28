import { Jost, Montserrat, Mulish } from "next/font/google";
import localFont from "next/font/local";

export const hanken = localFont({
  src: "./fonts/hanken-latin.woff2",
  weight: "100 900",
  variable: "--f-hanken",
  display: "swap",
});

// Served from this site by Next.js at build time: the same typefaces as before, as small latin-only web fonts
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "800"],
  variable: "--f-montserrat",
  display: "swap",
});

export const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--f-mulish",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--f-jost",
  display: "swap",
});

export const fontVariables = [hanken, montserrat, mulish, jost].map((f) => f.variable).join(" ");
