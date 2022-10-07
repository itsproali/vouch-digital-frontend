import React, { useEffect, useState } from "react";
import { BsBell, BsSearch, BsDownload } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import apiClient from "../../../hooks/apiClient";
import Swal from "sweetalert2";
import "./ViewClients.css";
import Loading from "../../../components/Loading/Loading";

const ViewClients = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [clients, setClients] = useState([]);
  const [sort, setSort] = useState("companyName");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTotalClient = async () => {
      setLoading(true);
      const { data } = await apiClient.get("/client/total");
      setTotalPage(Math.ceil(data?.data / 15));
      setLoading(false);
    };
    getTotalClient();
  }, [totalPage]);

  useEffect(() => {
    const getAllClient = async () => {
      setLoading(true);
      try {
        const { data } = await apiClient.get(
          `/client?page=${currentPage}&sort=${sort}`
        );
        if (data?.success) {
          setClients(data?.data);
        }
      } catch (error) {
        Swal.fire("Error..!", error.message, "error");
      }
      setLoading(false);
    };
    getAllClient();
  }, [currentPage, sort]);

  const handleApplyFilter = (e) => {
    e.preventDefault();
    setSort(e.target.sort.value || "");
  };

  if (loading) {
    return <Loading />;
  }
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

      {/* Filters */}
      <form
        onSubmit={handleApplyFilter}
        className="flex items-center justify-between p-4 bg-white shadow rounded-lg my-6"
      >
        <div className="flex gap-3">
          <label htmlFor="sort">
            <span>Sort By: </span>
            <select
              name="sort"
              id="sort"
              className="pl-4 pr-8 py-2 rounded-lg border text-neutral focus:outline-none"
            >
              <option value="companyName">Name</option>
              <option value="sites">Sites</option>
              <option value="tenants">Tenants</option>
              <option value="facilitator">Facilitator</option>
            </select>
          </label>

          <button
            className="text-neutral font-semibold ml-2"
            onClick={() => setSort("")}
          >
            Reset
          </button>
        </div>
        <label htmlFor="submit">
          <input type="submit" value="" />
          <button className="px-4 py-2 rounded-lg bg-primary bg-opacity-10 text-primary font-medium hover:bg-opacity-20 duration-300">
            Apply Filters
          </button>
        </label>
      </form>

      {/* Search And Clients Table */}
      <div className="bg-white shadow rounded-lg mb-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between w-full p-4 mb-4">
          <div className="relative">
            <span className="absolute top-3 left-4 text-neutral">
              <BsSearch />
            </span>
            <input
              type="text"
              name="search"
              id="search"
              className="block border rounded-full py-2 pl-10 pr-2 focus:outline-none focus:border-primary"
              placeholder="Search"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              name="column"
              id="column"
              className="px-4 py-2 rounded-lg border text-neutral focus:outline-none"
            >
              <option value="column">Column</option>
              <option value="row">Row</option>
            </select>
            <button className="px-4 py-2 rounded-lg bg-primary bg-opacity-20 text-primary font-medium hover:bg-opacity-30 duration-300 flex items-center gap-3">
              <span>
                <BsDownload />
              </span>
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full text-xs">
            <thead>
              <tr>
                <td>Company Name</td>
                <td>Email Address</td>
                <td>Phone No</td>
                <td>Contact Person</td>
                <td>Facilitator</td>
                <td>Sites</td>
                <td>Tenants</td>
                <td>Tenants Group</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {clients?.map((client) => {
                const {
                  _id,
                  logo,
                  companyName,
                  email,
                  phone,
                  person,
                  facilitator,
                  sites,
                  tenants,
                  tenantsGroup,
                } = client;

                return (
                  <tr key={_id} className="py-6 border-b-accent">
                    <td>
                      <div className="flex items-center gap-3">
                        
                          {logo ? (
                            <img src={logo} alt="logo" className="w-9 h-9 rounded-full" />
                          ) : (
                            <span className="w-9 h-9 rounded-full bg-accent text-lg flex items-center justify-center">{companyName?.slice(0, 1) }</span>
                          )}
                       
                        <span>{companyName || "--"}</span>
                      </div>
                    </td>
                    <td>{email || "--"}</td>
                    <td>{phone || "--"}</td>
                    <td>{person || "--"} </td>
                    <td>{facilitator || "--"}</td>
                    <td>{sites || "--"}</td>
                    <td>{tenants || "--"}</td>
                    <td>{tenantsGroup || "--"}</td>
                    <td className="text-center">
                      <button className="btn btn-ghost btn-circle btn-sm">
                        <FiMoreVertical />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 ml-4 pb-4 flex items-center gap-3">
          {[...Array(totalPage).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page)}
              className={`py-2 px-4 rounded-lg duration-300 ${
                page === currentPage ? "bg-primary text-white" : "text-neutral"
              } `}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewClients;
