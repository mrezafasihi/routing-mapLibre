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
    alert("in the range");
    console.log(data);
  } catch (error) {
    alert("not in range");
    console.error("Error fetching route:", error.message);
  }
};

export const deleteThePointSelected = async (id, setIsDeleteing) => {
  // [x]: use a better name!!!!!!!!! apiUrl is so freaking general. be more specific.
  const apiUrlForDisplayPolygon = `https://map.ir/geofence/stages/${id}`;

  try {
    const response = await fetch(apiUrlForDisplayPolygon, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    alert(error);
    console.error("Error fetching route:", error.message);
  } finally {
    setIsDeleteing(false);
  }
};
