import React, { useState } from "react";
import { useRoutingContext } from "../../context/RoutingContext";
import { deleteThePointSelected } from "../../utils/api";
import useGeofenceStages from "../../hooks/useGeofenceStages";

// [x]: write a wrapper for the swr call that gets /stages. (useGeofenceStages)
// result: const { stages, isStagesLoading, mutateStages } = useGeofenceStages()

function DeletePolygon() {
  const { mapRef } = useRoutingContext();
  const { mutateStages } = useGeofenceStages();
  const [isDeleting, setIsDeleteing] = useState(false);
  const handleChooseDelete = async (e) => {
    if (!mapRef?.current) return;

    const [selectedPolygon] = mapRef.current.queryRenderedFeatures(e.point);

    // [x]: add async await you silly goose
    // [x]: also add loading state (maybe a 'loading...' string below the button)
    await deleteThePointSelected(
      selectedPolygon.properties?.polygonId,
      setIsDeleteing
    );
    console.log("first");
    // [x]: mutate returns a promise.
    await mutateStages();
    mapRef.current.off("click", handleChooseDelete);
  };

  const deletePolygonButton = () => {
    mapRef?.current?.on("click", handleChooseDelete);
  };
  return (
    <>
      <button className="uploadButton " onClick={deletePolygonButton}>
        Delete Polygon
      </button>
      {isDeleting && <p>loading ...</p>}
    </>
  );
}

export default DeletePolygon;
