const https = require('https');
const fs = require('fs');

https.get('https://sciencedivine.org/blog', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    fs.writeFileSync('scratch/blog_page_1.html', html, 'utf8');
    console.log('Saved scratch/blog_page_1.html, size:', html.length);
    
    // Check for NEXT DATA
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (nextDataMatch) {
      console.log('Found __NEXT_DATA__!');
      const data = JSON.parse(nextDataMatch[1]);
      fs.writeFileSync('scratch/next_data.json', JSON.stringify(data, null, 2), 'utf8');
      console.log('Saved scratch/next_data.json');
    } else {
      console.log('No __NEXT_DATA__, searching for JSON or chunks');
      // check self.__next_f
      const chunks = [];
      const regex = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
      let m;
      while ((m = regex.exec(html)) !== null) {
        chunks.push(m[1]);
      }
      console.log('Found next_f chunks:', chunks.length);
      fs.writeFileSync('scratch/chunks.txt', chunks.join('\n---\n'), 'utf8');
    }
  });
});
