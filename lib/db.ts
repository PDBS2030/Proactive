import fs from "node:fs";
import path from "node:path";
import { INSIGHTS, PROJECT_TABS } from "@/lib/data";
import { PROJECTS, type Project, type Sector } from "@/lib/pages";
import type { Video } from "@/lib/video";

/**
 * The store behind the admin dashboard. For now it is one JSON file (data/db.json) on the developer's machine, so the
 * dashboard can be built and approved on localhost. Anything not yet edited falls back to the content that is written
 * in the code, so the live site reads exactly what it always has. The file cannot be written on the host, so the
 * dashboard is switched off there until a real database is connected: swap `readDb` and `writeDb` for it.
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

/** The dashboard can only save where the project's folder is writable, which is the developer's machine. */
export const canWrite = !process.env.VERCEL && process.env.NODE_ENV !== "production";

const empty = (): Db => ({ projects: null, featured: {}, news: null, messages: [], videos: [] });

export function readDb(): Db {
  try {
    return { ...empty(), ...(JSON.parse(fs.readFileSync(FILE, "utf8")) as Partial<Db>) };
  } catch {
    return empty();
  }
}

export function writeDb(db: Db) {
  if (!canWrite) throw new Error("The store cannot be written here.");
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2));
}

export const update = (change: (db: Db) => void) => {
  const db = readDb();
  change(db);
  writeDb(db);
};

/* ── what the rest of the site reads ── */

export function getProjects(): Project[] {
  return readDb().projects ?? PROJECTS;
}

const defaultNews = (): NewsItem[] =>
  INSIGHTS.items.map((n, i) => ({ id: `n${i + 1}`, title: n.title, date: n.iso, kind: "News", summary: "", href: n.href, image: n.image }));

export function getNews(): NewsItem[] {
  return [...(readDb().news ?? defaultNews())].sort((a, b) => b.date.localeCompare(a.date));
}

/** The three newest, as the home page's cards want them. */
export function getLatestNews() {
  const fmt = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  return getNews()
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
export function getFeaturedLines(): Record<string, string> {
  const db = readDb();
  const projects = db.projects ?? PROJECTS;
  const lines: Record<string, string> = {};
  for (const tab of PROJECT_TABS) {
    const chosen = projects.find((p) => p.id === db.featured[tab.key]);
    lines[tab.key] = chosen ? `${chosen.title} – ${chosen.city}` : tab.featured;
  }
  return lines;
}

export const getVideos = (): Video[] => readDb().videos;
export const getProjectVideos = (projectId: string): Video[] => readDb().videos.filter((v) => v.projectId === projectId);
export const getHomeVideos = (): Video[] => readDb().videos.filter((v) => v.onHome);

export function addMessage(m: Omit<Message, "id" | "at" | "handled">): boolean {
  if (!canWrite) return false;
  update((db) => {
    db.messages.unshift({ ...m, id: `m${Date.now()}`, at: new Date().toISOString(), handled: false });
  });
  return true;
}
