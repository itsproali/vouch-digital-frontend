import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase-init";
import Loading from "../../components/Loading/Loading";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const [user, loading] = useAuthState(auth);
  const currentPath = useLocation().pathname;

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("token");
  };

  if (loading) {
    return <Loading />;
  }

  const links = [
    {
      title: "View Clients",
      path: "/",
    },
    { title: "Add Client", path: "/add-client" },
  ];
  return (
    <div className="flex flex-col justify-between bg-white h-screen px-4 py-6 sticky top-0 left-0">
      <div className="">
        <h1 className="text-xl font-semibold mb-4">Vouch Digital</h1>
        <div className="w-full relative mb-4">
          <label htmlFor="search">
            <span className="absolute top-3 left-3">
              <FiSearch />
            </span>
            <input
              type="text"
              name="search"
              id="search"
              className="block rounded-full border py-2 pl-9 pr-2 text-accent focus:outline-none focus:border-primary w-full"
              placeholder="Search Modules"
            />
          </label>
        </div>

        <h3 className="text-accent font-medium">CLIENT MASTER</h3>
        <div className="flex flex-col gap-3 my-4">
          {links?.map((link) => (
            <Link key={link?.title} to={link?.path}>
              <button
                className={`${
                  currentPath === link?.path
                    ? "bg-primary text-white"
                    : "text-neutral hover:bg-primary hover:bg-opacity-10"
                } font-medium w-full text-left py-2 px-4 rounded-lg duration-300`}
              >
                {link?.title}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="">
          <h2 className="font-medium">{user?.displayName}</h2>
          <p className="text-xs">{user?.email}</p>
        </div>
        <button onClick={handleLogout}>
          <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default SideNav;
