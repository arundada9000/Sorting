// ============================================================
// EasySorting — app.js
// Service Worker registration + PWA install prompt
// ============================================================

// --- Service Worker Registration ---
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("[App] Service Worker registered:", registration.scope);

      // When a new SW is waiting (e.g. after a site update),
      // it will skipWaiting automatically; reload to apply it.
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "activated" &&
            navigator.serviceWorker.controller
          ) {
            // New version activated — optionally inform user
            console.log("[App] New version activated.");
          }
        });
      });
    })
    .catch((err) => console.error("[App] SW registration failed:", err));

  // Reload the page when the SW controller changes (new SW took over)
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!refreshing) {
      refreshing = true;
      if (isStandalone()) {
        // Only prompt in standalone (installed) mode to avoid jarring reloads
        alert(
          "EasySorting has been updated! Reloading for the latest version.",
        );
        window.location.reload();
      }
    }
  });
}

// --- PWA Install Prompt ---
let deferredPrompt;
let installButton = document.getElementById("installButton");
let installButtonMobile = document.getElementById("install-button-mobile");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installButton) installButton.style.display = "block";
  if (installButtonMobile) installButtonMobile.style.display = "block";
});

window.addEventListener("appinstalled", () => {
  console.log("[App] PWA was installed.");
  if (installButton) installButton.style.display = "none";
  if (installButtonMobile) installButtonMobile.style.display = "none";
  deferredPrompt = null;
});

// --- Install button click handlers ---
async function triggerInstall() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`[App] Install prompt outcome: ${outcome}`);
  deferredPrompt = null;
  if (installButton) installButton.style.display = "none";
  if (installButtonMobile) installButtonMobile.style.display = "none";
}

if (installButton) installButton.addEventListener("click", triggerInstall);
if (installButtonMobile)
  installButtonMobile.addEventListener("click", triggerInstall);

// --- Utility: detect standalone (installed) mode ---
function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}
