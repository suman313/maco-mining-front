import React, { useEffect } from "react";
import { AiOutlineStepBackward } from "react-icons/ai";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { RiNotification3Fill, RiLogoutCircleRLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import MapsRenderer from "../compoment/MapsRender/MapsRenderer";
import Dashboard from "./Dashboard";
import DeviceStatus from "./DeviceStatus/DeviceStatus";
import styled from "styled-components";
import Sidebar from "../compoment/Sidebar/Sidebar";
import Settings from "../compoment/Settings/Settings";

const Admin = ({children}) => {
  const navigate = useNavigate();

  
  const reloadall = async () => {
    setTimeout(() => {
      localStorage.clear();
      navigate('/login')
    }, 1000);
  };

  return (
    <div className="layout">
      <Sidebar  />
      <div className="logout" onClick={reloadall}>
        Logout
        <span className="material-symbols-outlined">logout</span>
      </div>
      <main>
        {/* <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/devicestatus/:id/:company" element={<DeviceStatus />} />
          <Route exact path="/map" element={<MapsRenderer />} />
        </Routes> */}
        {children}
      </main>
    </div>
  );
};

export default Admin;
