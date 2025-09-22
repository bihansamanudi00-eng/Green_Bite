// Name of the cache
const CACHE_NAME = "greenbite-cache-v1";

// Files to cache (update this list with your actual files)
const urlsToCache = [
  "/",
  "/index.html",
  "/Style/Home.css",
  "/Style/Workout.css",
  "/Script/main.js",
  "/images/logo2.jpg"
];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker (clean old caches)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});
