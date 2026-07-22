# TEDxSãoTomé

Monorepo for the modern TEDxSãoTomé applications and the complete source
history of the original web and iOS projects.

## Repository layout

- `apps/web` — modern static web archive, built with Next.js.
- `apps/mobile` — home for the future modern mobile application.
- `legacy/wordpress-2018` — archived WordPress/Bedrock production site.
- `legacy/ios-2015` — archived native iOS application.
- `archive/backups/2026-06-12` — complete production code, database, and uploads snapshot.
- `docs/reference-screenshots` — visual references used during modernization.
- `docs/backups` — checksums and recovery notes for archived snapshots.
- `tools/migrations` — one-time, portable migration utilities.

The legacy directories are retained for provenance and should not receive new
feature development. Modern work belongs under `apps/` and reusable code can be
introduced under `packages/` when more than one application needs it.

## Web development

```bash
pnpm install
pnpm dev:web
```

Run all current validation:

```bash
pnpm check
```

## Preserved history

The three source repositories were imported without squashing. Their original
commits remain reachable through the monorepo history, and the final legacy
tips are marked with annotated tags:

- `legacy/wordpress-2018-final`
- `legacy/ios-2015-final`

The original GitHub repositories remain available in archived, read-only form.

## Backups

The complete 2026-06-12 code, database, and uploads snapshot is stored at
`archive/backups/2026-06-12`. See `docs/backups/2026-06-12.sha256` for the
manifest used to verify each archived file.
