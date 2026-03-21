import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Signal to prerender plugin that the page is fully rendered
// Uses requestIdleCallback to ensure React + Helmet have finished
const signal = () => document.dispatchEvent(new Event("render-event"));
if ("requestIdleCallback" in window) {
  (window as any).requestIdleCallback(signal);
} else {
  setTimeout(signal, 200);
}
