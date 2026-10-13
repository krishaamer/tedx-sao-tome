import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const canonicalOrigin = "https://www.tedxsaotome.com";
const exportDirectory = resolve(
  process.argv[2] ?? fileURLToPath(new URL("../../apps/web/out/", import.meta.url)),
);
const failures = [];
const documents = new Map();
const resourceChecks = new Set();
let checkedLinks = 0;
let checkedMedia = 0;
let checkedStructuredData = 0;

function fail(context, message) {
  failures.push(`${context}: ${message}`);
}

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, code) => {
    const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
    if (code.startsWith("#")) {
      const number = code[1].toLowerCase() === "x"
        ? Number.parseInt(code.slice(2), 16)
        : Number.parseInt(code.slice(1), 10);
      return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : entity;
    }
    return named[code.toLowerCase()] ?? entity;
  });
}

function textContent(html) {
  return decodeEntities(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function attributes(tag) {
  const result = new Map();
  const contents = tag.replace(/^<\/?[\w:-]+/, "").replace(/\/?>$/, "");
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of contents.matchAll(pattern)) {
    result.set(match[1].toLowerCase(), decodeEntities(match[2] ?? match[3] ?? match[4] ?? ""));
  }
  return result;
}

function srcsetUrls(value) {
  const urls = [];
  let cursor = 0;
  while (cursor < value.length) {
    while (/[\s,]/.test(value[cursor] ?? "") && cursor < value.length) cursor += 1;
    const start = cursor;
    while (cursor < value.length && !/\s/.test(value[cursor])) cursor += 1;
    const url = value.slice(start, cursor);
    if (!url) break;
    urls.push(url.replace(/,+$/, ""));
    if (url.endsWith(",")) continue;
    // A data URL may contain commas. Separators follow the URL's descriptors,
    // so splitting the full srcset on commas would invent nonexistent files.
    let parentheses = 0;
    while (cursor < value.length) {
      const character = value[cursor++];
      if (character === "(") parentheses += 1;
      else if (character === ")") parentheses = Math.max(0, parentheses - 1);
      else if (character === "," && parentheses === 0) break;
    }
  }
  return urls;
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

function isPublicIndex(path) {
  const parts = relative(exportDirectory, path).split(sep);
  return parts.at(-1) === "index.html" &&
    !parts.some((part) => part.startsWith("_") || part === "404");
}

function routeForFile(path) {
  const directory = relative(exportDirectory, dirname(path)).split(sep).filter(Boolean);
  return directory.length ? `/${directory.join("/")}/` : "/";
}

function routeForPathname(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded.endsWith("/index.html")) return decoded.slice(0, -10) || "/";
  return decoded.endsWith("/") ? decoded : `${decoded}/`;
}

function internalUrl(value, base, context) {
  let url;
  try {
    url = new URL(value, base);
  } catch {
    fail(context, `malformed URL ${JSON.stringify(value)}`);
    return null;
  }
  if (!["http:", "https:"].includes(url.protocol)) return null;
  if (!["www.tedxsaotome.com", "tedxsaotome.com"].includes(url.hostname)) return null;
  return url;
}

async function exportedFileExists(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return false;
  }
  const target = resolve(exportDirectory, `.${decoded}`);
  const withinExport = relative(exportDirectory, target);
  if (withinExport === ".." || withinExport.startsWith(`..${sep}`)) return false;
  try {
    return (await stat(target)).isFile();
  } catch {
    return false;
  }
}

async function checkMedia(value, base, context) {
  if (!value) return;
  const url = internalUrl(value, base, context);
  if (!url) return;
  checkedMedia += 1;
  const key = `${context}\0${url.pathname}`;
  if (resourceChecks.has(key)) return;
  resourceChecks.add(key);
  if (!await exportedFileExists(url.pathname)) {
    fail(context, `local media/resource is missing: ${url.pathname}`);
  }
}

async function checkAnchor(value, document) {
  if (!value) return;
  const context = document.route;
  const url = internalUrl(value, document.canonical, context);
  if (!url) return;
  checkedLinks += 1;
  let route;
  try {
    route = routeForPathname(url.pathname);
  } catch {
    fail(context, `link has invalid URL encoding: ${value}`);
    return;
  }
  const target = documents.get(route);
  if (!target) {
    if (!await exportedFileExists(url.pathname)) fail(context, `internal link has no exported target: ${value}`);
    return;
  }
  if (url.hash && url.hash !== "#") {
    let fragment;
    try {
      fragment = decodeURIComponent(url.hash.slice(1));
    } catch {
      fail(context, `fragment has invalid URL encoding: ${value}`);
      return;
    }
    if (!target.ids.has(fragment)) fail(context, `fragment does not exist on ${route}: #${fragment}`);
  }
}

function parseDocument(path, html) {
  const route = routeForFile(path);
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
  // Next embeds RSC payloads in scripts; these are not document markup or metadata.
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "");
  const tags = [...markup.matchAll(/<[a-z][^>]*>/gi)].map((match) => ({
    name: match[0].match(/^<([\w:-]+)/)[1].toLowerCase(),
    attrs: attributes(match[0]),
  })).concat(scripts.map((match) => ({ name: "script", attrs: attributes(`<script${match[1]}>`) })));
  const meta = new Map();
  const ids = new Set();
  for (const { name, attrs } of tags) {
    const id = attrs.get("id") ?? (name === "a" ? attrs.get("name") : undefined);
    if (id) {
      if (ids.has(id)) fail(route, `duplicate element id ${JSON.stringify(id)}`);
      ids.add(id);
    }
    if (name !== "meta") continue;
    const key = attrs.get("name") ?? attrs.get("property");
    if (!key) continue;
    const values = meta.get(key.toLowerCase()) ?? [];
    values.push(attrs.get("content") ?? "");
    meta.set(key.toLowerCase(), values);
  }
  const titles = [...markup.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi)]
    .map((match) => textContent(match[1]));
  const headings = [...markup.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/gi)]
    .map((match) => textContent(match[1]));
  const canonicalLinks = tags.filter(({ name, attrs }) => name === "link" &&
    attrs.get("rel")?.toLowerCase().split(/\s+/).includes("canonical"));
  const canonical = `${canonicalOrigin}${encodeURI(route)}`;
  const structuredData = scripts.filter((match) =>
    attributes(`<script${match[1]}>`).get("type")?.toLowerCase() === "application/ld+json")
    .map((match) => match[2]);
  return { route, canonical, titles, headings, canonicalLinks, tags, meta, ids, structuredData };
}

function singleMeta(document, key) {
  const values = document.meta.get(key) ?? [];
  if (values.length !== 1 || !values[0].trim()) {
    fail(document.route, `expected one nonempty ${key} metadata value, found ${values.length}`);
  }
  return values[0] ?? "";
}

function validateMetadata(document, seenTitles) {
  const { route, canonical, titles, headings, canonicalLinks } = document;
  const title = titles[0] ?? "";
  if (titles.length !== 1 || title.length < 12 || /^(?:create next app|next app|untitled)$/i.test(title)) {
    fail(route, "expected one descriptive document title of at least 12 characters");
  }
  if (seenTitles.has(title)) fail(route, `document title duplicates ${seenTitles.get(title)}`);
  else seenTitles.set(title, route);
  if (headings.length !== 1 || !headings[0]) {
    fail(route, `expected one nonempty h1, found ${headings.length}`);
  }
  if (canonicalLinks.length !== 1 || canonicalLinks[0].attrs.get("href") !== canonical) {
    fail(route, `canonical must be exactly ${canonical}`);
  }
  const description = singleMeta(document, "description");
  if (description.length < 30) fail(route, "page description must be descriptive (at least 30 characters)");
  const ogTitle = singleMeta(document, "og:title");
  const twitterTitle = singleMeta(document, "twitter:title");
  const primaryTitle = title.split(" | ")[0];
  for (const [key, value] of [["og:title", ogTitle], ["twitter:title", twitterTitle]]) {
    if (!value.includes(primaryTitle)) fail(route, `${key} must identify this page (${JSON.stringify(primaryTitle)})`);
  }
  if (ogTitle !== twitterTitle) fail(route, "Open Graph and Twitter titles disagree");
  for (const key of ["og:description", "twitter:description"]) {
    if (singleMeta(document, key) !== description) fail(route, `${key} must match the page description`);
  }
  if (singleMeta(document, "og:url") !== canonical) fail(route, `og:url must match the canonical ${canonical}`);
  singleMeta(document, "og:type");
  const card = singleMeta(document, "twitter:card");
  if (!["summary", "summary_large_image"].includes(card)) fail(route, "expected a supported Twitter summary card");
  const ogImages = document.meta.get("og:image") ?? [];
  const twitterImages = document.meta.get("twitter:image") ?? [];
  if (!ogImages.length || !twitterImages.length) fail(route, "Open Graph and Twitter must both specify an image");
  for (const [key, images] of [["og:image", ogImages], ["twitter:image", twitterImages]]) {
    for (const image of images) {
      try {
        const url = new URL(image);
        if (!["http:", "https:"].includes(url.protocol)) throw new Error("unsupported protocol");
      } catch {
        fail(route, `${key} must contain a nonempty absolute HTTP(S) image URL`);
      }
    }
  }
  if (!ogImages.some((image) => twitterImages.includes(image))) fail(route, "Open Graph and Twitter must share a page image");
}

function validDate(value) {
  if (typeof value !== "string") return false;
  const date = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|([+-])(\d{2}):(\d{2})))?$/);
  if (!date) return false;
  const [, year, month, day, hour, minute, second, zone, , offsetHour, offsetMinute] = date;
  const calendarDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (calendarDate.getUTCFullYear() !== Number(year) ||
      calendarDate.getUTCMonth() + 1 !== Number(month) ||
      calendarDate.getUTCDate() !== Number(day)) return false;
  if (hour !== undefined && (Number(hour) > 23 || Number(minute) > 59 || Number(second ?? 0) > 59)) return false;
  if (zone && zone !== "Z" && (Number(offsetHour) > 14 || Number(offsetMinute) > 59 ||
      (Number(offsetHour) === 14 && Number(offsetMinute) !== 0))) return false;
  return !Number.isNaN(Date.parse(value));
}

function validateStructuredData(value, context) {
  if (Array.isArray(value)) {
    value.forEach((item) => validateStructuredData(item, context));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, item] of Object.entries(value)) {
    if (key === "eventStatus" && (typeof item !== "string" ||
        !/^https:\/\/schema\.org\/Event(?:Scheduled|Cancelled|MovedOnline|Postponed|Rescheduled)$/.test(item))) {
      fail(context, `invalid Schema.org eventStatus: ${JSON.stringify(item)}`);
    }
    if (["startDate", "endDate", "datePublished", "dateModified", "validFrom", "validThrough"].includes(key) && !validDate(item)) {
      fail(context, `invalid ${key}; use a real ISO date or timestamp with Z / ±HH:MM: ${JSON.stringify(item)}`);
    }
    if (item && typeof item === "object") validateStructuredData(item, context);
  }
  if (validDate(value.startDate) && validDate(value.endDate) && Date.parse(value.endDate) < Date.parse(value.startDate)) {
    fail(context, "structured data endDate precedes startDate");
  }
}

async function validateDocument(document) {
  for (const { name, attrs } of document.tags) {
    if (["a", "area"].includes(name)) await checkAnchor(attrs.get("href"), document);
    if (["img", "source", "video", "audio", "track", "iframe", "embed", "script"].includes(name)) {
      await checkMedia(attrs.get("src"), document.canonical, document.route);
    }
    if (name === "video") await checkMedia(attrs.get("poster"), document.canonical, document.route);
    if (name === "object") await checkMedia(attrs.get("data"), document.canonical, document.route);
    if (["img", "source"].includes(name) && attrs.has("srcset")) {
      for (const source of srcsetUrls(attrs.get("srcset"))) {
        await checkMedia(source, document.canonical, document.route);
      }
    }
    if (name === "link") {
      const relations = (attrs.get("rel") ?? "").toLowerCase().split(/\s+/);
      if (relations.some((rel) => ["icon", "apple-touch-icon", "manifest", "stylesheet"].includes(rel)) ||
          (relations.includes("preload") && attrs.get("as") === "image")) {
        await checkMedia(attrs.get("href"), document.canonical, document.route);
      }
    }
    for (const match of (attrs.get("style") ?? "").matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
      await checkMedia(match[2], document.canonical, document.route);
    }
  }
  for (const key of ["og:image", "twitter:image"]) {
    for (const value of document.meta.get(key) ?? []) await checkMedia(value, document.canonical, document.route);
  }
  for (const json of document.structuredData) {
    checkedStructuredData += 1;
    try {
      const value = JSON.parse(json);
      if (!value || typeof value !== "object") fail(document.route, "JSON-LD must be an object or array");
      else validateStructuredData(value, document.route);
    } catch (error) {
      fail(document.route, `JSON-LD does not parse: ${error.message}`);
    }
  }
}

async function validateSitemapAndRobots() {
  let sitemap;
  let robots;
  try {
    sitemap = await readFile(resolve(exportDirectory, "sitemap.xml"), "utf8");
    robots = await readFile(resolve(exportDirectory, "robots.txt"), "utf8");
  } catch (error) {
    fail("Discovery files", error.message);
    return;
  }
  const urls = [...sitemap.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url\s*>/gi)]
    .map((match) => decodeEntities(match[1].match(/<loc\b[^>]*>([\s\S]*?)<\/loc\s*>/i)?.[1]?.trim() ?? ""));
  const seen = new Set();
  const expected = new Set([...documents.values()].map((document) => document.canonical));
  for (const url of urls) {
    if (seen.has(url)) fail("sitemap.xml", `duplicate public URL ${url}`);
    seen.add(url);
    if (!expected.has(url)) fail("sitemap.xml", `URL is not a canonical exported public page: ${url}`);
  }
  for (const url of expected) if (!seen.has(url)) fail("sitemap.xml", `missing exported public page ${url}`);
  if (urls.length !== documents.size) fail("sitemap.xml", `expected ${documents.size} public routes, found ${urls.length}`);
  for (const match of sitemap.matchAll(/<image:loc\b[^>]*>([\s\S]*?)<\/image:loc\s*>/gi)) {
    await checkMedia(decodeEntities(match[1].trim()), `${canonicalOrigin}/sitemap.xml`, "sitemap.xml");
  }
  if (!robots.split(/\r?\n/).some((line) => line.trim() === `Sitemap: ${canonicalOrigin}/sitemap.xml`)) {
    fail("robots.txt", `must advertise Sitemap: ${canonicalOrigin}/sitemap.xml`);
  }
  if (!robots.split(/\r?\n/).some((line) => line.trim() === `Host: ${canonicalOrigin}`)) {
    fail("robots.txt", `must advertise Host: ${canonicalOrigin}`);
  }
  if (/^Disallow:\s*\/\s*$/im.test(robots)) fail("robots.txt", "must not block the entire public archive");
}

async function main() {
  let files;
  try {
    files = await walk(exportDirectory);
  } catch (error) {
    console.error(`Cannot read the static export at ${exportDirectory}. Run pnpm build first.\n${error.message}`);
    process.exitCode = 1;
    return;
  }
  for (const path of files.filter(isPublicIndex).sort()) {
    const document = parseDocument(path, await readFile(path, "utf8"));
    documents.set(document.route, document);
  }
  if (!documents.has("/")) fail("Export", "homepage index.html is missing");
  const seenTitles = new Map();
  for (const document of documents.values()) {
    validateMetadata(document, seenTitles);
    await validateDocument(document);
  }
  if (!documents.get("/")?.structuredData.length) fail("/", "homepage JSON-LD is missing");
  for (const path of files.filter((file) => file.endsWith(".css"))) {
    const context = relative(exportDirectory, path).split(sep).join("/");
    const base = `${canonicalOrigin}/${context}`;
    for (const match of (await readFile(path, "utf8")).matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
      await checkMedia(match[2], base, context);
    }
  }
  await validateSitemapAndRobots();
  if (failures.length) {
    console.error(`Static export validation failed (${failures.length} issue${failures.length === 1 ? "" : "s"}):`);
    for (const failure of failures.slice(0, 100)) console.error(`- ${failure}`);
    if (failures.length > 100) console.error(`- ${failures.length - 100} additional issues omitted.`);
    process.exitCode = 1;
  } else {
    console.log(`Static export verified: ${documents.size} public pages, ${checkedLinks} internal links, ${checkedMedia} local resource references, ${checkedStructuredData} JSON-LD blocks, sitemap and robots.`);
  }
}

await main();
