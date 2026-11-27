import Link from "next/link";
import { connection } from "next/server";
import { BarList, Donut, Spark } from "../charts";
import { CountUp } from "../CountUp";
import { HomePreview } from "../HomePreview";
import { Greeting, TodayLabel } from "../LocalTime";
import { Icons } from "../icons";
import { grid, Panel } from "../ui";
import { PROJECT_TABS } from "@/lib/data";
import { getNews, getProjects, readDb } from "@/lib/db";

const count = <T,>(items: T[], key: (i: T) => string, order: string[]) => order.map((label) => ({ label, value: items.filter((i) => key(i) === label).length }));

export default async function Overview() {
  await connection();
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  const db = await readDb();
  const projects = await getProjects();
  const news = await getNews();
  const unread = db.messages.filter((m) => !m.handled);
  const featuredSet = PROJECT_TABS.filter((t) => db.featured[t.key]).length;
  const upcoming = news.filter((n) => n.kind === "Event" && n.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  // the last few years, months and days, for the little bar charts
  const years = Array.from({ length: 6 }, (_, i) => now.getFullYear() - 5 + i);
  const perYear = years.map((y) => projects.filter((p) => p.year === y).length);
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return { key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleString("en-US", { month: "short" }) };
  });
  const perMonth = months.map((m) => news.filter((n) => n.date.startsWith(m.key)).length);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - 6 + i);
    return d.toISOString().slice(0, 10);
  });
  const perDay = days.map((d) => db.messages.filter((m) => m.at.slice(0, 10) === d).length);

  const sectors = count(projects, (p) => p.sector, ["Residential", "Loft & industrial conversions", "Landmark & brownstone", "Commercial"]);
  const services = count(projects, (p) => p.service, ["Architecture & Design", "Design-Build", "Construction Management"]);
  const regions = count(projects, (p) => p.region, ["Maryland", "DC"]);

  const stat = [
    { href: "/admin/projects", n: projects.length, label: "Projects", note: `${perYear.at(-1)} this year`, chart: <Spark values={perYear} labels={years.map(String)} /> },
    {
      href: "/admin/featured",
      n: featuredSet,
      label: `Featured tabs of ${PROJECT_TABS.length}`,
      note: featuredSet === PROJECT_TABS.length ? "All set" : "The rest use standard wording",
      chart: (
        <div className="flex h-12 items-end gap-1.5" aria-hidden="true">
          {PROJECT_TABS.map((t) => (
            <span key={t.key} className={`h-full w-full ${db.featured[t.key] ? "bg-gold" : "bg-[#082b52]/15"}`} />
          ))}
        </div>
      ),
    },
    { href: "/admin/news", n: news.length, label: "News & events", note: upcoming.length ? `${upcoming.length} coming up` : "None coming up", chart: <Spark values={perMonth} labels={months.map((m) => m.label)} /> },
    { href: "/admin/messages", n: unread.length, label: "New messages", note: `${db.messages.length} in total`, chart: <Spark values={perDay} labels={days} /> },
  ];

  const actions = [
    { href: "/admin/projects/new", label: "Add a project", note: "Photos, place, service", icon: Icons.projects },
    { href: "/admin/news/new", label: "Post news or an event", note: "Newest three go on the home page", icon: Icons.news },
    { href: "/admin/featured", label: "Change the featured property", note: "Under the home page gallery", icon: Icons.featured },
    { href: "/admin/messages", label: "Read the inbox", note: unread.length ? `${unread.length} waiting` : "All caught up", icon: Icons.messages },
  ];

  const dateText = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pt-8 pb-20 min-[900px]:px-10">
      {/* the opening: a small piece of the home page's own look */}
      <section className="relative isolate overflow-hidden bg-[#04142a] px-6 py-10 text-white min-[700px]:px-10 min-[700px]:py-14">
        <span aria-hidden="true" className="absolute inset-0 -z-10" style={grid("dark")} />
        <span aria-hidden="true" className="absolute -right-20 -bottom-40 -z-10 h-[420px] w-[70%] rounded-full opacity-90 blur-[110px]" style={{ background: "linear-gradient(270deg,#f7bd2f 0%,#e3a93a 9%,#2a5cf0 38%,#123f9e 70%,#082b52 100%)" }} />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <TodayLabel fallback={dateText} className="text-[12px] font-semibold tracking-[.22em] text-gold uppercase" />
        <Greeting className="mt-3 font-sans text-[44px] leading-[1.02] font-extralight tracking-[-.01em] min-[700px]:text-[72px]" />
        <p className="mt-4 max-w-[52ch] font-mulish text-[18px] leading-[1.55] text-white/85">
          {unread.length > 0 ? (
            <>
              <Link href="/admin/messages" className="text-gold underline underline-offset-4">
                {unread.length} new {unread.length === 1 ? "message" : "messages"}
              </Link>{" "}
              {unread.length === 1 ? "is" : "are"} waiting.{" "}
            </>
          ) : (
            "The inbox is clear. "
          )}
          {upcoming[0] ? `Next up: ${upcoming[0].title}, ${new Date(`${upcoming[0].date}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric" })}.` : "Nothing is scheduled yet."}
        </p>
      </section>

      {/* four numbers that count up */}
      <div className="mt-6 grid gap-4 min-[560px]:grid-cols-2 min-[1320px]:grid-cols-4">
        {stat.map((c) => (
          <Link key={c.href} href={c.href} className="group relative block overflow-hidden border border-[#082b52]/12 bg-white/85 p-5 no-underline shadow-[0_18px_34px_-28px_rgba(4,20,42,.55)] backdrop-blur transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_26px_40px_-26px_rgba(4,20,42,.6)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-sans text-[54px] leading-none font-extralight tabular-nums text-[#04142a]">
                  <CountUp to={c.n} />
                </p>
                <p className="mt-2 text-[14px] font-semibold text-[#082b52]">{c.label}</p>
                <p className="mt-0.5 text-[13px] text-[#082b52]/60">{c.note}</p>
              </div>
              <div className="w-20 flex-none pt-1">{c.chart}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* what to do next */}
      <div className="mt-6 grid gap-3 min-[700px]:grid-cols-2 min-[1320px]:grid-cols-4">
        {actions.map((a) => (
          <Link key={a.href} href={a.href} className="group flex items-center gap-4 border border-[#082b52]/12 bg-white/60 px-4 py-4 no-underline backdrop-blur transition-colors duration-200 hover:border-[#04142a] hover:bg-[#04142a]">
            <span className="grid size-10 flex-none place-items-center bg-[#04142a] text-gold transition-colors duration-200 group-hover:bg-gold group-hover:text-[#04142a]">{a.icon}</span>
            <span>
              <span className="block text-[15px] font-semibold text-[#04142a] transition-colors duration-200 group-hover:text-white">{a.label}</span>
              <span className="block text-[13px] text-[#082b52]/60 transition-colors duration-200 group-hover:text-white/65">{a.note}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* the portfolio, drawn */}
      <div className="mt-6 grid gap-4 min-[1320px]:grid-cols-[1.3fr_1fr_1fr]">
        <Panel title="Portfolio by type" note={`${projects.length} projects`}>
          <Donut data={sectors} />
        </Panel>
        <Panel title="By service">
          <BarList data={services} />
        </Panel>
        <Panel title="By state">
          <BarList data={regions} />
        </Panel>
      </div>

      {/* the real site, live */}
      <Panel title="The live site" note="This is the local site. Refresh after you save a change." className="mt-6">
        <HomePreview />
      </Panel>

      <div className="mt-6 grid gap-4 min-[1200px]:grid-cols-2">
        <Panel title="Latest messages" note={`${db.messages.length} in total`}>
          <ul className="grid gap-1">
            {db.messages.slice(0, 4).map((m) => (
              <li key={m.id}>
                <Link href="/admin/messages" className="flex items-start gap-3 border-b border-[#082b52]/10 py-3 no-underline hover:bg-[#eef2f8]">
                  <span className={`mt-2 size-2.5 flex-none rounded-full ${m.handled ? "bg-[#082b52]/20" : "bg-gold"}`} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-[15px] font-semibold text-[#04142a]">
                        {m.first} {m.last}
                      </span>
                      <span className="flex-none text-[12px] text-[#082b52]/55">{fmt.format(new Date(m.at))}</span>
                    </span>
                    <span className="block truncate text-[14px] text-[#082b52]/70">{m.message}</span>
                  </span>
                </Link>
              </li>
            ))}
            {db.messages.length === 0 && <li className="py-3 text-[15px] text-[#082b52]/70">Nothing yet. Messages from the Contact page land here.</li>}
          </ul>
        </Panel>

        <Panel title="Coming up" note="Events from News & events">
          <ul className="grid gap-1">
            {upcoming.slice(0, 4).map((n) => {
              const d = new Date(`${n.date}T00:00:00`);
              return (
                <li key={n.id}>
                  <Link href={`/admin/news/${n.id}`} className="flex items-center gap-4 border-b border-[#082b52]/10 py-3 no-underline hover:bg-[#eef2f8]">
                    <span className="grid w-14 flex-none place-items-center bg-[#04142a] py-1.5 text-white">
                      <span className="text-[11px] tracking-[.14em] text-gold uppercase">{d.toLocaleString("en-US", { month: "short" })}</span>
                      <span className="font-jost text-[24px] leading-none">{d.getDate()}</span>
                    </span>
                    <span className="text-[15px] font-semibold text-[#04142a]">{n.title}</span>
                  </Link>
                </li>
              );
            })}
            {upcoming.length === 0 && (
              <li className="py-3 text-[15px] text-[#082b52]/70">
                No events coming up.{" "}
                <Link href="/admin/news/new" className="text-[#04142a] underline underline-offset-4">
                  Add one
                </Link>
                .
              </li>
            )}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
