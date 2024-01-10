import React from "react";
import "./company.css";
import { IoReloadCircle, IoReloadCircleSharp } from "react-icons/io5";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Status from "../compoment/Status";
import FireDetection from "../compoment/FireDetection";
import NitrogenRelease from "../compoment/NitrogenRelease";
import ManualDetection from "../compoment/ManualDetection";
import { BACKEND_LOCATION, BACKEND_LOCATION1 } from "../config";
import MapsRenderer from "../compoment/MapsRender/MapsRenderer";
import ReleaseFault from "../compoment/ReleaseFault";
import { Dna } from "react-loader-spinner";

const DeviceStatus = () => {
  const formData = new FormData();

  const navigate = useNavigate();
  const parameter = useParams();
  console.log(parameter);
  const id = parameter.id;
  const [loaderState, setLoaderState] = React.useState(0);
  const [allDevice, setAllDevice] = React.useState([]);
  const [alldata, setalldata] = React.useState([]);
  const [allMaintenacedata, setMaintenacedata] = React.useState([]);
  const [Togle, setTogle] = React.useState(0);

  React.useEffect(() => {
    verrifyCompany();
    findLogs();
    findMaintenance();
    if (
      localStorage.getItem("user_access_token") === undefined ||
      localStorage.getItem("user_access_token") === null
    ) {
      console.log("gghhh");
      navigate(`/login`);
    }
  }, []);
  const findLogs = () => {
    // axios
    //   .get(
    //     `${BACKEND_LOCATION1}?id=${id}`,
    //     {
    //       headers: {
    //         "x-access-tokens": `${localStorage.getItem("user_access_token")}`,
    //       },
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((response) => {
    //     setalldata(response.data);
    //     // console.log(response.data);
    //   });
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
  };

  if (loaderState === 1) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="firstRow" style={{ display: "flex", width: "100%" }}>
          {allDevice.map((data) => {
            return (
              <div
                className="card-round card-bgcolor-blue"
                key={data.system_id}
              >
                <div style={{ color: "#019a21" }}> {data.name}</div>
                <div>
                  <Status data_id={data} />
                </div>
                <div>
                  <FireDetection data_id={data} />
                </div>
                <div>
                  <NitrogenRelease data_id={data} />
                </div>
                <div>
                  <ManualDetection data_id={data} />
                </div>
                <div>
                  <ReleaseFault data_id={data} />
                </div>
                {/* <div>
                    <button className='card_button' onClick={() => openModal(data)} >Trigger N2 </button>
                  </div> */}

                <div>
                  <IoReloadCircle
                    size={"30px"}
                    style={{}}
                    onClick={reloadall}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <br />
        <div className="deviceDetails-blue">
          <div className="deviceDetailsSection">
            <div>
              <div> Vehicle Identification No: </div>
              <div>{allDevice[0].vehicle_no}</div>
            </div>
            <div>
              <div> Vehicle Type:</div>
              <div>{allDevice[0].vehicle_type}</div>
            </div>
            <div>
              <div> Description: </div>
              <div>{allDevice[0].vehicle_desc}</div>
            </div>
          </div>
          <div className="deviceDetailsSection">
            <div>
              <div>System Name:</div>
              <div>{allDevice[0].device_name}</div>
            </div>
            <div>
              <div>System ID:</div>
              <div>{allDevice[0].system_id}</div>
            </div>
            <div>
              <div>password</div>
              <div>**********</div>
            </div>
          </div>

          <div className="deviceDetailsSection">
            <MapsRenderer data_id={allDevice[0].system_id} />
          </div>
        </div>
        <br />
        <div className="logAndMaintenanceArea" style={{ width: "85%" }}>
          <div className="barForLogAndMaintenanceArea">
            <div style={{ display: "flex" }}>
              {Togle === 0 ? (
                <>
                  <div className="btnForLog active">System Log </div>
                  <div
                    className="btnForMaintenance"
                    onClick={() => {
                      setTogle(1);
                    }}
                  >
                    {" "}
                    Maintenance
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="btnForLog"
                    onClick={() => {
                      setTogle(0);
                    }}
                  >
                    System Log{" "}
                  </div>
                  <div className="btnForMaintenance active"> Maintenance</div>
                </>
              )}
            </div>

            {Togle === 0 ? (
              <div onClick={findLogs}>
                {" "}
                <IoReloadCircleSharp />{" "}
              </div>
            ) : (
              <div onClick={findMaintenance}>
                {" "}
                <IoReloadCircleSharp />{" "}
              </div>
            )}
          </div>
          {Togle === 0 ? (
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
                        {""}
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
                );
              }
            })
          ) : (
            <>
              {allMaintenacedata.map((data) => {
                return (
                  <div
                    className="card-rounds card-bgcolor-blues"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginBottom: "10px",
                    }}
                    key={data.Created_At}
                  >
                    <div
                      style={{
                        color: "#019a21",
                        minWidth: "300px",
                        maxWidth: "300px",
                      }}
                    >
                      {data.Created_At}
                    </div>
                    <div
                      style={{
                        color: "#019a21",
                        minWidth: "190px",
                        maxWidth: "190px",
                      }}
                    >
                      {data.Description}
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <br />
          <br />
        </div>
        <br />
        <br />
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
