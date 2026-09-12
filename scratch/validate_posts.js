const fs = require('fs');
const posts = require('./migrated_posts.json');

console.log(`Checking ${posts.length} posts...`);
let errors = 0;

posts.forEach((p, i) => {
  if (!p.slug) { console.error(`Post ${i} missing slug`); errors++; }
  if (!p.oldUrl) { console.error(`Post ${i} missing oldUrl`); errors++; }
  if (!p.title) { console.error(`Post ${i} missing title`); errors++; }
  if (!p.description) { console.error(`Post ${i} missing description`); errors++; }
  if (!p.contentHtml || p.contentHtml.length < 100) { console.error(`Post ${i} missing/short contentHtml (${p.contentHtml?.length})`); errors++; }
  if (!p.datePublished) { console.error(`Post ${i} missing datePublished`); errors++; }
  if (!p.displayDate) { console.error(`Post ${i} missing displayDate`); errors++; }
  if (!p.words || p.words < 50) { console.error(`Post ${i} low word count: ${p.words}`); errors++; }
  if (!p.readTime) { console.error(`Post ${i} missing readTime`); errors++; }
  if (!p.image || !fs.existsSync('./public' + p.image)) { console.error(`Post ${i} missing image: ${p.image}`); errors++; }
});

console.log(`Validation complete. Errors found: ${errors}`);
