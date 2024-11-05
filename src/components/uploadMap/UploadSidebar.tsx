import React, { useEffect, useMemo } from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import MarkerRange from "./MarkerRange";
import DeletePolygon from "./DeletePolygon";
import UploadPolygon from "./UploadPolygon";
import MapCleanUp from "../../utils/MapCleanUp";
import useSWR from "swr";
import useGeofenceStages from "../../hooks/useGeofenceStages";

function UploadSidebar() {
  const { mapRef, displayUpload } = useRoutingContext();
  // [X]: this 'isLoading' boolean is only taking into account the fetch call for /stages. but not the deletion.  
  // you shouldn't use this for the 'loading...' text!!
  // you need a declare a diff variable. 
  const {isStagesLoading,isStageValidating}=useGeofenceStages()

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
    if (!displayUpload && !mapRef.current) return;
    displayUpload?.forEach((item, index) => {
      const sourceId = `uploadPolygon-${index}`;
      const layerId = `uploadPolygon-fill-${index}`;

      if (!mapRef.current?.getSource(sourceId)) {
        mapRef?.current?.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: { polygonId: item.id },
            geometry: item.boundary,
          },
        });
        mapRef.current?.addLayer({
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
    });
  }, [displayUpload, mapRef]);
  return (
    <div className="flex flex-col w-[30%] h-screen space-y-4">
      <UploadPolygon />
      <MarkerRange />
      <DeletePolygon />
      {/* [x]: what is the diff between isValidating and isLoading ?? */}
      {(isStagesLoading||isStageValidating )&& <p className="text-white">Loading...</p>}
      <MapCleanUp layerIds={layerIds} sourceIds={sourceIds} />
    </div>
  );
}

export default UploadSidebar;
