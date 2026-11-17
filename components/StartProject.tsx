"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { InquiryForm } from "@/components/Inquiry";
import { FOOTER } from "@/lib/data";

/**
 * The "Start a project" popup. One dialog serves the whole site: any link or button marked
 * data-start-project opens it (data-service chooses the service), and without scripts those links still
 * go to their normal address. The form is only built while the popup is open.
 */
export function StartProject() {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<string | undefined>();
  const [sent, setSent] = useState(false);
  const [run, setRun] = useState(0);

  const show = useCallback((from: HTMLElement | null, svc?: string) => {
    opener.current = from;
    setService(svc);
    setSent(false);
    setRun((n) => n + 1);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Any element marked data-start-project opens the popup
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-start-project]");
      if (!el) return;
      e.preventDefault();
      show(el, el.dataset.service);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [show]);

  // Keep the dialog element, the page scroll and the focus in step with `open`
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
      // start in the first field, not on the close button
      d.querySelector<HTMLElement>('input[name="name"]')?.focus();
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) {
      document.body.style.overflow = "";
      opener.current?.focus?.();
    }
  }, [open]);

  useEffect(() => () => void (document.body.style.overflow = ""), []);

  return (
    <dialog
      ref={ref}
      id="start-project"
      aria-labelledby="start-project-title"
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="m-auto max-h-none w-screen max-w-none overflow-hidden border-0 bg-white p-0 max-md:m-0 max-md:h-dvh max-md:w-dvw text-[#082b52] shadow-[0_40px_120px_-20px_rgba(4,18,40,.65)] min-[768px]:max-h-[min(92dvh,880px)] min-[768px]:w-[min(1040px,calc(100vw-3rem))]"
    >
      {open && (
        <div className="grid h-full min-[768px]:grid-cols-[5fr_7fr]">
          <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#082b52] p-10 text-white min-[768px]:flex">
            <span aria-hidden="true" className="absolute -top-px left-0 h-1 w-24 bg-gold" />
            <div>
              <p className="text-sm font-semibold text-gold">PROACTIVE</p>
              <h2 id="start-project-title" className="mt-4 font-jost text-[clamp(30px,3vw,42px)] leading-[1.08] font-normal tracking-normal uppercase">
                Start a project
              </h2>
              <p className="mt-5 max-w-[34ch] font-mulish text-[17px] leading-[1.65] text-white/85">
                Tell us what you are planning. We reply within one business day to set up a call and suggest the right first step.
              </p>
            </div>
            <dl className="grid gap-5 border-t border-white/20 pt-6 text-[15px] leading-snug">
              <div>
                <dt className="text-sm font-semibold text-gold">Call</dt>
                <dd className="mt-1">
                  <a href={FOOTER.phone.href} className="text-inherit no-underline hover:underline">
                    {FOOTER.phone.label}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gold">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${FOOTER.email}`} className="text-inherit no-underline hover:underline">
                    {FOOTER.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gold">Office</dt>
                <dd className="mt-1 whitespace-pre-line">{FOOTER.office}</dd>
              </div>
            </dl>
          </aside>

          <div className="relative flex max-h-[inherit] min-h-0 flex-col overflow-y-auto p-5 pt-16 min-[768px]:p-10 min-[768px]:pt-12">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 inline-flex size-11 cursor-pointer items-center justify-center text-[#082b52] transition-colors duration-200 outline-none hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2356e5] min-[768px]:top-5 min-[768px]:right-5"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.6" />
                <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>

            <h2 className="mb-6 font-jost text-[26px] leading-[1.1] font-normal uppercase min-[768px]:hidden">Start a project</h2>

            {sent ? (
              <div role="status" className="hero-in my-auto max-w-[44ch]">
                <span aria-hidden="true" className="block h-0.5 w-12 bg-gold" />
                <p className="mt-5 font-jost text-[clamp(26px,2.6vw,36px)] leading-[1.1] uppercase">Thank you</p>
                <p className="mt-4 font-mulish text-[17px] leading-[1.65] text-[#082b52]/90">
                  Your email app should now be open with your project details filled in. Press send there to finish, and we will reply within one business day.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="btn-sweep mt-8 inline-flex min-h-12 cursor-pointer items-center justify-center border border-[#082b52] bg-[#082b52] bg-[linear-gradient(#fff,#fff)] px-8 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase outline-none hover:text-[#082b52] focus-visible:text-[#082b52]"
                >
                  Close
                </button>
              </div>
            ) : (
              <InquiryForm key={run} idPrefix="sp" initialService={service} listen={false} autoFocus onSent={() => setSent(true)} />
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
