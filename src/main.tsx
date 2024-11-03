import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RoutingContextProvider } from "./context/RoutingContext.js";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <RoutingContextProvider>
      <App />
    </RoutingContextProvider>
    </BrowserRouter>
  </StrictMode>
);
