import React from "react";
import { useCallback, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useRoutingContext } from "../context/RoutingContext";
import { apiKey } from "../constants";
import MapCleanUp from "../utils/MapCleanUp";
import useSWR from "swr";

function RoutingSidebar() {
  const { mapRef, originMarkerRef, destinationMarkerRef } = useRoutingContext();
  const [markerType, setMarkerType] = useState(null);
  const [originCoordinate, setOriginCoordinate] = useState([]);
  const [destinationCoordinate, setDestinationCoordinate] = useState([]);
  const [urlRoute, setUrlRoute] = useState(null);
  const { data: routeData } = useSWR(urlRoute, fetchRoute);
  function fetchRoute(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
      return res.json();
    });
  }
  const SOURCE_ID = "LineString";

  const handleMapClick = useCallback(
    (e) => {
      const { lng, lat } = e.lngLat;

      if (markerType === "origin") {
        setOriginCoordinate([lng, lat]);
        if (originMarkerRef.current) {
          originMarkerRef.current.setLngLat([lng, lat]).addTo(mapRef.current);
        } else {
          originMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
        }
      } else if (markerType === "destination") {
        setDestinationCoordinate([lng, lat]);
        if (destinationMarkerRef.current) {
          destinationMarkerRef.current
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
          destinationMarkerRef.current.setLngLat([lng, lat]);
        } else {
          destinationMarkerRef.current = new mapboxgl.Marker({ color: "red" })
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
        }
      }
    },
    [destinationMarkerRef, mapRef, markerType, originMarkerRef]
  );
  const findRoute = async () => {
    const [originLng, originLat] = originCoordinate;
    const [destinationLng, destinationLat] = destinationCoordinate;

    const apiUrl = `https://map.ir/routes/foot/v1/driving/${originLng},${originLat};${destinationLng},${destinationLat}?alternatives=true&steps=true&geometries=geojson`;

    setUrlRoute(apiUrl);
  };

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.on("click", handleMapClick);
    return () => {
      mapRef.current.off("click", handleMapClick);
    };
  }, [handleMapClick, mapRef, markerType]);

  useEffect(() => {
    if (!routeData || !mapRef.current) return;

    const geoRoute = routeData.routes[0].geometry; // Access the geometry here

    const existingSource = mapRef.current.getSource(SOURCE_ID);

    if (existingSource) {
      existingSource.setData({
        type: "Feature",
        geometry: geoRoute,
      });
    } else {
      mapRef.current.addSource(SOURCE_ID, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: geoRoute,
        },
      });

      mapRef.current.addLayer({
        id: "LineString-layer",
        type: "line",
        source: SOURCE_ID,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ff0080",
          "line-width": 5,
        },
      });
    }
  }, [routeData, mapRef]);
  return (
    <div className="flex flex-col w-[30%]">
      <MapCleanUp
        markerRefs={[originMarkerRef, destinationMarkerRef]}
        layerIds={["LineString-layer"]}
        sourceIds={[SOURCE_ID]}
      />
      <button
        onClick={() => {
          setMarkerType("origin");
        }}
        className={`px-6 py-2  text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring`}
      >
        Origin
      </button>
      <button
        onClick={() => {
          setMarkerType("destination");
        }}
        className="px-6 py-2  text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
      >
        Destination
      </button>
      <button
        onClick={findRoute}
        className="px-6 py-2  text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
      >
        Find
      </button>
    </div>
  );
}

export default RoutingSidebar;
