// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // logged in but wrong role → redirect to homepage or unauthorized page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
