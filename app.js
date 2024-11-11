// Service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((register) => console.log("Registered ", register))
    .catch((error) => console.log("Failed to register ", err));
}
