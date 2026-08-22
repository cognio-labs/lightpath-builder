import { KnowledgeItem } from "./types";
import { scienceDivineLinks } from "../navigation/science-divine-links";

export const initiativesKnowledge: KnowledgeItem[] = [
  {
    id: "initiatives-overview",
    title: "Science Divine Sewa Initiatives & Charitable Projects",
    category: "INITIATIVES",
    content: `Science Divine Foundation runs multiple humanitarian and charitable initiatives aimed at uplifting society:
1. Shiksha Sewa & Har Ghar Shiksha: Providing free quality education, books, values, and holistic grooming to underprivileged children (Young Mind Movement).
2. Annapurna Sewa: Daily and regular distribution of nutritious, hygienic food and meals to needy families and sadhus.
3. Dhyan Sewa: Free community meditation and mental wellness camps across villages and cities.
4. Nirman Sewa: Construction and maintenance of Sakshi Dhaam spiritual meditation centers and ashrams.
You can contribute or volunteer via the Initiatives / Donate page.`,
    sourceUrl: scienceDivineLinks.initiatives,
    keywords: [
      "initiatives",
      "sewa",
      "charity",
      "donation",
      "donate",
      "volunteer",
      "social work",
      "seva",
      "दान",
      "सेवा",
    ],
    suggestedQuestions: [
      "Shiksha Sewa kya hai?",
      "Annapurna Sewa mein kaise contribute karein?",
      "Donation kaise karein?",
    ],
  },
  {
    id: "shiksha-sewa",
    title: "Project Shiksha Sewa & Har Ghar Shiksha",
    category: "INITIATIVES",
    content: `Project Shiksha Sewa (Har Ghar Shiksha - Young Mind Movement) is dedicated to transforming lives through holistic education. 
The project sponsors underprivileged children with formal schooling, digital literacy, moral values, and personality development to build a conscious next generation.`,
    sourceUrl: scienceDivineLinks.shikshaSewa,
    keywords: [
      "shiksha sewa",
      "har ghar shiksha",
      "education sewa",
      "child education",
      "young mind movement",
      "शिक्षा सेवा",
      "हर घर शिक्षा",
    ],
  },
  {
    id: "annapurna-sewa",
    title: "Project Annapurna Sewa (Community Kitchens)",
    category: "INITIATIVES",
    content: `Annapurna Sewa is the compassionate food distribution wing of Science Divine Foundation.
It runs community kitchens offering hot, wholesome, and nutritious meals to the hungry, daily wage workers, and impoverished communities in surrounding regions.`,
    sourceUrl: scienceDivineLinks.annapurnaSewa,
    keywords: [
      "annapurna sewa",
      "free food",
      "food distribution",
      "langar",
      "meal seva",
      "अन्नपूर्णा सेवा",
      "भोजन सेवा",
    ],
  },
  {
    id: "dhyan-sewa",
    title: "Project Dhyan Sewa (Free Meditation Camps)",
    category: "INITIATIVES",
    content: `Dhyan Sewa brings the gift of mental peace and stress relief directly to the masses. 
Science Divine volunteers organize complimentary guided meditation workshops, mental wellbeing camps, and youth awakening sessions in schools, colleges, and public spaces.`,
    sourceUrl: scienceDivineLinks.dhyanSewa,
    keywords: [
      "dhyan sewa",
      "free meditation",
      "meditation camp",
      "satsang",
      "ध्यान सेवा",
    ],
  },
];
