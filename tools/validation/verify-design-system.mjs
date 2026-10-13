import { createHash } from "node:crypto";
import { readFile, realpath, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repository = fileURLToPath(new URL("../../", import.meta.url));
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

function quotedEnd(text, start) {
  const quote = text[start];
  for (let index = start + 1; index < text.length; index += 1) {
    if (text[index] === "\\") index += 1;
    else if (text[index] === quote) return index;
  }
  return text.length - 1;
}

function withoutCssComments(css) {
  let result = "";
  for (let index = 0; index < css.length; index += 1) {
    if (css[index] === '"' || css[index] === "'") {
      const end = quotedEnd(css, index);
      result += css.slice(index, end + 1);
      index = end;
    } else if (css[index] === "\\") {
      result += css.slice(index, index + 2);
      index += 1;
    } else if (css[index] === "/" && css[index + 1] === "*") {
      const end = css.indexOf("*/", index + 2);
      // A comment separates surrounding tokens, but comment-like text inside
      // a quoted value remains literal and must not be removed.
      result += " ";
      index = end === -1 ? css.length : end + 1;
    } else {
      result += css[index];
    }
  }
  return result;
}

function hasRootSelector(selector) {
  for (let index = 0; index < selector.length; index += 1) {
    if (selector[index] === '"' || selector[index] === "'") index = quotedEnd(selector, index);
    else if (selector[index] === "\\") index += 1;
    else if (selector.startsWith(":root", index) && selector[index - 1] !== ":" && !/[\w-]/.test(selector[index + 5] ?? "")) return true;
  }
  return false;
}

function blockEnd(css, start) {
  let depth = 1;
  for (let index = start + 1; index < css.length; index += 1) {
    if (css[index] === '"' || css[index] === "'") index = quotedEnd(css, index);
    else if (css[index] === "\\") index += 1;
    else if (css[index] === "{") depth += 1;
    else if (css[index] === "}" && --depth === 0) return index;
  }
  return css.length;
}

function rootDeclarations(body, tokens, duplicates) {
  let start = 0;
  let depth = 0;
  function declaration(end) {
    const text = body.slice(start, end).trim();
    const property = /^(--[\w-]+)\s*:/.exec(text);
    if (!property) return;
    const variable = property[1];
    if (tokens.has(variable)) duplicates.push(variable);
    tokens.set(variable, text.slice(property[0].length).trim());
  }
  for (let index = 0; index < body.length; index += 1) {
    const character = body[index];
    if (character === '"' || character === "'") index = quotedEnd(body, index);
    else if (character === "\\") index += 1;
    else if ("([{".includes(character)) depth += 1;
    else if (")]}".includes(character)) depth = Math.max(0, depth - 1);
    else if (character === ";" && depth === 0) {
      declaration(index);
      start = index + 1;
    }
  }
  // CSS permits omitting the final declaration's semicolon.
  declaration(body.length);
}

export function parseRootTokens(css) {
  if (typeof css !== "string") throw new TypeError("CSS source must be a string");
  const source = withoutCssComments(css);
  const tokens = new Map();
  const duplicates = [];
  let roots = 0;
  let start = 0;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '"' || character === "'") index = quotedEnd(source, index);
    else if (character === "\\") index += 1;
    else if (character === "{") {
      if (hasRootSelector(source.slice(start, index))) {
        const end = blockEnd(source, index);
        rootDeclarations(source.slice(index + 1, end), tokens, duplicates);
        roots += 1;
        index = end;
      }
      start = index + 1;
    } else if (character === "}" || character === ";") {
      start = index + 1;
    }
  }
  return { tokens, duplicates, roots };
}

function cssTokens(css) {
  const { tokens, duplicates, roots } = parseRootTokens(css);
  if (!roots) fail("globals.css", "no readable :root declaration block found");
  for (const variable of duplicates) fail(`globals.css ${variable}`, "duplicate :root declaration; keep one authoritative value");
  return tokens;
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

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
