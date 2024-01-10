import React, { useState } from "react";
import "./settings.css";
import Modal from "react-overlays/Modal";

import { BACKEND_LOCATION } from "../../config";

import axios from "axios";

export default function ModalPin({showModal, setShowModal}) {

  const formdata = new FormData();

  const [pin, setPin] = useState({pin: '', confirm_pin: ''});

  // Backdrop JSX code
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  var handleClose = () => setShowModal(false);

  var handleSuccess = async () => {
    let x_access_token = "";
    if(localStorage.getItem("admin_access_token")){
      x_access_token = localStorage.getItem("admin_access_token");
    }
    else{
      x_access_token = localStorage.getItem("user_access_token")
    }
    if(pin.pin === pin.confirm_pin) {
      formdata.append("pin", pin.pin)
      try {
        const resp = await axios.post(`http://192.168.31.201:5000/set_pin?pin=${pin.pin}`, {"data": "P.C. backend"},  {
          headers: {
            "x-access-tokens": x_access_token,
          },
        }   )
        console.log(resp);
        alert(resp.data.message)
        setShowModal(false)
      } catch (error) {
        alert(error.message)
      }

    }
    else{
      alert("Pin does not match")
    }
  };

  return (
      <>
      <Modal
        className="modal-settings"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div className="modal-content-settings">
          
            <div className="modal-heading-st">Configure PIN </div>            
            <input type="text" name="pin" placeholder="Enter Pin" onChange={(e) => setPin({...pin, pin: e.target.value})} />
            <input type="text" name="pin" placeholder="Re-enter Pin" onChange={(e)=> setPin({...pin, confirm_pin: e.target.value})} />
          
            <span class="material-symbols-outlined secondary-button-st" onClick={handleClose}>
            close
            </span>
            <button className="primary-button-st" onClick={handleSuccess}>
              Set PIN
            </button>
        </div>
      </Modal>
      {showModal && <div className="for-blur-st">Background blur</div>}
      
    </>
  );
}