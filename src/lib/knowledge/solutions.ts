import { KnowledgeItem } from "./types";
import { scienceDivineLinks } from "../navigation/science-divine-links";
import { SOLUTION_TOPICS } from "@/data/content";

const medicalDisclaimer =
  "\nNote: Science Divine practices and meditations provide supportive inner wellbeing tools and are not medical cures. For clinical or medical conditions, always consult a qualified medical or mental health professional.";

export const solutionsKnowledge: KnowledgeItem[] = [
  {
    id: "solutions-overview",
    title: "Science Divine Solutions for Life Challenges",
    category: "SOLUTIONS",
    content: `Science Divine provides wisdom, breathwork, and meditative protocols tailored to modern psychological and emotional hurdles, including:
- Stress & Burnout Management
- Anxiety & Panic Release
- Overcoming Overthinking & Mental Loops
- Healing Low Moods & Reclaiming Vitality (Depression Support)
- Sleep Disorders & Restorative Yoga Nidra
- Conscious Parenting & Harmonious Relationships
- Freedom from Habitual Addictions
Explore the dedicated Solutions pages for guided articles, masterclasses, and videos.${medicalDisclaimer}`,
    sourceUrl: scienceDivineLinks.solutions,
    keywords: [
      "solutions",
      "problems",
      "help",
      "mental wellness",
      "life challenges",
      "emotional healing",
      "समाधान",
      "समस्याएं",
    ],
  },
  ...SOLUTION_TOPICS.map((sol): KnowledgeItem => {
    return {
      id: `solution-${sol.slug}`,
      title: `${sol.title} Guidance & Solutions`,
      category: "SOLUTIONS",
      content: `${sol.title}: ${sol.tagline}.
${sol.intro}
Science Divine offers dedicated video discourses by Sakshi Shree, breathwork techniques (Pranayama), mindful witnessing (Sakshi Bhaav), and practical contemplation guides to help you navigate ${sol.title.toLowerCase()} with clarity and grace.${medicalDisclaimer}`,
      sourceUrl: `/${sol.slug}`,
      keywords: [
        sol.title.toLowerCase(),
        sol.slug,
        `how to cure ${sol.title.toLowerCase()}`,
        `help with ${sol.title.toLowerCase()}`,
        `relief from ${sol.title.toLowerCase()}`,
        `meditation for ${sol.title.toLowerCase()}`,
        sol.tagline.toLowerCase(),
      ],
      suggestedQuestions: [
        `${sol.title} ke liye kaunsi meditation best hai?`,
        `Guru Ji ka ${sol.title} par kya pravachan hai?`,
        `${sol.title} page par kya resources hain?`,
      ],
    };
  }),
];
