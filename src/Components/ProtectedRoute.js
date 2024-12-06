import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  // Check if token exists and is still valid
  const isTokenValid = token && tokenExpiration && Date.now() < parseInt(tokenExpiration, 10);

  if (!isTokenValid) {
    console.log("Token is invalid or expired. Redirecting to login...");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    return <Navigate to="/" />;
  }

  // If token is valid, render the child component
  return children;
};

export default ProtectedRoute;
