import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="absolute right-0 top-2 z-10 ">
      <button className="navbarButton">
        <Link to={"/"}>routing</Link>
      </button>
      <button className="navbarButton">
        <Link to={"/upload"}>upload</Link>
      </button>
      <button className="navbarButton">search</button>
    </div>
  );
}

export default Navbar;
