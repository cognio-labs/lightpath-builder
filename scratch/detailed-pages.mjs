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
const pages = itemMatches
  .filter(item => cleanCdata(extractBetween(item, '<wp:post_type>', '</wp:post_type>')) === 'page')
  .map(item => {
    const title = cleanCdata(extractBetween(item, '<title>', '</title>'));
    const status = cleanCdata(extractBetween(item, '<wp:status>', '</wp:status>'));
    const postSlug = cleanCdata(extractBetween(item, '<wp:post_name>', '</wp:post_name>'));
    const content = cleanCdata(extractBetween(item, '<content:encoded>', '</content:encoded>'));
    const postmetas = extractAll(item, '<wp:postmeta>', '</wp:postmeta>');

    let seoTitle = '', seoDesc = '', seoFocusKw = '';
    let hasElementorData = false;
    let formDetected = [];
    let hasRazorpay = false;
    let hasUdemyLink = false;
    let hasGooglePlayLink = false;
    let hasYouTubeEmbed = false;
    let hasWooCommerce = false;

    for (const meta of postmetas) {
      const key = cleanCdata(extractBetween(meta, '<wp:meta_key>', '</wp:meta_key>'));
      const val = cleanCdata(extractBetween(meta, '<wp:meta_value>', '</wp:meta_value>'));
      if (key === '_elementor_data' && val.length > 20) hasElementorData = true;
      if (key === '_yoast_wpseo_title') seoTitle = val;
      if (key === '_yoast_wpseo_metadesc') seoDesc = val;
      if (key === '_yoast_wpseo_focuskw') seoFocusKw = val;
    }

    const builder = hasElementorData ? 'Elementor' : (content.includes('<!-- wp:') ? 'Gutenberg' : (content.length < 5 ? 'empty' : 'Custom HTML'));

    if (content.includes('[forminator_form')) formDetected.push('Forminator Form');
    if (content.includes('[contact-form-7')) formDetected.push('Contact Form 7');
    if (content.includes('razorpay') || content.includes('rzp.io')) hasRazorpay = true;
    if (content.includes('udemy.com')) hasUdemyLink = true;
    if (content.includes('play.google.com')) hasGooglePlayLink = true;
    if (content.includes('youtube.com/embed') || content.includes('youtu.be')) hasYouTubeEmbed = true;
    if (content.includes('woocommerce') || content.includes('[woocommerce')) hasWooCommerce = true;

    // Detect images
    const imgRefs = (content.match(/wp-content\/uploads\/[^"')\s]+/g) || []).filter((v, i, a) => a.indexOf(v) === i);

    return { title, status, postSlug, builder, seoTitle, seoDesc, seoFocusKw, formDetected, hasRazorpay, hasUdemyLink, hasGooglePlayLink, hasYouTubeEmbed, hasWooCommerce, wpImageCount: imgRefs.length, contentLength: content.length };
  });

// Print detailed findings
console.log('DETAILED PAGE ANALYSIS\n');
for (const p of pages) {
  const flags = [];
  if (p.formDetected.length > 0) flags.push(`Forms:${p.formDetected.join(',')}`);
  if (p.hasRazorpay) flags.push('Razorpay');
  if (p.hasUdemyLink) flags.push('Udemy');
  if (p.hasGooglePlayLink) flags.push('Google Play');
  if (p.hasYouTubeEmbed) flags.push('YouTube');
  if (p.hasWooCommerce) flags.push('WooCommerce');
  
  console.log(`[${p.status.toUpperCase().padEnd(9)}] [${p.builder.padEnd(11)}] "${p.title}"`);
  console.log(`    slug: /${p.postSlug}`);
  if (p.seoTitle) console.log(`    seo_title: ${p.seoTitle}`);
  if (p.seoDesc) console.log(`    seo_desc: ${p.seoDesc.slice(0, 120)}`);
  if (p.seoFocusKw) console.log(`    focus_kw: ${p.seoFocusKw}`);
  console.log(`    content_len: ${p.contentLength} | images: ${p.wpImageCount} | flags: ${flags.join(' | ') || 'none'}`);
  console.log('');
}
