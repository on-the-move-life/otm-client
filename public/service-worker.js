  /* eslint-disable no-restricted-globals */

const CACHE_NAME = 'your-app-cache-v1';
const APP_SHELL = [
  "/",
"/index.html",
"/static/js/main.chunk.js",
"/static/js/0.chunk.js",
"/static/js/bundle.js",
"/static/css/main.chunk.css",
"/manifest.json",
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        const clonedResponse = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});

// Listen for the 'message' event to handle manual updates
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});