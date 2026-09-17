import http from 'http';

function checkRoute(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          hasTitle: data.includes('Science Divine') || data.includes('<title>'),
          hasImages: data.includes('/blog/images/'),
          hasSchema: data.includes('BlogPosting') || data.includes('schema.org'),
          dataLength: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ path: urlPath, error: err.message });
    });
  });
}

async function main() {
  const routesToTest = [
    '/blog',
    '/blog/7-chakras-of-body',
    '/blog/ajna-chakra',
    '/blog/benefits-of-meditation',
    '/blog/how-to-do-vishwakarma-puja-in-office-2026',
    '/category/chakras',
    '/category/yoga-pranayama'
  ];

  console.log('Testing routes on local server:');
  for (const r of routesToTest) {
    const res = await checkRoute(r);
    console.log(JSON.stringify(res, null, 2));
  }
}

main();
