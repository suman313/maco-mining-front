import React from "react";
import "./company.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Status from "../compoment/Status";

import { BACKEND_LOCATION } from "../config";
import FireDetection from "../compoment/FireDetection";
import NitrogenRelease from "../compoment/NitrogenRelease";
import ManualDetection from "../compoment/ManualDetection";
import ReleaseFault from "../compoment/ReleaseFault";
import { Dna } from "react-loader-spinner";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [loaderState, setLoaderState] = React.useState(0);
  const [alldata, setalldata] = React.useState([]);
  const [company_name, setCompany_name] = React.useState(
    localStorage.getItem(`user_name`)
  );

  React.useEffect(() => {
    if (localStorage.getItem("admin_access_token") !== null) {
      navigate(`/admin`);
      return;
    } else {
      verrifyCompany();
      if (
        localStorage.getItem("user_access_token") === undefined ||
        localStorage.getItem("user_access_token") === null
      ) {
        navigate(`/login`);
      }
    }
  }, []);

  const verrifyCompany = () => {
    setCompany_name(localStorage.getItem(`user_name`));
    const headers = {
      "x-access-tokens": `${localStorage.getItem("x-access-tokens")}`,
    };

    axios
      .get(
        `${BACKEND_LOCATION}get-company-devices?company_name=${company_name}`,
        { headers }
      )
      .then((response) => {
        if (response.status === 200) {
          setLoaderState(1);
          setalldata(response.data.devices);
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate(`/login`);
      });
  };

  if (loaderState === 1) {
    return (
      <>
        <div className="dashboard-container">
          <div className="DataTable">
            <table className="table table-custom">
              <thead>
                <tr>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      Vehicle No
                    </div>
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      System Name
                    </div>
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">Status</div>
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      Fire Detection
                    </div>
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      System Discharged
                    </div>{" "}
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      Manual Discharged
                    </div>{" "}
                  </th>
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      Release Fault
                    </div>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {alldata.map((data) => {
                  return (
                    <tr
                      onClick={() => {
                        navigate(
                          `/company/devicestatus/${data.system_id}/${company_name}`
                        );
                      }}
                    >
                      <th scope="row">{data.vehicle_no}</th>
                      <td>{data.device_name}</td>
                      <td>
                        <Status data_id={data} />
                      </td>
                      <td>
                        <FireDetection data_id={data} />
                      </td>
                      <td>
                        <NitrogenRelease data_id={data} />
                      </td>
                      <td>
                        <ManualDetection data_id={data} />
                      </td>
                      <td>
                        <ReleaseFault data_id={data} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
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

export default CompanyDashboard;
