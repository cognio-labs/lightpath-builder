import { RAZORPAY_DONATION_LINK } from "@/lib/payment-links";

export interface QuickSuggestion {
  label: string;
  query: string;
  icon?: string;
}

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  { label: "Guru Ji", query: "Sakshi Shree Guru Ji ke baare mein batao" },
  { label: "Session", query: "Personal session kaise book hota hai?" },
  { label: "Courses", query: "Kaunse courses available hain?" },
  { label: "Book", query: "English book ka link chahiye" },
];

export interface BotResponse {
  text: string;
  links?: { label: string; url: string }[];
  suggestions?: string[];
}

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
  const nameMatch = query.match(
    /(?:my name is|i am|i'm|call me|mera naam hai|main hoon|मेरा नाम(?: है)?|मैं हूँ)\s+([\p{L}][\p{L}\p{M}'-]{1,40})/iu,
  );
  return nameMatch ? nameMatch[1] : null;
}

function getGreeting(): string {
  return userName ? `🙏 ${userName} Ji, ` : "";
}

function trackInterest(topic: string) {
  if (!userInterests.includes(topic)) userInterests.push(topic);
}

function hasAny(query: string, words: string[]) {
  return words.some((word) => query.includes(word));
}

export function generateBotResponse(userInput: string): BotResponse {
  const query = userInput.toLowerCase().trim();

  const detectedName = detectUserName(userInput);
  if (detectedName) {
    userName = detectedName;
    return {
      text: `🙏 Swagat hai, **${userName} Ji**. Main aapki baat pehle samajhunga, phir Guru Ji, session, courses ya website link ka right direction dunga.\n\nSales-bot wali jaldi nahi, pehle clarity. Bas apni situation ek line mein bata dijiye.`,
      suggestions: ["Guru Ji ke baare mein", "Session kaise hota hai"],
    };
  }

  if (
    hasAny(query, [
      "sakshi",
      "guru",
      "guruji",
      "guru ji",
      "master",
      "founder",
      "who is",
      "philosophy",
      "bheetar",
      "teaching",
      "teachings",
      "गुरु",
      "गुरुजी",
      "साक्षी श्री",
      "साक्षीश्री",
      "दर्शन",
    ]) ||
    (query.includes("about") && !query.includes("about website") && !query.includes("about us"))
  ) {
    trackInterest("guru");
    return {
      text: `${getGreeting()}🙏 **Sakshi Shree Guru Ji** Science Divine Foundation ke margdarshak aur Science Divine Movement ke sansthapak hain.\n\nUnki core teaching simple hai: **andar shanti, bahar zimmedari**. Duniya se bhaagna nahi, duniya ke beech clarity aur sakshi bhaav ke saath jeena.\n\nGuru Ji meditation, sakshi bhaav, sankalp shakti, stress relief aur practical spiritual living sikhate hain. Unka style heavy pravachan jaisa nahi, real-life problems ko seedhi bhaasha mein samjhata hai. Kabhi-kabhi answer itna seedha hota hai ki ego quietly bolta hai: "haan, ye baat mere liye hi thi."\n\nAgar client personal problem, relationship, career direction, stress, spiritual growth ya inner peace ke liye guidance chahta hai, to **personal session** best next step hota hai.`,
      links: [
        { label: "About Sakshi Shree", url: "/about-sakshi-shree" },
        { label: "Book Personal Session", url: "/book-session" },
      ],
      suggestions: ["Session kaise hota hai?", "Guru Ji ki philosophy"],
    };
  }

  if (
    hasAny(query, [
      "session",
      "appointment",
      "booking",
      "book",
      "personal",
      "meet",
      "milna",
      "zoom",
      "fee",
      "price",
      "amount",
      "payment",
      "contact",
      "phone",
      "email",
      "address",
      "location",
      "dhaam",
      "सेशन",
      "मिलना",
      "बुकिंग",
      "अपॉइंटमेंट",
      "फीस",
      "कीमत",
      "भुगतान",
      "संपर्क",
      "पता",
    ])
  ) {
    trackInterest("session");
    return {
      text: `${getGreeting()}🌟 **Personal Session with Sakshi Shree Ji** un logon ke liye hai jo generic answer nahi, apni situation ke hisaab se guidance chahte hain.\n\nSession mein aap life confusion, stress, relationships, career direction, inner peace, spiritual growth ya repeated patterns par baat kar sakte hain.\n\n• **Mode:** Ghaziabad Dhaam par in-person ya online Zoom.\n• **Booking:** form/payment ke baad team timing coordinate karti hai.\n• **Best for:** jab YouTube video aur Google ke 50 tabs se zyada personal clarity chahiye.\n\nSeedha bolun? Agar problem baar-baar wahi aa rahi hai, to ek focused session random advice se zyada useful ho sakta hai.`,
      links: [
        { label: "Book Personal Session", url: "/book-session" },
        { label: "Contact Us", url: "/contact" },
      ],
      suggestions: ["Guru Ji ke baare mein", "Courses batao"],
    };
  }

  if (
    hasAny(query, [
      "course",
      "program",
      "sanjeevani",
      "sanjeevni",
      "design your destiny",
      "joyful living",
      "mind power",
      "workshop",
      "training",
      "कोर्स",
      "संजीवनी",
      "माइंड पावर",
    ])
  ) {
    trackInterest("courses");
    return {
      text: `${getGreeting()}✨ Science Divine ke main courses practical transformation ke liye hain:\n\n1. **Sanjeevani Kriya** - stress release aur inner freshness.\n2. **Design Your Destiny** - sankalp, karma aur life direction.\n3. **Science of Joyful Living** - health, love, peace aur daily balance.\n4. **Mind Power Meditation** - focus, memory aur mental clarity.\n\nAgar client confused hai ki kaunsa course best hai, pehle unki current problem samajhna better hai. Spiritual shopping cart bharne ki zaroorat nahi, sahi ek cheez kaafi hoti hai.`,
      links: [
        { label: "All Courses", url: "/courses" },
        { label: "Sanjeevani Kriya", url: "/sanjeevni-kriya-2" },
      ],
      suggestions: ["Mere liye course suggest karo", "Session better hai kya?"],
    };
  }

  if (
    hasAny(query, [
      "anxiety",
      "depression",
      "overthinking",
      "stress",
      "fear",
      "sleep",
      "peace",
      "negative",
      "tension",
      "pareshani",
      "addiction",
      "parenting",
      "relationship",
      "wellness",
      "solution",
      "चिंता",
      "तनाव",
      "डर",
      "नींद",
      "शांति",
      "परेशानी",
      "रिश्ता",
      "समाधान",
    ])
  ) {
    trackInterest("solutions");
    return {
      text: `${getGreeting()}🌸 Pehle aapki problem ko softly samajhte hain. Anxiety, stress ya overthinking mein mind ko force se chup karana mushkil hota hai; Guru Ji ke path mein **sakshi bhaav** se mind ko observe karna sikhaya jata hai.\n\nEk simple start: 30 seconds ke liye bas saans ko dekhiye. Control nahi, bas notice. Mann bhaage to gently wapas. Mind gym nahi gaya hota, isliye pehle din se six-pack focus expect mat kijiye.\n\nAgar issue deep, personal ya repeated hai, personal session mein situation-specific guidance mil sakti hai.`,
      links: [
        { label: "Anxiety Solution", url: "/anxiety" },
        { label: "Book Session", url: "/book-session" },
      ],
      suggestions: ["Session kaise help karega?", "Meditation batao"],
    };
  }

  if (
    hasAny(query, [
      "yoga",
      "meditation",
      "mindfulness",
      "pranayama",
      "breathing",
      "gratitude",
      "positive",
      "manifestation",
      "dhyan",
      "sadhna",
      "योग",
      "ध्यान",
      "प्राणायाम",
      "साधना",
      "कृतज्ञता",
      "सांस",
    ])
  ) {
    trackInterest("practices");
    return {
      text: `${getGreeting()}🌿 Science Divine daily practices ka focus hai **Sound Body, Sound Mind**.\n\n• Easy Yoga aur Pranayama body-mind balance ke liye.\n• Sakshi Dhyan thoughts ko observe karne ke liye.\n• Mindfulness aur gratitude daily life mein lightness lane ke liye.\n\nStart small. 5 minute daily practice, 50 motivational reels se zyada kaam kar sakti hai.`,
      links: [
        { label: "Yoga", url: "/yoga" },
        { label: "Meditation", url: "/meditation" },
      ],
      suggestions: ["Guru Ji", "Session"],
    };
  }

  if (
    hasAny(query, [
      "sewa",
      "donate",
      "donation",
      "shiksha",
      "annapurna",
      "charity",
      "humanity",
      "volunteer",
      "har ghar",
      "nirman",
      "dhyan sewa",
      "swastha",
      "सेवा",
      "दान",
      "अन्नपूर्णा",
      "शिक्षा सेवा",
      "स्वयंसेवक",
    ])
  ) {
    trackInterest("sewa");
    return {
      text: `${getGreeting()}🤝 **Science Divine Sewa Prakalp** spiritual growth ko real service se jodta hai.\n\n• **Har Ghar Shiksha** - underprivileged children ke liye free education.\n• **Annapurna Sewa** - food support.\n• **Dhyan Sewa** - meditation and awareness programs.\n• **Nirman Sewa** - dhaam and service infrastructure.\n\nDonation ka impact direct sewa projects mein jata hai. Link chahiye to neeche diya hai.`,
      links: [
        { label: "Sewa Initiatives", url: "/initiatives" },
        { label: "Donate Now", url: RAZORPAY_DONATION_LINK },
      ],
      suggestions: ["Har Ghar Shiksha", "Guru Ji"],
    };
  }

  if (
    hasAny(query, [
      "event",
      "retreat",
      "mahotsav",
      "date",
      "camp",
      "sunday",
      "shivir",
      "upcoming",
      "gallery",
      "इवेंट",
      "कार्यक्रम",
      "सत्संग",
      "शिविर",
      "तारीख",
      "महोत्सव",
    ])
  ) {
    trackInterest("events");
    return {
      text: `${getGreeting()}📅 Science Divine events mein satsang, meditation, shivir aur sewa gatherings hote hain.\n\nAgar aap live experience chahte hain, event page dekhna best hai. Online knowledge achhi hai, lekin kabhi-kabhi environment hi aadha kaam kar deta hai.`,
      links: [
        { label: "View Events", url: "/events" },
        { label: "Events Gallery", url: "/events-gallery" },
      ],
      suggestions: ["Session", "Guru Ji"],
    };
  }

  if (
    hasAny(query, [
      "testimonial",
      "review",
      "feedback",
      "experience",
      "result",
      "success",
      "transform",
      "anubhav",
    ])
  ) {
    trackInterest("testimonials");
    return {
      text: `${getGreeting()}💛 Seekers often share that Guru Ji ki guidance se unhe clarity, emotional relief, direction aur inner peace mehsoos hua.\n\nMain miracle guarantee nahi bolunga, kyunki har seeker ka journey alag hota hai. Lekin sincere seeker ke liye right guidance kabhi-kabhi turning point ban jati hai.`,
      links: [
        { label: "Video Testimonials", url: "/latest-testimonials-videos" },
        { label: "Book Session", url: "/book-session" },
      ],
      suggestions: ["Book session", "Guru Ji"],
    };
  }

  if (
    hasAny(query, [
      "english book",
      "book link",
      "mahamantra",
      "maha mantra",
      "mahamantras",
      "किताब",
      "पुस्तक",
      "महामंत्र",
    ]) ||
    (query.includes("book") && query.includes("english"))
  ) {
    trackInterest("book");
    return {
      text: `${getGreeting()}📖 **English Book - Mahamantras Teachings** Sakshi Shree Ji ki practical teachings ko simple English mein samjhati hai.\n\nAgar client English mein spiritual concepts read karna chahta hai, ye link useful hai.`,
      links: [
        { label: "English Book Website", url: "https://mahamantrasbook.s.gy/englishwebsite" },
      ],
      suggestions: ["Courses batao", "Session batao"],
    };
  }

  if (
    hasAny(query, [
      "movement",
      "science divine",
      "foundation",
      "mission",
      "vision",
      "organization",
      "फाउंडेशन",
      "संस्था",
      "मिशन",
      "साइंस डिवाइन",
    ])
  ) {
    trackInterest("movement");
    return {
      text: `${getGreeting()}🕉️ **Science Divine Foundation** ka mission hai inner peace, meditation, self-realization aur sewa ko practical life tak le jana.\n\nFoundation Guru Ji ki guidance mein courses, personal sessions, events, sewa projects aur spiritual education ke through seekers ko support karti hai.`,
      links: [
        { label: "About Movement", url: "/about-science-divine-movement" },
        { label: "About Guru Ji", url: "/about-sakshi-shree" },
      ],
      suggestions: ["Guru Ji", "Session"],
    };
  }

  if (hasAny(query, ["shop", "buy", "purchase", "product", "store"])) {
    trackInterest("shop");
    return {
      text: `${getGreeting()}🛒 Science Divine shop mein spiritual books aur resources milte hain. Agar aap English book chahte hain, direct book link bhi available hai.`,
      links: [
        { label: "Visit Shop", url: "/shop" },
        { label: "English Book", url: "https://mahamantrasbook.s.gy/englishwebsite" },
      ],
      suggestions: ["Book link", "Guru Ji"],
    };
  }

  if (hasAny(query, ["link", "url", "website", "page"])) {
    return {
      text: `${getGreeting()}Bilkul. Ye important website links hain. Aap jis cheez ka link chahte hain us par click kar sakte hain.`,
      links: [
        { label: "About Guru Ji", url: "/about-sakshi-shree" },
        { label: "Book Session", url: "/book-session" },
        { label: "Courses", url: "/courses" },
        { label: "Contact", url: "/contact" },
      ],
      suggestions: ["Session batao", "Courses batao"],
    };
  }

  if (
    hasAny(query, [
      "namaste",
      "namaskar",
      "hari om",
      "hello",
      "hey",
      "good morning",
      "good evening",
      "kaise ho",
      "how are you",
      "नमस्ते",
      "नमस्कार",
      "हरि ओम",
      "कैसे हो",
    ]) ||
    query === "hi"
  ) {
    return {
      text: `🙏 **Hari Om & Namaste!** Main aapka **Divine AI Guide** hoon.\n\nMain Guru Ji, personal session, courses, meditation, sewa, events, book aur website links ke baare mein bata sakta hoon. Aap apna sawaal boliye. Main jawab simple, useful aur thoda human rakhunga - boring pravachan mode off.`,
      suggestions: ["Guru Ji", "Session"],
    };
  }

  if (
    hasAny(query, [
      "thank",
      "thanks",
      "shukriya",
      "dhanyavad",
      "great",
      "helpful",
      "शुक्रिया",
      "धन्यवाद",
    ])
  ) {
    return {
      text: `${getGreeting()}Aapka shukriya 🙏 Sakshi Shree Ji ka aashirwaad hamesha aapke saath rahe. Aur kuch poochna ho to main yahin hoon.`,
      suggestions: ["Book session", "Guru Ji"],
    };
  }

  return {
    text: `${getGreeting()}Main samajhna chahta hoon ki aap exactly kya dhoondh rahe hain.\n\nAap Guru Ji, personal session, meditation, courses, stress/overthinking, sewa, events, book ya contact ke baare mein pooch sakte hain. Agar aap apni situation ek line mein bata dein, main direct sahi direction de dunga.`,
    suggestions: ["Guru Ji ke baare mein", "Session kaise hota hai"],
  };
}
