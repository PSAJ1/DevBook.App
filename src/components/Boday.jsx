import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
const Boday = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Boday;
