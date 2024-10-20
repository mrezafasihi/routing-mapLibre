import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RoutingContextProvider } from "./context/RoutingContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoutingContextProvider>
      <App />
    </RoutingContextProvider>
  </StrictMode>
);
