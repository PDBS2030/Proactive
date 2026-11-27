"use server";

import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, isAdmin, passwordOk, startSession } from "@/lib/admin-auth";
import { PROJECT_TABS } from "@/lib/data";
import { CATEGORY_TAB, getNews, getProjects, readDb, update, type NewsItem } from "@/lib/db";
import { PROJECTS, type Project, type Region, type Sector, type ServiceType } from "@/lib/pages";
import { youtubeId, type Video } from "@/lib/video";

const SECTORS: Sector[] = ["Residential", "Loft & industrial conversions", "Landmark & brownstone", "Commercial"];
const REGIONS: Region[] = ["Maryland", "DC"];
const SERVICES: ServiceType[] = ["Architecture & Design", "Design-Build", "Construction Management"];

async function guard() {
  if (!(await isAdmin())) redirect("/admin/login");
}

const text = (f: FormData, k: string, max = 400) => String(f.get(k) ?? "").replace(/\s+/g, " ").trim().slice(0, max);
const pick = <T extends string>(f: FormData, k: string, options: readonly T[]) => {
  const v = text(f, k) as T;
  return options.includes(v) ? v : options[0];
};

/** Saves an uploaded picture under public/uploads and returns its address; keeps `current` when nothing was chosen. */
async function picture(f: FormData, field: string, current: string) {
  const file = f.get(field);
  if (!(file instanceof File) || file.size === 0) return current;
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 8 * 1024 * 1024) return current;
  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "photo";
  const name = `${Date.now()}-${base}.${ext}`;
  fs.writeFileSync(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

/** Saves an uploaded video file under public/uploads/videos and returns its address; keeps `current` when nothing was chosen. */
async function film(f: FormData, field: string, current: string) {
  const file = f.get(field);
  if (!(file instanceof File) || file.size === 0) return current;
  if (!/^video\/(mp4|webm|quicktime)$/.test(file.type) || file.size > 190 * 1024 * 1024) return current;
  const dir = path.join(process.cwd(), "public", "uploads", "videos");
  fs.mkdirSync(dir, { recursive: true });
  const ext = file.type === "video/webm" ? "webm" : file.type === "video/quicktime" ? "mov" : "mp4";
  const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "film";
  const name = `${Date.now()}-${base}.${ext}`;
  fs.writeFileSync(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/videos/${name}`;
}

const refresh = () => revalidatePath("/", "layout");

/* ── sign in and out ── */

export async function login(_state: { error?: string } | undefined, form: FormData) {
  if (!passwordOk(String(form.get("password") ?? ""))) return { error: "That password is not right." };
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

/* ── projects ── */

export async function saveProject(form: FormData) {
  await guard();
  const id = text(form, "id", 40);
  const existing = readDb().projects?.find((p) => p.id === id) ?? PROJECTS.find((p) => p.id === id);
  const title = text(form, "title", 120);
  const city = text(form, "city", 80);
  if (!title || !city) redirect(id ? `/admin/projects/${id}?error=1` : "/admin/projects/new?error=1");
  const project: Project = {
    id: existing?.id ?? `p${Date.now()}`,
    title,
    city,
    region: pick(form, "region", REGIONS),
    sector: pick(form, "sector", SECTORS),
    service: pick(form, "service", SERVICES),
    image: (await picture(form, "image", text(form, "imagePath", 300))) || existing?.image || "/assets/gallery/residential/1.jpg",
    hero: (await picture(form, "hero", text(form, "heroPath", 300))) || undefined,
    year: Math.min(2100, Math.max(1900, Number(text(form, "year", 4)) || new Date().getFullYear())),
    size: text(form, "size", 60),
    scope: text(form, "scope", 200),
  };
  update((db) => {
    const list = db.projects ?? [...PROJECTS];
    const at = list.findIndex((p) => p.id === project.id);
    if (at >= 0) list[at] = project;
    else list.unshift(project);
    db.projects = list;
    // "Make this the featured property of its category": ticked takes the slot, unticked gives it up; a change of category moves it
    if (form.get("featuredPresent")) {
      for (const tab of Object.values(CATEGORY_TAB)) if (db.featured[tab] === project.id) delete db.featured[tab];
      if (form.get("makeFeatured")) db.featured[CATEGORY_TAB[project.sector]] = project.id;
    }
  });
  refresh();
  redirect("/admin/projects?saved=1");
}

export async function deleteProject(form: FormData) {
  await guard();
  const id = text(form, "id", 40);
  update((db) => {
    db.projects = (db.projects ?? [...PROJECTS]).filter((p) => p.id !== id);
    for (const k of Object.keys(db.featured)) if (db.featured[k] === id) delete db.featured[k];
  });
  refresh();
  redirect("/admin/projects?deleted=1");
}

/* ── the featured property on each tab of the home page ── */

/** The star on a project: make it the featured property of its category (replacing the one there), or let go of it. */
export async function toggleFeatured(id: string) {
  await guard();
  const project = getProjects().find((p) => p.id === id);
  if (!project) return;
  const tab = CATEGORY_TAB[project.sector];
  update((db) => {
    if (db.featured[tab] === id) delete db.featured[tab];
    else db.featured[tab] = id;
  });
  refresh();
}

export async function saveFeatured(form: FormData) {
  await guard();
  update((db) => {
    for (const tab of PROJECT_TABS) {
      const id = text(form, tab.key, 40);
      if (id) db.featured[tab.key] = id;
      else delete db.featured[tab.key];
    }
  });
  refresh();
  redirect("/admin/featured?saved=1");
}

/* ── news and events ── */

export async function saveNews(form: FormData) {
  await guard();
  const id = text(form, "id", 40);
  const existing = getNews().find((n) => n.id === id);
  const title = text(form, "title", 200);
  const date = text(form, "date", 10);
  if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(date)) redirect(id ? `/admin/news/${id}?error=1` : "/admin/news/new?error=1");
  const item: NewsItem = {
    id: existing?.id ?? `n${Date.now()}`,
    title,
    date,
    kind: text(form, "kind") === "Event" ? "Event" : "News",
    summary: text(form, "summary", 500),
    href: text(form, "href", 300),
    image: await picture(form, "image", text(form, "imagePath", 300)),
  };
  update((db) => {
    const list = db.news ?? getNews();
    const at = list.findIndex((n) => n.id === item.id);
    if (at >= 0) list[at] = item;
    else list.push(item);
    db.news = list;
  });
  refresh();
  redirect("/admin/news?saved=1");
}

export async function deleteNews(form: FormData) {
  await guard();
  const id = text(form, "id", 40);
  update((db) => {
    db.news = (db.news ?? getNews()).filter((n) => n.id !== id);
  });
  refresh();
  redirect("/admin/news?deleted=1");
}

/* ── videos ── */

export async function saveVideo(form: FormData) {
  await guard();
  const id = text(form, "id", 40);
  const here = id ? `/admin/videos/${id}` : "/admin/videos/new";
  const kind = text(form, "kind") === "file" ? "file" : "youtube";
  const title = text(form, "title", 160);
  if (!title) redirect(`${here}?error=title`);

  let src = "";
  if (kind === "youtube") {
    src = youtubeId(text(form, "youtube", 300));
    if (!src) redirect(`${here}?error=youtube`);
  } else {
    src = await film(form, "file", text(form, "srcPath", 300));
    if (!src) redirect(`${here}?error=file`);
  }

  const video: Video = {
    id: id || `v${Date.now()}`,
    title,
    kind,
    src,
    poster: await picture(form, "posterFile", text(form, "posterPath", 300)),
    description: text(form, "description", 400),
    projectId: text(form, "projectId", 40),
    onHome: form.get("onHome") === "on",
  };
  update((db) => {
    const at = db.videos.findIndex((v) => v.id === video.id);
    if (at >= 0) db.videos[at] = video;
    else db.videos.unshift(video);
  });
  refresh();
  redirect("/admin/videos?saved=1");
}

export async function deleteVideo(form: FormData) {
  await guard();
  const id = text(form, "id", 40);
  update((db) => {
    db.videos = db.videos.filter((v) => v.id !== id);
  });
  refresh();
  redirect("/admin/videos?deleted=1");
}

/* ── messages ── */

export async function setHandled(form: FormData) {
  await guard();
  const id = text(form, "id", 40);
  const handled = text(form, "handled") === "1";
  update((db) => {
    const m = db.messages.find((x) => x.id === id);
    if (m) m.handled = handled;
  });
  revalidatePath("/admin", "layout");
  redirect("/admin/messages");
}

export async function deleteMessage(form: FormData) {
  await guard();
  const id = text(form, "id", 40);
  update((db) => {
    db.messages = db.messages.filter((m) => m.id !== id);
  });
  revalidatePath("/admin", "layout");
  redirect("/admin/messages");
}
