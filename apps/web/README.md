# TEDxSãoTomé web

Modern static archive of the TEDxSãoTomé 2018 event, built with Next.js 16 and
exported as static files.

## Development

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Validation

```bash
pnpm lint
pnpm build
```

The production export is written to `out/`. Both `out/` and `.next/` are
generated and excluded from Git.

## Content provenance

The event content and media were imported from the legacy WordPress site. The
one-time importer is kept for provenance and will live at the monorepo level
under `tools/migrations/`.
