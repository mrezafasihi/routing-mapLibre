import { Marker } from "maplibre-gl";
import { useRoutingContext } from "../context/RoutingContext";
import { RefObject, useEffect } from "react";

function MapCleanUp({
  markerRefs = [],
  layerIds = [],
  sourceIds = [],
}: {
  markerRefs?: RefObject<Marker | undefined>[];
  layerIds?: string[];
  sourceIds?: string[];
}) {
  const { mapRef } = useRoutingContext();

  // clean up marker added to map
  useEffect(() => {
    return () => {
      if (!mapRef?.current) return;
      markerRefs?.forEach((item) => {
        item.current?.remove();
      });
    };
  }, [mapRef]);

  // clean up sources and layers added to map
  useEffect(() => {
    return () => {
      if (layerIds)
        layerIds.forEach((id) => {
          if (mapRef?.current?.getLayer(id)) {
            mapRef?.current?.removeLayer(id);
          }
        });
      if (sourceIds) {
        sourceIds.forEach((id) => {
          if (mapRef?.current?.getSource(id)) {
            mapRef?.current?.removeSource(id);
          }
        });
      }
    };
  }, [mapRef, sourceIds, layerIds]);

  return null;
}

export default MapCleanUp;
