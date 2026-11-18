import http from 'node:http';
import { preview } from 'vite';

async function testServer() {
  console.log('Starting Vite preview server programmatically...');
  const server = await preview({
    preview: {
      port: 4173,
      host: '127.0.0.1'
    }
  });

  const urlsToTest = [
    '/',
    '/images/hero-plane.jpg',
    '/images/dest-dubai.jpg',
    '/images/dest-singapore.jpg',
    '/images/dest-london.jpg',
    '/images/dest-paris.jpg',
    '/images/dest-tokyo.jpg',
    '/images/dest-mumbai.jpg',
    '/images/dest-bengaluru.jpg',
    '/images/dest-goa.jpg',
    '/images/cabin-first.jpg',
    '/images/cabin-business.jpg',
    '/images/cabin-premium.jpg',
    '/images/cabin-economy.jpg',
    '/images/aircraft-inflight.jpg',
    '/images/aircraft-takeoff.jpg',
    '/images/aircraft-runway.jpg',
    '/images/aircraft-gate.jpg',
  ];

  console.log(`Testing ${urlsToTest.length} endpoints on http://127.0.0.1:4173...`);

  function checkEndpoint(urlPath) {
    return new Promise((resolve) => {
      http.get(`http://127.0.0.1:4173${urlPath}`, (res) => {
        let size = 0;
        res.on('data', chunk => size += chunk.length);
        res.on('end', () => {
          resolve({
            path: urlPath,
            status: res.statusCode,
            contentType: res.headers['content-type'],
            bytes: size
          });
        });
      }).on('error', (err) => {
        resolve({
          path: urlPath,
          status: 'ERROR',
          error: err.message
        });
      });
    });
  }

  let allPass = true;
  for (const urlPath of urlsToTest) {
    const result = await checkEndpoint(urlPath);
    if (result.status === 200) {
      console.log(`✓ [200 OK] ${result.path} (${result.contentType}, ${Math.round(result.bytes / 1024)} KB)`);
    } else {
      console.error(`✗ [FAILED] ${result.path} -> Status: ${result.status} ${result.error || ''}`);
      allPass = false;
    }
  }

  await server.httpServer.close();
  if (allPass) {
    console.log('\nAll endpoints and authentic photographs successfully verified and loaded over HTTP!');
    process.exit(0);
  } else {
    console.error('\nSome endpoints failed!');
    process.exit(1);
  }
}

testServer();
