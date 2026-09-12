const fs = require('fs');
const html = fs.readFileSync('scratch/sample_article.html', 'utf8');

const match = html.match(/<div[^>]*class="[^"]*custom-posts-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
if (match) {
  console.log('Found custom-posts-content! Length:', match[1].length);
  fs.writeFileSync('scratch/extracted_article.html', match[1], 'utf8');
  console.log('Saved scratch/extracted_article.html');
  console.log('Preview:', match[1].substring(0, 500));
} else {
  console.log('Not matched exactly with div, finding by index');
  const idx = html.indexOf('custom-posts-content');
  console.log('Index:', idx);
}
