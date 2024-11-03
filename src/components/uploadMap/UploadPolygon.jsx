import { useCallback, useEffect, useState } from "react";
import { apiKey } from "../../constants";
import { useRoutingContext } from "../../context/RoutingContext";

const STAGES_API_URL = "https://map.ir/geofence/stages";

function UploadPolygon() {
  const [uploadCount, setUploadCount] = useState(null);
  const { setDisplayUpload } = useRoutingContext();

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
        await fetchDisplayPolygon();
      }
      console.log(data);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching route:", error.message);
    }
  };
  const fetchDisplayPolygon = useCallback(async () => {
    try {
      const response = await fetch(STAGES_API_URL, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });
      const data = await response.json();
      setUploadCount(data["odata.count"]);
      setDisplayUpload(data.value);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching route:", error.message);
    }
  }, [setDisplayUpload]);
  useEffect(() => {
    fetchDisplayPolygon();
  }, [fetchDisplayPolygon]);

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
