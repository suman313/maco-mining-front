import React from "react";
import io from "socket.io-client";
import { BACKEND_LOCATION1 } from "../config";

const ManualDetection = ({data_id, manualDetect}) => {
  // const socket = io(`${BACKEND_LOCATION1}`);
  const [detect, setDetect] = React.useState(false)

  React.useEffect(()=>{
    if(manualDetect !== undefined){
      setDetect(true)
    }
    else{
      setDetect(false)
    }
  },[manualDetect])

  return (
    <div className="d-inline-flex p-2 manual-discharged">
      {detect ? (
        <button className="md-active-btn ">
          
          Manual Discharged
        </button>
      ) : (
        <button className="md-inactive-btn">
          Manual Discharged
        </button>
      )}
    </div>
  );
};

export default ManualDetection;
