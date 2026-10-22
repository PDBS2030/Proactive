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

export const cormorant = localFont({
  src: [{ path: "./fonts/cormorant-500.ttf", weight: "500" }],
  variable: "--f-cormorant",
  display: "swap",
});

export const raleway = localFont({
  src: [
    { path: "./fonts/raleway-500.ttf", weight: "500" },
    { path: "./fonts/raleway-600.ttf", weight: "600" },
  ],
  variable: "--f-raleway",
  display: "swap",
});

export const poppins = localFont({
  src: [
    { path: "./fonts/poppins-300.ttf", weight: "300" },
    { path: "./fonts/poppins-400.ttf", weight: "400" },
    { path: "./fonts/poppins-500.ttf", weight: "500" },
    { path: "./fonts/poppins-600.ttf", weight: "600" },
  ],
  variable: "--f-poppins",
  display: "swap",
});

export const mulish = localFont({
  src: [
    { path: "./fonts/mulish-400.ttf", weight: "400" },
    { path: "./fonts/mulish-700.ttf", weight: "700" },
  ],
  variable: "--f-mulish",
  display: "swap",
});

export const geistMono = localFont({
  src: [{ path: "./fonts/geistmono-400.ttf", weight: "400" }],
  variable: "--f-geist-mono",
  display: "swap",
});

export const fontVariables = [hanken, montserrat, cormorant, raleway, poppins, mulish, geistMono]
  .map((f) => f.variable)
  .join(" ");
