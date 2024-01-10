import React from "react";
import { Map, Marker } from "pigeon-maps";
import { FaMapPin } from "react-icons/fa";
import { BACKEND_LOCATION } from "../../config";
import io from "socket.io-client";
import "./style.css";
import { useEffect } from "react";
import { useState } from "react";

// const socket = io(`${BACKEND_LOCATION}`);

const MapsRenderer = ({ data_id, gps}) => {
  const [center, setCenter] = useState([0, 0])
  const [zoom, setZoom] = useState(10);
  const id = data_id;
  
  useEffect(() => {
   
    if(gps.length === 0){
      let localGps = localStorage.getItem("gps")
      console.log(localGps)
      setCenter(JSON.parse(localGps))
    }
    else {
      localStorage.setItem("gps",JSON.stringify(gps));
      setCenter(gps);
    }
  },[gps]);

  console.log(center)
  return (
    <div className="map" >
      <Map height={300} center={center} zoom={zoom}  >
      <Marker  anchor={center} />
      {console.log(center)}
    </Map>
    </div>
  )
};

export default MapsRenderer;
