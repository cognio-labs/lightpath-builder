const fs = require('fs');
const html = fs.readFileSync('scratch/sample_article.html', 'utf8');

// Let's search for headings or paragraphs
const h2s = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/g) || [];
console.log('H2 tags count:', h2s.length);
h2s.slice(0, 10).forEach(h => console.log(' ', h));

// Let's check for main content container
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
console.log('Main tag found?:', !!mainMatch, mainMatch ? mainMatch[1].length : 0);

// Look for class names
const proseMatch = html.match(/class="[^"]*(?:prose|post-content|article-content|entry-content)[^"]*"/g) || [];
console.log('Prose classes found:', proseMatch);

// Look for streaming chunks in article page
const chunks = [];
const regex = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
let m;
while ((m = regex.exec(html)) !== null) {
  chunks.push(m[1]);
}
console.log('Found next_f chunks in article:', chunks.length);
fs.writeFileSync('scratch/article_chunks.txt', chunks.join('\n---\n'), 'utf8');
console.log('Saved scratch/article_chunks.txt');
