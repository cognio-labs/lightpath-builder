import { KnowledgeItem } from "./types";
import { scienceDivineLinks } from "../navigation/science-divine-links";
import { COURSES } from "@/data/content";

export const coursesKnowledge: KnowledgeItem[] = [
  {
    id: "courses-overview",
    title: "Science Divine Courses Overview",
    category: "COURSES",
    content: `Science Divine offers transformational courses designed to empower every aspect of human life:
1. Design Your Destiny: Transform your thoughts, regulate emotions, and consciously architect the life you want.
2. Science of Joyful Living: Discover why joy is a scientific law and learn daily practices for lasting happiness.
3. Mind Power Meditation: Harness the power of the conscious and subconscious mind for creativity, focus, and manifestation.
4. Sanjeevani Kriya: Revitalize your physical body, balance energy chakras, and awaken vitality through ancient kriya science.
Please check the Courses page for current schedules and registration details.`,
    sourceUrl: scienceDivineLinks.courses,
    keywords: [
      "courses",
      "programs",
      "workshops",
      "training",
      "all courses",
      "course list",
      "कोर्स",
      "प्रोग्राम",
    ],
    suggestedQuestions: [
      "Design Your Destiny course kya hai?",
      "Sanjeevani Kriya course kaise join karein?",
      "Mind Power Meditation ke kya fayde hain?",
    ],
  },
  ...COURSES.map((course): KnowledgeItem => ({
    id: `course-${course.slug}`,
    title: `${course.title} Course`,
    category: "COURSES",
    content: `${course.title} (${course.tagline}).
Duration: ${course.duration} | Level: ${course.level}
Key Features: ${course.features.join(", ")}.
Description: ${course.description}
Price: ₹${course.price} (Original: ₹${course.originalPrice} - subject to current promotions on site).
You can explore the curriculum and register directly on the course page.`,
    sourceUrl: `/${course.slug}`,
    keywords: [
      course.title.toLowerCase(),
      course.slug,
      `${course.title.toLowerCase()} course`,
      `${course.title.toLowerCase()} price`,
      `${course.title.toLowerCase()} details`,
      ...course.features.map((f) => f.toLowerCase()),
    ],
    suggestedQuestions: [
      `${course.title} ka price kya hai?`,
      `${course.title} mein kya sikhaya jata hai?`,
      "Is course ke liye register kaise karein?",
    ],
  })),
];
