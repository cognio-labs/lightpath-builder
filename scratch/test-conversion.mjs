import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const outputPostsDir = path.join(rootDir, 'output', 'posts');
const publicBlogImagesDir = path.join(rootDir, 'public', 'blog', 'images');
const contentBlogsDir = path.join(rootDir, 'src', 'content', 'blogs');

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

// Convert markdown to clean HTML
function markdownToHtml(md, slug) {
  let html = md;

  // Normalize newlines
  html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Convert image links with links first: [![alt](images/img.png)](url)
  html = html.replace(/\[!\[([^\]]*)\]\((?:images\/)?([^)"\s]+)(?:\s+"([^"]*)")?\)\]\(([^)]+)\)/g, (match, alt, imgName, title, href) => {
    const cleanImgName = path.basename(imgName);
    const src = `/blog/images/${slug}/${cleanImgName}`;
    const altText = alt || title || 'Science Divine Blog Image';
    return `<div class="my-6 text-center"><a href="${href}" target="_blank" rel="noopener noreferrer"><img src="${src}" alt="${altText}" class="rounded-xl mx-auto max-w-full h-auto shadow-sm border border-gray-100" loading="lazy" /></a></div>`;
  });

  // Convert standalone images: ![alt](images/img.png "title") or ![](images/img.png)
  html = html.replace(/!\[([^\]]*)\]\((?:images\/)?([^)"\s]+)(?:\s+"([^"]*)")?\)/g, (match, alt, imgName, title) => {
    const cleanImgName = path.basename(imgName);
    const src = `/blog/images/${slug}/${cleanImgName}`;
    const altText = alt || title || 'Science Divine Blog Image';
    const caption = title ? `<p class="text-xs text-gray-500 mt-2 text-center italic">${title}</p>` : '';
    return `<div class="my-6 text-center"><img src="${src}" alt="${altText}" class="rounded-xl mx-auto max-w-full h-auto shadow-sm border border-gray-100" loading="lazy" />${caption}</div>`;
  });

  // Convert headers (#### down to #)
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
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    let finalUrl = url;
    // If it's a link to sciencedivine.org/<something>, keep it friendly
    if (finalUrl.includes('sciencedivine.org/')) {
      const matchPath = finalUrl.match(/sciencedivine\.org\/([^/]+)\/?$/);
      if (matchPath) {
        finalUrl = `/blog/${matchPath[1]}`;
      }
    }
    return `<a href="${finalUrl}" class="text-[#8B1515] font-semibold underline hover:text-[#701010] transition-colors">${text}</a>`;
  });

  // Convert unordered lists
  const lines = html.split('\n');
  const processedLines = [];
  let inList = false;
  let inOrderedList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check unordered list item
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

  // Convert paragraphs
  const blocks = html.split(/\n\s*\n/);
  const formattedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // If block starts with a tag like <h2, <h3, <h4, <ul, <ol, <div, <blockquote, don't wrap in <p>
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

console.log('Test conversion script ready.');
