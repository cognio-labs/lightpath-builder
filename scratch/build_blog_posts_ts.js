const fs = require('fs');
const path = require('path');
const posts = require('./migrated_posts.json');

const categories = [
  { name: "All Articles", slug: "all" },
  { name: "Festivals & Traditions", slug: "festivals-traditions" },
  { name: "Spirituality & Wellness", slug: "spirituality-wellness" },
  { name: "Bhagavad Gita", slug: "bhagavad-gita" },
  { name: "Stress & Anxiety", slug: "stress-anxiety" },
  { name: "Meditation & Sadhna", slug: "meditation-sadhna" },
];

function extractTags(p) {
  const tagSet = new Set();
  if (p.keywords) {
    p.keywords.split(',').forEach(k => {
      const trimmed = k.trim();
      if (trimmed.length > 2 && trimmed.length < 35 && !trimmed.toLowerCase().includes('2026')) {
        tagSet.add(trimmed);
      }
    });
  }
  if (p.slug.includes('ganesh') || p.slug.includes('ganpati')) {
    tagSet.add('Lord Ganesha');
    tagSet.add('Ganesh Chaturthi');
  }
  if (p.slug.includes('gita')) {
    tagSet.add('Bhagavad Gita');
    tagSet.add('Spiritual Wisdom');
  }
  if (p.slug.includes('stress') || p.slug.includes('anxiety') || p.slug.includes('overthinking')) {
    tagSet.add('Mental Wellness');
    tagSet.add('Inner Peace');
  }
  if (p.slug.includes('vishwakarma')) {
    tagSet.add('Vishwakarma Puja');
  }
  if (p.slug.includes('hartalika') || p.slug.includes('teej')) {
    tagSet.add('Hartalika Teej');
    tagSet.add('Vrat Katha');
  }
  if (p.slug.includes('radha') || p.slug.includes('krishna')) {
    tagSet.add('Radha Krishna');
    tagSet.add('Divine Love');
  }
  if (p.slug.includes('ekadashi')) {
    tagSet.add('Ekadashi Vrat');
  }
  if (p.slug.includes('pitru') || p.slug.includes('shradh') || p.slug.includes('shraddha')) {
    tagSet.add('Pitru Paksha');
    tagSet.add('Shradh Vidhi');
  }
  if (p.slug.includes('navratri')) {
    tagSet.add('Navratri Fasting');
    tagSet.add('Maa Durga');
  }
  return Array.from(tagSet).slice(0, 5);
}

function unescapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"');
}

const formattedPosts = posts.map((p, idx) => {
  let primaryCategory = "Festivals & Traditions";
  let categorySlug = "festivals-traditions";

  const catStr = Array.isArray(p.category) ? p.category.join(' ') : (p.category || '');
  if (catStr.includes('Spirituality') || p.slug.includes('stress') || p.slug.includes('overthinking') || p.slug.includes('anxiety') || p.slug.includes('non-dual')) {
    primaryCategory = "Spirituality & Wellness";
    categorySlug = "spirituality-wellness";
  }

  // Strip html tags from contentHtml to create plain content
  const plainText = p.contentHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  return {
    slug: p.slug,
    oldUrl: p.oldUrl,
    title: unescapeHtml(p.title),
    excerpt: unescapeHtml(p.description),
    category: primaryCategory,
    categorySlug: categorySlug,
    date: p.displayDate,
    datePublished: p.datePublished,
    readTime: p.readTime,
    words: p.words,
    author: {
      name: "Sakshi Shree",
      role: "Enlightened Master & Founder, Science Divine",
      avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
    },
    image: p.image,
    content: plainText.slice(0, 1000) + '...',
    contentHtml: p.contentHtml,
    featured: idx === 4 || idx === 5, // Ganesha Stress & Gita Overthinking
    tags: extractTags(p),
  };
});

const fileContent = `export interface BlogPost {
  slug: string;
  oldUrl: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  datePublished: string;
  readTime: string;
  words: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  content: string;
  contentHtml: string;
  featured?: boolean;
  tags: string[];
}

export const BLOG_CATEGORIES = ${JSON.stringify(categories, null, 2)};

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(formattedPosts, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/blogPosts.ts'), fileContent, 'utf-8');
console.log('Successfully generated src/data/blogPosts.ts with', formattedPosts.length, 'posts!');
