const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

function parseArticlePage(html, postUrl) {
  // Extract JSON-LD BlogPosting
  const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  let blogPosting = null;
  for (const m of jsonLdMatches) {
    const raw = m.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    try {
      const parsed = JSON.parse(raw);
      if (parsed['@type'] === 'BlogPosting') {
        blogPosting = parsed;
        break;
      }
    } catch (e) {}
  }

  // Fallback title / desc
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = blogPosting?.headline || (titleMatch ? titleMatch[1] : '');
  const desc = blogPosting?.description || '';
  const datePublished = blogPosting?.datePublished || '';
  const keywords = blogPosting?.keywords || [];
  const articleSection = blogPosting?.articleSection || 'Spiritual Wisdom';
  const featuredImageUrl = Array.isArray(blogPosting?.image) ? blogPosting.image[0] : (blogPosting?.image || '');

  // Extract HTML body
  const bodyMatch = html.match(/<div[^>]*class="[^"]*custom-posts-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
  const contentHtml = bodyMatch ? bodyMatch[1].trim() : '';

  // Calculate read time
  const plainText = contentHtml.replace(/<[^>]+>/g, ' ');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(words / 200)) + ' min read';

  return {
    url: postUrl,
    title,
    description: desc,
    datePublished,
    readTime,
    words,
    category: articleSection,
    keywords,
    featuredImageUrl,
    contentHtml
  };
}

async function run() {
  const p1 = await fetchUrl('https://sciencedivine.org/blog');
  const hrefs = (p1.data.match(/href="\/blog\/[^"]+"/g) || [])
    .map(h => h.replace('href="', '').replace('"', ''))
    .filter(h => !h.includes('/page/') && !h.includes('/category/') && !h.includes('/tag/') && !h.includes('/author/'));
  const uniqueHrefs = [...new Set(hrefs)];
  console.log(`Page 1 found ${uniqueHrefs.length} posts:`);
  
  const results = [];
  for (const h of uniqueHrefs.slice(0, 3)) {
    console.log('Fetching:', h);
    const postRes = await fetchUrl('https://sciencedivine.org' + h);
    const parsed = parseArticlePage(postRes.data, 'https://sciencedivine.org' + h);
    console.log('Parsed:', {
      title: parsed.title,
      date: parsed.datePublished,
      readTime: parsed.readTime,
      words: parsed.words,
      hasContent: parsed.contentHtml.length > 0,
      featuredImageUrl: parsed.featuredImageUrl
    });
    results.push(parsed);
  }
}

run();
