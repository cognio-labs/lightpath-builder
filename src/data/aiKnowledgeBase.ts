import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";

export interface QuickSuggestion {
  label: string;
  query: string;
  icon?: string;
}

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  { label: "Guru Ji", query: "Sakshi Shree Guru Ji ke baare mein batao" },
  { label: "Courses", query: "What courses are available?" },
  { label: "Anxiety Solution", query: "How to overcome anxiety and stress?" },
  { label: "English Book", query: "I want the English book link" },
  { label: "Book Session", query: "How can I book a personal session?" },
  { label: "Sewa", query: "Tell me about Sewa initiatives" },
];

export interface BotResponse {
  text: string;
  links?: { label: string; url: string }[];
  suggestions?: string[];
}

// ─── Conversation Memory ───────────────────────────────────────────────────
export interface ConversationTurn {
  role: "user" | "bot";
  text: string;
}

let conversationHistory: ConversationTurn[] = [];
let userName: string | null = null;
let userInterests: string[] = [];

export function addToHistory(role: "user" | "bot", text: string) {
  conversationHistory.push({ role, text });
  if (conversationHistory.length > 20) {
    conversationHistory = conversationHistory.slice(-20);
  }
}

export function clearHistory() {
  conversationHistory = [];
  userName = null;
  userInterests = [];
}

function detectUserName(query: string): string | null {
  const nameMatch = query.match(/(?:my name is|i am|i'm|call me|mera naam hai|main hoon)\s+([a-zA-Z]+)/i);
  if (nameMatch) return nameMatch[1];
  return null;
}

function getGreeting(): string {
  if (userName) return `🙏 ${userName} Ji, `;
  return "";
}

function trackInterest(topic: string) {
  if (!userInterests.includes(topic)) userInterests.push(topic);
}

export function generateBotResponse(userInput: string): BotResponse {
  const query = userInput.toLowerCase().trim();

  // Detect user name
  const detectedName = detectUserName(userInput);
  if (detectedName) {
    userName = detectedName;
    return {
      text: `🙏 Swagat hai, **${userName} Ji**! Main aapki kya seva kar sakta hoon? Guru Ji, courses ya session booking ke baare mein poochein.`,
      suggestions: ["Guru Ji ke baare mein batao", "Courses dekhein", "Personal session book karein"],
    };
  }

  // ── 1. SAKSHI SHREE / GURU JI ─────────────────────────────────────────
  if (
    query.includes("sakshi") ||
    query.includes("guru") ||
    query.includes("guruji") ||
    query.includes("guru ji") ||
    query.includes("master") ||
    query.includes("founder") ||
    query.includes("who is") ||
    query.includes("philosophy") ||
    query.includes("bheetar") ||
    query.includes("teachings") ||
    (query.includes("about") && !query.includes("about website") && !query.includes("about us"))
  ) {
    trackInterest("guru");
    return {
      text: `${getGreeting()}🙏 **Param Pujya Sakshi Shree Ji** ek prabuddha aatma aur **Science Divine Movement** ke sansthapak hain.\n\n• **Mulmantra:** "Bheetar se sanyaas, bahar se sansaar" — sansaar mein rehkar aatmik shanti.\n• **Scientific Dhyan:** Vyast jeevan mein turant shanti aur urja pane ki vidhiyan.\n• **Har Ghar Shiksha:** Hazaaron zarooratmand bachhon ko muft shiksha aur dhyan.\n\n💛 Unke saath **Personal Session** lena jeevan badalne wala anubhav hota hai!`,
      links: [
        { label: "About Sakshi Shree", url: "/about-sakshi-shree" },
        { label: "Book Personal Session", url: "/book-session" },
        { label: "Science Divine Movement", url: "/about-science-divine-movement" },
      ],
      suggestions: [
        "Session kaise book karein?",
        "Courses ke baare mein batayein",
        "English Book link",
      ],
    };
  }

  // ── 2. ENGLISH BOOK ────────────────────────────────────────────────────
  if (
    query.includes("english book") ||
    query.includes("book link") ||
    query.includes("mahamantra") ||
    query.includes("maha mantra") ||
    (query.includes("book") && query.includes("english")) ||
    query.includes("mahamantras")
  ) {
    trackInterest("book");
    return {
      text: `${getGreeting()}📖 **Sakshi Shree Ji ki English Book — Mahamantras Teachings:**\n\nIs pustak mein shaktishali mahamantras aur jeevan rupantaran ke practical raaz bataye gaye hain.\n\nAbhi niche diye link se book prapt karein:`,
      links: [
        { label: "English Book Website", url: "https://mahamantrasbook.s.gy/englishwebsite" },
        { label: "Explore Courses", url: "/courses" },
        { label: "Book Session", url: "/book-session" },
      ],
      suggestions: ["Courses ke baare mein", "Guru Ji ke baare mein", "Book a session"],
    };
  }

  // ── 3. COURSES ─────────────────────────────────────────────────────────
  if (
    query.includes("course") ||
    query.includes("program") ||
    query.includes("sanjeevani") ||
    query.includes("sanjeevni") ||
    query.includes("design your destiny") ||
    query.includes("joyful living") ||
    query.includes("mind power") ||
    query.includes("workshop") ||
    query.includes("training")
  ) {
    trackInterest("courses");
    return {
      text: `${getGreeting()}✨ **Science Divine ke 4 Mukhya Courses:**\n\n1. **Sanjeevani Kriya** — Minutes mein stress aur toxins door karein.\n2. **Design Your Destiny** — Apne sankalp aur karm se bhavishya banayein.\n3. **Science of Joyful Living** — Swasthya, prem aur aatmik shanti ka blueprint.\n4. **Mind Power Meditation** — Peak mental focus aur yaadashth badhayein.\n\nIn courses se hazaron logon ka jeevan badla hai!`,
      links: [
        { label: "All Courses", url: "/courses" },
        { label: "Sanjeevani Kriya", url: "/sanjeevni-kriya-2" },
        { label: "Design Your Destiny", url: "/designyourdestiny" },
        { label: "Book Personal Session", url: "/book-session" },
      ],
      suggestions: ["Session kaise book karein?", "Sanjeevani Kriya kya hai?", "Guru Ji ke baare mein"],
    };
  }

  // ── 4. MENTAL HEALTH ───────────────────────────────────────────────────
  if (
    query.includes("anxiety") ||
    query.includes("depression") ||
    query.includes("overthinking") ||
    query.includes("stress") ||
    query.includes("fear") ||
    query.includes("sleep") ||
    query.includes("peace") ||
    query.includes("negative") ||
    query.includes("tension") ||
    query.includes("pareshani") ||
    query.includes("addiction") ||
    query.includes("parenting") ||
    query.includes("relationship") ||
    query.includes("wellness") ||
    query.includes("solution")
  ) {
    trackInterest("mental_health");
    return {
      text: `${getGreeting()}🌸 **Anxiety, Depression aur Overthinking se Mukti:**\n\nSakshi Shree Ji ke saral dhyan sutra:\n• **Sakshi Sadhna** — Man ki shanti aur sakshi bhaav.\n• **Mindful Breathing** — Turant relax hone ke liye.\n• **Sanjeevani Kriya** — Gehri shanti aur taazgi ke liye.\n\n💛 Ek personal session se hi man shant aur ashwanvit ho jata hai.`,
      links: [
        { label: "Anxiety Solution", url: "/anxiety" },
        { label: "Overthinking Relief", url: "/overthinking" },
        { label: "All Solutions", url: "/get-solutions-for" },
        { label: "Book Session", url: "/book-session" },
      ],
      suggestions: ["Personal session book karein", "Sanjeevani Kriya", "Guru Ji ke baare mein"],
    };
  }

  // ── 5. YOGA / MEDITATION / PRACTICES ──────────────────────────────────
  if (
    query.includes("yoga") ||
    query.includes("meditation") ||
    query.includes("mindfulness") ||
    query.includes("pranayama") ||
    query.includes("breathing") ||
    query.includes("gratitude") ||
    query.includes("positive") ||
    query.includes("manifestation") ||
    query.includes("dhyan") ||
    query.includes("sadhna")
  ) {
    trackInterest("practices");
    return {
      text: `${getGreeting()}🌿 **Science Divine Daily Practices:**\n\n• **Easy Yoga & Pranayama** — Sharir aur mann ka santulan.\n• **Sakshi Dhyan** — Chintao se pare sakshi bhaav.\n• **Mindfulness & Gratitude** — Har pal mein anand aur santosh.\n\nInse prapt hota hai **Sound Body, Sound Mind**!`,
      links: [
        { label: "Easy Yoga", url: "/yoga" },
        { label: "Meditation Guide", url: "/meditation" },
        { label: "Mindfulness", url: "/mindfulness" },
      ],
      suggestions: ["Courses dekhein", "Book a session", "Guru Ji ke baare mein"],
    };
  }

  // ── 6. SEWA INITIATIVES ────────────────────────────────────────────────
  if (
    query.includes("sewa") ||
    query.includes("donate") ||
    query.includes("donation") ||
    query.includes("shiksha") ||
    query.includes("annapurna") ||
    query.includes("charity") ||
    query.includes("humanity") ||
    query.includes("volunteer") ||
    query.includes("har ghar") ||
    query.includes("nirman") ||
    query.includes("dhyan sewa") ||
    query.includes("swastha")
  ) {
    trackInterest("sewa");
    return {
      text: `${getGreeting()}🤝 **Science Divine Sewa Prakalp:**\n\n• **Har Ghar Shiksha** — Bachhon ko 100% muft quality education & dhyan.\n• **Annapurna Sewa** — Zarooratmand parivaaron ko poshtik bhojan.\n• **Swastha Sewa** — Free medical camps aur dawa.\n• **Dhyan Sewa** — Samaaj ke liye free meditation sessions.\n\nAapka sahyog seedha zindagiyan sanwarta hai.`,
      links: [
        { label: "Sewa Initiatives", url: "/initiatives" },
        { label: "Har Ghar Shiksha", url: "/har-ghar-shiksha" },
        { label: "Donate Now", url: RAZORPAY_DONATION_LINK },
      ],
      suggestions: ["Personal session", "Upcoming Events", "About Guru Ji"],
    };
  }

  // ── 7. EVENTS & RETREATS ───────────────────────────────────────────────
  if (
    query.includes("event") ||
    query.includes("retreat") ||
    query.includes("mahotsav") ||
    query.includes("date") ||
    query.includes("camp") ||
    query.includes("sunday") ||
    query.includes("shivir") ||
    query.includes("upcoming") ||
    query.includes("gallery")
  ) {
    trackInterest("events");
    return {
      text: `${getGreeting()}📅 **Upcoming Events & Retreats:**\n\n• **Shiksha Sewa Sankalp Mahotsav** — Ghaziabad Dhaam.\n• **Navvarsh Dhyan Mahotsav** — Mass meditation with Sakshi Shree Ji.\n• **Sunday Satsang & Retreats** — Monthly dhyan gatherings.\n\nIn events mein shamil hokar anand aur aatmik shanti ka anubhav karein!`,
      links: [
        { label: "View Events", url: "/events" },
        { label: "Events Gallery", url: "/events-gallery" },
        { label: "Book Session", url: "/book-session" },
      ],
      suggestions: ["Book a session", "Courses", "Contact & Location"],
    };
  }

  // ── 8. CONTACT / SESSION BOOKING ──────────────────────────────────────
  if (
    query.includes("contact") ||
    query.includes("session") ||
    query.includes("book") ||
    query.includes("phone") ||
    query.includes("email") ||
    query.includes("address") ||
    query.includes("location") ||
    query.includes("dhaam") ||
    query.includes("help") ||
    query.includes("meet") ||
    query.includes("linkedin") ||
    query.includes("appointment") ||
    query.includes("zoom") ||
    query.includes("personal") ||
    query.includes("milna")
  ) {
    trackInterest("session");
    return {
      text: `${getGreeting()}🌟 **Sakshi Shree Ji ke Saath Personal Session:**\n\nEk personal session se jeevan ke bade sankat aur uljhanein sulajh sakti hain.\n\n• **In-Person:** Siddha Sudarshan Sakshi Dhaam, Ghaziabad\n• **Online:** Zoom par (India & International)\n\nNiche diye link se direct appointment book karein:`,
      links: [
        { label: "Book Personal Session", url: "/book-session" },
        { label: "US / Global Session", url: "/us-personal-session" },
        { label: "Contact Us", url: "/contact" },
      ],
      suggestions: ["Guru Ji ke baare mein", "Courses dekhein", "Sewa Prakalp"],
    };
  }

  // ── 9. TESTIMONIALS / REVIEWS ─────────────────────────────────────────
  if (
    query.includes("testimonial") ||
    query.includes("review") ||
    query.includes("feedback") ||
    query.includes("experience") ||
    query.includes("result") ||
    query.includes("success") ||
    query.includes("transform") ||
    query.includes("anubhav")
  ) {
    trackInterest("testimonials");
    return {
      text: `${getGreeting()}💛 **Seekers ke Anubhav:**\n\n• *"10 saal ka depression session ke baad khatam ho gaya."*\n• *"Business aur rishton mein adbhut shanti aayi."*\n• *"Pehli baar jeevan mein sachi shanti mili."*\n\nAap bhi apni transformation shuru karein!`,
      links: [
        { label: "Video Testimonials", url: "/latest-testimonials-videos" },
        { label: "Book Session", url: "/book-session" },
      ],
      suggestions: ["Book session", "Courses", "Guru Ji ke baare mein"],
    };
  }

  // ── 10. SCIENCE DIVINE MOVEMENT ────────────────────────────────────────
  if (
    query.includes("movement") ||
    query.includes("science divine") ||
    query.includes("foundation") ||
    query.includes("mission") ||
    query.includes("vision") ||
    query.includes("organization")
  ) {
    trackInterest("movement");
    return {
      text: `${getGreeting()}🕉️ **Science Divine Movement:**\n\n• **Mission:** Har ghar mein shanti aur aatmik jagran.\n• **Vision:** Science aur spirituality ka sundar sangam — Sound Body, Sound Mind aur Self-Realization.\n• **Global Reach:** Hazaaron seekers Bharat aur videsh mein jude hain.`,
      links: [
        { label: "About Movement", url: "/about-science-divine-movement" },
        { label: "About Guru Ji", url: "/about-sakshi-shree" },
        { label: "Book Session", url: "/book-session" },
      ],
      suggestions: ["Courses", "Book session", "Sewa"],
    };
  }

  // ── 11. SHOP / BOOKS ───────────────────────────────────────────────────
  if (
    query.includes("shop") ||
    query.includes("buy") ||
    query.includes("purchase") ||
    query.includes("product") ||
    query.includes("store")
  ) {
    trackInterest("shop");
    return {
      text: `${getGreeting()}🛒 **Science Divine Shop:**\n\n• **English Book:** Sakshi Shree Ji ki Mahamantras Book\n• **Spiritual Tools:** Meditation & wellness resources\n\nExplore karein:`,
      links: [
        { label: "Visit Shop", url: "/shop" },
        { label: "English Book", url: "https://mahamantrasbook.s.gy/englishwebsite" },
      ],
      suggestions: ["English Book link", "Courses", "Book session"],
    };
  }

  // ── 12. GREETINGS ──────────────────────────────────────────────────────
  if (
    query.includes("namaste") ||
    query.includes("namaskar") ||
    query.includes("hari om") ||
    query.includes("hello") ||
    query === "hi" ||
    query === "hey" ||
    query.includes("good morning") ||
    query.includes("good evening") ||
    query.includes("kaise ho") ||
    query.includes("how are you")
  ) {
    return {
      text: `🙏 **Hari Om & Namaste!**\n\nMain aapka **Divine AI Guide** hoon. Guru Ji ke baare mein, courses, anxiety solutions, English book, ya session booking — kuch bhi poochein!`,
      suggestions: ["Guru Ji ke baare mein", "Courses dekhein", "Book session"],
    };
  }

  // ── 13. GRATITUDE ─────────────────────────────────────────────────────
  if (
    query.includes("thank") ||
    query.includes("thanks") ||
    query.includes("shukriya") ||
    query.includes("dhanyavad") ||
    query.includes("great") ||
    query.includes("helpful")
  ) {
    return {
      text: `${getGreeting()}Aapka shukriya! 🙏 Sakshi Shree Ji ka aashirwaad hamesha aapke saath hai. Kuch aur jaanna chahein toh batayein.`,
      suggestions: ["Book a session", "Courses", "About Guru Ji"],
    };
  }

  // ── DEFAULT FALLBACK ────────────────────────────────────────────────────
  return {
    text: `${getGreeting()}🙏 **Namaste! Main aapka Divine AI Assistant hoon.**\n\nMain in vishayon mein madad kar sakta hoon:\n• **Sakshi Shree Guru Ji & Philosophy**\n• **4 Transformative Courses**\n• **Anxiety, Stress & Overthinking Solutions**\n• **English Book & Mahamantras**\n• **Personal Session Booking**\n\nBatayein, kya jaanna chahte hain?`,
    links: [
      { label: "Courses", url: "/courses" },
      { label: "Solutions", url: "/get-solutions-for" },
      { label: "Book Session", url: "/book-session" },
    ],
    suggestions: [
      "Guru Ji ke baare mein batao",
      "Courses dekhein",
      "English Book link",
      "Book personal session",
    ],
  };
}
