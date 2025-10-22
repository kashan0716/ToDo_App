import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// PWA: register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js") // path to your service worker
      .then((registration) =>
        console.log("Service Worker registered:", registration)
      )
      .catch((err) => console.log("Service Worker registration failed:", err));
  });
}
