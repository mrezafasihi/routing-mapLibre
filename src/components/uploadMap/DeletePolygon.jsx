import { useRoutingContext } from "../../context/RoutingContext";
import { deleteThePointSelected } from "../../utils/api";

function DeletePolygon() {
  const { mapRef } = useRoutingContext();

  const handleChooseDelete = (e) => {
    const [selectedPolygon] = mapRef.current.queryRenderedFeatures(e.point);
    console.log(selectedPolygon.properties.polygonId);
    deleteThePointSelected(selectedPolygon.properties.polygonId);
  };
  const deletePolygonButton = () => {
    mapRef.current.on("click", handleChooseDelete);
  };
  return (
    <button className="bg-white" onClick={deletePolygonButton}>
      DeletePolygon
    </button>
  );
}

export default DeletePolygon;
