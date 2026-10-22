import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { FOOTER, NAV } from "@/lib/data";

const labelBase = "block text-[11px] leading-[16.5px] font-medium text-navy";
const label = `${labelBase} mb-4`;
const textLink =
  "inline-flex min-h-8 w-fit items-center text-[13px] leading-5 font-medium text-navy underline decoration-transparent decoration-2 underline-offset-[6px] outline-none transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const SOCIAL = [
  {
    label: "Facebook",
    icon: <path d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V3h-2.5A3.5 3.5 0 0 0 11 6.5v2H8.5V11H11v10h3V11h2.5l.5-2.5H14Z" />,
  },
  {
    label: "LinkedIn",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-1.7 1-3 2.75-3S17.5 11.8 17.5 13.5V17" />
      </>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

export function Footer() {
  const [line1, line2] = FOOTER.office.split("\n");
  return (
    <footer className="relative z-4 border-t border-navy/14 bg-white font-medium tracking-[.08em] text-navy uppercase">
      <div className="mx-auto max-w-7xl px-6 py-8 min-[768px]:px-12 min-[768px]:py-12">
        <div className="mb-8 grid grid-cols-1 gap-y-8 min-[640px]:grid-cols-[repeat(3,auto)] min-[640px]:justify-between min-[640px]:gap-x-6 min-[768px]:gap-x-10">
          <div>
            <span className={label}>Office</span>
            <address className="pt-1.5 text-[13px] leading-5 font-medium text-navy not-italic">
              {line1}
              <br />
              {line2}
            </address>
          </div>

          <div>
            <span className={label}>Contact</span>
            <div className="flex flex-col">
              <a href={`mailto:${FOOTER.email}`} className={textLink}>
                {FOOTER.email}
              </a>
              <a href={FOOTER.phone.href} className={textLink}>
                {FOOTER.phone.label}
              </a>
            </div>
            <span className={`${labelBase} mt-6 mb-2`}>Connect on social:</span>
            <div className="flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex size-8 flex-none items-center justify-center rounded-full text-navy outline-none transition-[color,box-shadow] duration-200 hover:shadow-[0_0_0_2px_#b58f48] focus-visible:shadow-[0_0_0_2px_#b58f48]"
                >
                  <Icon>{s.icon}</Icon>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col items-start">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={textLink}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-navy/15 pt-5">
          <Link href="/" aria-label="PROACTIVE — home" className="inline-flex items-center gap-2.5 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy/40">
            <BrandMark className="h-[26px]" />
            <span className="font-montserrat text-[18px] leading-none font-extrabold tracking-[-.01em] text-navy normal-case">
              PROACTIVE
            </span>
          </Link>
          <a href={FOOTER.credit.href} target="_blank" rel="noopener noreferrer" className={textLink}>
            {FOOTER.credit.label}
          </a>
          <p className="text-[11px] leading-[16.5px] font-medium text-navy">© 2026</p>
        </div>
      </div>
    </footer>
  );
}
