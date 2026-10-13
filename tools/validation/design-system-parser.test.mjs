import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
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
