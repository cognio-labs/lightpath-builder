import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";

const BASE_URL = "https://sciencedivine.org";

const SOLUTION_SLUGS = [
  "anxiety",
  "depression",
  "stress",
  "overthinking",
  "addictions",
  "parenting",
  "sleeping-disorder",
  "relationship",
  "wellness",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about-movement",
    "/about-sakshi-shree",
    "/contact",
    "/get-solutions-for",
    ...SOLUTION_SLUGS.map((s) => `/${s}`),
    "/courses",
    "/design-your-destiny",
    "/science-of-joyful-living",
    "/mind-power-meditation",
    "/sanjeevni-kriya",
    "/events",
    "/initiatives",
    "/book-session",
    "/testimonials",
    "/shop",
    "/blog",
    "/subscribe-to-our-newsletter",
    "/cart",
    "/checkout",
    "/my-account",
    "/privacy-policy",
    "/terms-conditions",
    "/cancellation-policy",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.datePublished ? new Date(post.datePublished) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
