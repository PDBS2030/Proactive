import { FeaturedPicker } from "../../FeaturedPicker";
import { Notice, Page } from "../../ui";
import { PROJECT_TABS } from "@/lib/data";
import { CATEGORY_TAB, getProjects, readDb } from "@/lib/db";

export default async function FeaturedAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const db = readDb();
  const projects = getProjects().map((p) => ({ id: p.id, title: p.title, city: p.city, image: p.image, sector: p.sector }));
  return (
    <Page
      eyebrow="Home page"
      title="Featured property"
      lead="Each category of the gallery on the home page has one featured property, shown in the line that starts with &quot;Featured:&quot;. Pick it from that category&apos;s own properties and see the photograph and the exact line before you save. You can also set it with the star on a project."
    >
      {saved && <Notice>Saved. The home page now shows these.</Notice>}
      <FeaturedPicker tabs={PROJECT_TABS.map((t) => ({ key: t.key, label: t.label, fallback: t.featured, category: Object.entries(CATEGORY_TAB).find(([, k]) => k === t.key)?.[0] ?? "" }))} projects={projects} initial={db.featured} />
    </Page>
  );
}
