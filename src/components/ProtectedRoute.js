// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("access_token");

  // Not logged in
  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Role check (if requiredRole is set)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/myculture" replace />; // redirect to default page
  }

  return children;
};

export default ProtectedRoute;
