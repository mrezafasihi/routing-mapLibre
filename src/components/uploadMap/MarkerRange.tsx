import React, { useCallback } from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import mapboxgl from "mapbox-gl";
import { checkIsPointInGeofenceRange } from "../../utils/api";
import MapCleanUp from "../../utils/MapCleanUp";

function MarkerRange() {
  const { mapRef, rangeMarkerRef } = useRoutingContext();

  const handleMapClick = useCallback(
    (e) => {
      const { lng, lat } = e.lngLat;
      if (mapRef?.current) {
        if (!rangeMarkerRef) {
          return;
        }
        if (!rangeMarkerRef?.current) {
          rangeMarkerRef.current = new mapboxgl.Marker();
        }

        rangeMarkerRef?.current.setLngLat([lng, lat]).addTo(mapRef.current);
        checkIsPointInGeofenceRange(lng, lat);
        mapRef.current.off("click", handleMapClick);
      }
    },
    [mapRef, rangeMarkerRef]
  );

  const handleButtonClick = () => {
    mapRef?.current?.on("click", handleMapClick);
  };

  return (
    <>
      <MapCleanUp markerRefs={[rangeMarkerRef]} />
      <button className="uploadButton" onClick={handleButtonClick}>
        is this in range
      </button>
    </>
  );
}

export default MarkerRange;
