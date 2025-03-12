import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AuthRouter = ({ redirect = "/" }) => {
  const { user } = useAuth();
 

  if (user) return <Navigate to={redirect} />;

  return <Outlet />;
};

export default AuthRouter;
