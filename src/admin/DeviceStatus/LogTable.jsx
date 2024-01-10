import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import { BACKEND_LOCATION, BACKEND_LOCATION1 } from "../../config";
import axios from "axios";
import Geocode from "react-geocode";


import "./style.css";

var s = 0;


function LogTable({ id, allDevice, handleShow, setUpdateMode, setSpecificDevice, role }) {
  const [toggle, setToggle] = useState(1);
  const [allMaintenancedata, setMaintenacedata] = useState([]);
  const [alldata, setalldata] = React.useState([]);
  const [gpsLogs, setGpsLogs] = React.useState([]);
  const [latLong, setLatLong] = React.useState({});
  const [address, setAddress] = React.useState("");
  const formData = new FormData();
  let x_access_token = localStorage.getItem("x_access_token");
  

  useEffect(() => {
    findLogs();
    findMaintenance();
    getGpsLogs();
  }, []);
  const findMaintenance = () => {
    formData.append("vehicle_no", allDevice[0].vehicle_no);
    axios
      .post(
        `${BACKEND_LOCATION}fetch-maintenance-list`,
        formData,
        {
          headers: {
            "x-access-tokens": `${x_access_token}`,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response)
        setMaintenacedata(response.data.records);
      });
  };
  const findLogs = async () => {
    try {
      const resp = await axios.get(
        `${BACKEND_LOCATION}get_logs?limit=50&system_id=${id}`,
        {
          headers: {
            "x-access-tokens": `${x_access_token}`,
          },
        },
        { withCredentials: true }
      );
      // console.log(resp);
      setTimeout(() => {
        setalldata(resp.data.records);
      }, 2000);

      setTimeout(() => {
        s = s + 1;
        if (s === 1) {
          findLogs();
          s = s - 1;
        } else {
          console.log("hello");
        }
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const getGpsLogs = async ()=>{
    try {
      const {data} = await axios.get(`${BACKEND_LOCATION}get_gps_logs?limit=10&system_id=${id}`,{
        headers: {
          "x-access-tokens": `${x_access_token}`,
        },
      })
      setGpsLogs(data.records);
      
    } catch (error) {
      console.log(error)
    }
  }

  const updateMaintenance = async (serial_no)=> {
    try {
      const {data} = await axios.get(`${BACKEND_LOCATION}get-maintenance?service_report_no=${serial_no}`)
      setSpecificDevice(data.data)
      console.log(data.data)
    } catch (error) {
      console.log(error)
    }
     handleShow(true)
     setUpdateMode("Update maintenance")
  }
  return (
    <div className="logArea d-flex flex-column">
      <div className="logAreaBar">
        {(() => {
          switch (toggle) {
            case 1:
              return (
                <div className="alltabs">
                  <div className="log-tab active">History</div>
                  {role!=="company-engineer" && <div
                    className="maintenance-tab"
                    onClick={() => {
                      setToggle(2);
                    }}
                  >
                    Maintenance
                  </div>}
                  <div
                    className="maintenance-tab log-active"
                    onClick={() => {
                      setToggle(3);
                    }}
                  >
                    GPS LOG
                  </div>
                </div>
              );
            case 2:
              return (
                <div className="alltabs">
                  <div
                    className="log-tab"
                    onClick={() => {
                      setToggle(1);
                    }}
                  >
                    History
                  </div>
                  {role!=="company-engineer" && <div className="maintenance-tab active"> Maintenance</div>}
                  <div
                    className="maintenance-tab"
                    onClick={() => {
                      setToggle(3);
                    }}
                  >
                    GPS LOG
                  </div>
                </div>
              );
            case 3:
              return (
                <div className="alltabs">
                  <div
                    className="log-tab"
                    onClick={() => {
                      setToggle(1);
                    }}
                  >
                    History
                  </div>
                  {role!=="company-engineer" && <div
                    className="maintenance-tab"
                    onClick={() => {
                      setToggle(2);
                    }}
                  >
                    {" "}
                    Maintenance
                  </div>}
                  <div className="maintenance-tab active">GPS LOG</div>
                </div>
              );
          }
        })()}

        {toggle ? (
          <span
            className="material-symbols-outlined refresh"
            onClick={findLogs}
          >
            refresh
          </span>
        ) : (
          <span
            className="material-symbols-outlined refresh"
            onClick={findLogs}
          >
            refresh
          </span>
        )}
      </div>
      {(() => {
        switch (toggle) {
          case 1:
            return (
              <div className="for-scrl">
                <table className="mt-tbl">
                  <thead>
                    <th>Vehicle No.</th>
                    <th>Event Type</th>

                    <th>Description</th>
                    <th>Time Stamp</th>
                  </thead>
                  {alldata.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{allDevice[0].vehicle_no}</td>
                        <td>{data.Event_type}</td>
                        <td>{data.Message.split(/\r?\n/)[1]}</td>
                        <td>{data.Created_At}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            );
          case 2:
            return (
              <div className="for-scrl">
                <table className="mt-tbl">
                  <thead>
                    <th>System Status</th>
                    <th>Inspection Date</th>
                    <th>Machine Status</th>
                    <th>Service Report no.</th>
                    <th>File status</th>
                    <th></th>
                  </thead>
                  {allMaintenancedata.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data?.afdss_status}</td>
                        <td>{data?.inspection_date}</td>
                        <td>{data?.machine_status}</td>
                        <td>{data?.maco_service_report_no}</td>
                        <td>{data.service_report_file==null ? "Not uploaded":"Uploaded"}</td>
                        {role=="admin"&&<td><button className="mntnc-shwMr-bt" onClick={()=>updateMaintenance(data?.maco_service_report_no)}>Update Maintenance</button></td>}
                      </tr>
                    );
                  })}
                </table>
              </div>
            );
          case 3:
            return (
              <div className="for-scrl">
                <table className="mt-tbl">
                  <thead>
                    <th>Location time</th>
                    <th>Latitudue</th>
                    <th>Longitude</th>
                  </thead>
                  {gpsLogs.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.Created_At}</td>
                        <td>{JSON.parse(data.Message).lat/1000000}</td>
                        <td>{JSON.parse(data.Message).lng/1000000}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            );
        }
      })()}
    </div>
  );
}

export default LogTable;
