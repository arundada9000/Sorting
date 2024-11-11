// Service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((register) => console.log("Registered ", register))
    .catch((error) => console.log("Failed to register ", err));
}

let deferredPrompt;
let installButton = document.getElementById("installButton");

// Listen for the beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = "block";
  document.getElementById("install-button-mobile").style.display = "block";
});

window.addEventListener("appinstalled", () => {
  console.log("PWA was installed");
  installButton.style.display = "none";
});

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

if (isStandalone()) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    alert("A new version is available! Refresh to update.");
  });
}
document
  .getElementById("install-button-mobile")
  .addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        document.getElementById("install-button-mobile").style.display = "none";
        installButton.style.display = "none";
      }
      deferredPrompt = null;
    }
  });
installButton.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
    installButton.style.display = "none";
    document.getElementById("install-button-mobile").style.display = "none";
  }
});
