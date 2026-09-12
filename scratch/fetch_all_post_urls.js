const https = require('https');
const fs = require('fs');

function fetchPageHrefs(pageNum) {
  return new Promise((resolve) => {
    const url = pageNum === 1 ? 'https://sciencedivine.org/blog' : `https://sciencedivine.org/blog/page/${pageNum}`;
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        const hrefs = (html.match(/href="\/blog\/[^"]+"/g) || [])
          .map(h => h.replace('href="', '').replace('"', ''))
          .filter(h => !h.includes('/page/') && !h.includes('/category/') && !h.includes('/tag/') && !h.includes('/author/'));
        const uniqueHrefs = [...new Set(hrefs)];
        resolve({ pageNum, status: res.statusCode, hrefs: uniqueHrefs });
      });
    }).on('error', (err) => resolve({ pageNum, status: 500, error: err.message, hrefs: [] }));
  });
}

async function run() {
  console.log('Fetching post URLs across pages 1 to 69 in batches...');
  const allHrefs = [];
  const batchSize = 5;
  for (let i = 1; i <= 69; i += batchSize) {
    const batch = [];
    for (let j = i; j < i + batchSize && j <= 69; j++) {
      batch.push(fetchPageHrefs(j));
    }
    const results = await Promise.all(batch);
    for (const r of results) {
      console.log(`Page ${r.pageNum}: ${r.status}, found ${r.hrefs.length} posts`);
      allHrefs.push(...r.hrefs);
    }
  }
  const unique = [...new Set(allHrefs)];
  console.log(`Total unique post URLs found: ${unique.length}`);
  fs.writeFileSync('scratch/all_post_urls.json', JSON.stringify(unique, null, 2), 'utf8');
}

run();
