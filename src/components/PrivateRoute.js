import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../api/auth";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = isTokenValid();

  return isAuthenticated ? children : <Navigate to="/home" />;
};

export default PrivateRoute;