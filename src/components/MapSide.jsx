import React, { useEffect, useRef, useState } from "react";
import { useCustomeContext } from "../context/RoutingContext";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function MapSide() {
  const {setOriginMarker,OriginMarker} = useCustomeContext();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const handleOriginMap = () => {
    // const { lng, lat } = e.lngLat;
    // console.log(lng,lat)
  };
  useEffect(() => {
    maplibregl.accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllYmU3MzI2MmZjNzljNTkyYTRlMDdiNGY0MTQzODBkNjNhZTU2MzgzZGVhNzBiNDA3NDQ0N2ZkODhmZTIzZmZmNjVlYTA4MGRlN2EzNWE2In0.eyJhdWQiOiIyOTIyNyIsImp0aSI6IjllYmU3MzI2MmZjNzljNTkyYTRlMDdiNGY0MTQzODBkNjNhZTU2MzgzZGVhNzBiNDA3NDQ0N2ZkODhmZTIzZmZmNjVlYTA4MGRlN2EzNWE2IiwiaWF0IjoxNzI5NDE3MTkyLCJuYmYiOjE3Mjk0MTcxOTIsImV4cCI6MTczMTkyMjc5Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.Va5f-rlEybNWDroa_-9bVPt7ENIGUZtUVW55Y5h2p_liC6FHHe1PAkdQ4xECtTKD807vdud3S0naUZtFt4CMDkWexe2_56mNODngaIb3JQ1j8tPjvJqP_a-VtU0ogDsJGcJlz17Q66-hPN-sbp98PNoFQrmHQqIzSO02at70TBbeXe0RPDmNU_TOLcLfb2jf54PQc_vxGH2uIjD-ThYaTIGJnPki_alTqRHbpng75edWEEfO9PDyImaRGfKPEXrIc5cK5-fPFJGxBu9xImilQKggk6-_VPfENUEBPdrSrQZCFgKxLUpHSYPvi0Txls7MTcJqJ85r1FyLy1cQXLODfA";
    maplibregl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js",
      null,
      true
    );
    
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [51.406979760871764, 35.751287287982706],
      zoom: 13,
    });
    mapRef.current.on("click", handleOriginMap);
    mapRef.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        setOriginMarker([lng,lat])
                
      });

    // return () => map.remove();
  }, []);
  return (
    <div
      ref={mapContainerRef}
      className="map-container h-full w-full bg-black"
    />
  );
}

export default MapSide;
