import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/db";
import { projectSlug } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/services", "/projects", "/process", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    priority: path === "" ? 1 : 0.8,
  }));
  const projects = (await getProjects()).map((p) => ({ url: `${SITE_URL}/projects/${projectSlug(p)}`, priority: 0.6 }));
  return [...pages, ...projects];
}
