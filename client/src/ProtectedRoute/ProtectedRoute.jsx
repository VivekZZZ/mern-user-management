import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const ProtectedRoute = () => {
  let { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
