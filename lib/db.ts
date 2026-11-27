import fs from "node:fs";
import path from "node:path";
import { INSIGHTS, PROJECT_TABS } from "@/lib/data";
import { PROJECTS, type Project, type Sector } from "@/lib/pages";
import type { Video } from "@/lib/video";

import { cacheLife, cacheTag } from "next/cache";
import { get, put } from "@vercel/blob";

/**
 * The store behind the admin dashboard. On the developer's machine it is one JSON file (data/db.json). On the host it is
 * one private Vercel Blob (db.json), so it survives deploys and is never public. Anything not yet edited falls back to
 * the content written in the code, so the site reads exactly what it always has. The public pages read a cached copy
 * (tag "db") that every dashboard save refreshes; the dashboard itself always reads the stored file.
 */

export type NewsItem = {
  id: string;
  title: string;
  /** yyyy-mm-dd */
  date: string;
  kind: "News" | "Event";
  summary: string;
  /** where the card goes; empty keeps it on the home page */
  href: string;
  image: string;
};

export type Message = {
  id: string;
  at: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  handled: boolean;
};

type Db = {
  projects: Project[] | null;
  /** for each tab of the home page's project gallery, the id of the project featured there */
  featured: Record<string, string>;
  news: NewsItem[] | null;
  messages: Message[];
  videos: Video[];
};

/** The four categories are the four category tabs of the home page gallery; each has exactly one featured property. */
export const CATEGORY_TAB: Record<Sector, string> = {
  Residential: "residential",
  "Loft & industrial conversions": "loft",
  "Landmark & brownstone": "landmark",
  Commercial: "commercial",
};

const FILE = path.join(process.cwd(), "data", "db.json");
const BLOB_NAME = "db.json";

/** On the host the data lives in a private Blob store; on the developer's machine, in a file. */
export const onHost = Boolean(process.env.VERCEL);
const dataToken = () => process.env.PDBS_DATA_BLOB_TOKEN;

/** Whether the dashboard has somewhere to save: always on the developer's machine, on the host once the data store is connected. */
export const canWrite = onHost ? Boolean(dataToken()) : process.env.NODE_ENV !== "production";

const empty = (): Db => ({ projects: null, featured: {}, news: null, messages: [], videos: [] });

export async function readDb(): Promise<Db> {
  try {
    if (onHost) {
      const res = await get(BLOB_NAME, { access: "private", token: dataToken(), useCache: false });
      if (!res || res.statusCode !== 200) return empty();
      return { ...empty(), ...(JSON.parse(await new Response(res.stream).text()) as Partial<Db>) };
    }
    return { ...empty(), ...(JSON.parse(fs.readFileSync(FILE, "utf8")) as Partial<Db>) };
  } catch {
    return empty();
  }
}

export async function writeDb(db: Db) {
  if (!canWrite) throw new Error("The store cannot be written here.");
  if (onHost) {
    await put(BLOB_NAME, JSON.stringify(db), {
      access: "private",
      token: dataToken(),
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  }
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2));
}

export const update = async (change: (db: Db) => void) => {
  const db = await readDb();
  change(db);
  await writeDb(db);
};

/** What the public pages read: the stored content without the visitors' messages, kept until a dashboard save refreshes it. */
async function readPublic(): Promise<Omit<Db, "messages">> {
  "use cache";
  cacheTag("db");
  cacheLife("days");
  const { messages: _messages, ...rest } = await readDb();
  return rest;
}

/* ── what the rest of the site reads ── */

export async function getProjects(): Promise<Project[]> {
  return (await readPublic()).projects ?? PROJECTS;
}

const defaultNews = (): NewsItem[] =>
  INSIGHTS.items.map((n, i) => ({ id: `n${i + 1}`, title: n.title, date: n.iso, kind: "News", summary: "", href: n.href, image: n.image }));

export async function getNews(): Promise<NewsItem[]> {
  return [...((await readPublic()).news ?? defaultNews())].sort((a, b) => b.date.localeCompare(a.date));
}

/** The three newest, as the home page's cards want them. */
export async function getLatestNews() {
  const fmt = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  return (await getNews())
    .slice(0, 3)
    .map((n) => ({
      image: n.image || "/assets/offerings-development.jpg",
      date: fmt.format(new Date(`${n.date}T00:00:00Z`)),
      iso: n.date,
      kind: n.kind,
      title: n.title,
      href: n.href || "/",
    }));
}

/** The line shown after "Featured:" on each tab: the chosen project, or the wording written in the code. */
export async function getFeaturedLines(): Promise<Record<string, string>> {
  const db = await readPublic();
  const projects = db.projects ?? PROJECTS;
  const lines: Record<string, string> = {};
  for (const tab of PROJECT_TABS) {
    const chosen = projects.find((p) => p.id === db.featured[tab.key]);
    lines[tab.key] = chosen ? `${chosen.title} – ${chosen.city}` : tab.featured;
  }
  return lines;
}

export const getVideos = async (): Promise<Video[]> => (await readPublic()).videos;
export const getProjectVideos = async (projectId: string): Promise<Video[]> => (await getVideos()).filter((v) => v.projectId === projectId);
export const getHomeVideos = async (): Promise<Video[]> => (await getVideos()).filter((v) => v.onHome);

export async function addMessage(m: Omit<Message, "id" | "at" | "handled">): Promise<boolean> {
  if (!canWrite) return false;
  await update((db) => {
    db.messages.unshift({ ...m, id: `m${Date.now()}`, at: new Date().toISOString(), handled: false });
  });
  return true;
}
