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

// Filter pages
const pages = itemMatches
  .map(item => {
    const postType = cleanCdata(extractBetween(item, '<wp:post_type>', '</wp:post_type>'));
    if (postType !== 'page') return null;

    const title = cleanCdata(extractBetween(item, '<title>', '</title>'));
    const link = extractBetween(item, '<link>', '</link>');
    const status = cleanCdata(extractBetween(item, '<wp:status>', '</wp:status>'));
    const postId = extractBetween(item, '<wp:post_id>', '</wp:post_id>');
    const postSlug = cleanCdata(extractBetween(item, '<wp:post_name>', '</wp:post_name>'));
    const pubDate = extractBetween(item, '<pubDate>', '</pubDate>');
    const content = cleanCdata(extractBetween(item, '<content:encoded>', '</content:encoded>'));
    const excerpt = cleanCdata(extractBetween(item, '<excerpt:encoded>', '</excerpt:encoded>'));
    const postParent = extractBetween(item, '<wp:post_parent>', '</wp:post_parent>');

    // Detect builder
    let builder = 'unknown';
    const postmetas = extractAll(item, '<wp:postmeta>', '</wp:postmeta>');
    let seoTitle = '', seoDesc = '', seoFocusKw = '';
    let hasElementorData = false;
    let formIntegrations = [];
    let pageTemplate = '';

    for (const meta of postmetas) {
      const key = cleanCdata(extractBetween(meta, '<wp:meta_key>', '</wp:meta_key>'));
      const val = cleanCdata(extractBetween(meta, '<wp:meta_value>', '</wp:meta_value>'));
      if (key === '_elementor_data' && val.length > 10) hasElementorData = true;
      if (key === '_wp_page_template') pageTemplate = val;
      if (key === '_yoast_wpseo_title') seoTitle = val;
      if (key === '_yoast_wpseo_metadesc') seoDesc = val;
      if (key === '_yoast_wpseo_focuskw') seoFocusKw = val;
      if (key === '_forminator_id' || val.includes('forminator')) formIntegrations.push('Forminator Form');
    }

    if (hasElementorData) {
      builder = 'Elementor';
    } else if (content.includes('<!-- wp:')) {
      builder = 'Gutenberg';
    } else if (content.length < 10) {
      builder = 'empty';
    } else {
      builder = 'Custom HTML';
    }

    // Detect images in content
    const imgMatches = content.match(/src="([^"]+\.(jpg|jpeg|png|webp|gif|svg))"/gi) || [];
    const imageCount = imgMatches.length;

    // Detect forms
    if (content.includes('[forminator_form') || content.includes('wp-block-forminator')) {
      formIntegrations.push('Forminator');
    }
    if (content.includes('[contact-form-7') || content.includes('wpcf7')) {
      formIntegrations.push('Contact Form 7');
    }
    if (content.includes('razorpay') || content.includes('Razorpay')) {
      formIntegrations.push('Razorpay');
    }
    if (content.includes('youtube.com') || content.includes('youtu.be')) {
      formIntegrations.push('YouTube Embed');
    }

    const linkMatch = link.match(/sciencedivine\.org\/([^/]+)\/?$/);
    const oldPath = linkMatch ? `/${linkMatch[1]}` : `/${postSlug}`;

    return { postId, title, postSlug, oldPath, link, status, builder, pageTemplate, pubDate, contentLength: content.length, seoTitle, seoDesc, seoFocusKw, imageCount, formIntegrations, postParent, excerpt: excerpt.slice(0, 200) };
  })
  .filter(Boolean);

console.log(JSON.stringify(pages, null, 2));
