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
  "./images/animated/add.gif",
  "./images/socials/github.png",
  "./images/socials/github.webp",
  "./images/socials/instagram.png",
  "./images/socials/instagram.webp",
  "./images/socials/whatsapp.png",
  "./images/socials/whatsapp.webp",
  "./images/socials/youtube.png",
  "./images/socials/youtube.webp",
  "./images/socials/email.webp",
  "./images/socials/email.png",
  "./images/socials/facebook.png",
  "./images/socials/facebook.webp",
  "./images/svg-icons/facebook.svg",
  "./images/svg-icons/github.svg",
  "./images/svg-icons/telegram.svg",
  "./images/svg-icons/whatsapp.svg",
  "./images/svg-icons/instagram.svg",
  "./images/svg-icons/youtube.svg",
  "./images/bubble.webp",
  "./images/heap.webp",
  "./images/insertion.webp",
  "./images/magic.webp",
  "./images/magic.png",
  "./images/information.png",
  "./images/me-in-the-pool.webp",
  "./images/merge.webp",
  "./images/output-onlinegiftools.gif",
  "./images/qr-code.png",
  "./images/write.png",
  "./images/me.svg",
  "./images/summary.png",
  "./images/squiggle.png",
  "./images/sort.png",
  "./images/sort-128.png",
  "./images/shell.webp",
  "./images/selection.webp",
  "./images/reorder.gif",
  "./images/radix.webp",
  "./images/quick.webp",
  "./images/happiness.png",
  "./images/me-in-the-pool-300-by-597.png",
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
  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});
