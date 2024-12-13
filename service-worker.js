const CACHE_NAME = "cache-v401";
const assets = [
  "/",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./about.html",
  "./bubbleSort.html",
  "./selectionSort.html",
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
  "./service-worker.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-clike.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-cpp.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js",
];
// Install service worker
self.addEventListener("install", (event) => {
  // console.log("Service Worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching");
      cache.addAll(assets);
    })
  );
});

// Cache only when installed
// self.addEventListener("message", (event) => {
//   if (event.data === "cache-resources") {
//     caches.open(CACHE_NAME).then(async (cache) => {
//       try {
//         await cache.addAll(assets);
//         console.log("Resources cached after installation");
//       } catch (error) {
//         console.error("Failed to cache resources:", error);
//       }
//     });
//   }
// });

// Activate service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      console.log("Inside activate", keys);
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
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
