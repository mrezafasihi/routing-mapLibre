import { useEffect, useRef, createContext, useContext } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";



export const RoutingContext = createContext();

const RoutingContextProvider = ({ children }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const originMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);

  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [51.406979760871764, 35.751287287982706],
      zoom: 13,
    });
    return () => mapRef.current?.remove();
  }, []);
  return (
    <RoutingContext.Provider
      value={{
        mapContainerRef,
        mapRef,
        originMarkerRef,
        destinationMarkerRef,
      }}
    >
      {children}
    </RoutingContext.Provider>
  );
};

function useCustomeContext() {
  const context = useContext(RoutingContext);

  return context;
}

export { RoutingContextProvider, useCustomeContext };
