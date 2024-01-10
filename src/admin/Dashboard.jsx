import React, { useState } from "react";
import "./admin.css";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_LOCATION } from "../config";
import Status from "../compoment/Status";
import io from "socket.io-client";
import FireDetection from "../compoment/FireDetection";
import NitrogenRelease from "../compoment/NitrogenRelease";
import ManualDetection from "../compoment/ManualDetection";
import ReleaseFault from "../compoment/ReleaseFault";
import { Dna } from "react-loader-spinner";
import DeviceCreate from "../device/DeviceCreate";
import Device from "../compoment/Devices/Device";
import Admin from "./Admin";

const WSocket = io(BACKEND_LOCATION);


const Dashboard = ({role, company}) => {
  const navigate = useNavigate();
  const [loaderState, setLoaderState] = React.useState(0);
  const [alldata, setalldata] = React.useState([]);
  const [allcompany_name, setallcompany_name] = React.useState([]);
  const [company_name, setcompany_name] = React.useState(company);
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    console.log(role)
    console.log(company);
    if (
      localStorage.getItem("x_access_token") === undefined ||
      localStorage.getItem("x_access_token") === null
    ) {
      navigate(`login`);
    }

    if(role=="admin"){
      (async ()=> {
        try {
          const resp = await axios.get(`${BACKEND_LOCATION}get_companies`, {
            headers: {
              "x-access-tokens": `${localStorage.getItem("x_access_token")}`,
            },
          })
          setallcompany_name(resp.data.companies)
          setcompany_name(resp.data.companies[0])
          const getDeviceResp = await axios.get(`${BACKEND_LOCATION}get-company-devices?company_name=${resp.data.companies[0]}`,
          {
            headers: {
              "x-access-tokens": `${localStorage.getItem( "x_access_token")}`,
            },
          }
          )
          
          setLoaderState(1);
          setalldata(getDeviceResp.data.devices);
        } catch (error) {
          console.log(error.msg)
        }
      })()
    }

    else {
      (async ()=>{
        const getDeviceResp = await axios.get(`${BACKEND_LOCATION}get-company-devices?company_name=${company}`,
          {
            headers: {
              "x-access-tokens": `${localStorage.getItem( "x_access_token")}`,
            },
          }
          )
          setLoaderState(1);
          setalldata(getDeviceResp.data.devices);
      })()
    }

    // axios
    //   .get(`${BACKEND_LOCATION}get_companies`, {
    //     headers: {
    //       "x-access-tokens": `${localStorage.getItem("x_access_token")}`,
    //     },
    //   })
    //   .then((res) => {
    //     setallcompany_name(res.data.companies);
    //     setcompany_name(res.data.companies[0]);
    //     console.log(res.data.companies);
    //     console.log(company_name);
    //     if (company_name === "") {
    //       console.log("if company null")
    //       axios
    //         .get(
    //           `${BACKEND_LOCATION}get-company-devices?company_name=${res.data.companies[0]}`,
    //           {
    //             headers: {
    //               "x-access-tokens": `${localStorage.getItem(
    //                 "x_access_token"
    //               )}`,
    //             },
    //           }
    //         )
    //         .then((response) => {
    //           if (
    //             response.status === 200 &&
    //             response.data.devices !== undefined
    //           ) {
    //             setLoaderState(1);
    //             setalldata(response.data.devices);
    //           } else {
    //             navigate(`/login`);
    //           }
    //         })
    //         .catch((error) => {
    //           navigate(`/login`);
    //           console.log("check")
    //         });
    //     } else {
    //       console.log("if not null");
    //       axios
    //         .get(
    //           `${BACKEND_LOCATION}get-company-devices?company_name=${company_name}`,
    //           {
    //             headers: {
    //               "x-access-tokens": `${localStorage.getItem(
    //                 "x_access_token"
    //               )}`,
    //             },
    //           },
    //           { withCredentials: true }
    //         )
    //         .then((response) => {
    //           if (
    //             response.status === 200 &&
    //             response.data.devices !== undefined
    //           ) {
    //             setLoaderState(1);
    //             setalldata(response.data.devices);
    //           } else {
    //             navigate(`/login`);
    //             console.log("check")
    //           }
    //         })
    //         .catch((error) => {
    //           navigate(`/login`);
    //           console.log("check")
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     navigate(`/login`);
    //     console.log("check")
    //   });

      
        WSocket.on("connect", ()=> {
          WSocket.emit("my_event", "hi server I am client")
        })
    


  }, []);
 
  const changeValue = (e) => {
    setcompany_name(e.target.value);
    setLoaderState(0);
    axios
      .get(
        `${BACKEND_LOCATION}get-company-devices?company_name=${e.target.value}`,
        {
          headers: {
            "x-access-tokens": `${localStorage.getItem("x_access_token")}`,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200 && response.data.devices !== undefined) {
          setLoaderState(1);
          setalldata(response.data.devices);
        } else {
          navigate(`/login`);
          console.log("check")
        }
      })
      .catch((error) => {
        navigate(`/login`);
        console.log("check")
      });
  };

  console.log(alldata)
  if (loaderState === 1) {
    return (
        <div className="dashboard-container">
          <div className="fillterRow">
           {role=="admin" && <div className="select-company">
              <select value={company_name} onChange={changeValue} id="companys">
                {allcompany_name.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>}
            {role=="admin" && <button
              to="/createdevice"
              className="addDevicebtn"
              onClick={handleShow}
            >
              <span class="material-symbols-outlined">add</span>add device
            </button>}
          </div>
          <br />
          <br />
          <div className="DataTable">
            <table className="table table-custom">
              <thead>
                <tr>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      Vehicle No
                    </div>
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      Type of System
                    </div>
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">System Status</div>
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      Fire Detected
                    </div>
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      System Discharged
                    </div>{" "}
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      Manual Discharged
                    </div>{" "}
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      System Fault
                    </div>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {alldata.map((data) => {
                        console.log(company);

                  return (
                    <Device data={data} socket={WSocket} company_name={company_name} source="dashboard" />
                  );
                })}
              </tbody>
            </table>
          </div>
          <DeviceCreate show={show} hideModal={handleClose} loader={setLoaderState} addDvInfo={alldata[0]} company={company_name}/>
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

export default Dashboard;
