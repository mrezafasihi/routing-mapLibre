import { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";

import { useCustomeContext } from "../context/RoutingContext";

function Sidebar() {
  const { mapRef, originMarkerRef, destinationMarkerRef } = useCustomeContext();
  const [markerType, setMarkerType] = useState(null);
  const [originCoordinate, setOriginCoordinate] = useState([]);
  const [destinationCoordinate, setDestinationCoordinate] = useState([]);
  const [geoRoute, setGeoRoute] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMapClick = (e) => {
    const { lng, lat } = e.lngLat;

    if (markerType === "origin") {
      setOriginCoordinate([lng, lat]);
      if (originMarkerRef.current) {
        originMarkerRef.current.setLngLat([lng, lat]);
      } else {
        originMarkerRef.current = new maplibregl.Marker({ color: "blue" })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      }
    } else if (markerType === "destination") {
      setDestinationCoordinate([lng, lat]);
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.setLngLat([lng, lat]);
      } else {
        destinationMarkerRef.current = new maplibregl.Marker({ color: "red" })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      }
    }
  };

  const findRoute = async () => {
    const [originLng, originLat] = originCoordinate;
    const [destinationLng, destinationLat] = destinationCoordinate;

    const apiUrl = `https://map.ir/routes/foot/v1/driving/${originLng},${originLat};${destinationLng},${destinationLat}?alternatives=true&steps=true&geometries=geojson`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllYmU3MzI2MmZjNzljNTkyYTRlMDdiNGY0MTQzODBkNjNhZTU2MzgzZGVhNzBiNDA3NDQ0N2ZkODhmZTIzZmZmNjVlYTA4MGRlN2EzNWE2In0.eyJhdWQiOiIyOTIyNyIsImp0aSI6IjllYmU3MzI2MmZjNzljNTkyYTRlMDdiNGY0MTQzODBkNjNhZTU2MzgzZGVhNzBiNDA3NDQ0N2ZkODhmZTIzZmZmNjVlYTA4MGRlN2EzNWE2IiwiaWF0IjoxNzI5NDE3MTkyLCJuYmYiOjE3Mjk0MTcxOTIsImV4cCI6MTczMTkyMjc5Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.Va5f-rlEybNWDroa_-9bVPt7ENIGUZtUVW55Y5h2p_liC6FHHe1PAkdQ4xECtTKD807vdud3S0naUZtFt4CMDkWexe2_56mNODngaIb3JQ1j8tPjvJqP_a-VtU0ogDsJGcJlz17Q66-hPN-sbp98PNoFQrmHQqIzSO02at70TBbeXe0RPDmNU_TOLcLfb2jf54PQc_vxGH2uIjD-ThYaTIGJnPki_alTqRHbpng75edWEEfO9PDyImaRGfKPEXrIc5cK5-fPFJGxBu9xImilQKggk6-_VPfENUEBPdrSrQZCFgKxLUpHSYPvi0Txls7MTcJqJ85r1FyLy1cQXLODfA",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      setGeoRoute(data.routes[0].geometry);
      // return data
    } catch (error) {
      alert(error.message);
      console.error("Error fetching route:", error.message);
    }
  };
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.on("click", handleMapClick);
    return () => {
      mapRef.current.off("click", handleMapClick);
    };
  }, [handleMapClick, mapRef, markerType]);

  useEffect(() => {
    if (!geoRoute || !mapRef.current) return;

    const existingSource = mapRef.current.getSource("LineString");

    if (existingSource) {
      existingSource.setData({
        type: "Feature",
        geometry: geoRoute,
      });
    } else {
      mapRef.current.addSource("LineString", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: geoRoute,
        },
      });

      mapRef.current.addLayer({
        id: "LineString-layer",
        type: "line",
        source: "LineString",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#BF93E4",
          "line-width": 5,
        },
      });
    }
  }, [geoRoute, mapRef]);
  return (
    <div className="flex flex-col w-[30%]">
      <button
        onClick={() => {
          setMarkerType("origin");
        }}
        className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
      >
        Origin
      </button>
      <button
        onClick={() => {
          setMarkerType("destination");
        }}
        className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
      >
        Destination
      </button>
      <button
        onClick={findRoute}
        className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
      >
        Find
      </button>
    </div>
  );
}

export default Sidebar;
