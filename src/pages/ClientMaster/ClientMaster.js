import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

const ClientMaster = () => {
  return (
    <div className="flex">
      <div className="w-[30%]">
        <SideNav />
      </div>
      <div className="bg-accent w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientMaster;
