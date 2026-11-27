import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import { Suspense } from "react";
import { Motion } from "@/components/Motion";
import { StartProject } from "@/components/StartProject";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Proactive Design and Building Systems (PDBS) — Design-Build in Maryland and DC",
    template: `%s — ${SITE_NAME}`,
  },
  description: "PDBS is a Baltimore design-build firm. Architecture and design, design-build and construction management across Maryland and DC, in one connected flow.",
  applicationName: "PDBS",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "Proactive Design and Building Systems (PDBS) — Design-Build in Maryland and DC",
    description: "A Baltimore design-build firm. Architecture and design, design-build and construction management across Maryland and DC.",
  },
  twitter: { card: "summary_large_image" },
};

/** Marks the document as able to play reveals; the page shows normally if the reveal script never starts. */
const motionFlag = `(function(){try{var d=document.documentElement;d.classList.add('rv');setTimeout(function(){if(!d.classList.contains('rv-ready'))d.classList.add('rv-off')},4000)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={fontVariables} suppressHydrationWarning>
      <head>
        <script id="motion-flag" dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body className="min-h-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:tracking-wide focus:text-foreground focus:uppercase"
        >
          Skip to content
        </a>
        {children}
        <Suspense fallback={null}>
          <Motion />
        </Suspense>
        <StartProject />
      </body>
    </html>
  );
}
