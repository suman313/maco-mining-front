import React from "react";
import "./style.css";
import { IoReloadCircle, IoReloadCircleSharp } from "react-icons/io5";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Status from "../../compoment/Status";
import FireDetection from "../../compoment/FireDetection";
import NitrogenRelease from "../../compoment/NitrogenRelease";
import ManualDetection from "../../compoment/ManualDetection";
import DeviceCreate from "../../device/DeviceCreate";
import { BACKEND_LOCATION, BACKEND_LOCATION1 } from "../../config";
import MapsRenderer from "../../compoment/MapsRender/MapsRenderer";
import ReleaseFault from "../../compoment/ReleaseFault";
import { Dna } from "react-loader-spinner";

const DeviceStatus = () => {
  const formData = new FormData();

  const navigate = useNavigate();
  const parameter = useParams();
  const id = parameter.id;
  const [loaderState, setLoaderState] = React.useState(0);
  const [allDevice, setAllDevice] = React.useState([]);
  const [alldata, setalldata] = React.useState([]);
  const [allMaintenacedata, setMaintenacedata] = React.useState([]);
  const [Togle, setTogle] = React.useState(0);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    verrifyCompany();
    findLogs();
    findMaintenance();
    if (
      localStorage.getItem("user_access_token") === undefined ||
      localStorage.getItem("user_access_token") === null
    ) {
      navigate(`/login`);
    }
  }, []);
  var s = 0;
  const findLogs = async () => {
    try {
      const resp = await axios.get(
        `${BACKEND_LOCATION}get_logs?limit=50`,
        {
          headers: {
            "x-access-tokens": `${localStorage.getItem("admin_access_token")}`,
          },
        },
        { withCredentials: true }
      );
      setTimeout(() => {
        setalldata(resp.data.records);
      }, 2000);

      // console.log("hello");
      setTimeout(() => {
        s = s + 1;
        if (s) {
          findLogs();
          s = s - 1;
        } else {
          console.log("hello");
        }
      }, 5000);
      // setInterval(findLogs(), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const findMaintenance = () => {
    formData.append("device_id", id);
    axios
      .post(
        `${BACKEND_LOCATION}fetch-maintenance-list`,
        formData,
        {
          headers: {
            "x-access-tokens": `${localStorage.getItem("user_access_token")}`,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        setMaintenacedata(response.data.records);
        // console.log(response.data);
      });
  };

  const company_name = localStorage.getItem(`user_name`);
  const openModal = async (data1) => {
    // console.log(data1);
    formData.append("device_id", data1.system_id);
    formData.append("password", data1.system_pass);
    formData.append("trigger", 1);
    if (window.confirm("Are you sure")) {
      await axios
        .post(
          `${BACKEND_LOCATION}send_trigger?trigger=True`,
          formData,
          {
            headers: {
              "x-access-tokens": `${localStorage.getItem(
                "admin_access_token"
              )}`,
            },
          },
          { withCredentials: true }
        )
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
          console.log(res);
        });
      // console.log(resp);
    }
  };

  const reloadall = async () => {
    localStorage.clear();
    window.location.reload();
  };

  const verrifyCompany = async () => {
    await axios
      .get(
        `${BACKEND_LOCATION}get-device-details?device_id=${id}&company_name=${company_name}`,
        {
          headers: {
            "x-access-tokens": `${localStorage.getItem("user_access_token")}`,
          },
        },
        { withCredentials: true }
      )
      .catch(() => {})
      .then((res) => {
        setLoaderState(1);
        setAllDevice([res.data.response]);
      });
    console.log(allDevice);
  };

  if (loaderState === 1) {
    return (
      <div>
        <div className="details-section">
          <div className="device-info">
            <div className="first-sec">
              <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="device-head">{allDevice[0].vehicle_no}</div>
                <div className="device-body"> Vehicle No: </div>

                {/* <div>
                <div> Vehicle Type:</div>
                <div>{allDevice[0].vehicle_type}</div>
              </div> */}
                {/* <div>
                <div> Description: </div>
                <div>{allDevice[0].vehicle_desc}</div>
              </div> */}
              </div>
              <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="device-head">{allDevice[0].device_name}</div>
                <div className="device-body">System Name</div>
              </div>
              {/* <div>
                <div>System ID:</div>
                <div>{allDevice[0].system_id}</div>
              </div> */}
              <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="device-head">**********</div>

                <div className="device-body">password</div>
              </div>
            </div>
            <div>
              {allDevice.map((data) => {
                return (
                  <div key={data.system_id} className="second-sec">
                    <div className="d-flex flex-column justify-content-between align-items-center">
                      <Status data_id={data} />
                      <div className="device-body">status</div>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                      <FireDetection data_id={data} />
                      <div className="device-body">Fire Detection</div>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                      <NitrogenRelease data_id={data} />
                      <div className="device-body">System Discharged</div>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                      <ManualDetection data_id={data} />
                      <div className="device-body">Manual Discharged</div>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                      <ReleaseFault data_id={data} />
                      <div className="device-body">Release Fault</div>
                    </div>
                    {/* <div>
                    <button
                      className="card_button"
                      onClick={() => openModal(data)}
                    >
                      Trigger N2
                    </button>
                  </div> */}
                  </div>
                );
              })}
            </div>
            <div className="third-sec">
              
              <button className="maintenance-btn" onClick={handleShow}>
                <span style={{ marginLeft: "5px" }}>create Maintenance</span>
                <span class="material-symbols-outlined">add_circle</span>
              </button>
            </div>
          </div>
          {/* {openModals === 0 ? (
              ""
            ) : (
              <div className="modal">
                <input
                  className="maintenaceinput"
                  type="text"
                  placeholder="Please Write The Reason"
                  onChange={(e) => {
                    setMaintenance(e.target.value);
                  }}
                />
                <div>
                  <button
                    className="addMaintanceButton"
                    onClick={SaveMaintenance}
                  >
                    add
                  </button>{" "}
                  <button
                    className="addMaintanceButton"
                    style={{ backgroundColor: "red" }}
                    onClick={() => {
                      setopenModals(0);
                    }}
                  >
                    cancel
                  </button>{" "}
                </div>
              </div>
            )} */}
          <DeviceCreate
            show={show}
            hideModal={handleClose}
            values={allDevice[0]}
            company={company_name}
          />
          <MapsRenderer data_id={allDevice[0].system_id} />
        </div>
        <div className="logArea d-flex flex-column">
          <div className="logAreaBar">
            {Togle === 0 ? (
              <div className="alltabs">
                <div className="log-tab active">Log</div>
                <div
                  className="maintenance-tab"
                  onClick={() => {
                    setTogle(1);
                  }}
                >
                  Maintenance
                </div>
              </div>
            ) : (
              <div className="alltabs">
                <div
                  className="log-tab"
                  onClick={() => {
                    setTogle(0);
                  }}
                >
                  Log
                </div>
                <div className="maintenance-tab active"> Maintenance</div>
              </div>
            )}

            {Togle ? (
              <span
                className="material-symbols-outlined refresh"
                onClick={findLogs}
              >
                refresh
              </span>
            ) : (
              <span
                className="material-symbols-outlined refresh"
                onClick={findLogs}
              >
                refresh
              </span>
            )}
          </div>

          {Togle === 0 ? (
            alldata === undefined ? null : (
              alldata.map((Data, index) => {
                if (index - 1 !== -1) {
                  // console.log(alldata[index-1].time.split(".")[0].split(":")[2]  - Data.time.split(".")[0].split(":")[2] <= -5 );
                  if (
                    alldata[index - 1].ping_at.split(".")[0].split(":")[2] -
                      Data.ping_at.split(".")[0].split(":")[2] <=
                    -15
                  ) {
                    return (
                      <div
                        className="card-rounds card-bgcolor-blues"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          marginBottom: "10px",
                        }}
                        key={Data.ping_at}
                      >
                        <div
                          style={{
                            color: "#019a21",
                            minWidth: "300px",
                            maxWidth: "300px",
                          }}
                        >
                          {Data.deviceId}
                        </div>
                        <div
                          style={{
                            color: "#019a21",
                            minWidth: "190px",
                            maxWidth: "190px",
                          }}
                        >
                          {Data.type ? Data.content.split("_")[1] : Data.flied}
                        </div>
                        <div
                          style={{
                            color: "#019a21",
                            minWidth: "200px",
                            maxWidth: "200px",
                          }}
                        >
                          {Data.events}
                        </div>
                        <div
                          style={{
                            color: "#019a21",
                            minWidth: "250px",
                            maxWidth: "250px",
                          }}
                        >
                          {new Date(Data.ping_at).toLocaleString()}
                        </div>
                        <div></div>
                      </div>
                      // <div key={Data.id}>
                      // {Data.content}
                      // {Data.devices_ids}
                      // {Data.type}
                      // </div>
                    );
                  } else {
                    return null;
                  }
                } else {
                  return (
                    <div
                      className="card-rounds card-bgcolor-blues"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginBottom: "10px",
                      }}
                      key={Data._id}
                    >
                      <div
                        style={{
                          color: "#019a21",
                          minWidth: "300px",
                          maxWidth: "300px",
                        }}
                      >
                        {Data.deviceId}
                      </div>
                      <div
                        style={{
                          color: "#019a21",
                          minWidth: "190px",
                          maxWidth: "190px",
                        }}
                      >
                        {Data.type === "Nitrogen-Release"
                          ? Data.content.split("_")[1]
                          : Data.content}
                      </div>
                      <div
                        style={{
                          color: "#019a21",
                          minWidth: "200px",
                          maxWidth: "200px",
                        }}
                      >
                        {Data.events}
                      </div>
                      <div
                        style={{
                          color: "#019a21",
                          minWidth: "250px",
                          maxWidth: "250px",
                        }}
                      >
                        {new Date(Data.ping_at).toLocaleString()}
                      </div>
                      <div></div>
                    </div>
                    // <div key={Data.id}>
                    // {Data.content}
                    // {Data.devices_ids}
                    // {Data.type}
                    // </div>
                  );
                }
              })
            )
          ) : (
            <div className="for-scrl">
              <table className="mt-tbl">
                <thead>
                  <th>Created At</th>
                  <th>Description</th>
                </thead>
                {allMaintenacedata.map((data) => {
                  return (
                    <tr key={data.Created_At}>
                      <td>{data.Created_At}</td>
                      <td>{data.Description}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dna
          visible={true}
          height="400"
          width="400"
          ariaLabel="dna-loading"
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }
};

// const DeviceStatus = () => {
//   return <h1>One Heading only</h1>;
// };

export default DeviceStatus;
