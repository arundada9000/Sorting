const cacheName = "cache-v0";
const assets = [
  "/",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./about.html",
  "./bubbleSort.html",
  "./contact.html",
  "./feedback.html",
  "./heapSort.html",
  "./insertionSort.html",
  "./mergeSort.html",
  "./quickSort.html",
  "./radixSort.html",
  "./shellSort.html",
  "./summary.html",
  "./imageList.json",
];
// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Caching");
      cache.addAll(assets);
    })
  );
});

// Activate service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      console.log("Inside activate", keys);
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});
