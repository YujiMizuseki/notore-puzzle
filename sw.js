// Service Worker - 脳トレパズル・和
const CACHE = 'notore-puzzle-v1';
const ASSETS = [
  './puzzle_app-2.html',
  './manifest.json',
  './00_ニッピコラーゲン100.png',
  './01_トマト.png',
  './02_トウモロコシ.png',
  './03_みかん.png',
  './04_マスカット.png',
  './05_栗.png',
  './06_キウイ.png',
  './07_かぼちゃ.png',
  './08_りんご.png',
  './09_ナス.png',
  './10_スズメ.png',
  './11_金魚.png',
  './12_青い鳥.png',
  './13_蝶.png',
  './14_ヒトデと貝.png',
  './15_猫.png',
  './16_シジュウカラ_X.png',
  './17_てんとう虫.png',
  './18_スニーカー_X.png',
  './19_お茶と大福_X.png',
  './20_麦藁帽子_X.png',
  './21_お弁当_X.png',
  './22_ハーブ.png',
  './23_フィットネス.png',
  './24_ガーデニング.png',
  './25_ひまわり.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
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
