const fs = require('fs'); const html=fs.readFileSync('scratch/volunteer-http.html','utf8');console.log([...html.matchAll(/href="([^"]+\.css[^" ]*)"/g)].map(m=>m[1]).join('\n'));
