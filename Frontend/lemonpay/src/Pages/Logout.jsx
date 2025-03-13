import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    message.success("Logged out successfully!", 2); // Message disappears in 2 seconds

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
