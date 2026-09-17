import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const outputPostsDir = path.join(rootDir, 'output', 'posts');
const blogPostsFilePath = path.join(rootDir, 'src', 'data', 'blogPosts.ts');

const postFolders = fs.readdirSync(outputPostsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const blogPostsCode = fs.readFileSync(blogPostsFilePath, 'utf8');

// Use a simple parser or eval/import to get existing posts
// Since blogPosts.ts is TypeScript, let's extract the slugs with regex
const existingSlugs = [];
const slugRegex = /"slug":\s*"([^"]+)"/g;
let match;
while ((match = slugRegex.exec(blogPostsCode)) !== null) {
  if (!existingSlugs.includes(match[1])) {
    existingSlugs.push(match[1]);
  }
}

console.log('Existing slugs in blogPosts.ts (' + existingSlugs.length + '):', existingSlugs);

const overlaps = postFolders.filter(s => existingSlugs.includes(s));
console.log('Overlapping slugs count:', overlaps.length);
console.log('Overlapping slugs:', overlaps);
