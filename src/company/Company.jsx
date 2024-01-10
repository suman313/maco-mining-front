import React, { useState } from "react";
import { AiOutlineStepBackward } from "react-icons/ai";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { RiNotification3Fill, RiLogoutCircleRLine } from "react-icons/ri";
import DeviceCreate from "../device/DeviceCreate";
import EventPage from "../device/EventPage";
import Dashboard from "./Dashboard";
import DeviceStatus from "../admin/DeviceStatus/DeviceStatus";
import VideosLogs from "./VideosLogs";
import styled from "styled-components";
import { MdAdminPanelSettings } from "react-icons/md";
import Sidebar from "../compoment/Sidebar/Sidebar";
import Settings from "../compoment/Settings/Settings";

const Company = () => {
  const navigate = useNavigate();
  
  const [active, setActive] = useState("dashboard")

  const reloadall = async () => {
    setTimeout(() => {
      localStorage.clear();
      navigate('/login')
    }, 1000);
  };

  const [num, seNum] = React.useState(0);
  React.useEffect(() => {
    if (window.location.pathname === "/logs") {
      seNum(1);
    }
  }, []);
  return (
    <div className="layout">
      <Sidebar active={active} setActive={setActive} />
      <div className="logout" onClick={reloadall}>
        Logout
        <span className="material-symbols-outlined">logout</span>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/device" element={<DeviceCreate />} />
          <Route path="/devicestatus/:id/:company" element={<DeviceStatus />} />
          <Route path="/logs" element={<VideosLogs />} />
        </Routes>
      </main>
    </div>
  );
};

export default Company;
