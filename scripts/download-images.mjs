import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const IMAGES = [
  {
    name: 'hero-plane.jpg',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80'
  },
  {
    name: 'aircraft-inflight.jpg',
    url: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'aircraft-runway.jpg',
    url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'aircraft-takeoff.jpg',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'aircraft-gate.jpg',
    url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'dest-dubai.jpg',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'dest-singapore.jpg',
    url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'dest-london.jpg',
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'dest-paris.jpg',
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'dest-tokyo.jpg',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'dest-mumbai.jpg',
    url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'dest-bengaluru.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vidhana_Soudha_Bangalore.jpg?width=1000'
  },
  {
    name: 'dest-goa.jpg',
    url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'airport-terminal.jpg',
    url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'airport-lounge.jpg',
    url: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'cabin-first.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Emirates_First_Class_Suite.jpg?width=1200'
  },
  {
    name: 'cabin-business.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Emirates_Boeing_777_Business_cabin.jpg?width=1200'
  },
  {
    name: 'cabin-premium.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Air_New_Zealand_Premium_Economy_Spaceseats.jpg?width=1200'
  },
  {
    name: 'cabin-economy.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/United_Airlines_B757-200_economy_class.jpg?width=1200'
  },
  {
    name: 'promo-sunset-wing.jpg',
    url: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'promo-window-view.jpg',
    url: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80'
  }
];

const destDir = path.resolve('public/images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    function get(currentUrl, redirectCount = 0) {
      if (redirectCount > 5) {
        return reject(new Error(`Too many redirects for ${url}`));
      }
      const req = https.get(currentUrl, {
        headers: {
          'User-Agent': 'SkyVoyageAirlineApp/1.0 (Educational Airline Booking Project; contact@skyvoyage.internal)'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location, redirectCount + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${currentUrl}`));
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close(() => {
            const size = fs.statSync(destPath).size;
            resolve(size);
          });
        });
      });
      req.on('error', reject);
      req.setTimeout(30000, () => {
        req.destroy();
        reject(new Error(`Timeout fetching ${currentUrl}`));
      });
    }
    get(url);
  });
}

async function main() {
  console.log(`Starting download of ${IMAGES.length} authentic verified photographs...`);
  for (const item of IMAGES) {
    const target = path.join(destDir, item.name);
    try {
      const size = await downloadFile(item.url, target);
      console.log(`✓ Downloaded ${item.name} (${Math.round(size / 1024)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.name} from ${item.url}:`, err.message);
    }
  }
  console.log('Finished image download process.');
}

main();
