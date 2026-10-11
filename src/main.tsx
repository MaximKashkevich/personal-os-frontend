import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/app/App";
import { AppErrorBoundary } from "@/app/providers/AppErrorBoundary";
import { AppProviders } from "@/app/providers/AppProviders";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <AppProviders>
        <App />
      </AppProviders>
    </AppErrorBoundary>
  </React.StrictMode>,
);
