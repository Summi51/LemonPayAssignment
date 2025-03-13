import React from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    message.warning("Please login first!", 2); // Show warning for 2 seconds
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoutes;
