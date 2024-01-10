import React from "react";
import "./style.css";

import { IoReloadCircle, IoReloadCircleSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Trigger from "../../compoment/Trigger/Trigger"
import Status from "../../compoment/Status";
import FireDetection from "../../compoment/FireDetection";
import NitrogenRelease from "../../compoment/NitrogenRelease";
import ManualDetection from "../../compoment/ManualDetection";
import DeviceCreate from "../../device/DeviceCreate";
import { BACKEND_LOCATION, BACKEND_LOCATION1 } from "../../config";
import MapsRenderer from "../../compoment/MapsRender/MapsRenderer";
import ReleaseFault from "../../compoment/ReleaseFault";
import { Dna } from "react-loader-spinner";
import LogTable from "./LogTable";
import Device from "../../compoment/Devices/Device";
import io from "socket.io-client";
import Admin from "../Admin";


const WSocket = io(BACKEND_LOCATION);


const DeviceStatus = ({role, company}) => {
  const navigate = useNavigate();
  const parameter = useParams();
  const formData = new FormData();
  const id = parameter.id;
  const company_name = parameter.company;
  const [loaderState, setLoaderState] = React.useState(0);
  const [specificDevice, setSpecificDevice] = React.useState([]);
  const [Maintenancea, setMaintenance] = React.useState([]);
  
  const [allDevice, setAllDevice] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [updateMode, setUpdateMode] = React.useState("Add Maintenance");
  const [currentUser, setCurrentUser] = React.useState("");
  const [status, setStatus] = React.useState(false);
   
  const [xToken, setXToken] = React.useState(""); 
  const handleClose = () => {
    setUpdateMode("Add Maintenance")
    setShow(false)
    setSpecificDevice([])
     return true;
  };
  const handleShow = () => setShow(true);
  const [gps, setGps] = React.useState([]);
  

  React.useEffect(() => {
    if(id === undefined) return window.location.href = 'http://localhost:3000/login'
    if(localStorage.getItem("admin_access_token")){
      setCurrentUser("admin");        
      setXToken(localStorage.getItem("x_access_token"))
    } 
    else if(localStorage.getItem("x_access_token")) {
        setCurrentUser("company");
        setXToken(localStorage.getItem("x_access_token"))
    }
    else {
      navigate('/login');
    }
    
    verrifyCompany();
  }, []);
  

  const verrifyCompany = async () => {
    let x_access_token = "";
    if(localStorage.getItem("x_access_token")){
       x_access_token = localStorage.getItem("x_access_token");
       console.log(x_access_token)
    }
    else {
       x_access_token = localStorage.getItem("x_access_token");
       console.log(x_access_token)
    }
    const resp = await axios
      .get(
        `${BACKEND_LOCATION}get-device-details?device_id=${id}&company_name=${company_name}`,
        {
          headers: {
            "x-access-tokens": `${x_access_token}`,
          },
        },
        { withCredentials: true }
      )
      .catch(() => {
        // navigate("/admin/login")
      });
      console.log(resp)
    if (resp.status === 200 && resp.data !== "valid token is missing") {
      setLoaderState(1);
      setAllDevice([resp.data]);
      console.log(allDevice)
    } else {
      // navigate("/admin/login")
    }
  };

  
  console.log(xToken)

  if (loaderState === 1) {
    return (
      <div className="whole-device-section">
        <div className="details-section">
          <div className="device-info">
            <div className="first-sec">
              <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="device-head">{allDevice[0].vehicle_no}</div>
                <div className="device-body"> Vehicle No: </div>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="device-head">{allDevice[0].device_name}</div>
                <div className="device-body">System Name</div>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="device-head">**********</div>

                <div className="device-body">password</div>
              </div>
            </div>
            <div>
              {allDevice.map((data) => {
                return (
                  <div key={data.system_id} className="second-sec">
                    <Device data={data} socket={WSocket} company_name={company_name} source="deviceCreate" setGps={setGps}/>
                  </div>
                );
              })}
            </div>
            <div className="third-sec">
             {role!=="company-engineer"&&<Trigger allData={allDevice[0]} />}
              {(role =="admin" || role =="service-engineer") && <button className="maintenance-btn" onClick={handleShow}>
                <span style={{ marginLeft: "5px" }}>create Maintenance</span>
                <span class="material-symbols-outlined">add_circle</span>
              </button>}
            </div>
          </div>
          <DeviceCreate
            show={show}
            hideModal={handleClose}
            values={allDevice[0]}
            company={company_name}
            updateMode={updateMode}
            specificDevice={specificDevice}
          />
          <MapsRenderer data_id={allDevice[0].system_id} socket={WSocket}  gps={gps} />
        </div>
        
          <LogTable id={id} allDevice={allDevice} handleShow={handleShow} setUpdateMode={setUpdateMode} setSpecificDevice={setSpecificDevice} role={role}/>

      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dna
          visible={true}
          height="400"
          width="400"
          ariaLabel="dna-loading"
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }
};

export default DeviceStatus;
