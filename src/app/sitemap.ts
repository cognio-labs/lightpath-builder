import { MetadataRoute } from "next";

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
  const paths = [
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

  return paths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}
