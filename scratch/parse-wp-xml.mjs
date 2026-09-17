import fs from 'fs';

const xml = fs.readFileSync('sciencedivine.WordPress.2026-09-16.xml', 'utf8');

function extractBetween(str, open, close) {
  const start = str.indexOf(open);
  if (start === -1) return '';
  const end = str.indexOf(close, start + open.length);
  if (end === -1) return '';
  return str.slice(start + open.length, end).trim();
}

function extractAll(str, open, close) {
  const results = [];
  let idx = 0;
  while (true) {
    const start = str.indexOf(open, idx);
    if (start === -1) break;
    const end = str.indexOf(close, start + open.length);
    if (end === -1) break;
    results.push(str.slice(start + open.length, end).trim());
    idx = end + close.length;
  }
  return results;
}

function cleanCdata(str) {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

// Get all items
const itemMatches = extractAll(xml, '<item>', '</item>');
console.log(`Total items: ${itemMatches.length}`);

// Parse each item
const allItems = itemMatches.map(item => {
  const postType = cleanCdata(extractBetween(item, '<wp:post_type>', '</wp:post_type>'));
  const title = cleanCdata(extractBetween(item, '<title>', '</title>'));
  const link = extractBetween(item, '<link>', '</link>');
  const status = cleanCdata(extractBetween(item, '<wp:status>', '</wp:status>'));
  const postId = extractBetween(item, '<wp:post_id>', '</wp:post_id>');
  const postSlug = cleanCdata(extractBetween(item, '<wp:post_name>', '</wp:post_name>'));
  const pubDate = extractBetween(item, '<pubDate>', '</pubDate>');
  const content = cleanCdata(extractBetween(item, '<content:encoded>', '</content:encoded>'));
  const excerpt = cleanCdata(extractBetween(item, '<excerpt:encoded>', '</excerpt:encoded>'));
  const postParent = extractBetween(item, '<wp:post_parent>', '</wp:post_parent>');
  const menuOrder = extractBetween(item, '<wp:menu_order>', '</wp:menu_order>');
  
  // Detect page builder from content
  let builder = 'unknown';
  if (content.includes('elementor') || content.includes('[et_pb_') || item.includes('wp:postmeta') && item.includes('_elementor_data')) builder = 'Elementor';
  if (content.includes('<!-- wp:') || content.includes('<!-- /wp:')) builder = 'Gutenberg';
  if (content.includes('[vc_row]') || content.includes('[vc_column]')) builder = 'WPBakery';
  if (content.includes('class="wp-block-')) builder = 'Gutenberg';
  if (builder === 'unknown' && content.length > 50) builder = 'Custom HTML';
  if (content.length === 0) builder = 'empty';

  // Check postmeta for elementor
  const postmetas = extractAll(item, '<wp:postmeta>', '</wp:postmeta>');
  for (const meta of postmetas) {
    const key = cleanCdata(extractBetween(meta, '<wp:meta_key>', '</wp:meta_key>'));
    if (key === '_elementor_data' || key === '_elementor_version') {
      builder = 'Elementor';
      break;
    }
    if (key === '_wp_page_template') {
      const val = cleanCdata(extractBetween(meta, '<wp:meta_value>', '</wp:meta_value>'));
      if (val && val !== 'default') builder = `Custom Template: ${val}`;
    }
  }

  return { postId, postType, title, link, status, postSlug, pubDate, content: content.slice(0, 500), contentLength: content.length, builder, excerpt: excerpt.slice(0, 200), postParent, menuOrder };
});

// Group by post type
const grouped = {};
for (const item of allItems) {
  if (!grouped[item.postType]) grouped[item.postType] = [];
  grouped[item.postType].push(item);
}

console.log('\n=== POST TYPES BREAKDOWN ===');
for (const [type, items] of Object.entries(grouped)) {
  console.log(`${type}: ${items.length} items`);
}

// Just pages
const pages = grouped['page'] || [];
console.log(`\n=== PAGES (${pages.length} total) ===`);
for (const p of pages) {
  console.log(`[${p.status}] [${p.builder}] "${p.title}" => /${p.postSlug}`);
}
