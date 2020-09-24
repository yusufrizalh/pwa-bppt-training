// kemampuan offline-application 
const CACHE_NAME = "sw-cache-example";
const toCache = [
  "/",
  "/index.html",
  "/js/pwa.js",
  "/js/pwa.webmanifest",
  "/js/status.js",
  "/js/notification.js",
  "/images/smiley.png",
  "/images/notification.png"
];

/* 
    service worker memiliki beberapa event / lifecycle 
    > event install 
    > event activate 
    > event fetch 
    > event push 
    > event sync 
    > event message 
*/

// membuat event install
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

// membuat event activate
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] removing old cache");
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// membuat event fetch
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});
