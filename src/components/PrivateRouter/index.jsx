import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRouter = ({ redirect = "" }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to={redirect} />;

  return <Outlet />;
};

export default PrivateRouter;
