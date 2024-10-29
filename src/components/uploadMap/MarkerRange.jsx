import {  useCallback, useRef, useState } from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import mapboxgl from "mapbox-gl";
import { checkIsPointInGeofenceRange } from "../../utils/api";


function MarkerRange() {
  const { mapRef,rangeMarkerRef } = useRoutingContext();
  // const [isAddingMarker,setIsAddingMarker]=useState(false)
//   useEffect(() => {
//     const marker = new mapboxgl.Marker()
//     .addTo(mapRef.current);
//     rangeMarkerRef.current = marker

//   }, [mapRef])

const handleMapClick = useCallback(
  (e) => {
    // if (!isAddingMarker) return; 

    const { lng, lat } = e.lngLat;
    if (rangeMarkerRef.current) {
      rangeMarkerRef.current.setLngLat([lng, lat]);
    } 
    else {
      rangeMarkerRef.current = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
    }
    checkIsPointInGeofenceRange(lng, lat);
   

    // setIsAddingMarker(false);
    mapRef.current?.off("click", handleMapClick); 
  },
  [ mapRef, rangeMarkerRef]
);

 const handleButtonClick=()=>{
  // setIsAddingMarker(true);
mapRef.current.on("click",handleMapClick)
 }
  
 

  return (
    <button className="bg-white hover:cursor-pointer" onClick={handleButtonClick}>
      is this in range
    </button>
  );
}

export default MarkerRange;
