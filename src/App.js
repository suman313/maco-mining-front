import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Admin from "./admin/Admin";
import Company from "./company/Company";
import DeviceCreate from "./device/DeviceCreate";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import { useEffect, useState } from "react";
import Dashboard from "./admin/Dashboard";
import Settings from "./compoment/Settings/Settings";
import DeviceStatus from "./admin/DeviceStatus/DeviceStatus";
import CompanySignup from "./Authentication/CompanySignup";
import AdminEngSignup from "./Authentication/AdminEngSignup";
import CompanyEngineerSignup from "./Authentication/CompanyEngineerSignup";
// import CompanyLogin from "./company/Authentication/Login";
// import CompanySignup from "./company/Authentication/Signup";

localStorage.clear();

function App() {
  const [currentUser, setCurrentUser] = useState("");
  return (
    <BrowserRouter basename="/">
      <Routes >
      <Route path="/" element={<Login setUser={setCurrentUser} />}  />
        <Route path="/login" element={<Login setUser={setCurrentUser} />}  />
        <Route path="/admin_signup" element={<Signup />} />
        <Route path="/admin_engineer_signup" element={<AdminEngSignup/>} />
        <Route path="/company_signup" element={<CompanySignup />} />
        <Route path="/company_engineer_signup" element={<CompanyEngineerSignup />} />
        <Route path="/admin/*" element={<Admin user={currentUser} setUser={setCurrentUser}/>} />
        <Route path="/company/*" element={<Company user={currentUser} setUser={setCurrentUser}/>} />
        {/* <Route path="/admin" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/devicestatus/:id/:company" element={<DeviceStatus />} />
        <Route path="/createdevice" element={<DeviceCreate />} /> */}
        {/* <Route path="/login" element={<CompanyLogin />} />
        <Route path="/signup" element={<CompanySignup />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
