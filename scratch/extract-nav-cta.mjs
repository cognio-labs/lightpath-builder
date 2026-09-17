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

const itemMatches = extractAll(xml, '<item>', '</item>');

// --- NAV MENU ITEMS ---
const navItems = itemMatches
  .filter(item => cleanCdata(extractBetween(item, '<wp:post_type>', '</wp:post_type>')) === 'nav_menu_item')
  .map(item => {
    const title = cleanCdata(extractBetween(item, '<title>', '</title>'));
    const postmetas = extractAll(item, '<wp:postmeta>', '</wp:postmeta>');
    let url = '', menuItemType = '', parentId = '', classes = '', menuOrder = '';
    menuOrder = extractBetween(item, '<wp:menu_order>', '</wp:menu_order>');
    for (const meta of postmetas) {
      const key = cleanCdata(extractBetween(meta, '<wp:meta_key>', '</wp:meta_key>'));
      const val = cleanCdata(extractBetween(meta, '<wp:meta_value>', '</wp:meta_value>'));
      if (key === '_menu_item_url') url = val;
      if (key === '_menu_item_type') menuItemType = val;
      if (key === '_menu_item_menu_item_parent') parentId = val;
      if (key === '_menu_item_classes') classes = val;
    }
    const cats = extractAll(item, '<category', '</category>');
    let menuName = '';
    for (const cat of cats) {
      if (cat.includes('domain="nav_menu"')) {
        menuName = cleanCdata(cat.replace(/<[^>]+>/g, '').trim());
      }
    }
    return { title, url, menuItemType, parentId, classes, menuOrder: parseInt(menuOrder) || 0, menuName, postId: extractBetween(item, '<wp:post_id>', '</wp:post_id>') };
  });

// Group nav items by menu
const menus = {};
for (const item of navItems) {
  if (!menus[item.menuName]) menus[item.menuName] = [];
  menus[item.menuName].push(item);
}

console.log('=== NAV MENUS ===');
for (const [name, items] of Object.entries(menus)) {
  console.log(`\nMenu: "${name}" (${items.length} items)`);
  const sorted = items.sort((a, b) => a.menuOrder - b.menuOrder);
  for (const item of sorted) {
    console.log(`  [order:${item.menuOrder}] "${item.title}" => ${item.url} [parent:${item.parentId}]`);
  }
}

// --- CTA BUTTONS extraction from key pages ---
const pages = itemMatches
  .filter(item => cleanCdata(extractBetween(item, '<wp:post_type>', '</wp:post_type>')) === 'page'
    && cleanCdata(extractBetween(item, '<wp:status>', '</wp:status>')) === 'publish')
  .map(item => {
    const title = cleanCdata(extractBetween(item, '<title>', '</title>'));
    const slug = cleanCdata(extractBetween(item, '<wp:post_name>', '</wp:post_name>'));
    const content = cleanCdata(extractBetween(item, '<content:encoded>', '</content:encoded>'));

    // Extract all <a href links
    const linkMatches = content.match(/href="([^"]+)"/g) || [];
    const links = [...new Set(linkMatches.map(m => m.replace('href="', '').replace('"', '')))];
    const internalLinks = links.filter(l => l.includes('sciencedivine.org') || l.startsWith('/'));
    const externalLinks = links.filter(l => !l.includes('sciencedivine.org') && !l.startsWith('/') && l.startsWith('http'));

    // Extract buttons (Elementor button text)
    const buttonMatches = content.match(/data-widget_type="button[^>]*>[\s\S]*?<\/div>/g) || [];

    return { title, slug, internalLinks: internalLinks.slice(0, 20), externalLinks: externalLinks.slice(0, 10) };
  });

console.log('\n\n=== KEY PAGE INTERNAL LINK ANALYSIS ===');
const keyPageSlugs = ['home-new-march', 'about-sakshi-shree', 'courses', 'contact', 'get-solutions-for', 'personal-session', 'design-your-destiny', 'sanjeevni-kriya', 'mind-power-meditation', 'the-science-of-joyful-living', 'initiatives'];
for (const p of pages) {
  if (keyPageSlugs.includes(p.slug)) {
    console.log(`\nPage: ${p.title} (${p.slug})`);
    console.log('  Internal links:', p.internalLinks.join(', '));
    console.log('  External links:', p.externalLinks.join(', '));
  }
}
