import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const ORIGIN = "https://sciencedivine.org";
const DEFAULT_OUTPUT = "migration/data/legacy-url-inventory.csv";

const COLUMNS = [
  "Legacy URL",
  "Normalised URL",
  "Discovery source",
  "Current status code",
  "Current redirect destination",
  "Indexability",
  "Canonical URL",
  "Robots directive",
  "Sitemap inclusion",
  "Title",
  "Meta description",
  "H1",
  "Content type",
  "Word count",
  "GSC clicks",
  "GSC impressions",
  "Average position",
  "GA4 sessions",
  "Conversions",
  "Active ad usage",
  "Backlinks",
  "Internal links",
  "New URL",
  "Required response: 200/301/308/404/410",
  "Redirect reason",
  "Priority: P0/P1/P2/P3",
  "QA result",
  "Owner",
  "Notes",
];

const KNOWN_URLS = [
  ["https://sciencedivine.org/public/dominoqq/", "security audit", "P0", "410"],
  ["https://sciencedivine.org/personal-session/", "commercial URL list", "P1", ""],
  ["https://sciencedivine.org/donation/", "commercial URL list", "P1", ""],
  ["https://sciencedivine.org/event-new/", "commercial URL list", "P1", ""],
  ["https://sciencedivine.org/session/", "commercial URL list", "P1", ""],
  ["https://sciencedivine.org/sanjeevni-kriya/", "commercial URL list", "P1", ""],
  [
    "https://sciencedivine.org/the-science-of-joyful-living-landing-page/",
    "commercial URL list",
    "P1",
    "",
  ],
  [
    "https://sciencedivine.org/mind-power-meditation-landing-page/",
    "commercial URL list",
    "P1",
    "",
  ],
  [
    "https://sciencedivine.org/sanjeevi-kriya-landing-page/",
    "commercial URL list",
    "P1",
    "",
  ],
  ["https://sciencedivine.org/science-of-joyful-living-march/", "commercial URL list", "P1", ""],
  ["https://sciencedivine.org/mind-power-meditation/", "commercial URL list", "P1", ""],
  ["https://sciencedivine.org/courses/", "commercial URL list", "P1", ""],
  [
    "https://sciencedivine.org/product/science-divine-diamond-diary/",
    "commercial URL list",
    "P1",
    "",
  ],
  ["https://us.sciencedivine.org/", "known subdomain", "P1", ""],
];

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const outputPath = resolve(args.get("--output") ?? DEFAULT_OUTPUT);
const jsonPath = outputPath.replace(/\.csv$/i, ".json");
const checkStatus = process.argv.includes("--check-status");
const checkMedia = process.argv.includes("--check-media");
const concurrency = Number(args.get("--concurrency") ?? 3);

const rows = new Map();
const sitemapUrls = new Set();

function cleanText(value = "") {
  return String(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#8217;|&rsquo;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalise(rawUrl) {
  const url = new URL(rawUrl, ORIGIN);
  url.hash = "";
  url.protocol = "https:";
  if (url.hostname === "www.sciencedivine.org") url.hostname = "sciencedivine.org";
  url.pathname = url.pathname.replace(/\/{2,}/g, "/");
  if (!url.pathname.includes(".") && !url.pathname.endsWith("/")) url.pathname += "/";
  return url.toString();
}

function getRow(rawUrl) {
  const legacyUrl = new URL(rawUrl, ORIGIN).toString();
  if (!rows.has(legacyUrl)) {
    const row = Object.fromEntries(COLUMNS.map((column) => [column, ""]));
    row["Legacy URL"] = legacyUrl;
    row["Normalised URL"] = normalise(legacyUrl);
    row["Indexability"] = "UNVERIFIED";
    row["Sitemap inclusion"] = "No";
    row["QA result"] = "NOT TESTED";
    row["Owner"] = "SEO migration lead";
    rows.set(legacyUrl, row);
  }
  return rows.get(legacyUrl);
}

function addSource(row, source) {
  const sources = new Set(
    row["Discovery source"]
      .split(" | ")
      .map((value) => value.trim())
      .filter(Boolean),
  );
  sources.add(source);
  row["Discovery source"] = [...sources].sort().join(" | ");
}

async function getText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "ScienceDivineMigrationAudit/1.0" },
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

async function collectSitemap(url, seen = new Set()) {
  if (seen.has(url)) return;
  seen.add(url);
  const xml = await getText(url);
  const locations = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    match[1].replace(/&amp;/g, "&"),
  );

  if (/<sitemapindex\b/i.test(xml)) {
    for (const child of locations) await collectSitemap(child, seen);
    return;
  }

  for (const location of locations) {
    sitemapUrls.add(location);
    const row = getRow(location);
    addSource(row, `XML sitemap: ${url}`);
    row["Sitemap inclusion"] = "Yes";
  }
}

async function collectEndpoint(endpoint, contentType, options = {}) {
  let page = 1;
  let totalPages = 1;
  do {
    const fields = options.media
      ? "id,slug,link,status,date,modified,title,caption,alt_text,source_url,mime_type"
      : "id,slug,link,status,type,date,modified,title,content,excerpt,yoast_head_json";
    const url = `${ORIGIN}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}&_fields=${fields}`;
    const response = await fetch(url, {
      headers: { "user-agent": "ScienceDivineMigrationAudit/1.0" },
    });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    totalPages = Number(response.headers.get("x-wp-totalpages") ?? 1);
    const items = await response.json();

    for (const item of items) {
      const itemUrl = options.media ? item.source_url || item.link : item.link;
      if (!itemUrl) continue;
      const row = getRow(itemUrl);
      addSource(row, `WordPress REST API: ${endpoint}`);
      row["Content type"] = options.media ? item.mime_type || "media" : contentType;
      row["Title"] = cleanText(item.title?.rendered ?? "");
      row["Meta description"] = item.yoast_head_json?.description ?? "";
      row["Canonical URL"] = item.yoast_head_json?.canonical ?? "";
      const robots = item.yoast_head_json?.robots;
      if (robots) {
        row["Robots directive"] = Object.values(robots).join(", ");
        row["Indexability"] = robots.index === "noindex" ? "No" : "Yes";
      }
      if (options.media) {
        row["Notes"] = [
          item.alt_text ? `Alt: ${cleanText(item.alt_text)}` : "Alt text missing/unverified",
          item.modified ? `WP modified: ${item.modified}` : "",
        ]
          .filter(Boolean)
          .join(" | ");
      } else {
        const body = cleanText(item.content?.rendered ?? "");
        row["Word count"] = body ? String(body.split(/\s+/).length) : "0";
        row["Notes"] = item.modified ? `WP modified: ${item.modified}` : "";
      }
    }
    page += 1;
  } while (page <= totalPages);
}

async function collectTaxonomy(endpoint, contentType) {
  let page = 1;
  let totalPages = 1;
  do {
    const url = `${ORIGIN}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}&_fields=id,link,name,slug,count`;
    const response = await fetch(url, {
      headers: { "user-agent": "ScienceDivineMigrationAudit/1.0" },
    });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    totalPages = Number(response.headers.get("x-wp-totalpages") ?? 1);
    const items = await response.json();
    for (const item of items) {
      if (!item.link) continue;
      const row = getRow(item.link);
      addSource(row, `WordPress REST API: ${endpoint}`);
      row["Content type"] = contentType;
      row["Title"] ||= cleanText(item.name);
      row["Notes"] = `Published item count: ${item.count}`;
    }
    page += 1;
  } while (page <= totalPages);
}

function htmlValue(html, pattern) {
  return cleanText(html.match(pattern)?.[1] ?? "");
}

async function inspectUrl(row) {
  if (row["Content type"].startsWith("image/") && !checkMedia) return;
  try {
    const response = await fetch(row["Legacy URL"], {
      redirect: "manual",
      headers: { "user-agent": "ScienceDivineMigrationAudit/1.0" },
    });
    row["Current status code"] = String(response.status);
    row["Current redirect destination"] = response.headers.get("location") ?? "";
    const contentType = response.headers.get("content-type") ?? "";
    if (response.status === 200 && contentType.includes("text/html")) {
      const html = await response.text();
      row["Title"] ||= htmlValue(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
      row["Meta description"] ||= htmlValue(
        html,
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i,
      );
      row["Canonical URL"] ||= html.match(
        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i,
      )?.[1] ?? "";
      row["Robots directive"] ||= html.match(
        /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i,
      )?.[1] ?? "";
      row["H1"] = htmlValue(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
      if (!row["Word count"]) {
        const bodyText = cleanText(html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "");
        row["Word count"] = bodyText ? String(bodyText.split(/\s+/).length) : "0";
      }
      if (row["Robots directive"].toLowerCase().includes("noindex")) row["Indexability"] = "No";
      else row["Indexability"] = "Yes";
    } else if (response.status >= 300 || response.status >= 400) {
      row["Indexability"] = "No";
    }
  } catch (error) {
    row["QA result"] = "ERROR";
    row["Notes"] = [row["Notes"], `Fetch error: ${error.message}`].filter(Boolean).join(" | ");
  }
}

async function runPool(items, worker, size) {
  let cursor = 0;
  async function next() {
    while (cursor < items.length) {
      const current = items[cursor++];
      await worker(current);
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, size) }, next));
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

async function main() {
  await collectSitemap(`${ORIGIN}/sitemap.xml`);
  await collectEndpoint("posts", "post");
  await collectEndpoint("pages", "page");
  await collectEndpoint("product", "product");
  await collectEndpoint("media", "media", { media: true });
  await collectTaxonomy("categories", "category archive");
  await collectTaxonomy("tags", "tag archive");

  for (const [url, source, priority, requiredResponse] of KNOWN_URLS) {
    const row = getRow(url);
    addSource(row, source);
    row["Priority: P0/P1/P2/P3"] ||= priority;
    row["Required response: 200/301/308/404/410"] ||= requiredResponse;
    if (url.includes("/public/dominoqq/")) {
      row["Indexability"] = "No";
      row["New URL"] = "";
      row["Redirect reason"] = "Confirmed suspected hacked/spam URL; must return 410 and never redirect";
      row["Notes"] = "P0: live production returned 200 during 2026-08-21 audit";
    } else if (source === "commercial URL list") {
      row["Active ad usage"] = "VERIFY IN GOOGLE ADS/META";
    }
  }

  for (const row of rows.values()) {
    if (sitemapUrls.has(row["Legacy URL"])) row["Sitemap inclusion"] = "Yes";
  }

  if (checkStatus) {
    await runPool([...rows.values()], inspectUrl, concurrency);
  }

  const sortedRows = [...rows.values()].sort((a, b) =>
    a["Legacy URL"].localeCompare(b["Legacy URL"]),
  );
  const csv = [
    COLUMNS.map(csvEscape).join(","),
    ...sortedRows.map((row) => COLUMNS.map((column) => csvEscape(row[column])).join(",")),
  ].join("\n");

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${csv}\n`, "utf8");
  await writeFile(jsonPath, `${JSON.stringify(sortedRows, null, 2)}\n`, "utf8");

  const classified = sortedRows.filter(
    (row) => row["Required response: 200/301/308/404/410"],
  ).length;
  console.log(
    JSON.stringify(
      {
        output: outputPath,
        json: jsonPath,
        rows: sortedRows.length,
        classified,
        unclassified: sortedRows.length - classified,
        statusChecked: checkStatus,
      },
      null,
      2,
    ),
  );
}

await main();
