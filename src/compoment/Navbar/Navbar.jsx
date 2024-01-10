import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../../api/index";
import "./style.css";

const admin_access_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdWJsaWNfaWQiOiJkNjgzNGRiMC0zMWQxLTQ5NTktODc3Yi1lZmNjNjdiZjQxNjMiLCJleHAiOjE2Njk3MzUxOTd9.x4TmLtCHWwvR2z1741DJ3jxOcFyhBIyip-YWBw0CSR4";

function Navbar() {
  const [allCompanies, setAllCompanies] = useState([]);

  const dispatch = useDispatch();

  const getAllCompanies = async () => {
    try {
      const { data } = await API.get(`get_companies`, {
        headers: {
          "x-access-tokens": ` ${localStorage.getItem("admin_access_token")}`,
        },
      });
      console.log(data);
      setAllCompanies(data.companies);
    } catch (error) {
      console.log(error);
    }

    //   console.log(response);
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  console.log(allCompanies);

  const selectCompany = (e) =>
    dispatch({ type: "SET_COMPANY_NAME", payload: e.target.value });

  return (
    <div class="select-dropdown">
      <select onChange={selectCompany}>
        {allCompanies.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      {/* <span className="company">company</span> */}
    </div>
  );
}

export default Navbar;
