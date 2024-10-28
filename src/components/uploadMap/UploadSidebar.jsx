import { useEffect } from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import MarkerRange from "./MarkerRange";
import DeletePolygon from "./DeletePolygon";
import UploadPolygon from "./UploadPolygon";

function UploadSidebar() {
  const { mapRef,displayUpload} = useRoutingContext();

 

  useEffect(() => {
    displayUpload?.forEach((item, index) => {
      const sourceId = `uploadPolygon-${index}`;
      const layerId = `uploadPolygon-fill-${index}`;
      if (!mapRef.current.getSource(sourceId)) {
        mapRef.current.addSource(sourceId, {
          type: "geojson",
          data: { type: "Feature", geometry: item.boundary },
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
    });
  }, [displayUpload, mapRef]);
  return (
    <div className="flex flex-col w-[30%] h-screen space-y-4">
      <UploadPolygon />
      <MarkerRange/>
      <DeletePolygon/>
    </div>
  );
}

export default UploadSidebar;
