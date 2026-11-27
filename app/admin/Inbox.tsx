"use client";

import { useState } from "react";
import { deleteMessage, setHandled } from "./actions";
import { Icons } from "./icons";

type Msg = { id: string; at: string; first: string; last: string; email: string; phone: string; topic: string; message: string; handled: boolean };

const when = (iso: string) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso));

/** A two-pane inbox: the list on the left, the open message on the right. New messages carry a gold dot. */
export function Inbox({ messages }: { messages: Msg[] }) {
  const [openId, setOpenId] = useState(messages[0]?.id ?? "");
  const [filter, setFilter] = useState<"all" | "new">("all");
  const list = messages.filter((m) => filter === "all" || !m.handled);
  const open = messages.find((m) => m.id === openId) ?? list[0];

  if (messages.length === 0) {
    return (
      <div className="grid place-items-center border border-dashed border-[#082b52]/25 bg-white/70 px-6 py-20 text-center backdrop-blur">
        <span className="grid size-14 place-items-center bg-[#04142a] text-gold">{Icons.messages}</span>
        <p className="mt-5 font-jost text-[24px] text-[#04142a]">The inbox is empty</p>
        <p className="mt-2 max-w-[44ch] text-[15px] leading-[1.6] text-[#082b52]/70">When someone sends the form on the Contact page, their message appears here, and you can mark it handled once you have replied.</p>
      </div>
    );
  }

  return (
    <div className="grid overflow-hidden border border-[#082b52]/15 bg-white/90 shadow-[0_26px_46px_-34px_rgba(4,20,42,.65)] backdrop-blur min-[900px]:min-h-[560px] min-[900px]:grid-cols-[360px_1fr]">
      <div className="border-b border-[#082b52]/12 min-[900px]:border-r min-[900px]:border-b-0">
        <div className="flex gap-2 border-b border-[#082b52]/12 p-3">
          {(["all", "new"] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`cursor-pointer px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 ${filter === f ? "bg-[#04142a] text-white" : "text-[#082b52] hover:bg-[#eef2f8]"}`}
            >
              {f === "all" ? `All (${messages.length})` : `New (${messages.filter((m) => !m.handled).length})`}
            </button>
          ))}
        </div>
        <ul className="max-h-[420px] overflow-auto min-[900px]:max-h-[600px]">
          {list.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setOpenId(m.id)}
                aria-current={open?.id === m.id}
                className={`flex w-full cursor-pointer items-start gap-3 border-b border-[#082b52]/8 px-4 py-3.5 text-left transition-colors duration-150 ${open?.id === m.id ? "bg-gold/12 shadow-[inset_3px_0_0_#b58f48]" : "hover:bg-[#eef2f8]"}`}
              >
                <span className={`mt-2 size-2.5 flex-none rounded-full ${m.handled ? "bg-[#082b52]/20" : "bg-gold"}`} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className={`truncate text-[15px] ${m.handled ? "text-[#082b52]/75" : "font-semibold text-[#04142a]"}`}>
                      {m.first} {m.last}
                    </span>
                    <span className="flex-none text-[12px] text-[#082b52]/50">{when(m.at)}</span>
                  </span>
                  <span className="block truncate text-[13px] font-medium text-[#082b52]/70">{m.topic}</span>
                  <span className="block truncate text-[13px] text-[#082b52]/55">{m.message}</span>
                </span>
              </button>
            </li>
          ))}
          {list.length === 0 && <li className="p-6 text-[15px] text-[#082b52]/70">No new messages.</li>}
        </ul>
      </div>

      <article className="p-6 min-[900px]:p-9">
        {open ? (
          <>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold tracking-[.2em] text-gold uppercase">{open.topic}</p>
                <h2 className="mt-1 font-jost text-[32px] leading-tight text-[#04142a]">
                  {open.first} {open.last}
                </h2>
                <p className="mt-2 text-[14px] text-[#082b52]/70">
                  <a href={`mailto:${open.email}`} className="underline underline-offset-4 hover:text-[#04142a]">
                    {open.email}
                  </a>
                  {open.phone && (
                    <>
                      {" "}
                      ·{" "}
                      <a href={`tel:${open.phone}`} className="underline underline-offset-4 hover:text-[#04142a]">
                        {open.phone}
                      </a>
                    </>
                  )}
                </p>
              </div>
              <p className="text-[13px] text-[#082b52]/55">{when(open.at)}</p>
            </div>
            <p className="mt-7 max-w-[64ch] border-l-2 border-gold pl-5 font-mulish text-[17px] leading-[1.7] whitespace-pre-wrap text-[#04142a]">{open.message}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${open.email}?subject=${encodeURIComponent(`Re: ${open.topic}`)}`} className="inline-flex min-h-11 items-center gap-2 border border-[#04142a] bg-[#04142a] px-6 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-[#04142a]">
                {Icons.messages}
                Reply
              </a>
              <form action={setHandled}>
                <input type="hidden" name="id" value={open.id} />
                <input type="hidden" name="handled" value={open.handled ? "0" : "1"} />
                <button type="submit" className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-[#082b52]/30 bg-white/70 px-6 text-[.8125rem] font-medium tracking-[.08em] text-[#082b52] uppercase hover:border-[#04142a] hover:bg-[#04142a] hover:text-white">
                  {Icons.check}
                  {open.handled ? "Mark as new" : "Mark as handled"}
                </button>
              </form>
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={open.id} />
                <button type="submit" className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-[#a33a3a]/40 bg-white/70 px-5 text-[.8125rem] font-medium tracking-[.08em] text-[#a33a3a] uppercase hover:bg-[#a33a3a] hover:text-white">
                  {Icons.trash}
                  Delete
                </button>
              </form>
            </div>
          </>
        ) : (
          <p className="text-[15px] text-[#082b52]/70">Pick a message from the list.</p>
        )}
      </article>
    </div>
  );
}
