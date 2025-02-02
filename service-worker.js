const CACHE_NAME = "explorer-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/static/js/bundle.js",
];
const dynamicUrlsToCache = [
    "/api/saved-places",
    "/assets/map-tiles/",
];

// Instalowanie Service Workera
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opening cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktywowanie Service Workera
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Przechwytywanie żądań sieciowych
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
