export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  icon:
    | "flame"
    | "music"
    | "sparkles"
    | "book"
    | "heart"
    | "utensils";
  badge?: string;
}

export interface ScheduleStep {
  step: number;
  title: string;
  timeOrTag: string;
  description: string;
  icon: "users" | "music" | "mic" | "utensils";
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const PAGE_PATH = "/shiksha-sewa-sankalp-mahotsav";

/** Canonical URL of the Mahotsav page on the main Science Divine website. */
export const SITE_URL = `https://sciencedivine.org${PAGE_PATH}`;

export const EVENT_CONFIG = {
  honoree: "Sadguru Sakshi Shree",
  title: "Birthday Celebration 2026",
  subtitle: "A Day of Love, Joy & Celebration",
  heroDescription:
    "Join us for a beautiful celebration of togetherness, devotion, music, wisdom and gratitude on the special occasion of the birthday of Sadguru Sakshi Shree.",
  dateDisplay: "13 December 2026",
  isoStartDate: "2026-12-13T09:30:00+05:30",
  isoEndDate: "2026-12-13T17:00:00+05:30",
  startTime: "9:30 AM",
  festivalName: "Shiksha Sewa Sankalp Mahotsav",
  venueName: "Siddha Sudarshan Sakshi Dham",
  venueLocation: "Siddha Sudarshan Sakshi Dham, Ghaziabad",
  venueAddress:
    "8/9, Avantika Road, Chiranjiv Vihar, Shastri Nagar, Ghaziabad, Uttar Pradesh 201002",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Siddha+Sudarshan+Sakshi+Dham+8%2F9+Avantika+Road+Chiranjiv+Vihar+Ghaziabad",
  organiser: "Science Divine Foundation",
  mainWebsiteUrl: "https://sciencedivine.org/",
  contactPhone: "+91 74281 40916",
  contactPhoneHref: "tel:+917428140916",
  whatsappHref:
    "https://wa.me/917428140910?text=Jai%20Gurudev%2C%20I%20would%20like%20to%20know%20more%20about%20Sadguru%20Sakshi%20Shree%20Birthday%20Celebration%202026.",
  entryNote: "Free Entry • Limited Passes Available",
  bhajanArtist: "Arjun Bhowmick & Band",
} as const;

export const LOVE_AND_JOY_PARAGRAPHS = [
  "The birthday celebration of Sadguru Sakshi Shree is one such special occasion — a day to come together, express our gratitude, experience joy and create unforgettable moments with our loved ones.",
  "From the auspicious morning Aarti and delightful cultural performances by our school children to the joyful experience of Bhajan Clubbing, inspiring discourses, blessings and Prasad, every moment of this celebration is designed to bring us closer through love, happiness and togetherness.",
  "Come with your family and friends and be a part of this memorable celebration.",
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "morning-aarti",
    title: "Morning Aarti",
    badge: "9:30 AM",
    description:
      "Begin the celebration with an auspicious Aarti and a peaceful, uplifting atmosphere.",
    icon: "flame",
  },
  {
    id: "cultural-performances",
    title: "Cultural Performances",
    badge: "Student Showcase",
    description:
      "Enjoy heartwarming cultural performances by the talented children of our school, showcasing their creativity, dedication and enthusiasm.",
    icon: "sparkles",
  },
  {
    id: "bhajan-clubbing",
    title: "Bhajan Clubbing",
    badge: "Live with Arjun Bhowmick",
    description:
      "Experience the joy of devotional music in a vibrant and uplifting atmosphere. Celebrate through melodies, rhythm and the collective energy of everyone coming together.",
    icon: "music",
  },
  {
    id: "spiritual-discourses",
    title: "Spiritual Discourses",
    badge: "Wisdom Session",
    description:
      "Listen to the inspiring words of Sadguru Sakshi Shree and discover meaningful insights for a more aware and fulfilling life.",
    icon: "book",
  },
  {
    id: "blessings-of-gurudev",
    title: "Blessings of Gurudev",
    badge: "Ashirvaad",
    description:
      "Receive the blessings of Gurudev and cherish a special moment of connection and gratitude.",
    icon: "heart",
  },
  {
    id: "prasad-gathering",
    title: "Prasad & Community Gathering",
    badge: "Annapurna Sewa",
    description:
      "Conclude the celebration with Prasad and the warmth of sharing a meal together as one community.",
    icon: "utensils",
  },
];

// Highlights from the program schedule
export const PROGRAMME_SCHEDULE: ScheduleStep[] = [
  {
    step: 3,
    title: "Student Cultural Program",
    timeOrTag: "School Showcase",
    description:
      "Enjoy special cultural performances by the talented children of our school.",
    icon: "users",
  },
  {
    step: 5,
    title: "Bhajan Clubbing",
    timeOrTag: "Live Musical Devotion",
    description:
      "Celebrate the joy of devotional music and togetherness with Arjun Bhowmick and band.",
    icon: "music",
  },
  {
    step: 7,
    title: "Guruji's Speech",
    timeOrTag: "Spiritual Discourses",
    description:
      "Experience the wisdom and inspiring message of Sadguru Sakshi Shree.",
    icon: "mic",
  },
  {
    step: 8,
    title: "Lunch & Ashirvaad",
    timeOrTag: "Blessings & Prasad",
    description:
      "Receive Gurudev's blessings and share the warmth of community Prasad together.",
    icon: "utensils",
  },
];

export const ABOUT_PILLARS = [
  {
    title: "Sound Body",
    description:
      "Cultivating physical vitality through yoga, breathwork, and mindful daily living.",
  },
  {
    title: "Sound Mind",
    description:
      "Attaining inner stillness and clarity through Sakshi Bhav meditation and awareness.",
  },
  {
    title: "Self-Realization",
    description:
      "Living with love, wisdom, and joyful balance — Bheetar se Sanyaas, Bahar se Sansaar.",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "glimpse-1",
    src: "/mahotsav/images/gallery/glimpse-1.jpg",
    title: "Divine Discourse",
    caption:
      "Sadguru Sakshi Shree addressing a gathering at the Living the Gita Movement.",
  },
  {
    id: "glimpse-2",
    src: "/mahotsav/images/gallery/glimpse-2.jpg",
    title: "A Hall Full of Devotion",
    caption:
      "Seekers from every walk of life, gathered together in stillness and gratitude.",
  },
  {
    id: "glimpse-3",
    src: "/mahotsav/images/gallery/glimpse-3.jpg",
    title: "Celebration at Sakshi Dham",
    caption:
      "Families and friends united under festive drapes and colourful balloons.",
  },
  {
    id: "glimpse-4",
    src: "/mahotsav/images/gallery/glimpse-4.jpg",
    title: "Blessings of Gurudev",
    caption:
      "A heartfelt moment of reverence, flowers and folded hands.",
  },
  {
    id: "glimpse-5",
    src: "/mahotsav/images/gallery/glimpse-5.jpg",
    title: "Annapurna Sewa",
    caption:
      "Prasad shared with warmth, as one community.",
  },
  {
    id: "glimpse-6",
    src: "/mahotsav/images/gallery/glimpse-6.jpg",
    title: "Satsang Together",
    caption:
      "Seated side by side, listening and reflecting in peace.",
  },
  {
    id: "glimpse-7",
    src: "/mahotsav/images/gallery/glimpse-7.jpg",
    title: "Bhajan Joy",
    caption:
      "Hands raised and hearts open in joyful devotional music.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Can I attend the celebration with my family?",
    answer:
      "Yes! You are warmly welcome to attend the celebration with your family and friends.",
  },
  {
    question: "What time does the program begin?",
    answer:
      "The celebration begins at 9:30 AM with the morning Aarti.",
  },
  {
    question: "Is registration required?",
    answer:
      "We request all attendees to complete their registration through the official event landing page so that we can plan the arrangements accordingly.",
  },
  {
    question: "Will Prasad be served?",
    answer: "Yes, Prasad will be served as part of the celebration.",
  },
  {
    question: "Where will the event take place?",
    answer: `The celebration will be held at ${EVENT_CONFIG.venueName}. You can find the complete address (${EVENT_CONFIG.venueAddress}) and Google Maps location on this page.`,
  },
  {
    question: "Will the complete event schedule be available?",
    answer:
      "Yes, the detailed program schedule will be shared with registered attendees closer to the event.",
  },
];
