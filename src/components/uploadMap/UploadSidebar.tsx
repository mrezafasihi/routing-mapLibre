import React,{ useEffect, useMemo } from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import MarkerRange from "./MarkerRange";
import DeletePolygon from "./DeletePolygon";
import UploadPolygon from "./UploadPolygon";
import MapCleanUp from "../../utils/MapCleanUp";

function UploadSidebar() {
  const { mapRef, displayUpload } = useRoutingContext();
  const { layerIds, sourceIds } = useMemo(() => {
    const layerIds = displayUpload?.map(
      (_, index) => `uploadPolygon-fill-${index}`
    );
    const sourceIds = displayUpload?.map(
      (_, index) => `uploadPolygon-${index}`
    );

    return { layerIds, sourceIds };
  }, [displayUpload]);
  useEffect(() => {
    if (!displayUpload) return;
    displayUpload?.forEach((item, index) => {
      const sourceId = `uploadPolygon-${index}`;
      const layerId = `uploadPolygon-fill-${index}`;

      if (!mapRef.current.getSource(sourceId)) {
        mapRef.current.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: { polygonId: item.id },
            geometry: item.boundary,
          },
        });
        mapRef.current.addLayer({
          id: layerId,
          type: "fill",
          source: sourceId,
          layout: {},
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.9,
          },
        });
      }
      mapRef.current.triggerRepaint();
    });
  }, [displayUpload, mapRef]);
  return (
    <div className="flex flex-col w-[30%] h-screen space-y-4">
      <UploadPolygon />
      <MarkerRange />
      <DeletePolygon />
      <MapCleanUp layerIds={layerIds} sourceIds={sourceIds} />
    </div>
  );
}

export default UploadSidebar;
