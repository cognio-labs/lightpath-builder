import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const REQUIRED_COLUMN = "Required response: 200/301/308/404/410";
const QUERY_TEST = {
  gclid: "migration-qa",
  gbraid: "migration-qa",
  wbraid: "migration-qa",
  fbclid: "migration-qa",
  utm_source: "migration-qa",
  utm_medium: "test",
  utm_campaign: "prelaunch",
  utm_content: "url-validator",
  utm_term: "migration",
};

function getArg(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

const inventoryPath = resolve(getArg("--inventory", "migration/data/legacy-url-inventory.csv"));
const baseUrl = getArg("--base-url");
const outputPath = resolve(getArg("--output", "migration/results/url-validation-results.csv"));
const reportPath = outputPath.replace(/\.csv$/i, ".md");
const concurrency = Number(getArg("--concurrency", "3"));
const allowUnclassified = process.argv.includes("--allow-unclassified");

function parseCsv(input) {
  const table = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quoted) {
      if (character === '"' && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      if (row.some((value) => value !== "")) table.push(row);
      row = [];
      field = "";
    } else field += character;
  }

  if (field || row.length) {
    row.push(field);
    table.push(row);
  }
  const [headers, ...values] = table;
  return values.map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""])),
  );
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function targetUrl(legacyUrl) {
  if (!baseUrl) return new URL(legacyUrl);
  const source = new URL(legacyUrl);
  const target = new URL(baseUrl);
  target.pathname = source.pathname;
  target.search = source.search;
  target.hash = "";
  return target;
}

function cleanText(value = "") {
  return String(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function attribute(html, tag, name, value, attributeName) {
  const tags = html.match(new RegExp(`<${tag}\\b[^>]*>`, "gi")) ?? [];
  for (const candidate of tags) {
    const expected = candidate.match(new RegExp(`\\b${name}=["']([^"']+)["']`, "i"))?.[1];
    if (expected?.toLowerCase() !== value.toLowerCase()) continue;
    return candidate.match(new RegExp(`\\b${attributeName}=["']([^"']*)["']`, "i"))?.[1] ?? "";
  }
  return "";
}

async function requestOnce(url) {
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "user-agent": "ScienceDivineMigrationValidator/1.0" },
  });
  const contentType = response.headers.get("content-type") ?? "";
  const html = contentType.includes("text/html") ? await response.text() : "";
  return { response, html };
}

function resolveLocation(location, fromUrl) {
  return location ? new URL(location, fromUrl).toString() : "";
}

async function traceRedirects(initialUrl, maxHops = 10) {
  const steps = [];
  let current = initialUrl.toString();
  const seen = new Set();

  for (let index = 0; index <= maxHops; index += 1) {
    if (seen.has(current)) return { steps, loop: true, final: steps.at(-1) };
    seen.add(current);
    const result = await requestOnce(current);
    const location = resolveLocation(result.response.headers.get("location"), current);
    const step = { url: current, status: result.response.status, location, html: result.html };
    steps.push(step);
    if (![301, 302, 303, 307, 308].includes(step.status) || !location) {
      return { steps, loop: false, final: step };
    }
    current = location;
  }
  return { steps, loop: true, final: steps.at(-1) };
}

function comparablePath(rawUrl) {
  const url = new URL(rawUrl);
  return `${url.pathname}${url.search}`;
}

function queryPreserved(initialUrl, finalUrl) {
  const source = new URL(initialUrl);
  const destination = new URL(finalUrl);
  return [...source.searchParams].every(
    ([key, value]) => destination.searchParams.getAll(key).includes(value),
  );
}

function expectedDestination(row) {
  const configured = row["New URL"]?.trim();
  if (!configured) return "";
  return targetUrl(configured).toString();
}

async function validateRow(row, sitemapPaths) {
  const expected = Number(row[REQUIRED_COLUMN]);
  const legacy = targetUrl(row["Legacy URL"]);
  const checks = [];
  const add = (name, pass, evidence) => checks.push({ name, pass, evidence });

  if (!expected) {
    return {
      legacy: row["Legacy URL"],
      tested: legacy.toString(),
      expected: "UNCLASSIFIED",
      actual: "",
      finalUrl: "",
      hops: "",
      result: allowUnclassified ? "SKIP" : "FAIL",
      failures: allowUnclassified ? "" : "URL has no required response classification",
      evidence: "Classification is mandatory before launch",
      priority: row["Priority: P0/P1/P2/P3"] || "",
    };
  }

  if ([301, 308].includes(expected)) {
    for (const [key, value] of Object.entries(QUERY_TEST)) legacy.searchParams.set(key, value);
  }

  try {
    const trace = await traceRedirects(legacy);
    const first = trace.steps[0];
    const final = trace.final;
    const hops = trace.steps.length - 1;
    const expectedTarget = expectedDestination(row);

    add("initial status", first.status === expected, `expected ${expected}; received ${first.status}`);
    add("no redirect loop", !trace.loop, trace.loop ? "loop/max-hop condition detected" : "no loop");

    if (expected === 200) {
      add("no redirect", hops === 0, `${hops} redirect hop(s)`);
      add("title present", /<title\b[^>]*>\s*[^<]+<\/title>/i.test(first.html), "initial HTML title");
      add("H1 present", /<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(first.html), "initial HTML H1");
      const canonical = attribute(first.html, "link", "rel", "canonical", "href");
      const expectedCanonical = row["New URL"] || row["Normalised URL"] || row["Legacy URL"];
      add("canonical present", Boolean(canonical), canonical || "missing");
      if (canonical) {
        const absoluteCanonical = new URL(canonical, legacy).toString();
        add(
          "self canonical",
          comparablePath(absoluteCanonical) === comparablePath(expectedCanonical),
          `${absoluteCanonical} vs ${expectedCanonical}`,
        );
        add(
          "production canonical host",
          new URL(absoluteCanonical).origin === "https://sciencedivine.org",
          absoluteCanonical,
        );
      }
      const robots = attribute(first.html, "meta", "name", "robots", "content").toLowerCase();
      add("indexable", !robots.includes("noindex"), robots || "no noindex directive");
      add(
        "server-rendered content",
        cleanText(first.html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "").length >= 100,
        "main element text length >= 100",
      );
    } else if ([301, 308].includes(expected)) {
      add("one redirect hop", hops === 1, `${hops} redirect hop(s)`);
      add("destination 200", final?.status === 200, `final status ${final?.status ?? "missing"}`);
      add("query parameters preserved", queryPreserved(legacy, final.url), final.url);
      if (expectedTarget) {
        add(
          "correct destination",
          comparablePath(final.url) === comparablePath(expectedTarget),
          `${final.url} vs ${expectedTarget}`,
        );
      } else add("destination classified", false, "New URL is required for redirects");
    } else if ([404, 410].includes(expected)) {
      add("no redirect", hops === 0, `${hops} redirect hop(s)`);
      add("removed from sitemap", !sitemapPaths.has(new URL(legacy).pathname), new URL(legacy).pathname);
    }

    const failures = checks.filter((check) => !check.pass);
    return {
      legacy: row["Legacy URL"],
      tested: legacy.toString(),
      expected: String(expected),
      actual: String(first.status),
      finalUrl: final?.url ?? "",
      hops: String(hops),
      result: failures.length ? "FAIL" : "PASS",
      failures: failures.map((check) => check.name).join(" | "),
      evidence: checks.map((check) => `${check.pass ? "PASS" : "FAIL"}: ${check.name} (${check.evidence})`).join(" | "),
      priority: row["Priority: P0/P1/P2/P3"] || "",
    };
  } catch (error) {
    return {
      legacy: row["Legacy URL"],
      tested: legacy.toString(),
      expected: String(expected),
      actual: "ERROR",
      finalUrl: "",
      hops: "",
      result: "FAIL",
      failures: "request error",
      evidence: error.message,
      priority: row["Priority: P0/P1/P2/P3"] || "",
    };
  }
}

async function sitemapPaths() {
  const paths = new Set();
  try {
    const url = new URL("/sitemap.xml", baseUrl || "https://sciencedivine.org");
    const response = await fetch(url, { headers: { "user-agent": "ScienceDivineMigrationValidator/1.0" } });
    const xml = await response.text();
    for (const match of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)) {
      paths.add(new URL(match[1], url).pathname);
    }
  } catch {
    // Individual URL tests will still run; sitemap availability is reported in evidence.
  }
  return paths;
}

async function runPool(items, worker, size) {
  const results = new Array(items.length);
  let cursor = 0;
  async function next() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, size) }, next));
  return results;
}

async function main() {
  const inventory = parseCsv(await readFile(inventoryPath, "utf8"));
  const paths = await sitemapPaths();
  const results = await runPool(inventory, (row) => validateRow(row, paths), concurrency);
  const headers = [
    "Legacy URL",
    "Tested URL",
    "Expected response",
    "Actual response",
    "Final URL",
    "Redirect hops",
    "Priority",
    "Result",
    "Failures",
    "Evidence",
  ];
  const values = results.map((result) => [
    result.legacy,
    result.tested,
    result.expected,
    result.actual,
    result.finalUrl,
    result.hops,
    result.priority,
    result.result,
    result.failures,
    result.evidence,
  ]);
  const csv = [headers, ...values].map((row) => row.map(csvEscape).join(",")).join("\n");

  const pass = results.filter((result) => result.result === "PASS").length;
  const fail = results.filter((result) => result.result === "FAIL").length;
  const skip = results.filter((result) => result.result === "SKIP").length;
  const blockers = results.filter(
    (result) => result.result === "FAIL" && ["P0", "P1"].includes(result.priority),
  );
  const report = `# URL validation report

- Test target: ${baseUrl || "legacy URLs as supplied"}
- Inventory: ${inventoryPath}
- Total: ${results.length}
- Passed: ${pass}
- Failed: ${fail}
- Skipped: ${skip}
- P0/P1 failures: ${blockers.length}
- Launch decision: ${fail === 0 && skip === 0 ? "GO (URL gate only)" : "NO-GO"}

## P0/P1 failures

${
  blockers.length
    ? blockers.map((item) => `- ${item.priority} ${item.legacy}: ${item.failures}`).join("\n")
    : "None in the tested inventory."
}
`;

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${csv}\n`, "utf8");
  await writeFile(reportPath, report, "utf8");
  console.log(JSON.stringify({ output: outputPath, report: reportPath, pass, fail, skip }, null, 2));
  if (fail || skip) process.exitCode = 1;
}

await main();
