import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const outputPostsDir = path.join(rootDir, 'output', 'posts');
const blogPostsFilePath = path.join(rootDir, 'src', 'data', 'blogPosts.ts');

const postFolders = fs.readdirSync(outputPostsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log(`Found ${postFolders.length} post folders in output/posts`);

// Read current blogPosts.ts to get existing slugs
const currentBlogPostsContent = fs.readFileSync(blogPostsFilePath, 'utf8');

// Collect all categories across all 91 posts
const allCategories = new Set();
const allTags = new Set();

for (const slug of postFolders) {
  const mdPath = path.join(outputPostsDir, slug, 'index.md');
  if (!fs.existsSync(mdPath)) {
    console.warn(`Missing index.md in ${slug}`);
    continue;
  }
  const content = fs.readFileSync(mdPath, 'utf8');
  
  // Extract categories
  const catMatch = content.match(/categories:\s*\n((?:\s*-\s*[^\n]+\n)+)/);
  if (catMatch) {
    const cats = catMatch[1].split('\n')
      .map(l => l.replace(/^\s*-\s*["']?([^"'\n\r]+)["']?/, '$1').trim())
      .filter(Boolean);
    cats.forEach(c => allCategories.add(c));
  }
  
  // Extract tags
  const tagMatch = content.match(/tags:\s*\n((?:\s*-\s*[^\n]+\n)+)/);
  if (tagMatch) {
    const tags = tagMatch[1].split('\n')
      .map(l => l.replace(/^\s*-\s*["']?([^"'\n\r]+)["']?/, '$1').trim())
      .filter(Boolean);
    tags.forEach(t => allTags.add(t));
  }
}

console.log('Discovered categories:', Array.from(allCategories));
console.log('Total unique tags:', allTags.size);
