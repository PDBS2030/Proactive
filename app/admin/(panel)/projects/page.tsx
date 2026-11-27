import Link from "next/link";
import { Icons } from "../../icons";
import { Notice, Page, primary } from "../../ui";
import { ProjectGrid } from "../../ProjectGrid";
import { CATEGORY_TAB, getProjects, readDb } from "@/lib/db";
import { projectPlace } from "@/lib/pages";

export default async function ProjectsAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const { saved, deleted } = await searchParams;
  const featured = readDb().featured;
  const cards = getProjects().map((p) => ({ id: p.id, title: p.title, place: projectPlace(p), sector: p.sector, service: p.service, year: p.year, image: p.image, tab: CATEGORY_TAB[p.sector] }));
  return (
    <Page
      eyebrow="Portfolio"
      title="Projects"
      lead="Every project on the Projects page, on each service's list and on its own page. Hover a photograph to edit or delete it, and use the star to make it the featured property of its category. Each category has just one."
      action={
        <Link href="/admin/projects/new" className={primary}>
          {Icons.plus}
          <span>Add a project</span>
        </Link>
      }
    >
      {saved && <Notice>Saved.</Notice>}
      {deleted && <Notice>Project deleted.</Notice>}
      <ProjectGrid projects={cards} featured={featured} />
    </Page>
  );
}
