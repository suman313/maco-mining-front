import React from "react";
import "./deviceCreate.css";
// import { GoLinkExternal } from "react-icons/go"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_LOCATION } from "../config";
import { Dna } from "react-loader-spinner";
import { Offcanvas } from "react-bootstrap";
// import Status from '../compoment/Status';
// import FireDetection from '../compoment/FireDetection';
// import NitrogenRelease from '../compoment/NitrogenRelease';
// import ManualDetection from '../compoment/ManualDetection';
import addDevice from "../assets/addDevice.png";
import Loader from "react-js-loader";


const DeviceCreate = ({ show, hideModal, values, company, updateMode, specificDevice, loader, addDvInfo}) => {
  const formData = new FormData();
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = React.useState(false);
  const [slider, setSlider] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState();
  const [addMaintenance, setAddMaintenance] = React.useState(
    {"maco_service_report_no":'', "inspection_date":'',"afdss_status":'',"machine_status":'',"desc":''});

  
  React.useEffect(() => {
    console.log(values)
  }, []);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const submitNewDevice = async () => {
    formData.append("system_pass", data.system_password);
    formData.append("system_id", data.system_id);
    formData.append("name", data.name);
    formData.append("vehicle_no", data.vehicle_no);
    formData.append("vehicle_type", data.vehicle_type);
    formData.append("vehicle_desc", data.vehicle_desc);
    formData.append("company_name", data.company_name);
    console.log(data);
    setDisableButton(true)
    try {
      const resp = await axios.post(`${BACKEND_LOCATION}add-device`, formData, {
        headers: {
          "x-access-tokens": `${localStorage.getItem("x_access_token")}`,
        },
      });
      hideModal();
      setDisableButton(false)
      console.log(resp);
    } catch (error) {
      alert(error)
      hideModal();      
      setDisableButton(false)
      console.log(error);
    }

  };

  const SaveMaintenance = async () => {
    formData.append("vehicle_no", values?.vehicle_no);
    formData.append("maco_service_report_no", addMaintenance.maco_service_report_no);
    formData.append("inspection_date", addMaintenance.inspection_date);
    formData.append("afdss_status", addMaintenance.afdss_status)
    formData.append("machine_status", addMaintenance.machine_status)
    formData.append("desc", addMaintenance.desc);
    formData.append("file", selectedFile);
    setDisableButton(true);
    const resp = await axios
      .post(
        `${BACKEND_LOCATION}add-maintenance`,
        formData,
        {
          headers: {
            "x-access-tokens": `${localStorage.getItem("x_access_token")}`,
          },
        },
        { withCredentials: true }
      )
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        console.log(res);
        // window.location.reload();
      });

      hideModal()
      setDisableButton(false)
  };

  //   if (!show) return null;
  return (
    <div className="offcanvasSlide">
      <Offcanvas show={show} onHide={hideModal} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: "blue" }}>
            <img src={addDevice} alt="addDeviceLogo" />
            <span style={{ marginLeft: "4px" }}>
              { values ? updateMode : "Add Device"}
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="canvas-body">
            <div className="vehicle-details">
              <h5>Enter Vehicle Details</h5>
              <div className="fst-col">
                <div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setData({ ...data, vehicle_no: e.target.value });
                    }}
                    value={values?values?.vehicle_no:addDvInfo?.vehicle_no}
                  />
                  <label>Vehicle No</label>
                </div>
                <div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setData({ ...data, vehicle_type: e.target.value });
                    }}
                    value={values?values?.vehicle_type:addDvInfo?.vehicle_type}
                  />
                  <label>Vehicle Type</label>
                </div>
              </div>
              <input
                type="text"
                onChange={(e) => {
                  setData({ ...data, vehicle_desc: e.target.value });
                }}
                value={values?values?.vehicle_desc:addDvInfo?.vehicle_desc}
              />
              <label>AFDS System</label>
            </div>
            <div>
              <h5>Enter CloudConnect Device Details</h5>
              <div className="device-details">
                <div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                    value={values?.device_name}
                  />
                  <label>Device Serial No.</label>
                </div>

                <div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setData({ ...data, company_name: e.target.value });
                    }}
                    value={company}
                  />
                  <label>Company Name</label>
                </div>

                <div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setData({ ...data, system_id: e.target.value });
                    }}
                    value={values?.system_id}
                  />
                  <label>Device Id</label>
                </div>

                <div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setData({ ...data, system_password: e.target.value });
                    }}
                    value={values ? "********" : null}
                  />
                  <label>Device Password</label>
                </div>
              </div>
            </div>
            {values !== undefined && (
              <div className="d-flex flex-column">
                <div className="d-flex flex-column justify-content-start p-2">
                  {/* this section will go at last */}
                <p className="m-0">Maintenance Work Done</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setAddMaintenance({...addMaintenance, desc: e.target.value});
                  }}
                  value={specificDevice?.description}
                />
                </div>
                <div className="d-flex flex-column justify-content-start p-2">
                <p className="m-0">Maco Report No.</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setAddMaintenance({...addMaintenance, maco_service_report_no: e.target.value});
                  }}
                  value={specificDevice?.maco_service_report_no}
                />
                </div>
                <div className="d-flex flex-column justify-content-start p-2">                  
                <p>Inspection Date</p>
                <input
                  type="date"
                  onChange={(e) => {
                    setAddMaintenance({...addMaintenance, inspection_date: e.target.value});
                  }}
                  value={specificDevice?.inspection_date}
                />
                </div>
                <div className="d-flex flex-column justify-content-start p-2"> 
                {/* dropdown - ok/not ok                  */}
                <p className="m-0">AFDS status</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setAddMaintenance({...addMaintenance, afdss_status: e.target.value});
                  }}
                  value={specificDevice?.afdss_status}
                />
                </div>
                <div className="d-flex flex-column justify-content-start p-2">                  
                <p className="m-0">Machine Status</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setAddMaintenance({...addMaintenance, machine_status: e.target.value});
                  }}
                  value={specificDevice?.machine_status}
                />
                </div>
                {specificDevice?.service_report_file!=null &&
                <div className="d-flex flex-column justify-content-start p-1"> 
                  <p>Previous Upload:</p>
                  <div className="d-flex flex-row">
                  <p>Download here:</p>
                  <a href={`https://${specificDevice?.service_report_file}`} target="_blank"> {specificDevice?.service_report_file.split('/')[1]}</a>
                </div>
                </div>
                }
                <div className="d-flex flex-column justify-content-start p-2">                  
                <p className="m-0">Upload File</p>
                <input
                  type="file" onChange={changeHandler}
                />
                </div>
              </div>
            )}
            {disableButton ? <Loader
          type="bubble-loop"
          bgColor={"#F5CBA7"}
          title={"box-rotate-x"}
          color={"#FFFFFF"}
          size={50}
        />: <button
        type="submit"
        onClick={values ? SaveMaintenance : submitNewDevice}
        className={disableButton ? "device-submit-btn-disable" : "device-submit-btn"}
      >
        <div className="d-flex align-items-center">
          <span class="material-symbols-outlined">add</span>
          {values ? "Add Maintenance" : "Add Device"}
        </div>
      </button>}
            
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DeviceCreate;
