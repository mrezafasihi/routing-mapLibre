import React from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import { deleteThePointSelected } from "../../utils/api";

function DeletePolygon() {
  const { mapRef } = useRoutingContext();

  const handleChooseDelete = (e) => {
    if (mapRef && mapRef.current) {
      const [selectedPolygon] = mapRef.current.queryRenderedFeatures(e.point);
      mapRef.current.off("click", handleChooseDelete);
      deleteThePointSelected(selectedPolygon.properties?.polygonId);
    }
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
