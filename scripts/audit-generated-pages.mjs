import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile(".next/prerender-manifest.json", "utf8"));
const routes = Object.keys(manifest.routes)
  .filter((route) => !route.startsWith("/_") && route !== "/sitemap.xml" && route !== "/har-ghar-shiksha" && !/\.[a-z0-9]+$/i.test(route))
  .sort();

const results = [];
let cursor = 0;

async function worker() {
  while (cursor < routes.length) {
    const route = routes[cursor++];
    try {
      const response = await fetch(`http://127.0.0.1:3000${route}`);
      const html = await response.text();
      const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
        level: Number(match[1]),
        text: match[2].replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim(),
      }));
      const jumps = [];
      for (let index = 1; index < headings.length; index += 1) {
        const previous = headings[index - 1];
        const heading = headings[index];
        if (heading.level > previous.level + 1) {
          jumps.push(`${previous.level}->${heading.level}:${heading.text.slice(0, 50)}`);
        }
      }
      results.push({
        route,
        status: response.status,
        redirected: response.redirected,
        h1: headings.filter((heading) => heading.level === 1).length,
        headings: headings.length,
        jumps,
      });
    } catch (error) {
      results.push({ route, status: 0, h1: 0, headings: 0, jumps: [], error: String(error) });
    }
  }
}

await Promise.all(Array.from({ length: 10 }, () => worker()));

const failures = results.filter((result) => result.status !== 200);
const missingH1 = results.filter((result) => result.h1 === 0 && !result.redirected);
const multipleH1 = results.filter((result) => result.h1 > 1);
const hierarchyJumps = results.filter((result) => result.jumps.length > 0);

console.log(JSON.stringify({
  audited: results.length,
  failures,
  missingH1: missingH1.map(({ route, headings }) => ({ route, headings })),
  multipleH1: multipleH1.map(({ route, h1 }) => ({ route, h1 })),
  hierarchyJumps: hierarchyJumps.map(({ route, jumps }) => ({ route, jumps })),
}, null, 2));
