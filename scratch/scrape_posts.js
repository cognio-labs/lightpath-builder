const https = require('https');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../public/blog/images');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

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

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const file = fs.createWriteStream(destPath);
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(destPath);
        });
      } else {
        resolve(null);
      }
    }).on('error', () => resolve(null));
  });
}

function parsePost(html, url, slug) {
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

  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = blogPosting?.headline || (titleMatch ? titleMatch[1] : slug);
  const description = blogPosting?.description || '';
  const datePublished = blogPosting?.datePublished || new Date().toISOString();
  const keywords = blogPosting?.keywords || [];
  const category = blogPosting?.articleSection || 'Spiritual Wisdom';
  const remoteImg = Array.isArray(blogPosting?.image) ? blogPosting.image[0] : (blogPosting?.image || '');

  // Body content HTML
  const bodyMatch = html.match(/<div[^>]*class="[^"]*custom-posts-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
  const contentHtml = bodyMatch ? bodyMatch[1].trim() : '';

  const plainText = contentHtml.replace(/<[^>]+>/g, ' ');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(words / 200)) + ' min read';

  // Format display date: e.g. "Sep 10, 2026"
  let displayDate = 'Sep 10, 2026';
  try {
    const d = new Date(datePublished);
    if (!isNaN(d.getTime())) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      displayDate = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  } catch (e) {}

  return {
    slug,
    oldUrl: url,
    title,
    description,
    datePublished,
    displayDate,
    words,
    readTime,
    category,
    keywords,
    remoteImg,
    contentHtml
  };
}

async function run() {
  const allUrls = JSON.parse(fs.readFileSync('scratch/all_post_urls.json', 'utf8'));
  console.log(`Total URLs in all_post_urls.json: ${allUrls.length}`);
  
  // Specific priority targets mentioned in prompt:
  // Ganesha stress, Overthinking, Vishwakarma Mantra, Hartalika Teej, Durva, Modak, Anant Sutra, Shraddha, 108 Names, Parsva Ekadashi, Radha Krishna, Pitru Paksha
  const priorityPatterns = [
    'how-to-reduce-stress-lord-ganesha-lessons',
    'how-to-stop-overthinking-bhagavad-gita',
    'how-to-control-anxiety',
    'why-14-knots-tied-anant-sutra-anant-chaturdashi',
    'can-women-perform-shraddha-pitru-paksha',
    'vishwakarma-puja-mantra',
    'hartalika-teej-2026-fasting-rules',
    'why-modak-is-ganeshas-favourite-sweet',
    '108-names-of-lord-ganesha-with-meaning',
    'vishwakarma-puja-2026-muhurat',
    'parsva-ekadashi-2026',
    'radha-krishna-marriage-story',
    'why-durva-is-offered-to-ganesha',
    'pitru-paksha-2026',
    'how-to-do-vishwakarma-puja-in-office-2026',
    'navratri-vrat-rules-2026',
    'hartalika-teej-puja-items-list-2026',
    'why-ganesh-visarjan-is-done-spiritual-meaning'
  ];

  // Select URLs: page 1 and page 2 first (first 30 URLs) which contain all priority posts
  const selectedUrls = allUrls.slice(0, 36);
  console.log(`Selected ${selectedUrls.length} posts for migration`);

  const migratedPosts = [];

  for (let i = 0; i < selectedUrls.length; i++) {
    const rawUrl = selectedUrls[i];
    const fullUrl = rawUrl.startsWith('http') ? rawUrl : 'https://sciencedivine.org' + rawUrl;
    const slug = rawUrl.replace('/blog/', '').replace(/\/$/, '');
    
    console.log(`[${i+1}/${selectedUrls.length}] Fetching ${slug}...`);
    try {
      const res = await fetchUrl(fullUrl);
      if (res.status === 200) {
        const post = parsePost(res.data, fullUrl, slug);
        
        // Download image
        if (post.remoteImg) {
          const imgExt = post.remoteImg.includes('.webp') ? '.webp' : (post.remoteImg.includes('.png') ? '.png' : '.jpg');
          const localImgName = `${slug}${imgExt}`;
          const localImgPath = path.join(imgDir, localImgName);
          await downloadImage(post.remoteImg, localImgPath);
          post.image = `/blog/images/${localImgName}`;
        } else {
          post.image = '/words-of-divine-wisdom.png';
        }

        migratedPosts.push(post);
        console.log(`  ✓ Saved ${post.title.substring(0, 40)}... (${post.words} words, ${post.image})`);
      } else {
        console.log(`  ✗ Failed with status ${res.status}`);
      }
    } catch (e) {
      console.log(`  ✗ Error: ${e.message}`);
    }
  }

  console.log(`Successfully migrated ${migratedPosts.length} posts!`);
  fs.writeFileSync('scratch/migrated_posts.json', JSON.stringify(migratedPosts, null, 2), 'utf8');
}

run();
