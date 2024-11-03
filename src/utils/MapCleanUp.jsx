import { useRoutingContext } from "../context/RoutingContext";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function MapCleanUp({ markerRefs = [], layerIds = [], sourceIds = [] }) {
  const { mapRef } = useRoutingContext();

  useEffect(() => {
    return () => {
      if (!mapRef.current) return;
      markerRefs?.forEach((item) => {
        item.current?.remove();
      });
    };
  }, [mapRef]);
  useEffect(() => {
    return () => {
    

      if (layerIds)
        layerIds.forEach((id) => {
          if (mapRef.current.getLayer(id)) {
            mapRef.current.removeLayer(id);
          }
        });
      if (sourceIds) {
        sourceIds.forEach((id) => {
          if (mapRef.current.getSource(id)) {
            mapRef.current.removeSource(id);
          }
        });
      }
    };
  }, [mapRef, sourceIds, layerIds]);
  return null;
}

export default MapCleanUp;
