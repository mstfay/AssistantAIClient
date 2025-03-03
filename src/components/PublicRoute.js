import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../api/auth";

const PublicRoute = ({ children }) => {
  const isAuthenticated = isTokenValid();
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;