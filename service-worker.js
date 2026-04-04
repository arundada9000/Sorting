// ============================================================
// EasySorting Service Worker — Full Offline PWA
// Strategy: Cache-First for all assets
// Bump CACHE_VERSION whenever you deploy new content
// ============================================================
const CACHE_VERSION = "v502";
const CACHE_NAME = `easysorting-${CACHE_VERSION}`;

// --------------- Core assets (must succeed to install) ---------------
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/app.js",
  "/manifest.json",
  "/about.html",
  "/contact.html",
  "/feedback.html",
  "/summary.html",
  "/privacy-policy.html",
  "/bubbleSort.html",
  "/selectionSort.html",
  "/insertionSort.html",
  "/mergeSort.html",
  "/quickSort.html",
  "/heapSort.html",
  "/radixSort.html",
  "/shellSort.html",
  "/service-worker.js",
];

// --------------- Supplemental assets (cached one-by-one; failures tolerated) ---------------
const SUPPLEMENTAL_ASSETS = [
  // Sort algorithm images
  "/images/bubble.webp",
  "/images/heap.webp",
  "/images/insertion.webp",
  "/images/merge.webp",
  "/images/quick.webp",
  "/images/radix.webp",
  "/images/selection.webp",
  "/images/shell.webp",
  // UI images
  "/images/magic.png",
  "/images/magic.webp",
  "/images/sort.png",
  "/images/sort-128.png",
  "/images/summary.png",
  "/images/squiggle.png",
  "/images/information.png",
  "/images/happiness.png",
  "/images/write.png",
  "/images/qr-code.png",
  "/images/me.svg",
  "/images/feedback.png",
  "/images/contact.webp",
  // Social / SVG icons
  "/images/svg-icons/facebook.svg",
  "/images/svg-icons/github.svg",
  "/images/svg-icons/telegram.svg",
  "/images/svg-icons/whatsapp.svg",
  "/images/svg-icons/instagram.svg",
  "/images/svg-icons/youtube.svg",
  "/images/socials/github.webp",
  "/images/socials/instagram.webp",
  "/images/socials/whatsapp.webp",
  "/images/socials/youtube.webp",
  "/images/socials/email.webp",
  "/images/socials/facebook.webp",
  "/images/screenshots/screenshot-wide.png",
  // JS modules (used by some sort pages)
  "/js/heapsort.js",
  "/js/mergeSort.js",
  "/js/quickSort.js",
  "/js/radix.js",
  "/js/shell.js",
  // Prism.js (code highlighting — needed for all sort pages offline)
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-clike.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-cpp.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js",
];

// ============================================================
// INSTALL — cache core assets atomically, supplemental best-effort
// ============================================================
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // 1. Cache core pages — must all succeed
      await cache.addAll(CORE_ASSETS);

      // 2. Cache supplemental assets one-by-one so a single failure
      //    (e.g. a large image, a CDN hiccup) doesn't abort the install
      const results = await Promise.allSettled(
        SUPPLEMENTAL_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(
              `[SW] Failed to cache supplemental asset: ${url}`,
              err,
            );
          }),
        ),
      );

      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length) {
        console.warn(
          `[SW] ${failed.length} supplemental assets failed to cache.`,
        );
      }

      console.log(`[SW] Install complete. Cache: ${CACHE_NAME}`);
    }),
  );

  // Take control immediately — don't wait for old SW to die
  self.skipWaiting();
});

// ============================================================
// ACTIVATE — delete all old caches
// ============================================================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => {
              console.log(`[SW] Deleting old cache: ${key}`);
              return caches.delete(key);
            }),
        );
      })
      .then(() => {
        console.log(`[SW] Activated. Now using: ${CACHE_NAME}`);
        // Claim all open clients so updated SW takes effect immediately
        return self.clients.claim();
      }),
  );
});

// ============================================================
// FETCH — Cache-First strategy
// 1. Return cached response if available
// 2. Otherwise fetch from network and cache the response
// 3. If network fails, serve offline fallback
// ============================================================
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser extensions
  if (request.method !== "GET") return;
  if (url.protocol === "chrome-extension:") return;

  // Skip Google AdSense / Analytics — never cache ad scripts
  if (
    url.hostname.includes("googlesyndication.com") ||
    url.hostname.includes("googletagmanager.com") ||
    url.hostname.includes("doubleclick.net") ||
    url.hostname.includes("google-analytics.com")
  ) {
    return; // Let the browser handle ad network requests normally
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // 1. Try cache first
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Not in cache — try network
      try {
        const networkResponse = await fetch(request);

        // Cache valid responses for future offline use
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type !== "opaque-redirect"
        ) {
          cache.put(request, networkResponse.clone());
        }

        return networkResponse;
      } catch (err) {
        // 3. Network failed — serve appropriate fallback
        console.warn(`[SW] Fetch failed for: ${request.url}`);

        // Navigation (page requests) — return the cached page or index
        if (request.mode === "navigate") {
          const cachedPage =
            (await cache.match(url.pathname + "html")) ||
            (await cache.match(url.pathname)) ||
            (await cache.match("/index.html"));
          return cachedPage;
        }

        // Image fallback
        if (request.destination === "image") {
          return cache.match("/images/sort.png");
        }

        // Everything else — return a minimal offline response
        return new Response("Offline — resource not cached.", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "text/plain" },
        });
      }
    }),
  );
});
