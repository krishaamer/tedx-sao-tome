# TEDxSãoTomé web

Modern static archive of the TEDxSãoTomé 2018 event, built with Next.js 16 and
exported as static files.

The site includes the original event content and media in a responsive editorial
design, static speaker profiles, structured event data, canonical metadata, a
sitemap, `robots.txt`, a web manifest, and a custom 404 page.

## Development

```bash
pnpm install
pnpm dev:web
```

Open <http://localhost:3000>.

## Validation

```bash
pnpm lint
pnpm build
```

The production export is written to `out/`. Both `out/` and `.next/` are
generated and excluded from Git.

Routes use trailing slashes so the export can be hosted by any static web server
without URL-extension rewrites. Deploy the contents of `out/` after a successful
build.

## Content provenance

The event content and media were imported from the legacy WordPress site. The
portable one-time importer is kept for provenance at
`tools/migrations/import-wordpress-2018.mjs`.
