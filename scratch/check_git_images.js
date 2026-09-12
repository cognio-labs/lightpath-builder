const { execSync } = require('child_process');

try {
  const commits = execSync('git log --oneline').toString().split('\n');
  console.log('Commits count:', commits.length);
  for (const commit of commits.slice(0, 10)) {
    const hash = commit.split(' ')[0];
    if (!hash) continue;
    try {
      const content = execSync(`git show ${hash}:src/app/page.tsx`).toString();
      const matches = content.match(/[\/A-Za-z0-9_\-]+\.(png|jpg|webp)/g);
      console.log('Commit:', commit);
      console.log('  Hero/Images found:', [...new Set(matches)]);
    } catch (e) {}
  }
} catch (e) {
  console.error(e);
}
