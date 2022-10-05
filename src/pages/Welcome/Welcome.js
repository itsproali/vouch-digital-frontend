import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import rectangle_back from "../../assets/rectangle-back.png";
import rectangle_front from "../../assets/rectangle-front.png";

const Welcome = () => {
  const [authentication, setAuthentication] = useState("login");
  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="w-full md:w-[45%] h-screen bg-white flex items-center pt-8 md:pt-24 flex-col">
        {authentication === "login" ? (
          <Login setAuthentication={setAuthentication} />
        ) : (
          <Register setAuthentication={setAuthentication} />
        )}
        <div className="mt-auto mb-2">
          <div className="flex items-center gap-5 font-semibold">
            <Link to="/">Terms of Use</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
          <p className="text-xs">
            &copy; Vouch Digital 2022. All Rights Reserved
          </p>
        </div>
      </div>
      <div className="hidden md:flex w-[55%] h-screen bg-primary flex items-center justify-center flex-col gap-12">
        <div className="relative w-[90%] h-[70%] flex items-center justify-center">
          <img
            src={rectangle_back}
            alt="rectangle back"
            className="block max-w-ful max-h-full absolute top-0 right-0 bottom-0 left-0 m-auto"
          />
          <img src={rectangle_front} alt="rectangle front" className="block max-w-full max-h-full" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">
            360° Solution for Asset Management
          </h2>
          <p className="text-xs text-accent max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
