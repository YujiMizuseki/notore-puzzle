// Service Worker - 脳トレパズル・NIPPI
const CACHE = 'notore-puzzle-v3';
const ASSETS = [
  './puzzle_app-2.html',
  './manifest.json',
  './00_%E3%83%8B%E3%83%83%E3%83%94%E3%82%B3%E3%83%A9%E3%83%BC%E3%82%B2%E3%83%B3100.png',
  './01_%E3%83%88%E3%83%9E%E3%83%88.png',
  './02_%E3%83%88%E3%82%A6%E3%83%A2%E3%83%AD%E3%82%B3%E3%82%B7.png',
  './03_%E3%81%BF%E3%81%8B%E3%82%93.png',
  './04_%E3%83%9E%E3%82%B9%E3%82%AB%E3%83%83%E3%83%88.png',
  './05_%E6%A0%97.png',
  './06_%E3%82%AD%E3%82%A6%E3%82%A4.png',
  './07_%E3%81%8B%E3%81%BC%E3%81%A1%E3%82%83.png',
  './08_%E3%82%8A%E3%82%93%E3%81%94.png',
  './09_%E3%83%8A%E3%82%B9.png',
  './10_%E3%82%B9%E3%82%BA%E3%83%A1.png',
  './11_%E9%87%91%E9%AD%9A.png',
  './12_%E9%9D%92%E3%81%84%E9%B3%A5.png',
  './13_%E8%9D%B6.png',
  './14_%E3%83%92%E3%83%88%E3%83%87%E3%81%A8%E8%B2%9D.png',
  './15_%E7%8C%AB.png',
  './16_%E3%82%B7%E3%82%B8%E3%83%A5%E3%82%A6%E3%82%AB%E3%83%A9_X.png',
  './17_%E3%81%A6%E3%82%93%E3%81%A8%E3%81%86%E8%99%AB.png',
  './18_%E3%82%B9%E3%83%8B%E3%83%BC%E3%82%AB%E3%83%BC_X.png',
  './19_%E3%81%8A%E8%8C%B6%E3%81%A8%E5%A4%A7%E7%A6%8F_X.png',
  './20_%E9%BA%A6%E8%97%81%E5%B8%BD%E5%AD%90_X.png',
  './21_%E3%81%8A%E5%BC%81%E5%BD%93_X.png',
  './22_%E3%83%8F%E3%83%BC%E3%83%96.png',
  './23_%E3%83%95%E3%82%A3%E3%83%83%E3%83%88%E3%83%8D%E3%82%B9.png',
  './24_%E3%82%AC%E3%83%BC%E3%83%87%E3%83%8B%E3%83%B3%E3%82%B0.png',
  './25_%E3%81%B2%E3%81%BE%E3%82%8F%E3%82%8A.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      // 個別にキャッシュ（1つ失敗しても他は続行）
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(err => console.warn('cache miss:', url, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
