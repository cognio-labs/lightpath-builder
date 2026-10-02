import { MetadataRoute } from "next";
import { getAllPostSummaries } from "@/lib/blog.server";

const BASE_URL = "https://sciencedivine.org";

// Priority 1.0 — Homepage
const P1_PATHS = ["/"];

// Priority 0.9 — Core commercial / high-value pages
const P09_PATHS = [
  "/about-movement",
  "/about-sakshi-shree",
  "/courses",
  "/design-your-destiny",
  "/science-of-joyful-living",
  "/mind-power-meditation",
  "/sanjeevni-kriya",
  "/personal-session",
  "/book-session",
  "/donation",
  "/events",
];

// Priority 0.8 — Solutions and practices
const P08_PATHS = [
  "/anxiety",
  "/depression",
  "/stress",
  "/overthinking",
  "/addictions",
  "/parenting",
  "/sleeping-disorder",
  "/relationships",
  "/wellness",
  "/meditation",
  "/yoga",
  "/mindfulness",
  "/gratitude",
  "/manifestation",
  "/positive-thinking",
  "/finding-purpose",
  "/get-solutions-for",
];

// Priority 0.7 — Initiatives and supporting pages
const P07_PATHS = [
  "/initiatives",
  "/har-ghar-shiksha",
  "/har-ghar-shiksha-volunteers",
  "/har-ghar-shiksha-donation",
  "/annapurna-sewa",
  "/dhyan-sewa",
  "/nirman-sewa",
  "/education-sewa",
  "/podcast",
  "/blog",
  "/testimonials",
  "/shop",
  "/contact",
  "/subscribe-to-our-newsletter",
];

// Priority 0.5 — Legal pages
const P05_PATHS = [
  "/privacy-policy",
  "/terms-conditions",
  "/cancellation-policy",
];

// Rebuilt hourly so new Typeflo posts get listed.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const makeEntries = (
    paths: string[],
    priority: number,
    changeFrequency: "yearly" | "monthly" | "weekly" | "daily" | "always" = "weekly"
  ): MetadataRoute.Sitemap =>
    paths.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }));

  const blogEntries: MetadataRoute.Sitemap = (await getAllPostSummaries()).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.datePublished ? new Date(post.datePublished) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...makeEntries(P1_PATHS, 1.0, "daily"),
    ...makeEntries(P09_PATHS, 0.9, "weekly"),
    ...makeEntries(P08_PATHS, 0.8, "weekly"),
    ...makeEntries(P07_PATHS, 0.7, "weekly"),
    ...makeEntries(P05_PATHS, 0.5, "yearly"),
    ...blogEntries,
  ];
}
