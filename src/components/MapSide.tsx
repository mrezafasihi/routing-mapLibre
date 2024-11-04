import React from "react";
import { useRoutingContext } from "../context/RoutingContext";

function MapSide() {
  const { mapContainerRef } = useRoutingContext();

  return (
    <div
      ref={mapContainerRef}
      className="map-container h-full w-full bg-black"
    />
  );
}

export default MapSide;
