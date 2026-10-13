# TEDxSãoTomé web

Modern static archive of the five TEDxSãoTomé editions, built with Next.js 16
and exported as static files. The original 2018 event remains the homepage.

The site includes the original event content and media in a responsive editorial
design, static speaker profiles, structured event data, canonical metadata, a
sitemap, `robots.txt`, a web manifest, and a custom 404 page.

Each edition has its own page, historical participant profiles, an announced
programme and source notes. The video library has 13 local recordings and ten
separately labeled TED screenings, with click-to-load playback, thumbnails,
year filters and speaker/title search. Twelve recovered historical photographs
complement the original media. The historical 2016 team and community pages
remain available. Sources, coverage limits and draft discrepancies are recorded
in `docs/web-content-sources.md` and `docs/research/` at the monorepo root.

## Development

```bash
pnpm install
pnpm dev:web
```

Open <http://localhost:3000>.

## Validation

```bash
pnpm check
```

The production export is written to `out/`. Both `out/` and `.next/` are
generated and excluded from Git.

Routes use trailing slashes so the export can be hosted by any static web server
without URL-extension rewrites. Deploy the contents of `out/` after a successful
build.

`pnpm check` also verifies exported page metadata, internal links, local media,
JSON-LD, sitemap coverage and robots directives. GitHub Actions runs the same
checks on pushes and pull requests. Browser verification artifacts belong in
`output/playwright/` and are excluded from Git.

## Content provenance

The event content and media were imported from the legacy WordPress site. The
portable one-time importer is kept for provenance at
`tools/migrations/import-wordpress-2018.mjs`.
