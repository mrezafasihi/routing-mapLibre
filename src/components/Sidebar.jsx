import  { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";

import { useCustomeContext } from "../context/RoutingContext";

function Sidebar() {
  const { mapRef, originMarkerRef, destinationMarkerRef} = useCustomeContext();
  const [markerType, setMarkerType] = useState(null);
  const handleMapClick = (e) => {
    const { lng, lat } = e.lngLat;

    if (markerType === "origin") {
      // ایجاد و تنظیم مارکر مبدأ
      if (originMarkerRef.current) {
        originMarkerRef.current.setLngLat([lng, lat]);
      } else {
        originMarkerRef.current = new maplibregl.Marker({ color: "blue" })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      }
    } else if (markerType === "destination") {
      // ایجاد و تنظیم مارکر مقصد
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
    const apiUrl = `https://map.ir/routes/foot/v1/driving/51.421047,35.732936;51.422185,35.731821?alternatives=true&steps=true&overview=false`; // path parameter

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllYmU3MzI2MmZjNzljNTkyYTRlMDdiNGY0MTQzODBkNjNhZTU2MzgzZGVhNzBiNDA3NDQ0N2ZkODhmZTIzZmZmNjVlYTA4MGRlN2EzNWE2In0.eyJhdWQiOiIyOTIyNyIsImp0aSI6IjllYmU3MzI2MmZjNzljNTkyYTRlMDdiNGY0MTQzODBkNjNhZTU2MzgzZGVhNzBiNDA3NDQ0N2ZkODhmZTIzZmZmNjVlYTA4MGRlN2EzNWE2IiwiaWF0IjoxNzI5NDE3MTkyLCJuYmYiOjE3Mjk0MTcxOTIsImV4cCI6MTczMTkyMjc5Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.Va5f-rlEybNWDroa_-9bVPt7ENIGUZtUVW55Y5h2p_liC6FHHe1PAkdQ4xECtTKD807vdud3S0naUZtFt4CMDkWexe2_56mNODngaIb3JQ1j8tPjvJqP_a-VtU0ogDsJGcJlz17Q66-hPN-sbp98PNoFQrmHQqIzSO02at70TBbeXe0RPDmNU_TOLcLfb2jf54PQc_vxGH2uIjD-ThYaTIGJnPki_alTqRHbpng75edWEEfO9PDyImaRGfKPEXrIc5cK5-fPFJGxBu9xImilQKggk6-_VPfENUEBPdrSrQZCFgKxLUpHSYPvi0Txls7MTcJqJ85r1FyLy1cQXLODfA", // جایگزین با API Key خودتان
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Route Data:", data);
      return data;
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
  }, [markerType]);
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
