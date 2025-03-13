import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import TaskManagement from "../Pages/TaskManagement";
import PrivateRoutes from "./PrivateRoutes";
import Logout from "../Pages/Logout";


const AllRoutes = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path="/sign-up" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route 
        path="/task-manage" 
        element={
          <PrivateRoutes>
            <TaskManagement />
          </PrivateRoutes>
        } 
      />
    </Routes>

  );
};

export default AllRoutes;