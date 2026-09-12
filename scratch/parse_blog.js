const fs = require('fs');

const html = fs.readFileSync('scratch/blog_page_1.html', 'utf8');

// Find all links to articles: /blog/...
const hrefMatches = html.match(/href="\/blog\/[^"]+"/g) || [];
console.log('Unique blog hrefs:', [...new Set(hrefMatches)]);

// Check chunks for posts data
const chunks = fs.readFileSync('scratch/chunks.txt', 'utf8');
const slugMatches = chunks.match(/"slug":"([^"]+)"/g) || [];
console.log('Unique slugs in chunks:', [...new Set(slugMatches)]);

const titleMatches = chunks.match(/"title":"([^"]+)"/g) || [];
console.log('Title count in chunks:', titleMatches.length);
titleMatches.slice(0, 15).forEach(t => console.log(' ', t));
