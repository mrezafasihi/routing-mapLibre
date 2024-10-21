import React, { useEffect, useRef, useState } from "react";
import { useCustomeContext } from "../context/RoutingContext";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function MapSide() {
  const { mapRef, mapContainerRef, markerRef, setOriginMarker,originMarker} =
    useCustomeContext();

 
  return (
    <div
      ref={mapContainerRef}
      className="map-container h-full w-full bg-black"
    />
  );
}

export default MapSide;
