import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SOLUTION_TOPICS } from "@/data/content";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/",
          "/about-movement",
          "/about-sakshi-shree",
          "/contact",
          "/get-solutions-for",
          ...SOLUTION_TOPICS.map((t) => `/${t.slug}`),
          "/courses",
          "/design-your-destiny",
          "/science-of-joyful-living",
          "/mind-power-meditation",
          "/sanjeevni-kriya",
          "/events",
          "/initiatives",
          "/har-ghar-shiksha",
          "/book-session",
          "/testimonials",
          "/shop",
          "/cart",
          "/checkout",
          "/my-account",
          "/privacy-policy",
          "/terms-conditions",
          "/cancellation-policy",
        ];
        const urls = paths
          .map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`)
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
