import "./App.css";
import React from "react";
import RoutingSidebar from "./components/RoutingSidebar";
import MapSide from "./components/MapSide";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UploadSidebar from "./components/uploadMap/UploadSidebar";
import { SWRConfig } from "swr";
import swrConfig from "./utils/swrConfig";

function App() {
  return (
    <div className="flex w-full h-full bg-black ">
      <SWRConfig value={swrConfig}>
        <Navbar />
        <Routes>
          <Route path="/" element={<RoutingSidebar />} />
          <Route path="/upload" element={<UploadSidebar />} />
        </Routes>
        <MapSide />
      </SWRConfig>
    </div>
  );
}

export default App;
