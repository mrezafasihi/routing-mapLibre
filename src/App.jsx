import "./App.css";
import Sidebar from "./components/Sidebar";
import MapSide from "./components/MapSide";
import mapboxgl from "mapbox-gl";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UploadSidebar from "./components/uploadMap/UploadSidebar";

mapboxgl.accessToken ="pk.eyJ1IjoicHJvdGFyZ2V0IiwiYSI6ImNtMmZ6c3c4ajBlbWcycXNhOGRqN2tvdWcifQ.mlPpxj_f7imo_T4Z7Ea_rw"
mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js",
  null,
  true
);

function App() {
  return (
    <div className="flex w-full h-full bg-black ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/upload" element={<UploadSidebar />} />
      </Routes>
      <MapSide />
     
    </div>
  );
}

export default App;
