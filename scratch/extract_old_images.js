const fs = require('fs');
const path = 'C:/Users/PC/.gemini/antigravity-ide/brain/4a404a66-56ad-42ca-a15e-b9a0a492a896/.system_generated/steps/373/content.md';

if (fs.existsSync(path)) {
  const html = fs.readFileSync(path, 'utf8');
  const matches = html.match(/https:\/\/sciencedivine\.org\/wp-content\/uploads\/[^\s"'>]+/g) || [];
  const unique = [...new Set(matches)];
  console.log('Found wp-content images:', unique.length);
  unique.forEach(img => console.log(img));
} else {
  console.log('File not found:', path);
}
