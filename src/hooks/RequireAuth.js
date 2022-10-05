import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import auth from "../firebase-init";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const token = localStorage.getItem("token")
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user || !token) {
    return <Navigate to="/start" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default RequireAuth;
