import { useCustomeContext } from "../context/RoutingContext";

function MapSide() {
  const {  mapContainerRef} =
    useCustomeContext();
    
 
  return (
    <div
      ref={mapContainerRef}
      className="map-container h-full w-full bg-black"
    />
  );
}

export default MapSide;
