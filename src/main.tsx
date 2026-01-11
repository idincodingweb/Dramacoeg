import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

// --- LOGIKA PWA (OTAK SEPUH) ---
// registerSW akan mendaftarkan Service Worker secara otomatis.
// immediate: true memastikan aplikasi langsung terupdate kalau abang ganti kodingan.
registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(<App />);