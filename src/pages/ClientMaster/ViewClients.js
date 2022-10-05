import React from "react";
import { BsBell } from "react-icons/bs";

const ViewClients = () => {
  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="font-semibold text-2xl">View Clients</h1>
          <p className="text-xs">
            Client Master / <span className="text-neutral">View Clients</span>
          </p>
        </div>
        <button className="btn btn-ghost btn-circle">
          <BsBell />
        </button>
      </div>

    </div>
  );
};

export default ViewClients;