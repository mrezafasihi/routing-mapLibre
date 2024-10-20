import React, { createContext, useContext, useState } from "react";

export const RoutingContext = createContext();

const RoutingContextProvider = ({ children }) => {
  const [OriginMarker, setOriginMarker] = useState(null);
  const [DestinationMarker, setDestinationMarker] = useState(null);
  return (
    <RoutingContext.Provider
      value={{
        OriginMarker,
        setOriginMarker,
        DestinationMarker,
        setDestinationMarker,
      }}
    >
      {children}
    </RoutingContext.Provider>
  );
};

function useCustomeContext() {
  const context = useContext(RoutingContext);

  return context;
}

export { RoutingContextProvider, useCustomeContext };
