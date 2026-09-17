import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const publicBlogImagesDir = path.join(rootDir, 'public', 'blog', 'images');
const contentBlogsDir = path.join(rootDir, 'src', 'content', 'blogs');
const blogPostsFilePath = path.join(rootDir, 'src', 'data', 'blogPosts.ts');

const blogPostsContent = fs.readFileSync(blogPostsFilePath, 'utf8');

// Match all posts from TS file
const postsMatch = blogPostsContent.match(/export const BLOG_POSTS:\s*BlogPost\[\]\s*=\s*(\[[\s\S]*\]);?\s*$/);
if (!postsMatch) {
  console.error('❌ Could not parse BLOG_POSTS from blogPosts.ts');
  process.exit(1);
}

const posts = JSON.parse(postsMatch[1]);
console.log(`✅ Successfully loaded ${posts.length} blog posts from blogPosts.ts`);

let missingImages = 0;
let checkedImages = 0;

for (const post of posts) {
  // Check cover image
  if (post.image && post.image.startsWith('/')) {
    const localImgPath = path.join(rootDir, 'public', post.image);
    checkedImages++;
    if (!fs.existsSync(localImgPath)) {
      console.warn(`⚠️ Missing cover image for ${post.slug}: ${post.image}`);
      missingImages++;
    }
  }

  // Check inline images in contentHtml
  const imgTags = post.contentHtml.match(/src="(\/blog\/images\/[^"]+)"/g) || [];
  for (const tag of imgTags) {
    const src = tag.match(/src="([^"]+)"/)[1];
    const localImgPath = path.join(rootDir, 'public', src);
    checkedImages++;
    if (!fs.existsSync(localImgPath)) {
      console.warn(`⚠️ Missing inline image in ${post.slug}: ${src}`);
      missingImages++;
    }
  }
}

console.log(`🔎 Total image references verified: ${checkedImages}`);
console.log(`🔎 Missing images: ${missingImages}`);

// Verify src/content/blogs/ folders
const contentFolders = fs.readdirSync(contentBlogsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log(`📂 Total markdown directories in src/content/blogs/: ${contentFolders.length}`);

if (missingImages === 0) {
  console.log('🎉 100% of images verified successfully with ZERO broken references!');
}
