import React from "react";
import vehicleImage from "../../assets/authenticationImage.png";
import achieve from "../../assets/Achieve autonomy over your remote assets.png";
import control from "../../assets/Control your remote mining equipments with Durbin.png";
import safemine from "../../assets/SafeMine.png";
import vector from "../../assets/Vector.png";
import companyLogo from "../../assets/companyLogo.png";
import "./layout.css";

function Layout({ children }) {
  return (
    <div className="container">
      <aside className="auth-aside">
        <img className="auth-img" src={vehicleImage} alt="vehicle" />
        <img className="auth-img" src={achieve} alt="Achieve autonomy" />
        <img className="auth-img" src={control} alt="Control your remote" />
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
