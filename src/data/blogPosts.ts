export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  content: string;
  featured?: boolean;
  tags: string[];
}

export const BLOG_CATEGORIES = [
  { name: "All Articles", slug: "all" },
  { name: "Sakshi Wisdom", slug: "sakshi-wisdom" },
  { name: "Meditation & Sadhna", slug: "meditation" },
  { name: "Stress & Anxiety", slug: "stress-anxiety" },
  { name: "Festivals & Rituals", slug: "festivals-rituals" },
  { name: "Bhagavad Gita", slug: "bhagavad-gita" },
  { name: "Self-Realization", slug: "self-realization" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-reduce-stress-7-powerful-lessons-from-lord-ganesha",
    title: "How to Reduce Stress? 7 Powerful Lessons from Lord Ganesha",
    excerpt: "Stress often begins when the mind becomes trapped in fear, expectations, overthinking, and resistance to life. Discover 7 transformative spiritual lessons from Lord Ganesha to release tension and live with boundless joy.",
    category: "Stress & Anxiety",
    categorySlug: "stress-anxiety",
    date: "Sep 10, 2026",
    readTime: "13 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1567591377030-de198b8d4a6c?w=1000&q=80&auto=format&fit=crop",
    featured: true,
    tags: ["Stress Relief", "Ganesha Wisdom", "Inner Peace", "Mindfulness"],
    content: `
Stress often begins when the mind becomes trapped in fear, expectations, overthinking, and constant resistance to what is. In ancient Indian wisdom, Lord Ganesha symbolizes the remover of all obstacles (*Vighnaharta*)—not just physical hindrances, but mental obstructions like anxiety, doubt, and inner turmoil.

### 1. Embrace Large Ears: Listen More, React Less
Lord Ganesha's iconic large ears represent the power of deep listening. Most mental stress arises from hasty reactions to external words and situations. By developing Sakshi Bhav (witness consciousness), we learn to listen fully without immediately generating emotional drama inside.

### 2. The Small Mouth: Speak Mindfully
Controlled, thoughtful speech prevents interpersonal conflicts. When we reduce unnecessary speech, mental energy (*Prana*) is preserved, naturally bringing deep calm to the nervous system.

### 3. Big Belly: Digest Both Good and Bad in Life
Ganesha's large belly (*Lambodara*) signifies the capacity to digest and absorb all life experiences—both praise and criticism, joy and sorrow—without losing inner equilibrium.

### 4. Single Tusk: Unwavering Focus
The single tusk (*Ekadanta*) symbolizes concentration and singular focus. When you engage in any task, give it 100% of your present awareness without scattering your mind into past regrets or future worries.

### 5. Small Eyes: Sharp Spiritual Vision
Ganesha's small eyes denote keen discernment and the ability to look beyond surface appearances to see the divine reality in every situation.

### 6. The Mouse Vehicle: Mastery Over Desires
The small mouse at Ganesha's feet represents the restless mind and wild desires. Riding the mouse shows that wisdom must master desires rather than being driven by them.

### 7. Modak in Hand: The Sweet Fruit of Awakening
The Modak represents the ultimate reward of spiritual practice—sweet, unshakeable bliss (*Ananda*) that belongs to one who masters consciousness.
    `,
  },
  {
    slug: "how-to-stop-overthinking-7-bhagavad-gita-lessons-for-a-calm-mind",
    title: "How to Stop Overthinking? 7 Bhagavad Gita Lessons for a Calm Mind",
    excerpt: "Discover how to stop overthinking through seven practical Bhagavad Gita lessons. Learn to quiet mental noise, detach from outcomes, and live in absolute present awareness.",
    category: "Bhagavad Gita",
    categorySlug: "bhagavad-gita",
    date: "Sep 10, 2026",
    readTime: "14 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Overthinking", "Bhagavad Gita", "Sakshi Bhav", "Mindfulness"],
    content: `
Overthinking is like a spinning wheel in the mind that consumes immense energy without moving you forward. In the sacred Bhagavad Gita, Arjuna suffers from severe overthinking and emotional paralysis until Lord Krishna guides him toward clarity.

### 1. Nishkama Karma: Focus on Action, Not Outcomes
Chapter 2, Verse 47 teaches: *"Karmanye vadhikaraste ma phaleshu kadachana"*. Overthinking stems from anxiety over future results. Give your best effort in the present moment and surrender the outcome to the Supreme.

### 2. Witnessing the Mind (Sakshi Bhav)
You are not the thoughts rising in your brain; you are the eternal awareness observing them. Practice looking at your thoughts as a detached spectator.

### 3. Abhyasa and Vairagya: Practice and Detachment
Krishna states in Chapter 6 that the mind can be tamed through relentless practice (*Abhyasa*) and non-attachment (*Vairagya*). Daily 15-minute meditation trains the mind to drop unnecessary loops.

### 4. Stabilize the Intellect (Sthitaprajna)
A person of steady wisdom remains unshaken in pleasure or pain. Learn to anchor yourself in your spiritual core rather than external circumstances.
    `,
  },
  {
    slug: "how-to-control-anxiety-7-bhagavad-gita-ways-to-calm-your-mind",
    title: "How to Control Anxiety: 7 Bhagavad Gita Ways to Calm Your Mind and Find Inner Peace",
    excerpt: "Struggling with anxiety, constant worry, or overthinking? Discover seven practical Bhagavad Gita ways to soothe the nervous system, release fear, and reclaim peaceful living.",
    category: "Stress & Anxiety",
    categorySlug: "stress-anxiety",
    date: "Sep 10, 2026",
    readTime: "11 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Anxiety Relief", "Bhagavad Gita", "Calm Mind", "Inner Peace"],
    content: `
Anxiety is the fear of an imaginary future created by an ungrounded mind. The Bhagavad Gita provides timeless psychological and spiritual antidotes to overcome chronic anxiety.

### Key Principles for Anxiety Relief
1. **Recognize Impermanence:** Everything in the physical world is temporary (*Anitya*). Realizing that difficult phases pass reduces panic.
2. **Pranayama & Breath Awareness:** Slow breath calms the vagus nerve and shuts down the fight-or-flight stress response.
3. **Surrender to Divine Will (Ishvara Pranidhana):** Trusting the higher order of existence relieves the heavy burden of trying to control everything manually.
    `,
  },
  {
    slug: "why-are-14-knots-tied-in-anant-sutra-on-anant-chaturdashi",
    title: "Why Are 14 Knots Tied in Anant Sutra on Anant Chaturdashi?",
    excerpt: "Why does the sacred Anant Sutra contain exactly 14 knots? Discover the profound spiritual connection to the 14 Lokas and Lord Vishnu's infinite blessings.",
    category: "Festivals & Rituals",
    categorySlug: "festivals-rituals",
    date: "Sep 10, 2026",
    readTime: "8 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Anant Chaturdashi", "Anant Sutra", "Hindu Rituals", "Lord Vishnu"],
    content: `
On Anant Chaturdashi, devotees tie a sacred thread called the Anant Sutra on their right arm. This thread contains 14 distinct knots (*Ganth*), each symbolizing one of the fourteen cosmic realms (*14 Lokas*) protected by Lord Ananta (Vishnu).

### The 14 Realms and Their Spiritual Significance
Tying the 14 knots reminds the seeker that divine protection encompasses all dimensions of existence—from the physical realm to the highest realms of pure consciousness.
    `,
  },
  {
    slug: "can-women-perform-shraddha-complete-guide-for-pitru-paksha",
    title: "Can Women Perform Shraddha? Complete Guide for Pitru Paksha",
    excerpt: "Can women perform Shraddha rituals during Pitru Paksha? Understand authentic Hindu scriptures, Vedic precedents, and the spiritual science of ancestor worship.",
    category: "Festivals & Rituals",
    categorySlug: "festivals-rituals",
    date: "Sep 10, 2026",
    readTime: "9 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Pitru Paksha", "Shraddha", "Women Rights", "Vedic Wisdom"],
    content: `
A common myth is that only sons can perform Pitru Paksha rites. However, ancient Vedic texts including the *Garuda Purana*, *Valmiki Ramayana* (where Sita Mata performed Pind Daan for King Dasharatha), and *Matsya Purana* explicitly permit daughters and women to perform Shraddha with devotion.
    `,
  },
  {
    slug: "vishwakarma-puja-mantra-powerful-mantra-meaning-and-benefits",
    title: "Vishwakarma Puja Mantra: Powerful Mantra, Meaning & Benefits",
    excerpt: "Discover seven powerful Vishwakarma Puja mantras in Hindi and Sanskrit, along with their spiritual meanings for success in craftsmanship, technology, and creation.",
    category: "Festivals & Rituals",
    categorySlug: "festivals-rituals",
    date: "Sep 10, 2026",
    readTime: "7 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Vishwakarma Puja", "Mantras", "Workplace Blessing", "Creativity"],
    content: `
Lord Vishwakarma is worshipped as the divine architect and engineer of the universe. Chanting Vishwakarma mantras invokes divine precision, creativity, and safety across all tools, technology, and engineering endeavors.
    `,
  },
  {
    slug: "hartalika-teej-fasting-rule-nirjala-vrat-puja-parana-guide",
    title: "Hartalika Teej Fasting Rule: Nirjala Vrat, Puja Parana Guide",
    excerpt: "Hartalika Teej 2026 is observed with deep devotion to Lord Shiva and Goddess Parvati. Discover the fasting rules, Nirjala Vrat vidhi, and auspicious timing for Parana.",
    category: "Festivals & Rituals",
    categorySlug: "festivals-rituals",
    date: "Sep 10, 2026",
    readTime: "8 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Hartalika Teej", "Fasting", "Lord Shiva", "Goddess Parvati"],
    content: `
Hartalika Teej celebrates the intense devotion of Mata Parvati to win Lord Shiva as her divine consort. Women observe a strict Nirjala (without water) fast for conjugal harmony and spiritual strength.
    `,
  },
  {
    slug: "why-is-modak-ganeshas-favourite-sweet-the-story-behind-it",
    title: "Why Is Modak Ganesha's Favourite Sweet? The Story Behind It",
    excerpt: "Why is a simple modak Ganesha's favourite sweet? Discover the traditional story behind this sacred delicacy and its deep symbolic meaning of spiritual sweetness.",
    category: "Sakshi Wisdom",
    categorySlug: "sakshi-wisdom",
    date: "Sep 10, 2026",
    readTime: "8 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Ganesha Modak", "Spiritual Stories", "Modak Significance"],
    content: `
The Modak is shaped like a drop of water or a flame. The outer casing represents the hard physical world and discipline, while the sweet jaggery-coconut filling inside represents the divine nectar of self-realization (*Atma-Jnana*).
    `,
  },
  {
    slug: "lord-ganesha-108-names-list-meaning-and-benefits-of-each-name",
    title: "Lord Ganesha 108 Names: List, Meaning & Benefits of Each Name",
    excerpt: "Explore the divine 108 Names of Lord Ganesha (Ashtottara Shatanamavali), their sacred meanings, spiritual significance, and benefits of chanting them daily.",
    category: "Sakshi Wisdom",
    categorySlug: "sakshi-wisdom",
    date: "Sep 9, 2026",
    readTime: "4 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1567591377030-de198b8d4a6c?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Ganesha 108 Names", "Mantra Chanting", "Ashtottara"],
    content: `
Chanting Ganesha's 108 names purifies the mind, removes obstacles, bestows wisdom (*Buddhi*), and brings prosperity (*Siddhi*).
    `,
  },
  {
    slug: "parsva-ekadashi-date-vrat-katha-puja-vidhi-and-significance",
    title: "Parsva Ekadashi: Date, Vrat Katha, Puja Vidhi & Significance",
    excerpt: "Discover the complete story, rituals, fasting rules, date, and spiritual significance of Parsva Ekadashi (Parivartini Ekadashi) when Lord Vishnu changes his posture.",
    category: "Festivals & Rituals",
    categorySlug: "festivals-rituals",
    date: "Sep 9, 2026",
    readTime: "5 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Parsva Ekadashi", "Ekadashi Vrat", "Lord Vishnu"],
    content: `
Parsva Ekadashi occurs during Bhadrapada Shukla Paksha. It is believed Lord Vishnu turns from his left side to his right side during his cosmic sleep (*Yogra-Nidra*).
    `,
  },
  {
    slug: "radha-krishna-story-did-they-ever-get-married-truth-behind-their-love",
    title: "Radha Krishna Story: Did They Ever Get Married? Truth Behind Their Love",
    excerpt: "The Radha Krishna marriage story is one of the most beautiful spiritual mysteries. Explore why their transcendental love transcends physical marriage into eternal oneness.",
    category: "Sakshi Wisdom",
    categorySlug: "sakshi-wisdom",
    date: "Sep 9, 2026",
    readTime: "5 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Radha Krishna", "Divine Love", "Spiritual Marriage"],
    content: `
Radha and Krishna are not two separate entities; Radha is the soul (*Jivatma*) and Krishna is the Supreme Spirit (*Paramatma*). Marriage requires two different beings, but Radha and Krishna are one single divine consciousness expressed in two forms.
    `,
  },
  {
    slug: "pitru-paksha-2026-meaning-significance-and-the-science-of-gratitude",
    title: "Pitru Paksha 2026: Meaning, Significance and the Science of Gratitude",
    excerpt: "Pitru Paksha 2026 is a sacred period to honour ancestors and express gratitude. Explore its spiritual science, rituals, and profound psychological benefits.",
    category: "Festivals & Rituals",
    categorySlug: "festivals-rituals",
    date: "Sep 5, 2026",
    readTime: "7 min read",
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80&auto=format&fit=crop",
    featured: false,
    tags: ["Pitru Paksha", "Ancestors", "Gratitude", "Vedic Science"],
    content: `
Pitru Paksha is an annual 16-day lunar period dedicated to offering thanks to departed ancestors. Honoring our lineage releases generational karmic burdens and cultivates deep roots of gratitude in life.
    `,
  }
];
