import { useRoutingContext } from "../../context/RoutingContext";
import { deleteThePointSelected } from "../../utils/api";

function DeletePolygon() {
  const { mapRef } = useRoutingContext();

  const handleChooseDelete = (e) => {
    const [selectedPolygon] = mapRef.current.queryRenderedFeatures(e.point);
    mapRef.current.removeLayer(selectedPolygon.layer.id);
    mapRef.current.removeSource(selectedPolygon.source);
    mapRef.current.off("click",handleChooseDelete)
    // deleteThePointSelected(selectedPolygon.properties.polygonId);
  };
  const deletePolygonButton = () => {
    mapRef.current.on("click", handleChooseDelete);
  };
  return (
    <button className="uploadButton " onClick={deletePolygonButton}>
      DeletePolygon
    </button>
  );
}

export default DeletePolygon;
