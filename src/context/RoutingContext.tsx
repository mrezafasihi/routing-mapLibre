import React, {
  useEffect,
  useRef,
  createContext,
  useContext,
  ReactNode,
  RefObject,
  MutableRefObject,
  useState,
  Dispatch,
} from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLocation } from "react-router-dom";
import { apiKey, urlTransformRequest } from "../constants";
import { IDisplayUploadItem } from "../utils/types";
interface IRoutingContext {
  mapContainerRef: MutableRefObject<HTMLDivElement | null>;
  mapRef: MutableRefObject<maplibregl.Map | undefined>;
  originMarkerRef: MutableRefObject<maplibregl.Marker | undefined>;
  destinationMarkerRef: MutableRefObject<maplibregl.Marker | undefined>;
  rangeMarkerRef: MutableRefObject<maplibregl.Marker | undefined>;
  displayUpload: IDisplayUploadItem[]|undefined;
  setDisplayUpload: Dispatch<React.SetStateAction<IDisplayUploadItem[] | undefined>>;
}

export const RoutingContext = createContext<IRoutingContext>({} as any);

const RoutingContextProvider = (props: { children: ReactNode }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null); 
  const mapRef = useRef<maplibregl.Map>();
  const originMarkerRef = useRef<maplibregl.Marker>();
  const destinationMarkerRef = useRef<maplibregl.Marker>();
  const rangeMarkerRef = useRef<maplibregl.Marker>();
  const [displayUpload, setDisplayUpload] = useState<IDisplayUploadItem[]>();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://map.ir/vector/styles/main/mapir-Dove-style.json",
      center: [51.406979760871764, 35.751287287982706],
      zoom: 13,
      transformRequest: (urlTransformRequest) => {
        {
          return {
            url: urlTransformRequest,
            headers: { "x-api-key": apiKey },
          };
        }
      },
    });
    if (!mapRef.current) return;

    mapRef.current.showTileBoundaries = true;
  }, []);
  useEffect(() => {
    return () => {
      mapRef.current?.remove();
    };
  }, []);
  return (
    <RoutingContext.Provider
      value={{
        mapContainerRef,
        mapRef,
        originMarkerRef,
        destinationMarkerRef,
        rangeMarkerRef,
        displayUpload,
        setDisplayUpload,
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
