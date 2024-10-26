import React, {
  useEffect,
  useRef,
  createContext,
  useContext,
  ReactNode,
  RefObject,
  MutableRefObject,
} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface IRoutingContext {
  mapContainerRef?: MutableRefObject<HTMLDivElement | undefined>;
  mapRef?: MutableRefObject<mapboxgl.Map | undefined>;
  originMarkerRef?: MutableRefObject<mapboxgl.Marker | undefined>;
  destinationMarkerRef?: MutableRefObject<mapboxgl.Marker | undefined>;
}

export const RoutingContext = createContext<IRoutingContext>({});

const RoutingContextProvider = (props: { children: ReactNode }) => {
  const mapContainerRef = useRef<HTMLDivElement>();
  const mapRef = useRef<mapboxgl.Map>();
  const originMarkerRef = useRef<mapboxgl.Marker>();
  const destinationMarkerRef = useRef<mapboxgl.Marker>();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [51.406979760871764, 35.751287287982706],
      zoom: 13,
    });
    if (!mapRef.current) return;

    mapRef.current.showTileBoundaries = true;

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
      {props.children}
    </RoutingContext.Provider>
  );
};

function useRoutingContext() {
  const context = useContext(RoutingContext);

  return context;
}

export { RoutingContextProvider, useRoutingContext };
