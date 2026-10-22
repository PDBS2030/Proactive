# PDBS — PROACTIVE Design and Building Systems, Inc.

Marketing site for PROACTIVE, built with Next.js (App Router) and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Add `?intro` to the URL to replay the intro animation (it plays once per browser session).

## Layout

- `app/` — routes, root layout, global CSS (design tokens in `globals.css`) and local fonts (`fonts.ts`, `fonts/`)
- `components/` — one file per homepage section (Header, Intro, Hero, Offerings, Projects, Process, Insights, Faq, Footer)
- `lib/data.ts` — all copy, links and image paths used by the homepage
- `public/assets/` — images
- `prototype/` — the approved static HTML prototype (reference only; open `prototype/index.html` through a local server)

## Placeholders to replace before launch

The homepage still contains wording and photos borrowed from reference sites while the design was being approved.
Replace them in `lib/data.ts` and `public/assets/`. Social links in `components/Footer.tsx` are placeholders.
