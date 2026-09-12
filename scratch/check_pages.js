const https = require('https');

function fetchPage(pageNum) {
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
        resolve({ pageNum, status: res.statusCode, count: uniqueHrefs.length, hrefs: uniqueHrefs });
      });
    }).on('error', (err) => resolve({ pageNum, error: err.message }));
  });
}

async function test() {
  console.log('Testing pages 1, 2, 3, 69...');
  for (const p of [1, 2, 3, 69]) {
    const res = await fetchPage(p);
    console.log(`Page ${p}: status ${res.status}, post count: ${res.count}`);
    if (res.hrefs) console.log('  Sample hrefs:', res.hrefs.slice(0, 3));
  }
}

test();
