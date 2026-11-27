import Link from "next/link";
import { connection } from "next/server";
import { deleteNews } from "../../actions";
import { Icons } from "../../icons";
import { Notice, Page, primary } from "../../ui";
import { getNews } from "@/lib/db";

export default async function NewsAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  await connection();
  const { saved, deleted } = await searchParams;
  const today = new Date().toISOString().slice(0, 10);
  const items = getNews();
  const onHome = new Set(items.slice(0, 3).map((n) => n.id));

  // group by month, newest first
  const groups: { month: string; items: typeof items }[] = [];
  for (const n of items) {
    const month = new Date(`${n.date}T00:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const g = groups.find((x) => x.month === month);
    if (g) g.items.push(n);
    else groups.push({ month, items: [n] });
  }

  return (
    <Page
      eyebrow="Stories"
      title="News & events"
      lead="A timeline of everything posted. The three newest by date, marked in gold, are the ones on the home page under “What’s happening at PDBS”."
      action={
        <Link href="/admin/news/new" className={primary}>
          {Icons.plus}
          <span>Add news or an event</span>
        </Link>
      }
    >
      {saved && <Notice>Saved.</Notice>}
      {deleted && <Notice>Deleted.</Notice>}

      <div className="relative">
        {/* the line the timeline hangs on */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[27px] hidden w-px bg-gradient-to-b from-gold via-[#082b52]/25 to-transparent min-[700px]:block" />
        {groups.map((g) => (
          <section key={g.month} className="mb-10">
            <h2 className="mb-4 text-[12px] font-semibold tracking-[.22em] text-[#082b52]/70 uppercase min-[700px]:pl-[76px]">{g.month}</h2>
            <ul className="grid gap-4">
              {g.items.map((n) => {
                const d = new Date(`${n.date}T00:00:00`);
                const home = onHome.has(n.id);
                const upcoming = n.kind === "Event" && n.date >= today;
                return (
                  <li key={n.id} className="relative flex gap-5 min-[700px]:pl-0">
                    <span className={`z-10 hidden w-14 flex-none flex-col items-center justify-center py-2 min-[700px]:flex ${home ? "bg-gold text-[#04142a]" : "bg-[#04142a] text-white"}`}>
                      <span className={`text-[11px] tracking-[.14em] uppercase ${home ? "text-[#04142a]/75" : "text-gold"}`}>{d.toLocaleString("en-US", { month: "short" })}</span>
                      <span className="font-jost text-[26px] leading-none">{d.getDate()}</span>
                    </span>
                    <article className={`flex min-w-0 flex-1 flex-wrap items-center gap-4 border bg-white/85 p-3 backdrop-blur min-[700px]:flex-nowrap ${home ? "border-gold shadow-[0_18px_34px_-26px_rgba(181,143,72,.8)]" : "border-[#082b52]/12"}`}>
                      {n.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={n.image} alt="" className="h-20 w-28 flex-none bg-[#dfe6f1] object-cover" />
                      ) : (
                        <span className="grid h-20 w-28 flex-none place-items-center bg-[#dfe6f1] text-[11px] text-[#082b52]/50">No photo</span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[.12em] uppercase">
                          <span className={n.kind === "Event" ? "text-gold" : "text-[#2356e5]"}>{n.kind}</span>
                          {upcoming && <span className="bg-[#3f7d5a] px-1.5 py-0.5 text-white">Upcoming</span>}
                          {home && <span className="border border-gold px-1.5 py-0.5 text-gold">On home page</span>}
                          <span className="font-normal tracking-normal text-[#082b52]/55 normal-case min-[700px]:hidden">{n.date}</span>
                        </p>
                        <p className="mt-1 line-clamp-2 text-[17px] leading-snug font-medium text-[#04142a]">{n.title}</p>
                        {n.summary && <p className="mt-1 line-clamp-1 text-[14px] text-[#082b52]/65">{n.summary}</p>}
                      </div>
                      <div className="flex flex-none items-center gap-2">
                        <Link href={`/admin/news/${n.id}`} className="flex min-h-9 items-center gap-1.5 border border-[#082b52]/30 bg-white/70 px-3.5 text-[.75rem] font-medium tracking-[.08em] text-[#082b52] uppercase no-underline hover:border-[#04142a] hover:bg-[#04142a] hover:text-white">
                          {Icons.edit}
                          Edit
                        </Link>
                        <form action={deleteNews}>
                          <input type="hidden" name="id" value={n.id} />
                          <button type="submit" className="flex min-h-9 cursor-pointer items-center gap-1.5 border border-[#a33a3a]/40 bg-white/70 px-3.5 text-[.75rem] font-medium tracking-[.08em] text-[#a33a3a] uppercase hover:bg-[#a33a3a] hover:text-white">
                            {Icons.trash}
                            Delete
                          </button>
                        </form>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        {items.length === 0 && <p className="border border-[#082b52]/12 bg-white/80 p-6 text-[15px]">Nothing yet. Add the first news item or event.</p>}
      </div>
    </Page>
  );
}
