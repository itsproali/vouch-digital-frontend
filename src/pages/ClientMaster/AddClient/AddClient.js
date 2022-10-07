import React, { useState } from "react";
import { BsBell, BsPlus } from "react-icons/bs";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import apiClient from "../../../hooks/apiClient";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Add new Client
  const handleAddClient = async (e) => {
    e.preventDefault();
    setLoading(true);
    const companyName = e.target.companyName.value;
    const email = e.target.email.value;
    const website = e.target.website.value;
    const phone = e.target.phone.value;
    const person = e.target.person.value;
    const facilitator = e.target.facilitator.value;
    const formData = new FormData();
    let logo;
    if (image) {
      formData.append("file", image);
      formData.append("upload_preset", "vouch_digital");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/itsproali/image/upload`,
        formData
      );
      logo = res?.data?.url;
    }
    const details = {
      companyName,
      email,
      website,
      phone,
      person,
      facilitator,
      logo,
    };

    const { data } = await apiClient.post("/client", details);
    setLoading(false);
    if (data.success) {
      Swal.fire("Success..!", data.message, "success");
      navigate("/");
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="font-semibold text-2xl">Add Client</h1>
          <p className="text-xs">
            Client Master / Add Client /{" "}
            <span className="text-neutral">Create Profile</span>
          </p>
        </div>
        <button className="btn btn-ghost btn-circle">
          <BsBell />
        </button>
      </div>

      <div className="p-4 bg-white shadow rounded-lg my-6">
        <div className="text-left">
          <h2 className="text-xl font-semibold">Create Client Profile</h2>
          <p className="text-neutral text-xs">
            Add some basic information related to the client
          </p>
        </div>

        <form onSubmit={handleAddClient} className="flex flex-col gap-4 my-6">
          <div className="flex items-center flex-col md:flex-row gap-3">
            <div className="relative">
              <label htmlFor="logo">
                <input
                  type="file"
                  name="logo"
                  id="logo"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <span className="w-32 h-32 border-[2px] rounded-full flex items-center justify-center text-5xl text-accent cursor-pointer">
                  <BsPlus />
                </span>
              </label>
            </div>
            <div className="text-left">
              <h3 className="font-medium">Company Logo</h3>
              <p className="text-xs text-neutral">
                Recommended Logo ratio 1:1 and 120px X 120 px
              </p>
              {image && (
                <span className="text-neutral">
                  <b>selected: </b>
                  {image?.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center flex-col md:flex-row gap-3">
            <div className="w-full">
              <input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="Company Name *"
                required
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary placeholder:text-xs"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                name="website"
                id="website"
                placeholder="Website"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary placeholder:text-xs"
              />
            </div>
          </div>

          <div className="flex items-center flex-col md:flex-row gap-3">
            <div className="w-full">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Company Email Address *"
                required
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary placeholder:text-xs"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                name="phone"
                id="phone"
                required
                placeholder="Phone No *"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary placeholder:text-xs"
              />
            </div>
          </div>

          <div className="flex items-center flex-col md:flex-row gap-3">
            <div className="w-full">
              <input
                type="text"
                name="person"
                id="person"
                placeholder="Contact Person Name *"
                required
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary placeholder:text-xs"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                name="facilitator"
                id="facilitator"
                placeholder="Facilitator"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary placeholder:text-xs"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="submit" className="mt-6">
              <input type="submit" value="" />
              <PrimaryButton>Save & Continue</PrimaryButton>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
