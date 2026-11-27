import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME } from "@/lib/site";

/**
 * The title, description and share card of one page. `title` is the short name of the page; the site adds
 * " — Proactive Design and Building Systems" after it (see the layout). The share picture is the site's own
 * (public/og.jpg) unless a page passes its own `image`.
 */
export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const full = `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: full,
      description,
      images: image ? [{ url: image }] : [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [image ?? OG_IMAGE.url] },
  };
}
