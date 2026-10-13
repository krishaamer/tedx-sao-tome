# TEDxSãoTomé CVI and digital design system

Public route: `/identidade/`. Guide version: `1.0.0`.

The guide documents the preserved 2018 event identity and the current website's
visual language. It is not a new logo, new TEDx license, brand approval, or a
claim of accessibility certification for the entire historical archive.

## Provenance and boundaries

- The displayed/downloadable logo is the unchanged public SVG imported from
  `legacy/wordpress-2018/design/tedxsaotome-logo.svg`. Both copies have SHA-256
  `76bd71ea47028af6fbca1940b9bb06310edace0420eb96869528623d3a1d00fc`.
- Its actual colors are `#EC1C24` and `#FFFFFF`. It is shown on solid black, with
  the original proportions and tagline. No light-background variant is invented.
- Current UI red is `#EB0028`; dark action red is `#BD001F`. These remain distinct
  from the archival artwork. No historical source file is edited.
- The standalone x mark and the raster-backed Re|Evolution campaign SVG are not
  presented as replacements for the full event logo or as a new vector identity.

## Source guidance

Reviewed on 2026-10-14:

- [TEDx design and promotion guide](https://www.ted.com/tedx/organizer-guide/design-and-promote-event):
  full event name, logo proportions, clear space, solid backgrounds and current
  red specifications. The public page refers readers to the official guide for
  new applications rather than re-creating an approval process.
- [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
  and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html):
  the local guide uses 4.5:1 for normal text and 3:1 for essential control
  boundaries. Contrast is calculated from exact hex values before rounding.

## Tokens and implementation

`apps/web/public/brand/design-tokens.json` is the downloadable token document and
the data source for swatches and the copyable CSS snippet. The declarations in
`apps/web/src/app/globals.css` are validated against it.

Eight colors and the existing `1180px` content width are documented. The guide
adds explicit local font, spacing, radius, control-size and motion primitives.
The font stack is unchanged; body CSS now references `--font-sans`. This does
not migrate every existing component's hardcoded styles.

The existing page-level horizontal overflow rule uses `clip`, with `hidden`
retained as a fallback. This restores the intended sticky header, directory
filters and desktop guide index without enabling horizontal page scrolling.
The cause was verified with a live CSS-only local test; the change is checked
on the guide and existing content routes. See the
[MDN overflow-x reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-x)
for the scroll-container distinction.

Profile dialogs save, lock and restore overflow on both the body and root
element, so wheel events on the backdrop cannot scroll the page after the
sticky-navigation fix. Escape and close retain focus return to the opener.

The component specimens reuse `EditionNav` and `SpeakerDirectory`, which also
uses the existing `RecordingGrid`. Three real historical profiles illustrate a
portrait, a missing-photo initials treatment and a recorded presentation. The
specimen is clearly distinguished from the full 47-profile directory.

The only new client interaction is copying a value, with an announced success
state and a manual-selection fallback when clipboard access is unavailable.
No new browser dependency or external font is added. The build-time validator
uses a pinned PostCSS development dependency to parse CSS declarations.

## Verification

`pnpm verify:design-system` validates token schema, CSS alignment, swatch contrast,
bounded resource paths, and both logo hashes/fill colors. It runs within
`pnpm check`, including CI. Static-export validation also covers the new route,
sitemap entry, section anchors, footer link and downloadable resources.

Tokens have one authoritative declaration in a literal `:root` rule (including
a selector list containing `:root`). Conditional blocks are inspected for
duplicates too. Descendant, negated and pseudo-element selectors are not token
sources. Parser regression tests cover quoted values, at-rule preludes, exact
root selectors, malformed CSS, and direct or symlinked CLI invocation.

Browser checks should cover phone/desktop layouts, keyboard navigation, copy
success/failure (mock the clipboard instead of changing the user's clipboard),
and the live component/profile/player lifecycle. Test artifacts belong in the
ignored `output/playwright/` directory.
