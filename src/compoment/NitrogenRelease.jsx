import React from "react";
import io from "socket.io-client";
import { BACKEND_LOCATION1 } from "../config";

const NitrogenRelease = ({ data_id, event_type }) => {
  // const socket = io(`${BACKEND_LOCATION1}`);
  const [detect, setDetect] = React.useState(false);
  const [logTime, setLogTime] = React.useState(new Date());
  
  React.useEffect(()=>{
    if(event_type !== "Nitrogen-Release"){
      setDetect(true)
    }
    else{
      setDetect(false);
    }
  },[event_type])

  return (
    <div className="d-inline-flex p-2">
      {event_type ? (
        <button className="n2-active-btn">
          
          N2 Release
        </button>
      ) : (
        <button
          className="n2-inactive-btn"
        >          
          N2 Release
        </button>
      )}
    </div>
  );
};

export default NitrogenRelease;
