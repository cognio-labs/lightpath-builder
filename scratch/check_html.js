const posts = require('./migrated_posts.json');
posts.slice(0, 5).forEach(p => {
  const match = p.contentHtml.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (match) {
    const src = match[1];
    console.log(p.slug);
    console.log('  remoteImg:', p.remoteImg);
    console.log('  inlineSrc:', decodeURIComponent(src));
  }
});
