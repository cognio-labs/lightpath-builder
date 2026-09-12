const https = require('https');
const fs = require('fs');

const url = 'https://sciencedivine.org/blog/how-to-reduce-stress-lord-ganesha-lessons';
https.get(url, {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
}, (res) => {
  console.log('Status:', res.statusCode);
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    fs.writeFileSync('scratch/sample_article.html', html, 'utf8');
    console.log('Saved scratch/sample_article.html, length:', html.length);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'none');
    
    // Check for JSON-LD
    const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
    console.log('JSON-LD count:', jsonLdMatches.length);
    jsonLdMatches.forEach((m, idx) => {
      const content = m.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
      try {
        const parsed = JSON.parse(content);
        console.log(`JSON-LD [${idx}]: @type:`, parsed['@type'], 'Keys:', Object.keys(parsed));
        if (parsed['@type'] === 'BlogPosting' || parsed['@type'] === 'Article' || parsed['headline']) {
          console.log('Article details:', {
            headline: parsed.headline,
            datePublished: parsed.datePublished,
            dateModified: parsed.dateModified,
            image: parsed.image,
            author: parsed.author,
            description: parsed.description
          });
        }
      } catch (e) {
        console.log('Error parsing JSON-LD:', e.message);
      }
    });

    // Check article body container
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    console.log('Article tag found?:', !!articleMatch, articleMatch ? articleMatch[1].length : 0);
  });
});
