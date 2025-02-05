const CACHE_NAME = "explorer-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assety/explorer-192.png",
  "/assety/explorer-512.png",
  "/assety/favicon.png"
];

// Instalowanie Service Workera i cachowanie plików
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Service Worker: Caching files...");
      return cache.addAll(urlsToCache);
    }).catch((error) => {
      console.error("❌ Błąd cachowania plików:", error);
    })
  );
});

// Aktywacja Service Workera i usunięcie starego cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("🗑 Usuwanie starego cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Obsługa żądań sieciowych - zwracanie plików z cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch((error) => {
      console.error("❌ Błąd podczas pobierania zasobu:", error);
    })
  );
});
