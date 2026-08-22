export type KnowledgeCategory =
  | "GURU"
  | "MOVEMENT"
  | "MISSION"
  | "SOUND_BODY"
  | "SOUND_MIND"
  | "SELF_REALIZATION"
  | "MEDITATION"
  | "YOGA"
  | "PRACTICES"
  | "COURSES"
  | "SOLUTIONS"
  | "INITIATIVES"
  | "EVENTS"
  | "TESTIMONIALS"
  | "ARTICLES"
  | "CONTACT"
  | "BOOKING"
  | "DONATION"
  | "GENERAL";

export interface KnowledgeItem {
  id: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  sourceUrl: string;
  keywords: string[];
  quotes?: string[];
  suggestedQuestions?: string[];
  pageType?: string;
  section?: string;
  language?: "en" | "hi" | "mixed";
  updatedAt?: string;
  sourceKind?: "curated" | "website";
  score?: number;
}
