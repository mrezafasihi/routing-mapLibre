import { useCallback } from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import mapboxgl from "mapbox-gl";
import { checkIsPointInGeofenceRange } from "../../utils/api";

function MarkerRange() {
  const { mapRef, rangeMarkerRef } = useRoutingContext();
  //   useEffect(() => {
  //     const marker = new mapboxgl.Marker()
  //     .addTo(mapRef.current);
  //     rangeMarkerRef.current = marker

  //   }, [mapRef])

  const handleMapClick = useCallback(
    (e) => {

      const { lng, lat } = e.lngLat;
      if (rangeMarkerRef.current) {
        rangeMarkerRef.current.setLngLat([lng, lat]);
      } else {
        rangeMarkerRef.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      }
      checkIsPointInGeofenceRange(lng, lat);

      mapRef.current?.off("click", handleMapClick);
    },
    [ mapRef, rangeMarkerRef]
  );

  const handleButtonClick = () => {
    mapRef.current.on("click", handleMapClick);
  };

  return (
    <>
      <button className="uploadButton" onClick={handleButtonClick}>
        is this in range
      </button>
    </>
  );
}

export default MarkerRange;
