import React from "react";

const PrimaryButton = ({ children, className, onClick }) => {
  return (
    <button
      className={`${className} py-3 px-4 text-white bg-primary rounded-lg uppercase font-semibold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
