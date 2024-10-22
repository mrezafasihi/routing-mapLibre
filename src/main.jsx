import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RoutingContextProvider } from "./context/RoutingContext";
import App from "./App.jsx";
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
