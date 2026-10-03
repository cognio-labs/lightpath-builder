/**
 * Every string, price and image on the Personal Session page (/book-session).
 * Edit here — the components read from this.
 */
import { LEADERS } from "@/data/content";

export const brand = {
  name: "Science Divine",
  teacher: "Sadguru Sakshi Shree",
  shortName: "Sakshi Shree",
  mission: "Jhuggi Jhopdi Shiksha Sewa Mission",
};

export const cta = {
  label: "Book My Personal Session",
};

export const donation = {
  amount: "₹6,100",
  word: "Donation",
  note: "Your contribution supports",
};


export const video = {
  /**
   * Paste the YouTube/Vimeo EMBED url here (e.g. "https://www.youtube.com/embed/XXXXXXXXXXX").
   * While it is empty the card shows the photo only, without a play button.
   */
  embedUrl: "",
};

export const images = {
  /** Sadguru Sakshi Shree seated, cut out on a transparent background. */
  heroPortrait: "/images/book-session/sakshi-shree-hero.png",
  /** Temple at sunset behind the hero. */
  heroBackdrop: "/images/book-session/hero-backdrop.jpg",
  videoThumb: "/images/uploads/2024/05/aboutsakshishree.webp",
  childEducation: "/images/uploads/2025/06/Har-Ghar-Shiksha.webp",
};

/** Shown as the avatar stack in the hero's "Trusted by World Leaders" badge. */
export const leaders = LEADERS;

export const heroTrust = ["100% Secure Booking", "Limited Personal Slots"];

/* ---------- Section: Maybe you need clarity ---------- */

export type ClarityIconName = "crossroads" | "loop" | "career" | "mask" | "compass" | "chapter" | "change";
export type ClaritySign = { icon: ClarityIconName; label: string };

export const claritySigns: ClaritySign[] = [
  { icon: "crossroads", label: "Stuck in an important life decision" },
  { icon: "loop", label: "Repeating the same patterns again and again" },
  { icon: "career", label: "Confused about your career or relationships" },
  { icon: "mask", label: "Successful on the outside but unfulfilled within" },
  { icon: "compass", label: "Looking for deeper spiritual direction" },
  { icon: "chapter", label: "Seeking clarity about the next phase of your life" },
  { icon: "change", label: "Feeling that something needs to change, but don't know what" },
];

/* ---------- Section: What happens in your session ---------- */

export const sessionSteps = [
  {
    n: "01",
    icon: "present" as const,
    title: "Understand Your Present",
    body: "Gain clarity about the patterns, situations and challenges influencing your life right now.",
  },
  {
    n: "02",
    icon: "unlock" as const,
    title: "Discover What Is Holding You Back",
    body: "Identify the deeper patterns behind recurring struggles — not just their surface symptoms.",
  },
  {
    n: "03",
    icon: "guidance" as const,
    title: "Receive Personal Guidance",
    body: "Get guidance specific to your situation rather than generic advice.",
  },
  {
    n: "04",
    icon: "path" as const,
    title: "Know Your Next Step",
    body: "Take home a practical direction or practice that you can actually work with.",
  },
];

/* ---------- Section: Not a generic consultation ---------- */

export const notThis = ["Not a horoscope.", "Not a motivational lecture.", "Not generic life advice."];

export const whySakshiShree = [
  {
    icon: "sadhana" as const,
    title: "40+ Years of Spiritual Sadhana",
    body: "Deep experience in meditation, consciousness and inner transformation.",
  },
  {
    icon: "personal" as const,
    title: "Personalised Guidance",
    body: "Your session is centred around your life, not a generic formula.",
  },
  {
    icon: "insight" as const,
    title: "Deep Intuitive Insight",
    body: "Ability to see the deeper patterns that are not visible on the surface.",
  },
  {
    icon: "direction" as const,
    title: "Practical Direction",
    body: "Leave with something you can actually apply in your life.",
  },
];

export const quote = {
  text: "Clarity is not about knowing more, it is about seeing clearly.",
  author: `— ${brand.shortName}`,
};


/* ---------- Section: A child's future ---------- */

export const impactFlow = [
  { icon: "growth" as const, label: "Your Growth" },
  { icon: "contribution" as const, label: "Your Contribution" },
  { icon: "education" as const, label: "A Child's Education" },
];

/* ---------- Section: Book in 3 steps ---------- */

export const bookingSteps = [
  {
    n: "1",
    icon: "session" as const,
    title: "Choose Your Session",
    body: `Make your ${donation.amount} contribution to the ${brand.mission}.`,
  },
  {
    n: "2",
    icon: "time" as const,
    title: "Choose Your Preferred Time",
    body: "Our team contacts you within 24 hours to arrange an online or in-person session.",
  },
  {
    n: "3",
    icon: "meet" as const,
    title: `Meet ${brand.shortName}`,
    body: "Come with your questions. Leave with clarity.",
  },
];

export const taxNote = "All donations qualify for tax exemption under Section 80G.";

/* ---------- Section: FAQ ---------- */

export const faqs = [
  {
    q: "Is the session online or offline?",
    a: "Both online (video call) and offline (in-person at Sakshi Dham) options are available. You choose what works for you.",
  },
  {
    q: "How is the session scheduled?",
    a: "Our team contacts you within 24 hours after donation to schedule your slot.",
  },
  {
    q: "What details do I need to share?",
    a: "Just your birth details (date, time, place) and any specific questions you want guidance on.",
  },
  {
    q: "How long is the session?",
    a: "Approximately 30 minutes of focused personal one-on-one time with Sakshi Shree.",
  },
  {
    q: "What can I expect?",
    a: "Personalized insights delivered without you needing to speak — the reading comes through direct energy sensing.",
  },
];


/* ---------- Trust bar ---------- */

export const footerTrust = [
  { icon: "lock" as const, title: "Secure Payment", body: "Encrypted & Safe" },
  { icon: "shield" as const, title: "100% Confidential", body: "Your privacy is our priority" },
  { icon: "slots" as const, title: "Limited Slots", body: "Personal attention every session" },
  { icon: "globe" as const, title: "Trusted Worldwide", body: "Thousands of lives transformed" },
];
