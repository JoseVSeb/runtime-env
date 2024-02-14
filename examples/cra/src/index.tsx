import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// `window.env` is now type-safe and loads `process.env` in development mode.
import "runtime-env-cli";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
