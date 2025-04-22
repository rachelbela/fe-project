import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./wasmTypes.d.ts";
import "./wasm_exec.js";
import "./i18n.ts";
import "./indexedDB.ts";
import worker from "./_mock/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

worker.start();
