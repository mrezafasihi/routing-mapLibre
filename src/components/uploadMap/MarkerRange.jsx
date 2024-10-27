import {  useRef } from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import mapboxgl from "mapbox-gl";
import { checkIsPointInGeofenceRange } from "../../utils/api";


function MarkerRange() {
  const { mapRef } = useRoutingContext();
  const rangeMarkerRef = useRef();

//   useEffect(() => {
//     const marker = new mapboxgl.Marker()
//     .addTo(mapRef.current);
//     rangeMarkerRef.current = marker

//   }, [mapRef])

  const handleButtonClick = () => {
    if (!mapRef.current) return;


    const handleMapClick = (e) => {
        const { lng, lat } = e.lngLat;
        if (rangeMarkerRef.current) {
          rangeMarkerRef.current.setLngLat([lng, lat]);
        } 
        else {
          rangeMarkerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
        }
        console.log("first");
        checkIsPointInGeofenceRange(lng, lat);
        mapRef.current.off("click", handleButtonClick);
      };

    mapRef.current.on("click", handleMapClick);
    console.log("second");
  };
  

  return (
    <button className="bg-white" onClick={handleButtonClick}>
      is this in range
    </button>
  );
}

export default MarkerRange;
