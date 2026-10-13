# Static website validation

Run `node tools/validation/verify-static-export.mjs` after the Next.js build. The root `pnpm check` command runs this automatically, and GitHub Actions uses the same command on pushes and pull requests.

The verifier reads the generated `apps/web/out` directory without installing a browser or test framework. It discovers public `index.html` pages, excluding Next.js error routes, and checks:

- Unique page titles, one main heading, canonical URLs on `https://www.tedxsaotome.com/`, and page-specific Open Graph / Twitter metadata.
- Internal links and fragments, local media, icons, stylesheets, hydration scripts, and CSS resources.
- Parseable JSON-LD, valid Schema.org event statuses, calendar dates, and timestamp offsets.
- An exact sitemap match for every public page and the canonical host in robots.txt.

RSC payloads and script bodies are excluded from HTML inspection; local script files are checked for existence. External links are not fetched, so this does not check the availability of third-party websites or replace a desktop/mobile preview review. An optional first argument selects another exported directory.

The workflow uses Node.js 24 and reads the pinned pnpm version from the root `packageManager` field. It installs with the lockfile frozen and grants only `contents: read` access.
