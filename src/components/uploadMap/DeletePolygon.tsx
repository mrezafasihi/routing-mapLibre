import React, { useState } from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import { deleteThePointSelected } from "../../utils/api";
import useSWR,{mutate} from "swr";

function DeletePolygon() {
  const { mapRef } = useRoutingContext();
  const [polygonId,setPolygonId]=useState<number>()
  // const {data,error}=useSWR(polygonId ? `https://map.ir/geofence/stages/${polygonId}` : null)
  
  const handleChooseDelete = (e) => {
    if (!mapRef?.current) return;

    const [selectedPolygon] = mapRef.current.queryRenderedFeatures(e.point);
    mapRef.current.off("click", handleChooseDelete);
    deleteThePointSelected(selectedPolygon.properties?.polygonId);
    // setPolygonId(selectedPolygon.properties?.polygonId)
    mutate(`https://map.ir/geofence/stages`);

  };
  const deletePolygonButton = () => {
    mapRef?.current?.on("click", handleChooseDelete);
  };
  return (
    <button className="uploadButton " onClick={deletePolygonButton}>
      DeletePolygon
    </button>
  );
}

export default DeletePolygon;
