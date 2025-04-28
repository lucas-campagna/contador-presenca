import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PWABadge from "./PWABadge.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <PWABadge />
  </StrictMode>
);
