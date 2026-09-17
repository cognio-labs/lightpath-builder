import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const outputPostsDir = path.join(rootDir, 'output', 'posts');
const publicBlogImagesDir = path.join(rootDir, 'public', 'blog', 'images');
const contentBlogsDir = path.join(rootDir, 'src', 'content', 'blogs');
const blogPostsFilePath = path.join(rootDir, 'src', 'data', 'blogPosts.ts');

// Helper to decode HTML entities
function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ');
}

// Convert markdown to clean HTML protecting images and URLs from italic regexes
function markdownToHtml(md, slug) {
  let html = md;

  // Normalize newlines
  html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Placeholders map to protect images & links from italic/bold replaces
  const placeholders = [];
  function savePlaceholder(content) {
    const key = `%%%PLACEHOLDER_${placeholders.length}%%%`;
    placeholders.push({ key, content });
    return key;
  }

  // 1. Linked images: [![alt](images/img.png)](url)
  html = html.replace(/\[!\[([^\]]*)\]\((?:images\/)?([^)"\s]+)(?:\s+"([^"]*)")?\)\]\(([^)]+)\)/g, (match, alt, imgName, title, href) => {
    const cleanImgName = path.basename(imgName);
    const src = `/blog/images/${slug}/${cleanImgName}`;
    const altText = alt || title || 'Science Divine Blog Image';
    const tag = `<div class="my-6 text-center"><a href="${href}" target="_blank" rel="noopener noreferrer"><img src="${src}" alt="${altText}" class="rounded-xl mx-auto max-w-full h-auto shadow-sm border border-gray-100" loading="lazy" /></a></div>`;
    return savePlaceholder(tag);
  });

  // 2. Standalone images: ![alt](images/img.png "title") or ![](images/img.png)
  html = html.replace(/!\[([^\]]*)\]\((?:images\/)?([^)"\s]+)(?:\s+"([^"]*)")?\)/g, (match, alt, imgName, title) => {
    const cleanImgName = path.basename(imgName);
    const src = `/blog/images/${slug}/${cleanImgName}`;
    const altText = alt || title || 'Science Divine Blog Image';
    const caption = title ? `<p class="text-xs text-gray-500 mt-2 text-center italic">${title}</p>` : '';
    const tag = `<div class="my-6 text-center"><img src="${src}" alt="${altText}" class="rounded-xl mx-auto max-w-full h-auto shadow-sm border border-gray-100" loading="lazy" />${caption}</div>`;
    return savePlaceholder(tag);
  });

  // 3. Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    let finalUrl = url;
    if (finalUrl.includes('sciencedivine.org/')) {
      const matchPath = finalUrl.match(/sciencedivine\.org\/([^/]+)\/?$/);
      if (matchPath) {
        finalUrl = `/blog/${matchPath[1]}`;
      }
    }
    const tag = `<a href="${finalUrl}" class="text-[#8B1515] font-semibold underline hover:text-[#701010] transition-colors">${text}</a>`;
    return savePlaceholder(tag);
  });

  // Convert headers
  html = html.replace(/^#### (.*$)/gim, '<h4 class="font-serif font-bold text-lg text-gray-900 mt-6 mb-3">$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="font-serif font-bold text-xl text-gray-900 mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="font-serif font-bold text-2xl text-gray-900 mt-10 mb-4">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="font-serif font-bold text-2xl text-gray-900 mt-10 mb-4">$1</h2>');

  // Convert blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-[#8B1515] pl-4 py-2 my-5 text-gray-700 italic bg-rose-50/40 rounded-r-lg">$1</blockquote>');

  // Convert bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/(?<!\w)_([^_]+)_(?!\w)/g, '<em>$1</em>');

  // Convert unordered and ordered lists
  const lines = html.split('\n');
  const processedLines = [];
  let inList = false;
  let inOrderedList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.match(/^[\*\-]\s+(.*)/)) {
      if (!inList) {
        if (inOrderedList) {
          processedLines.push('</ol>');
          inOrderedList = false;
        }
        processedLines.push('<ul class="list-disc list-inside space-y-2 my-4 text-gray-700">');
        inList = true;
      }
      const itemContent = line.replace(/^[\*\-]\s+/, '');
      processedLines.push(`  <li>${itemContent}</li>`);
    } else if (line.match(/^\d+\.\s+(.*)/)) {
      if (!inOrderedList) {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        processedLines.push('<ol class="list-decimal list-inside space-y-2 my-4 text-gray-700">');
        inOrderedList = true;
      }
      const itemContent = line.replace(/^\d+\.\s+/, '');
      processedLines.push(`  <li>${itemContent}</li>`);
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      if (inOrderedList) {
        processedLines.push('</ol>');
        inOrderedList = false;
      }
      processedLines.push(lines[i]);
    }
  }
  if (inList) processedLines.push('</ul>');
  if (inOrderedList) processedLines.push('</ol>');

  html = processedLines.join('\n');

  // Restore placeholders
  for (const item of placeholders) {
    html = html.replace(item.key, item.content);
  }

  // Convert paragraphs
  const blocks = html.split(/\n\s*\n/);
  const formattedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (/^<(h[1-6]|ul|ol|div|blockquote|p)/i.test(trimmed)) {
      return trimmed;
    }
    return `<p class="text-gray-700 leading-relaxed my-4 text-[15px] sm:text-base">${trimmed.replace(/\n/g, '<br/>')}</p>`;
  });

  return formattedBlocks.filter(Boolean).join('\n');
}

// Category mapping helper
function mapCategory(wpCategories, slug) {
  const cats = wpCategories.map(c => c.toLowerCase());
  
  if (cats.includes('chakras') || slug.includes('chakra')) {
    return { name: 'Chakras & Energy', slug: 'chakras' };
  }
  if (cats.includes('meditation') || cats.includes('mindfulness') || slug.includes('meditation') || slug.includes('dhyan')) {
    return { name: 'Meditation & Sadhna', slug: 'meditation-sadhna' };
  }
  if (cats.includes('yoga') || slug.includes('yoga') || slug.includes('asana') || slug.includes('pranayama')) {
    return { name: 'Yoga & Pranayama', slug: 'yoga-pranayama' };
  }
  if (cats.includes('anxiety') || cats.includes('stress') || cats.includes('depression') || cats.includes('overthinking') || cats.includes('sleeping-disorder') || cats.includes('addictions')) {
    return { name: 'Stress & Anxiety', slug: 'stress-anxiety' };
  }
  if (cats.includes('manifestation') || cats.includes('positive-thinking') || cats.includes('finding-purpose') || cats.includes('gratitude') || slug.includes('manifest') || slug.includes('destiny')) {
    return { name: 'Mindset & Manifestation', slug: 'mindset-manifestation' };
  }
  if (cats.includes('relationships') || slug.includes('marriage') || slug.includes('love') || slug.includes('family')) {
    return { name: 'Relationships', slug: 'relationships-family' };
  }
  if (cats.includes('sakshi-wisdom') || cats.includes('wellness')) {
    return { name: 'Spirituality & Wellness', slug: 'spirituality-wellness' };
  }
  return { name: 'Spirituality & Wellness', slug: 'spirituality-wellness' };
}

// Format date helper
function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { display: 'Jan 01, 2024', iso: '2024-01-01T00:00:00.000Z' };
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return {
    display: `${month} ${day}, ${year}`,
    iso: d.toISOString(),
  };
}

// Generate clean plain text preview and excerpt
function extractTextAndExcerpt(markdown) {
  let plain = markdown
    .replace(/---[\s\S]*?---/, '') // remove frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '') // remove images
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // unwrap links
    .replace(/[#*`_>~]/g, '') // remove markdown symbols
    .replace(/\s+/g, ' ')
    .trim();

  let excerpt = plain.slice(0, 180).trim();
  if (plain.length > 180) {
    const lastSpace = excerpt.lastIndexOf(' ');
    if (lastSpace > 120) excerpt = excerpt.slice(0, lastSpace);
    excerpt += '...';
  }

  const words = plain.split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(words / 180))} min read`;

  return { plain, excerpt, words, readTime };
}

async function run() {
  console.log('🚀 Starting WordPress Blog Migration...');

  // Ensure target directories exist
  if (!fs.existsSync(publicBlogImagesDir)) {
    fs.mkdirSync(publicBlogImagesDir, { recursive: true });
  }
  if (!fs.existsSync(contentBlogsDir)) {
    fs.mkdirSync(contentBlogsDir, { recursive: true });
  }

  const postFolders = fs.readdirSync(outputPostsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  console.log(`📂 Found ${postFolders.length} posts in output/posts/`);

  let totalImagesCopied = 0;
  const migratedPosts = [];

  for (const slug of postFolders) {
    const postSrcDir = path.join(outputPostsDir, slug);
    const mdPath = path.join(postSrcDir, 'index.md');
    const imagesSrcDir = path.join(postSrcDir, 'images');

    if (!fs.existsSync(mdPath)) {
      console.warn(`⚠️ Skipping ${slug}: index.md not found.`);
      continue;
    }

    // 1. Copy images to public/blog/images/<slug>/
    const targetImageDir = path.join(publicBlogImagesDir, slug);
    let copiedImages = [];
    if (fs.existsSync(imagesSrcDir)) {
      if (!fs.existsSync(targetImageDir)) {
        fs.mkdirSync(targetImageDir, { recursive: true });
      }
      const files = fs.readdirSync(imagesSrcDir);
      for (const file of files) {
        fs.copyFileSync(path.join(imagesSrcDir, file), path.join(targetImageDir, file));
        copiedImages.push(file);
        totalImagesCopied++;
      }
    }

    // 2. Parse Markdown & Frontmatter
    const rawFileContent = fs.readFileSync(mdPath, 'utf8');
    const frontmatterMatch = rawFileContent.match(/^---([\s\S]*?)---\n?([\s\S]*)$/);

    let frontmatterRaw = '';
    let bodyRaw = rawFileContent;

    if (frontmatterMatch) {
      frontmatterRaw = frontmatterMatch[1];
      bodyRaw = frontmatterMatch[2];
    }

    // Title
    let title = slug.replace(/-/g, ' ');
    const titleMatch = frontmatterRaw.match(/title:\s*["']?([^"'\n\r]+)["']?/);
    if (titleMatch) title = decodeHtmlEntities(titleMatch[1].trim());

    // Date
    let dateStr = '2024-03-01';
    const dateMatch = frontmatterRaw.match(/date:\s*["']?([^"'\n\r]+)["']?/);
    if (dateMatch) dateStr = dateMatch[1].trim();
    const { display: dateDisplay, iso: datePublished } = formatDate(dateStr);

    // Cover Image
    let coverImage = '';
    const coverMatch = frontmatterRaw.match(/coverImage:\s*["']?([^"'\n\r]+)["']?/);
    if (coverMatch) {
      const coverFile = path.basename(coverMatch[1].trim());
      coverImage = `/blog/images/${slug}/${coverFile}`;
    } else if (copiedImages.length > 0) {
      coverImage = `/blog/images/${slug}/${copiedImages[0]}`;
    } else {
      coverImage = '/guruji_sunrise_bg.jpg';
    }

    // Categories
    const wpCategories = [];
    const catMatch = frontmatterRaw.match(/categories:\s*\n((?:\s*-\s*[^\n]+\n)+)/);
    if (catMatch) {
      catMatch[1].split('\n').forEach(line => {
        const c = line.replace(/^\s*-\s*["']?([^"'\n\r]+)["']?/, '$1').trim();
        if (c && c !== '--') wpCategories.push(c);
      });
    }

    // Tags
    const tags = [];
    const tagMatch = frontmatterRaw.match(/tags:\s*\n((?:\s*-\s*[^\n]+\n)+)/);
    if (tagMatch) {
      tagMatch[1].split('\n').forEach(line => {
        const t = line.replace(/^\s*-\s*["']?([^"'\n\r]+)["']?/, '$1').trim();
        if (t && t !== '--') tags.push(decodeHtmlEntities(t));
      });
    }

    const { name: categoryName, slug: categorySlug } = mapCategory(wpCategories, slug);
    const { plain: plainContent, excerpt, words, readTime } = extractTextAndExcerpt(bodyRaw);

    // 3. Save clean markdown to src/content/blogs/<slug>/index.md with updated image URLs
    const contentBlogSlugDir = path.join(contentBlogsDir, slug);
    if (!fs.existsSync(contentBlogSlugDir)) {
      fs.mkdirSync(contentBlogSlugDir, { recursive: true });
    }

    // Rewrite relative images in markdown body to /blog/images/<slug>/...
    let cleanMarkdownBody = bodyRaw.replace(/!\[([^\]]*)\]\((?:images\/)?([^)"\s]+)(?:\s+"([^"]*)")?\)/g, (m, alt, imgName, title) => {
      const cleanImgName = path.basename(imgName);
      const titleAttr = title ? ` "${title}"` : '';
      return `![${alt}](/blog/images/${slug}/${cleanImgName}${titleAttr})`;
    });

    const cleanFrontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${dateStr}"
datePublished: "${datePublished}"
category: "${categoryName}"
categorySlug: "${categorySlug}"
coverImage: "${coverImage}"
tags:
${tags.map(t => `  - "${t.replace(/"/g, '\\"')}"`).join('\n')}
---

`;
    fs.writeFileSync(path.join(contentBlogSlugDir, 'index.md'), cleanFrontmatter + cleanMarkdownBody, 'utf8');

    // 4. Generate HTML content for BlogPost
    const contentHtml = markdownToHtml(cleanMarkdownBody, slug);

    const blogPostObj = {
      slug,
      oldUrl: `https://sciencedivine.org/${slug}`,
      title,
      excerpt,
      category: categoryName,
      categorySlug,
      date: dateDisplay,
      datePublished,
      readTime,
      words,
      author: {
        name: "Sakshi Shree",
        role: "Enlightened Master & Founder, Science Divine",
        avatar: "https://sciencedivine.org/wp-content/uploads/2024/03/Sakshi-Shree-Profile-1.webp",
      },
      image: coverImage,
      content: plainContent.slice(0, 500) + '...',
      contentHtml,
      featured: false,
      tags,
    };

    migratedPosts.push(blogPostObj);
  }

  console.log(`✅ Converted ${migratedPosts.length} posts and copied ${totalImagesCopied} images.`);

  // 5. Read original 36 posts from backup/initial list or preserve existing
  const currentTsContent = fs.readFileSync(blogPostsFilePath, 'utf8');
  const postsArrayMatch = currentTsContent.match(/export const BLOG_POSTS:\s*BlogPost\[\]\s*=\s*(\[[\s\S]*\]);?\s*$/);
  let existingPosts = [];

  if (postsArrayMatch) {
    try {
      const parsed = JSON.parse(postsArrayMatch[1]);
      // Filter out only the initial 36 posts (or posts that are not in migratedPosts)
      const migratedSlugsSet = new Set(migratedPosts.map(p => p.slug));
      existingPosts = parsed.filter(p => !migratedSlugsSet.has(p.slug));
    } catch (err) {
      console.warn('Error filtering existing posts, proceeding with full list.');
    }
  }

  // Combine posts (existing + newly updated migrated)
  const allPosts = [...existingPosts, ...migratedPosts];

  console.log(`📊 Initial existing posts: ${existingPosts.length}`);
  console.log(`📊 Migrated posts added: ${migratedPosts.length}`);
  console.log(`📊 Total combined posts: ${allPosts.length}`);

  // 6. Updated BLOG_CATEGORIES
  const updatedCategories = [
    { name: "All Articles", slug: "all" },
    { name: "Meditation & Sadhna", slug: "meditation-sadhna" },
    { name: "Chakras & Energy", slug: "chakras" },
    { name: "Yoga & Pranayama", slug: "yoga-pranayama" },
    { name: "Stress & Anxiety", slug: "stress-anxiety" },
    { name: "Mindset & Manifestation", slug: "mindset-manifestation" },
    { name: "Spirituality & Wellness", slug: "spirituality-wellness" },
    { name: "Festivals & Traditions", slug: "festivals-traditions" },
    { name: "Relationships", slug: "relationships-family" },
    { name: "Bhagavad Gita", slug: "bhagavad-gita" }
  ];

  // 7. Write updated src/data/blogPosts.ts
  const newBlogPostsTsContent = `export interface BlogPost {
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

export const BLOG_CATEGORIES = ${JSON.stringify(updatedCategories, null, 2)};

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(allPosts, null, 2)};
`;

  fs.writeFileSync(blogPostsFilePath, newBlogPostsTsContent, 'utf8');
  console.log(`✨ Successfully updated ${blogPostsFilePath}`);
}

run().catch(console.error);
