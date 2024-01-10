import React from "react";
import "./style.css";
import vector from "../../assets/department.png";
import dashboard from "../../assets/Vectordashboard.svg";
import inactiveDashboard from "../../assets/inactiveDashboard.svg"
import activeSettings from "../../assets/activeSettings.svg"
import inactiveSettings from "../../assets/inactiveSettings.svg"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {setUser, setToken} from "../../slicers/UserSlice"
function Sidebar({active, setActive, role, company}) {

  
  const [user, setUser] = useState();
  const navigate = useNavigate();
  // const dispatch = useDispatch()

  useEffect(()=>{
    // dispatch(setUser(localStorage.getItem("userAuth")));
    if(role === 'admin'){
      setUser(role)
    }
    else 
    {
      setUser(company)
    }
  },[])

  const changeSideMenu = (value) => {
    switch (value) {
      case 1:
        {
          setActive("dashboard")
          break;
        }
      case 2: 
      {
        setActive("settings")
        break;
      }
    
      default:
        break;
    }
  }

  return (
    <aside>
      <div className="section-container">
        <label className="dropdown-list d-flex justify-content-around align-items-center p-2 mt-0">
          <img
            src={vector}
            alt="vector sign"
            style={{ width: "32.74px", height: "40.93px" }}
          />
          <div className="d-flex flex-column align-items-start justify-content-between">
            <select className="department">
              <option value="AFDS" selected>
                AFDSS
              </option>
              <option value="ADAS">ADAS </option>
            </select>
            <span className="authority-tag">{user}</span>
          </div>
        </label>
        
        <div className={`dashboard ${active === "dashboard" ? 'active': ''}`} >
        {active ==="dashboard" &&
          <><div className="upper-wht"></div>
        <div className="upper-blue"></div>
        <div className="lower-wht-dashboard"></div>
        <div className="lower-blue-dashboard"></div></>}
          <img
            src={active ==="dashboard" ? dashboard : inactiveDashboard}
            alt="dashboard"
            style={{ width: "1.688rem", height: "1.875rem" }}
          />
          <Link to='/admin' className="link-style" > 
            <span className={active ==="dashboard"? 'active-text':'inactive-text'} onClick={()=>changeSideMenu(1)}>Dashboard</span>
          </Link>
        </div>
        <div className={`settings ${active === "settings" ? 'active': ''}`} >
        {active ==="settings" &&
          <><div className="upper-wht"></div>
        <div className="upper-blue"></div>
        <div className="lower-wht"></div>
        <div className="lower-blue"></div></>}
        <img
            src={active ==="settings" ?activeSettings: inactiveSettings}
            alt="settings"
            style={{ width: "1.688rem", height: "1.875rem" }}
          />
          <Link to={`settings`} className="link-style" >
            <span className={active ==="settings"? 'active-text':'inactive-text'} onClick={()=>changeSideMenu(2)}>Settings</span>
          </Link>
        </div>
      </div>
      
    </aside>
  );
}

export default Sidebar;
