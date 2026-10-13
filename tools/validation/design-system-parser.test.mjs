import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, symlink } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { parseRootTokens } from "./verify-design-system.mjs";

test("preserves semicolons, braces and escaped quotes inside quoted values", () => {
  const parsed = parseRootTokens(String.raw`:root {
    --font: "Name; } { with \"quote\"", sans-serif;
    --single: 'Another; } { with \'quote\'';
    --after: 4px;
  }`);
  assert.equal(parsed.tokens.get("--font"), String.raw`"Name; } { with \"quote\"", sans-serif`);
  assert.equal(parsed.tokens.get("--single"), String.raw`'Another; } { with \'quote\''`);
  assert.equal(parsed.tokens.get("--after"), "4px");
  assert.equal(parsed.roots, 1);
});

test("reads a final variable without a trailing semicolon", () => {
  assert.deepEqual([...parseRootTokens(":root { --first: 4px; --final:  8px }").tokens], [
    ["--first", "4px"], ["--final", "8px"],
  ]);
});

test("removes comments while preserving comment-like literal strings", () => {
  const parsed = parseRootTokens(`/* :root { --ignored: 1; } */
    :root /* selector note */ {
      /* property note */ --first: 4px /* value note */;
      --literal: "/* keep; } this */";
      --final: 8px /* final note */
    }`);
  assert.equal(parsed.roots, 1);
  assert.equal(parsed.tokens.has("--ignored"), false);
  assert.equal(parsed.tokens.get("--first"), "4px");
  assert.equal(parsed.tokens.get("--literal"), '"/* keep; } this */"');
  assert.equal(parsed.tokens.get("--final"), "8px");
});

test("reports duplicate variables within and across multiple root blocks", () => {
  const parsed = parseRootTokens(`:root { --first: 4px; --first: 8px; }
    .component { --outside: 2px; }
    :root, html { --second: 12px; --first: 16px }
    @media (min-width: 760px) { :root { --second: 24px } }`);
  assert.equal(parsed.roots, 3);
  assert.deepEqual(parsed.duplicates, ["--first", "--first", "--second"]);
  assert.deepEqual([...parsed.tokens], [["--first", "16px"], ["--second", "24px"]]);
});

test("ignores variables outside root blocks and root text in quoted selectors", () => {
  const parsed = parseRootTokens(`.component { --outside: 4px; }
    [data-label=":root"] { --also-outside: 8px; }
    :rooted { --not-root: 12px; }
    :root { --inside: 16px }`);
  assert.equal(parsed.roots, 1);
  assert.deepEqual([...parsed.tokens], [["--inside", "16px"]]);
});

test("only literal root selectors, including selector lists, are canonical", () => {
  const parsed = parseRootTokens(`.theme :root { --descendant: 4px; }
    :not(:root) { --negated: 8px; }
    :root::before { --pseudo-element: 12px; }
    :root:hover { --state: 16px; }
    :is(:root) { --functional: 20px; }
    .theme { :root { --nested-root: 24px; } }
    html, :root, .theme { --literal: 32px; }
    :root /* selector comment */ { --commented: 48px; }`);
  assert.equal(parsed.roots, 2);
  assert.deepEqual([...parsed.tokens], [["--literal", "32px"], ["--commented", "48px"]]);
});

test("ignores supports prelude text but visits actual roots inside at-rules", () => {
  const parsed = parseRootTokens(`@supports selector(:root) {
      .theme { --not-canonical: 4px; }
    }
    @supports selector(:root) {
      :root { --canonical: 8px; }
      @media (min-width: 760px) { :root { --canonical: 12px; } }
    }`);
  assert.equal(parsed.roots, 2);
  assert.deepEqual([...parsed.tokens], [["--canonical", "12px"]]);
  assert.deepEqual(parsed.duplicates, ["--canonical"]);
});

test("reads only direct root declarations, ignoring nested child declarations", () => {
  const parsed = parseRootTokens(`:root {
    --before: 4px;
    .child { --nested: 8px; }
    @media (min-width: 760px) { --conditional-child: 12px; }
    --after: 16px;
  }`);
  assert.equal(parsed.roots, 1);
  assert.deepEqual([...parsed.tokens], [["--before", "4px"], ["--after", "16px"]]);
});

test("fails closed for malformed CSS instead of returning partial tokens", () => {
  for (const css of [
    ":root { --red: #fff;",
    ':root { --name: "unterminated; }',
    ":root { --red: #fff; } /* unterminated comment",
  ]) {
    assert.throws(() => parseRootTokens(css), { name: "CssSyntaxError" });
  }
});

test("preserves important priority for exact documented-value comparison", () => {
  const parsed = parseRootTokens(":root { --red: #eb0028 !important; --font: Arial, sans-serif !IMPORTANT }");
  assert.equal(parsed.tokens.get("--red"), "#eb0028 !important");
  assert.equal(parsed.tokens.get("--font"), "Arial, sans-serif !important");
  assert.notEqual(parsed.tokens.get("--red"), "#eb0028");
});

test("preserves exact values and semicolons inside unquoted functions", () => {
  const parsed = parseRootTokens(String.raw`:root {
    --image: url(data:image/svg+xml;base64,abc);
    --escaped: name\;suffix;
    --value:  Arial,  Helvetica, sans-serif
  }`);
  assert.equal(parsed.tokens.get("--image"), "url(data:image/svg+xml;base64,abc)");
  assert.equal(parsed.tokens.get("--escaped"), String.raw`name\;suffix`);
  assert.equal(parsed.tokens.get("--value"), "Arial,  Helvetica, sans-serif");
});

test("matches every current documented token exactly", async () => {
  const [css, json] = await Promise.all([
    readFile(new URL("../../apps/web/src/app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../../apps/web/public/brand/design-tokens.json", import.meta.url), "utf8"),
  ]);
  const document = JSON.parse(json);
  const parsed = parseRootTokens(css);
  assert.ok(parsed.roots >= 1);
  assert.deepEqual(parsed.duplicates, []);
  for (const token of [...document.colors, ...document.primitives]) {
    assert.equal(parsed.tokens.get(token.variable), token.value, token.variable);
  }
});

test("importing the parser does not execute the CLI validator", () => {
  const moduleUrl = new URL("./verify-design-system.mjs", import.meta.url).href;
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", `await import(${JSON.stringify(moduleUrl)})`], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "");
  assert.equal(result.stderr, "");
});

test("direct CLI execution runs the validator", () => {
  const modulePath = fileURLToPath(new URL("./verify-design-system.mjs", import.meta.url));
  const result = spawnSync(process.execPath, [modulePath], { encoding: "utf8", timeout: 10000 });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Design-system validation passed:/);
  assert.equal(result.stderr, "");
});

test("symlink CLI execution runs the validator with the actual repository path", async () => {
  const modulePath = fileURLToPath(new URL("./verify-design-system.mjs", import.meta.url));
  const directory = await mkdtemp(join(tmpdir(), "tedx-design-parser-cli-"));
  try {
    const entry = join(directory, "validator.mjs");
    await symlink(modulePath, entry);
    const result = spawnSync(process.execPath, [entry], { encoding: "utf8", timeout: 10000 });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Design-system validation passed:/);
    assert.equal(result.stderr, "");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
