import React from "react";
import io from "socket.io-client";
import { BACKEND_LOCATION1 } from "../config";

const ReleaseFault = ({ data_id, event_type }) => {
  // const socket = io(`${BACKEND_LOCATION1}`);
  const [logTime, setLogTime] = React.useState(new Date());
  const [detect, setDetect] = React.useState(event_type);

  // React.useEffect(() => {
  //   setInterval(() => {
  //     if (event_type) {
  //       setDetect(event_type);
  //       console.log("na hoini");
  //     } else {
  //       setDetect(event_type);
  //       console.log("ba hoeche");
  //     }
  //   }, 5000);
  // }, []);

  return (
    <div className="d-inline-flex p-2">
      {event_type ? (
        <button className="rfault-active-btn">Release Fault</button>
      ) : (
        <button className="rfault-inactive-btn">Release Fault</button>
      )}
    </div>
  );
};

export default ReleaseFault;
