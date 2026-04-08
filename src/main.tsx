import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((registration) => {
      // Check for updates on a regular basis
      setInterval(() => {
        registration.update();
      }, 1000 * 60 * 60); // Check every hour

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New update available, refresh the page
                console.log("New version found, refreshing...");
                window.location.reload();
              }
            }
          };
        }
      };
    }).catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });

  // Listen for the controlling service worker changing and reload
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}
