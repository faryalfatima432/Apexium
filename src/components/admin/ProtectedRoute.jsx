import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const admin =
    JSON.parse(localStorage.getItem("admin")) ||
    JSON.parse(sessionStorage.getItem("admin"));

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;