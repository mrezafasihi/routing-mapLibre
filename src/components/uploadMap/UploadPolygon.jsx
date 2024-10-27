import { useEffect, useState } from "react";
import { apiKey } from "../../constants";

function UploadPolygon({setDisplayUpload}) {
  const [uploadCount, setUploadCount] = useState(null);
  const apiUrl = "https://map.ir/geofence/stages";

  const requestUploadGeojson = async (e) => {
    const geoJsonFile = e.target.files[0];
    const formData = new FormData();
    formData.append("polygons", geoJsonFile);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching route:", error.message);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDisplayUpload = async () => {
    try {
      const response = await fetch(apiUrl, {
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
  };
  useEffect(() => {
    handleDisplayUpload();
  }, []);
  return (
    <>
      <h4 className="text-white">
        the count of you upload: <p>{uploadCount}</p>{" "}
      </h4>
      <input
        type="file"
        className="w-full text-white"
        onChange={requestUploadGeojson}
      />
    </>
  );
}

export default UploadPolygon;
