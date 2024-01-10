import React from "react";
import io from "socket.io-client";
import { BACKEND_LOCATION1 } from "../config";

const FireDetection = ({data_id, event_type}) => {
  // const socket = io(`${BACKEND_LOCATION1}`);
  const [detect, setDetect] = React.useState(false);


  React.useEffect(()=>{
      if(event_type !== "Fire-Detection"){
        setDetect(true);
      }
      else {
        setDetect(false);
      }
  },[event_type])
  return (
    <div className="d-inline-flex p-2">
      {event_type ? (
        <button className="fire-active-btn">
          Fire Detected
        </button>
      ) : (
        <button
        className="fire-inactive-btn"
        >
          Fire Detected
        </button>
      )}
    </div>
  );
};

export default FireDetection;
