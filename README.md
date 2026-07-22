# TEDxSãoTomé

Monorepo for the modern TEDxSãoTomé applications and the complete source
history of the original web and iOS projects.

## Repository layout

- `apps/web` — modern static web archive, built with Next.js.
- `apps/mobile` — home for the future modern mobile application.
- `legacy/wordpress-2018` — archived WordPress/Bedrock production site.
- `legacy/ios-2015` — archived native iOS application.
- `docs/reference-screenshots` — visual references used during modernization.
- `docs/backups` — checksums and recovery notes; production data is never stored in Git.
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

Database, uploads, and server snapshots contain private production data and are
excluded from Git. See `docs/backups/2026-06-12.sha256` for the recovery
manifest used to validate the external snapshot.
