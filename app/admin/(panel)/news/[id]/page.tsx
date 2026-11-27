import Link from "next/link";
import { notFound } from "next/navigation";
import { saveNews } from "../../../actions";
import { Field, ghost, input, Notice, Page, primary } from "../../../ui";
import { getNews } from "@/lib/db";

export default async function NewsForm({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const { id } = await params;
  const { error } = await searchParams;
  const isNew = id === "new";
  const n = isNew ? undefined : getNews().find((x) => x.id === id);
  if (!isNew && !n) notFound();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Page title={isNew ? "Add news or an event" : "Edit news or event"} lead="The three newest by date show on the home page.">
      {error && <Notice tone="bad">A title and a date are needed.</Notice>}
      <form action={saveNews} className="grid gap-5 border border-[#082b52]/15 bg-white p-6 min-[700px]:grid-cols-2 min-[700px]:p-8">
        <input type="hidden" name="id" value={n?.id ?? ""} />
        <input type="hidden" name="imagePath" value={n?.image ?? ""} />

        <Field id="title" name="Title" className="min-[700px]:col-span-2">
          <input id="title" name="title" required defaultValue={n?.title} className={input} />
        </Field>
        <Field id="kind" name="Kind">
          <select id="kind" name="kind" defaultValue={n?.kind ?? "News"} className={input}>
            <option>News</option>
            <option>Event</option>
          </select>
        </Field>
        <Field id="date" name="Date (for an event, the day it takes place)">
          <input id="date" name="date" type="date" required defaultValue={n?.date ?? today} className={input} />
        </Field>
        <Field id="summary" name="Short summary (optional)" className="min-[700px]:col-span-2">
          <textarea id="summary" name="summary" rows={3} defaultValue={n?.summary} className={input} />
        </Field>
        <Field id="href" name="Link (optional): where the card goes" className="min-[700px]:col-span-2">
          <input id="href" name="href" placeholder="/ or https://…" defaultValue={n?.href} className={input} />
        </Field>
        <Field id="image" name="Photograph" className="min-[700px]:col-span-2">
          {n?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={n.image} alt="" className="mt-2 h-28 w-44 bg-[#e6ebf2] object-cover" />
          )}
          <input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" className={`${input} !py-2`} />
          <span className="mt-1 block text-[13px] text-[#082b52]/60">Leave empty to keep the current one. A tall photograph works best on the card.</span>
        </Field>

        <div className="flex flex-wrap gap-3 min-[700px]:col-span-2">
          <button type="submit" className={primary}>
            Save
          </button>
          <Link href="/admin/news" className={ghost}>
            Cancel
          </Link>
        </div>
      </form>
    </Page>
  );
}
