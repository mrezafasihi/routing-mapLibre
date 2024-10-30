import { useLocation } from "react-router-dom";
import { useRoutingContext } from "../context/RoutingContext";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function MapCleanUp({ markerRefs = [], layerIds = [], sourceIds = [] }) {
  const { mapRef } = useRoutingContext();
  const location = useLocation();
  useEffect(() => {

    return()=>{ if (!mapRef.current) return;
    
      markerRefs?.forEach((item) => {
        item.current?.remove();
      });
      layerIds.forEach((id) => {
        console.log(id)
        if (mapRef.current.getLayer(id)) {
          mapRef.current.removeLayer(id);
        }
      });
      sourceIds.forEach((id) => {
        console.log(id)
        if (mapRef.current.getSource(id)) {
          mapRef.current.removeSource(id);
        }
      });}
   
  }, [location]);
  return null;
}

export default MapCleanUp;
