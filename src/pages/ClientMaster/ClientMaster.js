import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

const ClientMaster = () => {
  return (
    <div className="flex">
      <div className="w-[20%] relative">
        <SideNav />
      </div>
      <div className="bg-accent w-[80%] p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientMaster;
