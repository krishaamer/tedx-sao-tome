import { createHash } from "node:crypto";
import { readFile, realpath, stat } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const modulePath = await realpath(fileURLToPath(import.meta.url));
const repository = resolve(dirname(modulePath), "../..");
const publicDirectory = resolve(repository, "apps/web/public");
const failures = [];
const colorPattern = /^#(?:[\da-f]{3}|[\da-f]{6})$/i;
let checkedTokens = 0;
let checkedSwatches = 0;
let minimumContrast = Infinity;

function fail(context, message) {
  failures.push(`${context}: ${message}`);
}

function object(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function within(directory, path) {
  const fromDirectory = relative(directory, path);
  return fromDirectory !== ".." && !fromDirectory.startsWith(`..${sep}`) && !isAbsolute(fromDirectory);
}

async function boundedFile(directory, path, context) {
  if (!within(directory, path)) {
    fail(context, `path escapes ${relative(repository, directory) || "the repository"}`);
    return null;
  }
  try {
    const [resolvedDirectory, resolvedFile] = await Promise.all([realpath(directory), realpath(path)]);
    if (!within(resolvedDirectory, resolvedFile)) {
      fail(context, "symlink resolves outside the permitted directory");
      return null;
    }
    if (!(await stat(resolvedFile)).isFile()) {
      fail(context, "expected a regular file");
      return null;
    }
    return await readFile(resolvedFile);
  } catch (error) {
    fail(context, `cannot read file (${error.code ?? error.message})`);
    return null;
  }
}

function normalizeColor(value) {
  const hex = value.slice(1).toLowerCase();
  return `#${hex.length === 3 ? [...hex].map((digit) => digit.repeat(2)).join("") : hex}`;
}

function luminance(color) {
  const rgb = normalizeColor(color).slice(1).match(/../g).map((channel) => {
    const value = Number.parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return rgb.reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(first, second) {
  const light = luminance(first);
  const dark = luminance(second);
  return (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05);
}

export function parseRootTokens(css) {
  if (typeof css !== "string") throw new TypeError("CSS source must be a string");
  const stylesheet = postcss.parse(css, { from: undefined });
  const tokens = new Map();
  const duplicates = [];
  let roots = 0;

  stylesheet.walkRules((rule) => {
    // Only a literal root selector supplies canonical tokens. This excludes
    // descendants, :not(:root), :root::before and quoted attribute values.
    if (!rule.selectors.some((selector) => selector.replace(/\/\*[\s\S]*?\*\//g, " ").trim() === ":root")) return;
    // A nested rule acquires its parent selector even if its own text is
    // :root. At-rule containers remain eligible (for example @supports).
    for (let parent = rule.parent; parent; parent = parent.parent) {
      if (parent.type === "rule") return;
    }
    roots += 1;
    rule.walkDecls((declaration) => {
      if (!/^--[\w-]+$/.test(declaration.prop)) return;
      // Grouping at-rules inherit this root scope. A nested child rule changes
      // the selector and therefore is not a canonical token declaration.
      for (let parent = declaration.parent; parent && parent !== rule; parent = parent.parent) {
        if (parent.type === "rule") return;
      }
      const variable = declaration.prop;
      if (tokens.has(variable)) duplicates.push(variable);
      const priority = declaration.important ? " !important" : "";
      tokens.set(variable, `${declaration.value.trim()}${priority}`);
    });
  });
  return { tokens, duplicates, roots };
}

function cssTokens(css) {
  try {
    const { tokens, duplicates, roots } = parseRootTokens(css);
    if (!roots) fail("globals.css", "no literal :root declaration block found");
    for (const variable of duplicates) fail(`globals.css ${variable}`, "duplicate :root declaration; keep one authoritative value");
    return tokens;
  } catch (error) {
    fail("globals.css", `cannot parse CSS: ${error.reason ?? error.message}${error.line ? ` at line ${error.line}, column ${error.column}` : ""}`);
    return new Map();
  }
}

function checkTokenArray(document, key, css, seen) {
  const tokens = document[key];
  if (!Array.isArray(tokens) || !tokens.length) {
    fail(key, "expected a non-empty array of token objects");
    return;
  }
  tokens.forEach((token, index) => {
    const context = `${key}[${index}]`;
    if (!object(token)) {
      fail(context, "expected a token object");
      return;
    }
    if (typeof token.variable !== "string" || !/^--[A-Za-z_][\w-]*$/.test(token.variable)) {
      fail(context, "variable must be a CSS custom-property name such as --red");
      return;
    }
    if (seen.has(token.variable)) fail(context, `duplicate documented variable ${token.variable}`);
    seen.add(token.variable);
    if (typeof token.value !== "string" || !token.value.trim()) {
      fail(context, `${token.variable} needs a non-empty string value`);
      return;
    }
    if (!css.has(token.variable)) {
      fail(context, `${token.variable} is missing from globals.css :root`);
    } else if (css.get(token.variable) !== token.value) {
      fail(context, `${token.variable} documents ${JSON.stringify(token.value)} but :root contains ${JSON.stringify(css.get(token.variable))}; update the token document or CSS together`);
    }
    checkedTokens += 1;
    if (key !== "colors") return;
    const validBackground = colorPattern.test(token.value);
    const validText = typeof token.text === "string" && colorPattern.test(token.text);
    if (!validBackground) fail(context, "value must be an opaque hexadecimal color (#RGB or #RRGGBB)");
    if (!validText) fail(context, "text must be an opaque hexadecimal swatch-label color (#RGB or #RRGGBB)");
    if (validBackground && validText) {
      const ratio = contrast(token.value, token.text);
      if (ratio < 4.5) fail(context, `${token.text} text on ${token.value} has contrast ${ratio.toFixed(2)}:1; choose a label color with at least 4.5:1`);
      minimumContrast = Math.min(minimumContrast, ratio);
      checkedSwatches += 1;
    }
  });
}

async function checkArchiveLogo(logo) {
  if (!object(logo)) {
    fail("archiveLogo", "expected an object containing path, source, colors and sha256");
    return;
  }
  const validHash = typeof logo.sha256 === "string" && /^[\da-f]{64}$/i.test(logo.sha256);
  if (!validHash) fail("archiveLogo.sha256", "expected a 64-character SHA-256 hash");
  const validColors = Array.isArray(logo.colors) && logo.colors.length > 0 &&
    logo.colors.every((color) => typeof color === "string" && colorPattern.test(color));
  if (!validColors) fail("archiveLogo.colors", "expected a non-empty array of opaque hexadecimal colors");
  const expectedColors = validColors ? [...new Set(logo.colors.map(normalizeColor))].sort() : [];
  if (validColors && expectedColors.length !== logo.colors.length) fail("archiveLogo.colors", "duplicate colors are not allowed");

  const references = [];
  if (typeof logo.path !== "string" || !/^\/(?!\/)/.test(logo.path) || /[\\%?#\0]/.test(logo.path) || !logo.path.endsWith(".svg")) {
    fail("archiveLogo.path", "expected a local public SVG URL such as /images/tedxsaotome-logo.svg, without escapes or URL parameters");
  } else {
    references.push({ context: "archiveLogo.path", directory: publicDirectory, path: resolve(publicDirectory, `.${logo.path}`) });
  }
  if (typeof logo.source !== "string" || !logo.source || isAbsolute(logo.source) || /[\\%?#\0]/.test(logo.source) || !logo.source.endsWith(".svg")) {
    fail("archiveLogo.source", "expected a repository-relative SVG source path without escapes or URL parameters");
  } else {
    references.push({ context: "archiveLogo.source", directory: repository, path: resolve(repository, logo.source) });
  }
  for (const reference of references) {
    const buffer = await boundedFile(reference.directory, reference.path, reference.context);
    if (!buffer) continue;
    const actualHash = createHash("sha256").update(buffer).digest("hex");
    if (validHash && actualHash !== logo.sha256.toLowerCase()) {
      fail(reference.context, `SHA-256 is ${actualHash}, not declared ${logo.sha256}; restore the preserved SVG or verify and document the source change`);
    }
    const svg = buffer.toString("utf8").replace(/<!--[\s\S]*?-->/g, "");
    if (!/<svg(?:\s|>)/.test(svg)) fail(reference.context, "file does not contain an SVG root element");
    const fills = [...svg.matchAll(/\bfill\s*=\s*["']([^"']+)["']/gi), ...svg.matchAll(/\bfill\s*:\s*([^;\s"']+)/gi)]
      .map((match) => match[1].trim()).filter((fill) => fill.toLowerCase() !== "none");
    if (!fills.length) fail(reference.context, "no explicit logo fill colors found");
    const unsupported = fills.filter((fill) => !colorPattern.test(fill));
    if (unsupported.length) fail(reference.context, `unsupported logo fill values: ${[...new Set(unsupported)].join(", ")}`);
    const actualColors = [...new Set(fills.filter((fill) => colorPattern.test(fill)).map(normalizeColor))].sort();
    if (validColors && actualColors.join(",") !== expectedColors.join(",")) {
      fail(reference.context, `SVG fills are ${actualColors.join(", ") || "none"}; declared archival colors are ${expectedColors.join(", ")}`);
    }
  }
}

async function main() {
  const tokenPath = resolve(publicDirectory, "brand/design-tokens.json");
  const cssPath = resolve(repository, "apps/web/src/app/globals.css");
  const [tokenBuffer, cssBuffer] = await Promise.all([
    boundedFile(publicDirectory, tokenPath, "design-tokens.json"),
    boundedFile(repository, cssPath, "globals.css"),
  ]);
  let document;
  if (tokenBuffer) {
    try {
      document = JSON.parse(tokenBuffer.toString("utf8"));
      if (!object(document)) {
        fail("design-tokens.json", "expected a JSON object");
        document = null;
      }
    } catch (error) {
      fail("design-tokens.json", `invalid JSON (${error.message})`);
    }
  }
  if (document) {
    const css = cssBuffer ? cssTokens(cssBuffer.toString("utf8")) : new Map();
    const seen = new Set();
    checkTokenArray(document, "colors", css, seen);
    checkTokenArray(document, "primitives", css, seen);
    await checkArchiveLogo(document.archiveLogo);
  }
  if (failures.length) {
    console.error(`Design-system validation failed (${failures.length} issue${failures.length === 1 ? "" : "s"}):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Design-system validation passed: ${checkedTokens} CSS tokens, ${checkedSwatches} accessible swatches (minimum ${minimumContrast.toFixed(2)}:1), and public/source logo SHA-256 and archival fills match.`);
}

if (process.argv[1]) {
  const entryPath = await realpath(resolve(process.argv[1])).catch(() => null);
  if (entryPath === modulePath) await main();
}
