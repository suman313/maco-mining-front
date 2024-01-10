import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FireDetection from "../FireDetection";
import ManualDetection from "../ManualDetection";
import NitrogenRelease from "../NitrogenRelease";
import ReleaseFault from "../ReleaseFault";
import Status from "../Status";

function Device({ data, socket, company_name, source, setGps }) {
  console.log(source);

  const [log, setLog] = useState({});
  const [status, setStatus] = useState(false);
  const [fireDetection, setFireDetection] = useState(false)
  const [manualDetection, setManualDetection] = useState(false);
  const [n2Detection, setN2Detection] = useState(false)
  const [n2Fault, setN2Fault] = useState(false);
  const [lastEventTime, setLastEventTime] = useState(0);

  socket.on(`logs/${data.system_id}`, (msg) => {
    setLog(JSON.parse(msg));
    setStatus(true);
    console.log(log);
    if((Date.parse(log.created_at) - lastEventTime) > 120000) {
      if(log.event_type === "Fire-Detection") {
        setFireDetection(true)
      }
      else {
        setFireDetection(false)
      }
      if(log.event_type === "Nitrogen-Release") {
        setN2Detection(true)
      }
      else {
        setN2Detection(false)
      }
      if(log.event_type === "Nitrogen-Fault") {
        setN2Fault(true)
      }
      else {
        setN2Fault(false)
      }
    }  
    if (JSON.parse(msg).event_type === "GPS-LOCATION") {
      setGps([
        JSON.parse(msg).message.lat / 1000000,
        JSON.parse(msg).message.lng / 1000000,
      ]);
    }    
    setLastEventTime(Date.parse(log.created_at))
  });

  // useEffect(() => {
  //   setInterval(()=>{
  //     socket.on(`logs/${data.system_id}`, (msg) => {
  //       setLog(JSON.parse(msg));
  //       setStatus(true);
  //       console.log(log);
  //       if(log.event_type === "Fire-Detection") setFireDetection(e => !e)
  //       if(log.event_type === "Nitrogen-Release") setN2Detection(e => !e)
  //       if(log.event_type === "Nitrogen-Fault") setN2Fault(e => !e)
  //       if (JSON.parse(msg).event_type === "GPS-LOCATION") {
  //         setGps([
  //           JSON.parse(msg).message.lat / 1000000,
  //           JSON.parse(msg).message.lng / 1000000,
  //         ]);
  //       }
  //     });
  //   }, 20000)
  // }, []);

  // console.log(log);

  const navigate = useNavigate();
  return (
    <>
      {source === "dashboard" ? (
        
        <tr
          onClick={() => {
            navigate(`devicestatus/${data.system_id}/${company_name}`);
          }}
        >
          <th scope="row">{data.vehicle_no}</th>
          <td id="system-name">{data.device_name}</td>
          <td>
            <Status data_id={data} status={status} />
          </td>
          <td>
            <FireDetection data_id={data} event_type={fireDetection} />
          </td>
          <td>
            <NitrogenRelease data_id={data} event_type={n2Detection} />
          </td>
          <td>
            <ManualDetection data_id={data} event_type={log.event_type} />
          </td>
          <td>
            <ReleaseFault data_id={data} event_type={n2Fault} />
          </td>
        </tr>
      ) : (
        <>
          <div className="d-flex flex-column justify-content-between align-items-center">
            <Status data_id={data} status={status} />
            <div className="device-body">status</div>
          </div>
          <div className="d-flex flex-column justify-content-between align-items-center">
            <FireDetection data_id={data} event_type={fireDetection}  />
            <div className="device-body">Fire Detection</div>
          </div>
          <div className="d-flex flex-column justify-content-between align-items-center">
            <NitrogenRelease data_id={data} event_type={n2Detection}  />
            <div className="device-body">System Discharged</div>
          </div>
          <div className="d-flex flex-column justify-content-between align-items-center">
            <ManualDetection data_id={data} event_type={log.event_type} />
            <div className="device-body">Manual Discharged</div>
          </div>
          <div className="d-flex flex-column justify-content-between align-items-center">
            <ReleaseFault data_id={data} event_type={n2Fault} />
            <div className="device-body">Release Fault</div>
          </div>
        </>
      )}
    </>
  );
}

export default Device;
