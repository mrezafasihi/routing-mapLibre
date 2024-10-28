import { apiKey } from "../constants";

export const checkIsPointInGeofenceRange = async (lng, lat) => {
    const apiUrl = `https://map.ir/geofence/boundaries?lat=${lat}&lon=${lng}`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert("in the range")
      console.log(data);
    } catch (error) {
      alert("not in range");
      console.error("Error fetching route:", error.message);
    }
  };

  