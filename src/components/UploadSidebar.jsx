import { useState } from "react";
import { apiKey } from "../constants";

function UploadSidebar() {
  const requestUploadGeojson = async (e) => {
    const geoJsonFile = e.target.files[0];
    const apiUrl = "https://map.ir/geofence/stages";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          geoJsonFile,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching route:", error.message);
    }
  };
  return (
    <div className="flex flex-col w-[30%] h-screen">
      <h4>the count of you upload:</h4>
      <input
        type="file"
        className="w-full text-white"
        onChange={requestUploadGeojson}
      />
    </div>
  );
}

export default UploadSidebar;
