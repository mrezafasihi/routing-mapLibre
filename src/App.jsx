import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MapSide from "./components/MapSide";
function App() {
  return (
    <div className="flex w-full h-full bg-black ">
      <Sidebar />
      <MapSide />
    </div>
  );
}

export default App;
