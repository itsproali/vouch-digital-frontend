import React from "react";
import { BsBell } from "react-icons/bs";

const AddClient = () => {
  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="font-semibold text-2xl">Add Client</h1>
          <p className="text-xs">
            Client Master / Add Client / <span className="text-neutral">Create Profile</span>
          </p>
        </div>
        <button className="btn btn-ghost btn-circle">
          <BsBell />
        </button>
      </div>

    </div>
  );
};

export default AddClient;
