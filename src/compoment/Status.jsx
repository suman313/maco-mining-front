import React from "react";
import io from "socket.io-client";
import { BACKEND_LOCATION1 } from "../config";
import './component.css'
import ActiveLogo from '../assets/active.png'
import InactiveLogo from '../assets/inactive.png'
const Status = ({data_id, status}) => {
  // const socket = io(`${BACKEND_LOCATION1}`);
  const [data, setData] = React.useState("");
  const [detect, setDetect] = React.useState(false);

  React.useEffect(() => {
    if(status){
      console.log(status);
      setDetect(true)
    }
    else {
      console.log(status)
      setDetect(false)
    }
  }, [status]);
  // const id = data_id.data_id.system_id;

  // socket.on(`${id}/status`, (value) => {
  //   // console.log(value);
  //   setData(value);
  // });


  return (
    <div className="d-inline-flex p-2 status">

        {status ? <button className="d-flex justify-content-center align-items-center active-btn">
        <img src={ActiveLogo} alt="active" style={{marginRight:'5px'}}/>
        Active</button>:
        <button className="d-flex justify-content-center align-items-center inactive-btn">
        <img src={InactiveLogo} alt="active" style={{marginRight:'5px'}}/>
        Inactive</button>}
    </div>
  );
};

export default Status;
