import React, { useCallback, useEffect, useState } from "react";
import { apiKey } from "../../constants";
import { useRoutingContext } from "../../context/RoutingContext";
// [x]: don't use the global mutate function (unless you have good reason to do so).
// there's a better alternative which is returned by the useSWR hook. SEE THE DOCS.
// learn about the swr cache key.
import useGeofenceStages from "../../hooks/useGeofenceStages";

const STAGES_API_URL = "https://map.ir/geofence/stages";

function UploadPolygon() {
  const [uploadCount, setUploadCount] = useState<number|null>(null);
  const { setDisplayUpload } = useRoutingContext();
  const { stages: polygon, mutateStages } = useGeofenceStages();
  console.log(polygon)
  const requestUploadGeojson = async (e) => {
    const geoJsonFile = e.target.files[0];
    const formData = new FormData();
    formData.append("polygons", geoJsonFile);
    try {
      const response = await fetch(STAGES_API_URL, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        await mutateStages();
      }

      console.log(data);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching route:", error.message);
    }
  };

  useEffect(() => {
    if (polygon && polygon.value) {
      setDisplayUpload(polygon.value);
      setUploadCount(polygon["odata.count"]);
    }
  }, [polygon, setDisplayUpload]);

  return (
    <>
      <h4 className="text-white ">
        the count of you upload: <p>{uploadCount}</p>{" "}
      </h4>
      <input
        type="file"
        className=" text-white flex "
        onChange={requestUploadGeojson}
      />
    </>
  );
}

export default UploadPolygon;
