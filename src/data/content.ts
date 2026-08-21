export const SOLUTION_TOPICS = [
  {
    slug: "stress",
    title: "Stress",
    tagline: "Boost Your Energy and Tackle Tasks Easily",
    intro:
      "Stress is a natural response, but chronic stress drains your vitality. Learn ancient techniques adapted for modern life to release tension, restore energy, and meet each day with steadiness.",
  },
  {
    slug: "anxiety",
    title: "Anxiety",
    tagline: "Beating Anxiety Together: Simple Steps to Calm",
    intro:
      "Anxiety clouds clarity and steals presence. Discover breath, meditation, and mindset practices to soothe the nervous system and return to calm.",
  },
  {
    slug: "depression",
    title: "Depression",
    tagline: "Step by Step: Beating Depression",
    intro:
      "Depression is not a life sentence. Through consistent practice, guided wisdom, and community, light returns, one conscious step at a time.",
  },
  {
    slug: "parenting",
    title: "Parenting",
    tagline: "Sakshi Shree's Guide to Parenting Through the Ages",
    intro:
      "Raise conscious, resilient children with wisdom rooted in ancient values and modern understanding of the child's mind.",
  },
  {
    slug: "addictions",
    title: "Addictions",
    tagline: "Find Your Freedom: Overcoming Addiction",
    intro:
      "Addictions are patterns the mind runs on autopilot. Meditation restores choice, freedom is available in every present moment.",
  },
  {
    slug: "overthinking",
    title: "Overthinking",
    tagline: "Overthinking No More: Techniques for Clarity",
    intro:
      "The mind loops when it lacks direction. Learn to witness thoughts without being consumed by them, and reclaim mental space.",
  },
  {
    slug: "meditation",
    title: "Meditation",
    tagline: "Start Meditating Today: A Guide to Health and Happiness",
    intro:
      "Meditation is not escape, it is the direct path to knowing yourself. Begin today with time-tested techniques.",
  },
  {
    slug: "manifestation",
    title: "Manifestation",
    tagline: "Manifest Your Success: Unleash Your Potential",
    intro:
      "Consciousness shapes reality. When intention, emotion, and action align, the universe conspires to deliver.",
  },
  {
    slug: "finding-purpose",
    title: "Finding Purpose",
    tagline: "Finding Your Purpose: A Journey to Self-Discovery",
    intro:
      "Purpose is discovered, not decided. Turn inward and let your true calling emerge naturally.",
  },
  {
    slug: "yoga",
    title: "Yoga",
    tagline: "Easy Yoga for Everyday Peace",
    intro:
      "Yoga is union, of body, breath, and being. Simple asanas practiced daily transform how you inhabit your life.",
  },
  {
    slug: "gratitude",
    title: "Gratitude",
    tagline: "Finding Light in the Storm: The Transformative Power of Gratitude",
    intro:
      "Gratitude rewires perception. It shifts you from what's missing to what's already miraculous.",
  },
  {
    slug: "mindfulness",
    title: "Mindfulness",
    tagline: "Unlock the Mind's True Potential",
    intro:
      "Mindfulness is presence, the art of being fully here. It is the doorway to everything spirituality promises.",
  },
  {
    slug: "positive-thinking",
    title: "Positive Thinking",
    tagline: "The Power of Positive Thinking",
    intro:
      "Positive thinking is not denial, it's the disciplined choice to focus on what serves your highest good.",
  },
] as const;

export type SolutionSlug = (typeof SOLUTION_TOPICS)[number]["slug"];

export const ARTICLES_BY_TOPIC: Record<SolutionSlug, { title: string; excerpt: string }[]> = {
  stress: [
    {
      title: "Master Stress Management: A Meditative Path to Calm",
      excerpt: "How silence resets the nervous system and restores baseline calm.",
    },
    {
      title: "Mastering Calm: 7 Effective Ways to Relieve Stress",
      excerpt: "Practical daily techniques you can begin using right now.",
    },
    {
      title: "Unlock Deep Sleep with Meditation",
      excerpt: "Guided practices to fall asleep faster and stay asleep longer.",
    },
    {
      title: "Simple Guide to the 7 Chakras",
      excerpt: "Understand the body's energy centers and their role in wellbeing.",
    },
    {
      title: "What is Meditation, Really?",
      excerpt: "Beyond the mystique, meditation demystified for modern seekers.",
    },
    {
      title: "Yoga Nidra: The Sleep of the Sages",
      excerpt: "Deep conscious rest that restores in minutes what sleep takes hours to do.",
    },
    {
      title: "Yoga & Mindfulness: A Powerful Pair",
      excerpt: "How movement and awareness together transform daily life.",
    },
    {
      title: "Easy Asana for Blood Pressure",
      excerpt: "Gentle postures proven to support cardiovascular health.",
    },
    {
      title: "Benefits of Yoga for Hypertension",
      excerpt: "The evidence behind yoga's ability to lower blood pressure naturally.",
    },
  ],
  anxiety: [
    {
      title: "7 Ways to Cultivate an Optimistic Mind",
      excerpt: "Small daily habits that shift your baseline outlook.",
    },
    {
      title: "How to Be Conscious in Everyday Moments",
      excerpt: "Anchor awareness into ordinary actions.",
    },
    {
      title: "How to Feel Calm Under Pressure",
      excerpt: "Techniques to steady yourself when the world feels chaotic.",
    },
    {
      title: "Prioritize Your Mental Health",
      excerpt: "Why mental fitness deserves the same attention as physical.",
    },
    {
      title: "Yoga for Hypertension",
      excerpt: "Support your cardiovascular system through breath and posture.",
    },
    {
      title: "Yoga Nidra for Deep Rest",
      excerpt: "The most restorative practice you may never have tried.",
    },
    { title: "Yoga & Mindfulness Together", excerpt: "A gentle daily protocol for lasting calm." },
    { title: "Meditation for Seniors", excerpt: "Age-appropriate practices that fit any body." },
    {
      title: "Harmonizing Mind & Body",
      excerpt: "Bringing the two into conversation, not conflict.",
    },
  ],
  depression: [
    {
      title: "Master Stress Management: A Meditative Path to Calm",
      excerpt: "Techniques to shift out of low-mood spirals.",
    },
    {
      title: "Mastering Calm: 7 Effective Ways to Relieve Stress",
      excerpt: "Practical protocols for hard days.",
    },
    { title: "Prioritize Your Mental Health", excerpt: "Make wellbeing non-negotiable." },
    { title: "Prioritize Your Mental Health, Part II", excerpt: "Building sustainable rituals." },
    { title: "How to Be Conscious", excerpt: "Consciousness as the medicine." },
    { title: "7 Ways to Cultivate Optimism", excerpt: "Small shifts, large returns." },
  ],
  parenting: [
    { title: "Understanding Your Child's Inner World", excerpt: "See through your child's eyes." },
    {
      title: "The Sacred Duty of Raising Consciousness",
      excerpt: "Parenting as a spiritual practice.",
    },
    { title: "Discipline Without Damage", excerpt: "Guidance that guides, not shames." },
    { title: "Values in a Digital Age", excerpt: "Rooting children in something deeper." },
    { title: "When Children Don't Listen", excerpt: "Understanding what obedience really means." },
    { title: "Raising Confident Kids", excerpt: "Confidence built from within." },
    { title: "The Power of Presence", excerpt: "Your attention is their nourishment." },
    {
      title: "Meditation for the Whole Family",
      excerpt: "Practices even young children can enjoy.",
    },
    { title: "Beyond Achievement", excerpt: "Success that includes inner peace." },
  ],
  addictions: [
    { title: "Meditation and Mental Health", excerpt: "The neuroscience of awareness." },
    { title: "Conscious Mind Basics", excerpt: "Understanding the observer within." },
    { title: "Yoga Poses for Peace", excerpt: "A calming physical protocol." },
    { title: "How to Feel Calm", excerpt: "Steady the storm from within." },
    { title: "Prioritize Your Mental Health", excerpt: "Recovery is a daily choice." },
    { title: "Yoga Nidra for Recovery", excerpt: "Deep rest that repairs." },
    {
      title: "Transformative Health Benefits of Meditation",
      excerpt: "What consistent practice delivers.",
    },
    { title: "A Complete Meditation Guide", excerpt: "Start where you are." },
    { title: "Mastering Meditation at Home", excerpt: "Build your personal sanctuary." },
  ],
  overthinking: [
    {
      title: "Understanding Feminine Energy",
      excerpt: "The receptive intelligence within us all.",
    },
    { title: "7 Ways to Cultivate Optimism", excerpt: "Redirect the mind's tendency." },
    { title: "10 Ways to Release Negative Thoughts", excerpt: "Tools that actually work." },
    { title: "What is Spirituality?", excerpt: "Beyond dogma, into direct experience." },
    { title: "What is Consciousness?", excerpt: "The ground of all experience." },
    { title: "Conscious Mind Basics", excerpt: "How thought and awareness differ." },
    { title: "What the Conscious Mind Can Do", excerpt: "The power you already possess." },
    { title: "How to Be Conscious", excerpt: "Presence as a practice." },
    { title: "Prioritize Your Mental Health", excerpt: "The overthinker's daily rescue kit." },
  ],
  meditation: [
    { title: "How to Become Spiritual in Daily Life", excerpt: "Integration over renunciation." },
    { title: "Sahasrara: The Crown Chakra", excerpt: "The seat of pure awareness." },
    { title: "Ajna: The Third Eye Chakra", excerpt: "Intuition and inner vision." },
    { title: "Vishuddha: The Throat Chakra", excerpt: "Authentic expression." },
    { title: "Anahata: The Heart Chakra", excerpt: "Unconditional love." },
    { title: "Manipura: The Solar Plexus", excerpt: "Personal power and will." },
    { title: "Svadhisthana: The Sacral Chakra", excerpt: "Creativity and flow." },
    { title: "Muladhara: The Root Chakra", excerpt: "Grounding and stability." },
    {
      title: "Healing Childhood Trauma Through Spirituality",
      excerpt: "Roots run deep, so does healing.",
    },
  ],
  manifestation: [
    { title: "How to Become Spiritual", excerpt: "The foundation of conscious creation." },
    { title: "7 Ways to Cultivate Optimism", excerpt: "Mindset that magnetizes." },
    { title: "Understanding the 7 Chakras", excerpt: "Energy alignment for manifestation." },
    { title: "Vishuddha: Authentic Expression", excerpt: "Speak your reality into being." },
    { title: "What is Consciousness?", excerpt: "The medium in which creation occurs." },
    { title: "Simple Guide to Effective Manifestation", excerpt: "Beyond wishing, into knowing." },
    { title: "The Power of Silent Retreats", excerpt: "Where clarity is born." },
    { title: "Chakra Meditation for Manifestation", excerpt: "Align to attract." },
    { title: "The Magic of Gomti Chakra", excerpt: "Ancient tools for abundance." },
  ],
  "finding-purpose": [
    { title: "7 Ways to Cultivate Optimism", excerpt: "Purpose needs a hopeful lens." },
    { title: "How to Be Conscious", excerpt: "Purpose reveals in presence." },
    { title: "How to Feel Calm", excerpt: "A calm mind hears its calling." },
    { title: "Prioritize Your Mental Health", excerpt: "You cannot pour from an empty cup." },
    { title: "Yoga for Hypertension", excerpt: "Body support for the search within." },
    { title: "Yoga Nidra", excerpt: "Access wisdom in deep rest." },
    { title: "Yoga & Mindfulness", excerpt: "Weave awareness through movement." },
    { title: "Meditation for Seniors", excerpt: "It's never too late to know why." },
    { title: "Harmonizing Mind & Body", excerpt: "Alignment reveals direction." },
  ],
  yoga: [
    {
      title: "Healing Childhood Trauma Through Spirituality",
      excerpt: "The body remembers, and can release.",
    },
    { title: "Simple Guide to Chakras", excerpt: "Energy anatomy for practitioners." },
    { title: "The 7 Chakras Explained", excerpt: "A map of the subtle body." },
    { title: "Easy Asana for BP", excerpt: "Gentle poses with big impact." },
    { title: "Benefits of Yoga for Hypertension", excerpt: "The research is clear." },
    { title: "Pranayama for High BP", excerpt: "The breath as medicine." },
    { title: "Yoga for High BP", excerpt: "A complete asana protocol." },
    { title: "Yoga for Back Pain", excerpt: "Relief through gentle movement." },
    { title: "Yoga for Flexibility", excerpt: "Every body can begin." },
  ],
  gratitude: [
    { title: "Healing Childhood Trauma Through Spirituality", excerpt: "Gratitude as the healer." },
    { title: "10 Ways to Release Negative Thoughts", excerpt: "Gratitude replaces the loop." },
    { title: "How to Activate Your Seven Chakras", excerpt: "Energy work for wholeness." },
    { title: "What the Conscious Mind Can Do", excerpt: "Directed by gratitude, it soars." },
    { title: "Conscious Mind Basics", excerpt: "Where gratitude lives." },
    { title: "How to Be Conscious", excerpt: "Gratitude requires presence." },
    { title: "How to Feel Calm", excerpt: "Gratitude is the doorway." },
    { title: "What Is Positive Thinking?", excerpt: "Grounded, not naive." },
    { title: "Simple Guide to Effective Manifestation", excerpt: "Gratitude is the accelerator." },
  ],
  mindfulness: [
    {
      title: "Healing Childhood Trauma Through Spirituality",
      excerpt: "Presence dissolves the past.",
    },
    { title: "What is Consciousness?", excerpt: "The medium of mindful awareness." },
    { title: "Conscious Mind Basics", excerpt: "Foundations of mindful living." },
    { title: "What the Conscious Mind Can Do", excerpt: "Mindfulness applied." },
    { title: "How to Feel Calm", excerpt: "Presence is the calmer." },
    { title: "Yoga & Mindfulness", excerpt: "Together they are transformative." },
    { title: "Yoga for High BP", excerpt: "Mindful movement, measurable results." },
    { title: "Yoga for Back Pain", excerpt: "Awareness prevents injury." },
    { title: "Yoga for Flexibility", excerpt: "Move with attention." },
  ],
  "positive-thinking": [
    { title: "7 Ways to Cultivate Optimism", excerpt: "Positive thinking's practical toolkit." },
    { title: "10 Ways to Release Negative Thoughts", excerpt: "Clear space for the positive." },
    { title: "How to Activate Your Seven Chakras", excerpt: "Energy underlies mindset." },
    { title: "What the Conscious Mind Can Do", excerpt: "Directed positivity is power." },
    { title: "Conscious Mind Basics", excerpt: "The foundation of any mindset shift." },
    { title: "How to Be Conscious", excerpt: "Awareness precedes choice." },
    { title: "How to Feel Calm", excerpt: "Calm is the soil positivity grows in." },
    { title: "What Is Positive Thinking?", excerpt: "Grounded, evidence-based, real." },
    { title: "Simple Guide to Effective Manifestation", excerpt: "Positivity in action." },
  ],
};

export const VIDEOS_BY_TOPIC: Record<SolutionSlug, { id: string; title: string }[]> = {
  stress: [
    { id: "TIeoLbW_Tms", title: "Sakshi Shree's Insights: Finding Inner Peace" },
    { id: "M_bO-m-sG1Q", title: "एक महामंत्र जो तुरंत जीवन को चिंता और तनाव मुक्त" },
    { id: "XFBMxnUnhw4", title: "तनाव से मुक्ति कैसे पाएं" },
    { id: "9dEH16_4RnE", title: "तनाव मुक्त आनंदमय जीवन जीने का विज्ञान" },
    { id: "JzRAKvsXxuI", title: "जीवन आसान बना देगी यह कला" },
    { id: "zBSylD0ojlQ", title: "4 Deep Breathing Techniques" },
  ],
  anxiety: [
    { id: "okTnWaUrrcc", title: "Anxiety कैसे ठीक करें" },
    { id: "rBEYkNe1wIo", title: "How to Fight Fear & Anxiety, Part 2" },
    { id: "BPBGUq-7DwM", title: "How to Fight Fear & Anxiety, Part 1" },
    { id: "WuexPS1a9DM", title: "एक बड़ी समस्या भय, चिंता और तनाव से तुरंत मुक्ति" },
    { id: "UwitMvjhZWU", title: "चिंता, तनाव एवं भय से तत्काल मुक्ति" },
    { id: "paffCWKd720", title: "चिंता तनाव और भय से मुक्ति की तकनीक" },
  ],
  depression: [
    { id: "ePg4GtxzWa4", title: "I am Stressed in College Life" },
    { id: "Rsn5FX-mO9g", title: "How to find your true nature" },
    { id: "ZcH73i7Blz4", title: "युवाओं के लिए डिप्रेशन से मुक्ति" },
    { id: "FyduZS4Ce9A", title: "आत्महत्या के विचार से मुक्ति" },
    { id: "En0wjpQXRtU", title: "असफलता का भय और निराशा से बचने का उपाय" },
    { id: "DJRJ8osnYd0", title: "युवाओं के लिए डिप्रेशन, तनाव, चिंता से मुक्ति" },
  ],
  parenting: [
    { id: "MPIOJ_POKi0", title: "Parenting tips & Spirituality" },
    { id: "5g4pqByHHUU", title: "बच्चे कहना ना मानें तो ऐसा करें" },
    { id: "lwGzIH3504s", title: "Powerful Tips To Raise Your Children" },
    { id: "xlx8bDuMLVo", title: "Disobeying Parents is not a sin" },
    { id: "pM5E2sKZoX8", title: "बच्चों के साथ कैसा व्यवहार करें" },
    { id: "hR_8-XOo0zY", title: "Follow these parenting tips" },
  ],
  addictions: [
    { id: "iYdRUPD7qZs", title: "बुरी आदतों से छुटकारा" },
    { id: "qy5gyXNujhM", title: "नशा करना गलत क्यों है" },
    { id: "Qpq9DGgJ2j4", title: "Drug Addiction and Meditation, Podcast Ep 11" },
    { id: "IWvSd-uNgGI", title: "Emotions, Relationships and Addictions, Podcast Ep 12" },
  ],
  overthinking: [
    { id: "V6N--wsi2PA", title: "Overthinking का चक्र कैसे तोड़ें" },
    { id: "K8GXgnAchBY", title: "रुक जायेगा विचारों का ये तूफ़ान" },
    { id: "zbHTL4AIbjQ", title: "How to Always Think Positive" },
    { id: "qZRAoRzMwmM", title: "Heart or Mind, whom to follow" },
    { id: "mnLKvGNvlFc", title: "मन के जाल से मुक्ति" },
    { id: "H_gHAxWkMzQ", title: "Power of thoughtless mind" },
  ],
  meditation: [
    { id: "VBr86HnrDZQ", title: "चमत्कारी है विपस्सना" },
    { id: "lKKsSYvsGHg", title: "ध्यान का सही समय" },
    { id: "DnEHD04Wu1c", title: "खाना कैसे खाएं" },
    { id: "Zn-IuX9Wgho", title: "कहाँ मिलेगा ध्यान का रिपोर्ट कार्ड" },
    { id: "cH5qIsADaec", title: "साक्षी साधना ध्यान" },
    { id: "hLakweacD5M", title: "कैसे ध्यान करते हैं शिव" },
    { id: "wB3X-CSKi-0", title: "Just Sitting Doing Nothing" },
    { id: "GWT4D_RYEKg", title: "Manifestation Through Third-Eye Meditation" },
    { id: "_kR1yEhIBYM", title: "ध्यान करने की सही दिशा" },
  ],
  manifestation: [
    { id: "KVZpqoomuBk", title: "How to get in receiving mode" },
    { id: "e0gXlkBq6hM", title: "The Secret: Dare to Dream" },
    { id: "i4Y50zEG8XM", title: "Manifest Your Desires" },
    { id: "dRZ0QjWCx8M", title: "सिद्ध कामना क्रिया" },
    { id: "3SyhC_MBn_g", title: "कैसे मिले मनचाही चीज़ें" },
    { id: "pAbmY2WfuIQ", title: "आप अस्तित्व से हर चीज़ पा सकते हो" },
    { id: "k1klaWgPiY8", title: "जो चाहोगे तुरंत मिलेगा" },
    { id: "8wkM5uiBC54", title: "आपकी हर मनोकामना पूरी" },
    { id: "Gf-DGN_bH1o", title: "जीवन में बहुत सारा पैसा" },
  ],
  "finding-purpose": [
    { id: "QqsTE6kS6mQ", title: "The Ultimate Purpose Of Life" },
    { id: "oXOuT0m_e1Q", title: "पूरी तरह जागना ही जीवन का उद्देश्य" },
    { id: "dvZQfyU3k8E", title: "जीवन की सही राह कैसे चुनें" },
    { id: "VLUrgEdTY7A", title: "आनंद का सबसे बड़ा रहस्य" },
    { id: "g3D8KeFWUoQ", title: "Finding Success on Spiritual Path" },
    { id: "8lv7lyneXVY", title: "What's the real purpose of your life" },
  ],
  yoga: [
    { id: "VBr86HnrDZQ", title: "चमत्कारी है विपस्सना" },
    { id: "lKKsSYvsGHg", title: "ध्यान का सही समय" },
    { id: "cH5qIsADaec", title: "साक्षी साधना ध्यान" },
    { id: "wB3X-CSKi-0", title: "Just Sitting Doing Nothing" },
    { id: "zBSylD0ojlQ", title: "4 Deep Breathing Techniques" },
  ],
  gratitude: [
    { id: "lRuAHb3pQnM", title: "How Gratitude can change your life" },
    { id: "XJ6duTiiVaA", title: "तुम्हारी प्रार्थना क्यों नहीं सुनते भगवान" },
    { id: "zz-LzfDDzDc", title: "कृतज्ञता का भाव आपका भाग्य बना सकता है" },
    { id: "ZXJtdC_gCxQ", title: "सिर्फ एक कार्य और सब कुछ बदल जायेगा" },
    { id: "pzd_-GtmC_E", title: "करोड़पति बनने का अचूक मंत्र" },
    { id: "1cmlzgVDucQ", title: "कहाँ से आये धन्यवाद का भाव" },
    { id: "dOKlWMheRiw", title: "Gratitude can change your life" },
    { id: "Ejne63xeE-Q", title: "Let Gratitude Change Your Life" },
  ],
  mindfulness: [
    { id: "wB3X-CSKi-0", title: "Just Sitting Doing Nothing" },
    { id: "Rsn5FX-mO9g", title: "How to find your true nature" },
    { id: "qZRAoRzMwmM", title: "Heart or Mind, whom to follow" },
    { id: "H_gHAxWkMzQ", title: "Power of thoughtless mind" },
    { id: "lKKsSYvsGHg", title: "ध्यान का सही समय" },
  ],
  "positive-thinking": [
    { id: "zbHTL4AIbjQ", title: "How to Always Think Positive" },
    { id: "ds00dU3dK1U", title: "विचारशक्ति से हर मनचाही सफलता" },
    { id: "K8GXgnAchBY", title: "रुक जायेगा विचारों का ये तूफ़ान" },
    { id: "H_gHAxWkMzQ", title: "Power of thoughtless mind" },
    { id: "V6N--wsi2PA", title: "Overthinking का चक्र कैसे तोड़ें" },
  ],
};

export const COURSES = [
  {
    slug: "design-your-destiny",
    title: "Design Your Destiny",
    tagline: "Craft the life you were meant to live",
    price: 499,
    originalPrice: 5100,
    duration: "2 hours",
    level: "Beginner",
    image: "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-chetanvlad-2923157-1.png",
    features: ["Emotion Regulation", "Positive Mindset", "Lasting Happiness", "Self-Discovery"],
    description:
      "A transformative journey through four modules that put you back in the driver's seat of your own life.",
  },
  {
    slug: "science-of-joyful-living",
    title: "Science of Joyful Living",
    tagline: "Joy is a science, learn its laws",
    price: 499,
    originalPrice: 5100,
    duration: "2 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&q=90&fit=crop",
    features: ["Emotion Regulation", "Positive Mindset", "Lasting Happiness", "Self-Discovery"],
    description:
      "Discover why joy is your birthright and how to reclaim it, one practice at a time.",
  },
  {
    slug: "mind-power-meditation",
    title: "Mind Power Meditation",
    tagline: "Empower Your Mind Through Meditation",
    price: 999,
    originalPrice: 5100,
    duration: "2 hours",
    level: "Beginner",
    image:
      "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-felipe-borges-964530-2597205-1.png",
    features: [
      "Manifest Your Dreams",
      "Heightened Creativity",
      "Improved Health",
      "Enhanced Focus",
      "Reduced Stress",
    ],
    description:
      "Meditation is not passive, done rightly, it becomes the most active force in your life.",
  },
  {
    slug: "sanjeevani-kriya",
    title: "Sanjeevani Kriya",
    tagline: "Revitalize Your Body and Mind",
    price: 999,
    originalPrice: 5100,
    duration: "2 hours",
    level: "Beginner",
    image: "https://sciencedivine.org/wp-content/uploads/2024/04/pexels-min-an-1234035-1-1.png",
    features: [
      "Cultivates Inner Peace",
      "Balances Energy Centers",
      "Facilitates Self-Realization",
      "Awakens Heart Chakra",
    ],
    description:
      "An ancient kriya awakened for modern seekers, direct experience of your own life force.",
  },
] as const;

export const EVENTS = [
  {
    title: "Shiksha Sewa Sankalp Mahotsav",
    date: "Dec 14, 2025",
    time: "10:00 AM",
    location: "Siddha Sudarshan Sakshi Dhaam, Ghaziabad",
    status: "Available" as const,
  },
  {
    title: "Navvarsh Dhyan Mahotsav",
    date: "Jan 4, 2026",
    time: "10:00 AM",
    location: "Ghaziabad",
    status: "Available" as const,
  },
  {
    title: "Vasant Mahotsav",
    date: "Feb 1, 2026",
    time: "9:00 AM",
    location: "Ghaziabad",
    status: "Available" as const,
  },
  {
    title: "Holi Milan Samaroh",
    date: "Mar 1, 2026",
    time: "10:00 AM",
    location: "Ghaziabad",
    status: "Available" as const,
  },
  {
    title: "Satsang, Meditation & Problem Resolution",
    date: "Apr 5, 2026",
    time: "10:00 AM",
    location: "Ghaziabad",
    status: "Available" as const,
  },
  {
    title: "Beyond Astrology: Meet Sakshi Shree",
    date: "By Appointment",
    time: "Personal Session",
    location: "Online / Ghaziabad",
    status: "Available" as const,
  },
];

export const TESTIMONIALS = [
  {
    name: "Sanaya Aggarwal",
    role: "Student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    quote: "Sakshi Shree's guidance changed how I see my anxiety. I finally feel free.",
  },
  {
    name: "Deepak Batra",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    quote: "Design Your Destiny gave me tools I use every single day. My business and inner life both transformed.",
  },
  {
    name: "Radhika Arya",
    role: "Homemaker",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    quote: "The peace I found is unshakeable. My family notices the difference in me every day.",
  },
  {
    name: "Rajiv Mehta",
    role: "Executive",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    quote: "I was skeptical. Six weeks in, I understood, this is not belief, it is direct experience.",
  },
  {
    name: "Priya Singh",
    role: "Doctor",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    quote: "As a physician I've seen many wellness approaches. This is different. This is real.",
  },
  {
    name: "Amit Sharma",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    quote: "Overthinking used to keep me up at night. The mindfulness practices here brought deep, peaceful sleep.",
  },
  {
    name: "Sunita Rao",
    role: "Teacher",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop",
    quote: "Incorporating meditation into my daily routine has completely changed how I connect with my students.",
  },
  {
    name: "Vikram Malhotra",
    role: "Business Consultant",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    quote: "Sanjeevani Kriya revitalized my physical health. I feel 10 years younger and full of energy.",
  },
  {
    name: "Kiran Deshmukh",
    role: "Artist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    quote: "My creativity now flows effortlessly. Spiritual grounding cleared the mental clutter completely.",
  },
  {
    name: "Rohan Joshi",
    role: "Fitness Coach",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop",
    quote: "Sound Body and Sound Mind are two sides of the same coin. This movement shows you how to achieve both.",
  },
];

export const LEADERS = [
  {
    name: "Hon'ble Shri Rajnath Singh",
    title: "Defence Minister of India",
    image: "https://sciencedivine.org/wp-content/uploads/2023/06/3-scaled.webp",
  },
  {
    name: "Dr. Vikram Sampat",
    title: "Historian & Author",
    image: "https://sciencedivine.org/wp-content/uploads/2023/06/4-scaled.webp",
  },
  {
    name: "Shri Ajay Bhatt",
    title: "Former Union Minister",
    image: "https://sciencedivine.org/wp-content/uploads/2023/06/1-scaled.webp",
  },
  {
    name: "Shri Anil Bachoo",
    title: "Former Health Minister, Mauritius",
    image: "https://sciencedivine.org/wp-content/uploads/2023/06/2-scaled.webp",
  },
];

export const TESTIMONIAL_VIDEOS = [
  { id: "QLmL230dApk", title: "Swaparna Testimonial" },
  { id: "EiFMTSo8Yws", title: "Helen Testimonial" },
  { id: "6bkJdkmAt20", title: "Pooja Pagaddinnimath Testimonial" },
  { id: "5KmsxqJXACM", title: "Patty Testimonial" },
  { id: "LiILI9iLK0U", title: "Magic of Meeting Sakshi Shree" },
  { id: "FERuXT0Z8JE", title: "Rishabh Testimonial" },
  { id: "wjPponfjB_g", title: "Dr. M D Ojha, Rishikesh Shivir" },
  { id: "LV74UV9AUNE", title: "Shweta Singh, Rishikesh Shivir" },
  { id: "60_cJkCAc5I", title: "Gaurav Pratap Singh Testimonial" },
  { id: "jEiClzy2ZhY", title: "Pulkit Jain Testimonial" },
  { id: "4XbvVT7yK2U", title: "Bobby Mann Testimonial" },
  { id: "FmQlrZ5XVmY", title: "Ashish Agarwal Testimonial" },
  { id: "6PiX_XQcPFE", title: "Sunil Yadav (Delhi BJP VP)" },
  { id: "XaOeGL4Mp2E", title: "Dheeraj Madaan (IIT Roorkee)" },
  { id: "6c3XtzTbu80", title: "Sunil Khajoriya Testimonial" },
  { id: "zYBYARtrr94", title: "Rajiv Gupta, Rishikesh Shivir" },
  { id: "W3bfSZkEaDg", title: "Ranjana Sharma, Rishikesh Shivir" },
  { id: "XSkmVjlvXd4", title: "Preeti's Life Change, Sanjeevani Kriya" },
  { id: "2P6i7tnydMI", title: "Sakshi Hema, Rishikesh Shivir" },
  { id: "7AMCDdnCjuI", title: "Piyush's Transformation" },
  { id: "PSwaCSEjPLM", title: "Shiv Kumar, Rishikesh Shivir" },
];

export const SOLUTION_HUB_CARDS = [
  {
    slug: "overthinking",
    title: "Overthinking",
    image: "https://sciencedivine.org/wp-content/uploads/2024/03/Overthinking-1024x683.jpg",
  },
  {
    slug: "addictions",
    title: "Addictions",
    image: "https://sciencedivine.org/wp-content/uploads/2024/03/Addictions-1024x512.jpg",
  },
  {
    slug: "parenting",
    title: "Parenting",
    image: "https://sciencedivine.org/wp-content/uploads/2024/03/Parenting-1024x683.jpg",
  },
  {
    slug: "stress",
    title: "Sleeping Disorder",
    image: "https://sciencedivine.org/wp-content/uploads/2024/03/Sleeping-1024x683.jpg",
  },
  {
    slug: "yoga",
    title: "Wellness",
    image: "https://sciencedivine.org/wp-content/uploads/2024/03/Wellness-1024x683.jpg",
  },
  {
    slug: "anxiety",
    title: "Anxiety",
    image: "https://sciencedivine.org/wp-content/uploads/2024/03/Anxiety-1024x683.jpg",
  },
  {
    slug: "depression",
    title: "Depression",
    image: "https://sciencedivine.org/wp-content/uploads/2024/03/Depression.jpg",
  },
];

export const SOCIALS = {
  facebook: "https://www.facebook.com/OfficialSakshishree/",
  youtube: "https://www.youtube.com/@SakshiShree",
  instagram: "https://www.instagram.com/sakshishreeofficial/",
  linkedin: "https://in.linkedin.com/company/science-divine-foundation",
  twitter: "https://twitter.com/gurusakshishree",
  playstore: "https://play.google.com/store/apps/details?id=com.sakshishree.learners",
};

export const LOGO_URL = "https://sciencedivine.org/wp-content/uploads/2023/07/cropped-SD_logo.png";
