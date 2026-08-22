import { KnowledgeItem, KnowledgeCategory } from "./types";
import { sakshiShreeKnowledge } from "./sakshi-shree";
import { scienceDivineKnowledge } from "./science-divine";
import { coursesKnowledge } from "./courses";
import { practicesKnowledge } from "./practices";
import { solutionsKnowledge } from "./solutions";
import { initiativesKnowledge } from "./initiatives";
import { eventsKnowledge } from "./events";
import { articlesKnowledge } from "./articles";
import { contactKnowledge } from "./contact";

export * from "./types";

export const allKnowledgeItems: KnowledgeItem[] = [
  ...sakshiShreeKnowledge,
  ...scienceDivineKnowledge,
  ...coursesKnowledge,
  ...practicesKnowledge,
  ...solutionsKnowledge,
  ...initiativesKnowledge,
  ...eventsKnowledge,
  ...articlesKnowledge,
  ...contactKnowledge,
];

export interface SearchOptions {
  category?: KnowledgeCategory;
  limit?: number;
  threshold?: number;
}

export function searchKnowledge(query: string, options: SearchOptions = {}): KnowledgeItem[] {
  const { category, limit = 4, threshold = 1 } = options;
  const q = query.toLowerCase().trim();
  const queryTokens = q.split(/\s+/).filter((t) => t.length > 1);

  if (queryTokens.length === 0) {
    return allKnowledgeItems.slice(0, limit);
  }

  const scored = allKnowledgeItems
    .filter((item) => !category || item.category === category)
    .map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const contentLower = item.content.toLowerCase();

      // Exact title match bonus
      if (titleLower.includes(q)) score += 12;

      // Exact phrase match in content
      if (contentLower.includes(q)) score += 6;

      // Check keywords
      item.keywords.forEach((kw) => {
        const kwLower = kw.toLowerCase();
        if (kwLower === q) score += 10;
        else if (q.includes(kwLower) || kwLower.includes(q)) score += 5;
        queryTokens.forEach((token) => {
          if (kwLower.includes(token)) score += 3;
        });
      });

      // Token match in title and content
      queryTokens.forEach((token) => {
        if (titleLower.includes(token)) score += 4;
        if (contentLower.includes(token)) score += 1.5;
      });

      // Boost specific core entities
      if (
        (q.includes("guru") || q.includes("sakshi") || q.includes("master")) &&
        item.category === "GURU"
      ) {
        score += 8;
      }
      if (
        (q.includes("course") || q.includes("program") || q.includes("fees") || q.includes("price")) &&
        item.category === "COURSES"
      ) {
        score += 8;
      }
      if (
        (q.includes("event") || q.includes("mahotsav") || q.includes("satsang") || q.includes("date")) &&
        item.category === "EVENTS"
      ) {
        score += 8;
      }
      if (
        (q.includes("sewa") || q.includes("seva") || q.includes("donate") || q.includes("donation")) &&
        item.category === "INITIATIVES"
      ) {
        score += 8;
      }
      if (
        (q.includes("phone") || q.includes("email") || q.includes("contact") || q.includes("address") || q.includes("kahan")) &&
        item.category === "CONTACT"
      ) {
        score += 8;
      }

      return { item, score };
    })
    .filter((res) => res.score >= threshold)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.item);
}

export function getKnowledgeById(id: string): KnowledgeItem | undefined {
  return allKnowledgeItems.find((k) => k.id === id);
}

export function getKnowledgeByCategory(cat: KnowledgeCategory): KnowledgeItem[] {
  return allKnowledgeItems.filter((k) => k.category === cat);
}
