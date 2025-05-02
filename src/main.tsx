import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PWABadge from "./PWABadge.tsx";
import "./index.css";
import App from "./App.tsx";
import './models/escola.tsx'
import './models/professor.tsx'
import './models/firestore.tsx'
import './models/classe.tsx'
import './models/aluno.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <PWABadge />
  </StrictMode>
);
