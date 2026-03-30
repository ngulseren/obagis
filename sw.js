// OBAGIS Service Worker v1.0
const CACHE_NAME = 'obagis-cache-v1';
const OFFLINE_URL = 'offline.html';

const PRECACHE_URLS = [
  './',
  './index.html',
  './style.css',
  './layout.js',
  './manifest.json',
  './offline.html',
  './edevlet_rehberi.html',
  './mhrs_rehberi.html',
  './enabiz_rehberi.html',
  './mobil_bankacilik_rehberi.html',
  './whatsapp_rehberi.html',
  './google_maps_rehberi.html',
  './diyanet_rehberi.html',
  './youtube_rehberi.html',
  './ptt_kargo_rehberi.html',
  './cimer_rehberi.html',
  './ai_sesli_yonlendirme.html',
  './kolay_dil_brosur_seti.html',
  './drama_etkinlik_kartlari.html',
  './dijital_etik_modulu.html',
  './sonuc-raporu.html',
  './tanitim_ve_sosyal_medya.html',
  './egitim_programi_ve_takvim.html',
  './muhtar_koordinasyon_ve_duyuru.html',
  './akran_rehberlik_modeli.html',
  './olcum_ve_degerlendirme_araclari.html',
  './kapanis_raporu_ve_surdurulebilirlik.html',
  './ilce_paylasim_cikti_dosyasi.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Oswald:wght@500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install: cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: network-first for HTML, cache-first for assets
self.addEventListener('fetch', event => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // HTML pages: network-first
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          return caches.match(request).then(cached => cached || caches.match(OFFLINE_URL));
        })
    );
    return;
  }

  // Other assets: cache-first
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Return nothing for failed non-HTML requests
      });
    })
  );
});
