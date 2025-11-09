import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

// src/main.tsx
if (import.meta.env.VITE_USE_MOCKS === "true") {
  import("./mock/browser.ts").then(({ worker }) => {
    worker.start();
  });
}

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
