self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("greenbite-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/Style/Home.css",
        "/images/logo2.jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(reg => console.log("Service Worker registered:", reg))
    .catch(err => console.log("Service Worker failed:", err));
}
