import React from "react";
import vehicleImage from "../assets/authenticationImage.png";
import safemine from "../assets/SafeMine.png";
import vector from "../assets/Vector.png";
import companyLogo from "../assets/companyLogo.png";
import "./layout.css";

function Layout({ children }) {
  return (
    <div className="container">
      <aside className="auth-aside">
        <img className="auth-img" src={vehicleImage} alt="vehicle" />
        <p className="text-light fst-roboto fs-2 text-center login-text1">Achieve autonomy over your remote access</p>
        <p className="fs-5 w-75 text-light  text-center login-text2">Control your remote mining equipments with Durbin</p>
      </aside>

      <img className="logo-img" src={companyLogo} alt="company-logo" />
      <main className="auth-main">
        <div className="d-flex justify-content-center align-items-center">
          <img src={safemine} alt="safemine" />
          <img src={vector} alt="Vector" />
        </div>
        {children}
      </main>
    </div>
  );
}

export default Layout;
