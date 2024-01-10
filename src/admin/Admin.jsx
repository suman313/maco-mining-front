import React, { useEffect, useState } from "react";
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
import Loader from "react-js-loader";

const Admin = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [company_name, setCompany_name] = useState(
    localStorage.getItem("company_name")
  );
  const [logout, setLogout] = useState(1);
  useEffect(() => {
    setLogout(1);
    setRole(localStorage.getItem("role"));
    setCompany_name(localStorage.getItem("company_name"));
  }, []);

  const reloadall = async () => {
    setLogout(0);
    setTimeout(() => {
      localStorage.clear();
      setLogout(1);
      navigate("/login");
    }, 1000);
  };

  if (logout === 1) {
    return (
      <div className="layout">
        <Sidebar
          active={active}
          setActive={setActive}
          role={role}
          company={company_name}
        />
        <div className="logout" onClick={reloadall}>
          Logout
          <span className="material-symbols-outlined">logout</span>
        </div>
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={<Dashboard role={role} company={company_name} />}
            />
            <Route
              exact
              path="/settings"
              element={<Settings role={role} company={company_name} />}
            />
            <Route
              exact
              path="/devicestatus/:id/:company"
              element={<DeviceStatus role={role} company={company_name} />}
            />
            <Route exact path="/map" element={<MapsRenderer />} />
          </Routes>
        </main>
      </div>
    );
  } else {
    return (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100vw", height:"100vh"}}>
        <Loader
          type="box-rotate-x"
          bgColor={"#F5CBA7"}
          title={"box-rotate-x"}
          color={"#FFFFFF"}
          size={200}
        />
      </div>
    );
  }
};

export default Admin;
