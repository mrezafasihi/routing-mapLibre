import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RoutingContextProvider } from "./context/RoutingContext.js";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";


const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <RoutingContextProvider>
          <App />
        </RoutingContextProvider>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
