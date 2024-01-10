import React, { useState } from "react";
import "./trigger.css";
import Modal from "react-overlays/Modal";

import { BACKEND_LOCATION } from "../../config";

import axios from "axios";

export default function ModalPin({allData}) {

  const formdata = new FormData();
  const [showModal, setShowModal] = useState(false);

  const [pin, setPin] = useState('');

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
        formdata.append("device_id", allData.system_id);
        formdata.append("password", allData.system_pass);
        formdata.append("trigger", 1);

        try {
          const resp = await axios.post(`http://192.168.31.201:5000/validate_pin?pin=${pin}`, {"data": "no data"},{
            headers: {
              "x-access-tokens": x_access_token,
              }
          })
          console.log(resp);
          if(window.confirm("Pin validation successfull.. Confirm Trigger ?")){   
          try {
            const resp = await axios
              .post(
                `${BACKEND_LOCATION}send_trigger?trigger=True`,
                formdata,
                {
                  headers: {
                    "x-access-tokens": x_access_token,
                  },
                },
                { withCredentials: true }
              )
              alert(resp.data)
          } catch (error) {
            console.log(error)
          }
          }
          else{
            alert("Trigger Cancelled!")
          }
        } catch (error) {
          console.log(error);
        }


        
  };

  return (
    <>
      <div>
      <button type="button"
                className="trigger"
                onClick={() => setShowModal(true)}
              >
                Trigger N2
              </button>
      </div>

      <Modal
        className="modal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Initiate Trigger</div>
          </div>
          <div className="modal-desc">
            <input type="number" name="pin" placeholder="Enter Pin" onChange={(e) => setPin(e.target.value)} />
             </div>
          <div className="modal-footer">
           
            <button className="primary-button" onClick={handleSuccess}>
              Confirm
            </button>
          </div>
            <span class="material-symbols-outlined secondary-button" onClick={handleClose}>
            close
            </span>
        </div>
      </Modal>
      {showModal && <div className="for-blur">Background blur</div>}
      
    </>
  );
}