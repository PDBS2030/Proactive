import type { Metadata } from "next";
import Script from "next/script";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROACTIVE — Design + Build",
  description: "PROACTIVE Design and Building Systems, Inc. — design-build across Maryland, DC and Virginia.",
};

/** Decides before first paint whether the intro will play, so the page never flashes underneath it. */
const introFlag = `(function(){try{var d=document.documentElement;var n=performance.getEntriesByType('navigation')[0];var seen=sessionStorage.getItem('define-rhythm-v1')==='seen';var forced=/[?&]intro\\b/.test(location.search);var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;var play=forced||(!seen&&!location.hash&&(!n||n.type==='navigate')&&!reduced);d.dataset.intro=play?'play':'none'}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={fontVariables} suppressHydrationWarning>
      <head>
        <Script id="intro-flag" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: introFlag }} />
      </head>
      <body className="min-h-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:tracking-wide focus:text-foreground focus:uppercase"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
