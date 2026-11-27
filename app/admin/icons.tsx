import type { ReactNode } from "react";

/** One set of line icons for the dashboard, 20px, drawn with the current text colour. */
function Icon({ children, size = 20 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none">
      {children}
    </svg>
  );
}

export const Icons = {
  overview: (
    <Icon>
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </Icon>
  ),
  projects: (
    <Icon>
      <path d="M3 21V9l6-4v16" />
      <path d="M9 21V3l6 3v15" />
      <path d="M15 21V11l6 3v7" />
      <path d="M2 21h20" />
    </Icon>
  ),
  featured: (
    <Icon>
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
    </Icon>
  ),
  news: (
    <Icon>
      <rect x="3" y="4" width="14" height="16" />
      <path d="M17 8h4v10a2 2 0 0 1-2 2H5" />
      <path d="M7 8h6M7 12h6M7 16h4" />
    </Icon>
  ),
  messages: (
    <Icon>
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 7 9 6 9-6" />
    </Icon>
  ),
  videos: (
    <Icon>
      <rect x="3" y="5" width="18" height="14" />
      <path d="m10 9.5 5 2.5-5 2.5v-5Z" />
    </Icon>
  ),
  plus: (
    <Icon>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  ),
  search: (
    <Icon>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </Icon>
  ),
  external: (
    <Icon>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 14v5H5V6h5" />
    </Icon>
  ),
  out: (
    <Icon>
      <path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9" />
    </Icon>
  ),
  refresh: (
    <Icon>
      <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" />
    </Icon>
  ),
  trash: (
    <Icon size={16}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </Icon>
  ),
  edit: (
    <Icon size={16}>
      <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </Icon>
  ),
  check: (
    <Icon size={16}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Icon>
  ),
};
