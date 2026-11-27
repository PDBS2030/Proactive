import Link from "next/link";
import { notFound } from "next/navigation";
import { saveProject } from "../../../actions";
import { Field, ghost, input, Notice, Page, primary } from "../../../ui";
import { CATEGORY_TAB, getProjects, readDb } from "@/lib/db";

const SECTORS = ["Residential", "Loft & industrial conversions", "Landmark & brownstone", "Commercial"];
const REGIONS = ["Maryland", "DC"];
const SERVICES = ["Architecture & Design", "Design-Build", "Construction Management"];

export default async function ProjectForm({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const { id } = await params;
  const { error } = await searchParams;
  const isNew = id === "new";
  const p = isNew ? undefined : getProjects().find((x) => x.id === id);
  const featured = readDb().featured;
  const all = getProjects();
  if (!isNew && !p) notFound();

  return (
    <Page title={isNew ? "Add a project" : "Edit project"} lead="Fill in the property, add its photographs, and tick “Featured property” at the foot if it should be the one featured for its category. Photographs are saved to this computer's public/uploads folder.">
      {error && <Notice tone="bad">A title and a city are needed.</Notice>}
      <form action={saveProject} className="grid gap-5 border border-[#082b52]/15 bg-white p-6 min-[700px]:grid-cols-2 min-[700px]:p-8">
        <input type="hidden" name="id" value={p?.id ?? ""} />
        <input type="hidden" name="imagePath" value={p?.image ?? ""} />
        <input type="hidden" name="heroPath" value={p?.hero ?? ""} />

        <Field id="title" name="Title" className="min-[700px]:col-span-2">
          <input id="title" name="title" required defaultValue={p?.title} className={input} />
        </Field>
        <Field id="city" name="City">
          <input id="city" name="city" required defaultValue={p?.city} className={input} />
        </Field>
        <Field id="region" name="State or district">
          <select id="region" name="region" defaultValue={p?.region ?? REGIONS[0]} className={input}>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field id="sector" name="Category">
          <select id="sector" name="sector" defaultValue={p?.sector ?? SECTORS[0]} className={input}>
            {SECTORS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field id="service" name="Service">
          <select id="service" name="service" defaultValue={p?.service ?? SERVICES[0]} className={input}>
            {SERVICES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field id="year" name="Year">
          <input id="year" name="year" type="number" min={1900} max={2100} defaultValue={p?.year ?? new Date().getFullYear()} className={input} />
        </Field>
        <Field id="size" name="Size">
          <input id="size" name="size" placeholder="e.g. 3,800 sq ft" defaultValue={p?.size} className={input} />
        </Field>
        <Field id="scope" name="Short description" className="min-[700px]:col-span-2">
          <input id="scope" name="scope" placeholder="e.g. New residence, designed and built" defaultValue={p?.scope} className={input} />
        </Field>

        <Field id="image" name="Card photograph">
          {p?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt="" className="mt-2 h-28 w-44 bg-[#e6ebf2] object-cover" />
          )}
          <input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" className={`${input} !py-2`} />
          <span className="mt-1 block text-[13px] text-[#082b52]/60">Leave empty to keep the current one.</span>
        </Field>
        <Field id="hero" name="Large photograph for the project's own page (optional)">
          {p?.hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.hero} alt="" className="mt-2 h-28 w-44 bg-[#e6ebf2] object-cover" />
          )}
          <input id="hero" name="hero" type="file" accept="image/jpeg,image/png,image/webp" className={`${input} !py-2`} />
        </Field>

        <fieldset className="border border-gold/60 bg-gold/8 p-4 min-[700px]:col-span-2">
          <legend className="px-2 text-[12px] font-semibold tracking-[.18em] text-[#082b52] uppercase">Featured property</legend>
          <input type="hidden" name="featuredPresent" value="1" />
          <label className="flex cursor-pointer items-start gap-3 text-[15px] text-[#04142a]">
            <input type="checkbox" name="makeFeatured" defaultChecked={Boolean(p) && featured[CATEGORY_TAB[p!.sector]] === p?.id} className="mt-1 size-4 accent-[#b58f48]" />
            <span>
              Make this the featured property of its category on the home page.
              <span className="mt-1 block text-[14px] text-[#082b52]/70">Each category has just one, so this replaces the one there now. If you change the category above, the featured place moves with it.</span>
            </span>
          </label>
          <ul className="mt-4 grid gap-1.5 border-t border-gold/40 pt-3 text-[13px] text-[#082b52]/80 min-[700px]:grid-cols-2">
            {Object.entries(CATEGORY_TAB).map(([category, tab]) => {
              const now = all.find((x) => x.id === featured[tab]);
              return (
                <li key={tab}>
                  <span className="font-semibold text-[#04142a]">{category}:</span> {now ? `${now.title} – ${now.city}` : "none yet"}
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div className="flex flex-wrap gap-3 min-[700px]:col-span-2">
          <button type="submit" className={primary}>
            Save project
          </button>
          <Link href="/admin/projects" className={ghost}>
            Cancel
          </Link>
        </div>
      </form>
    </Page>
  );
}
