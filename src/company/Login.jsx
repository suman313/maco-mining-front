import React from "react";
import "./company.css";
import { AiOutlineLogin } from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_LOCATION } from "../config";

const CompanyLogin = () => {
  const formdata = new FormData();
  const navigation = useNavigate();

  React.useEffect(() => {
    const resp = axios
      .get(`${BACKEND_LOCATION}get-all-devices`, { withCredentials: true })
      .then(() => {
        navigation("/");
      });
    if (resp.status === 200) {
      navigation("/");
    }
  });
  const [data, setData] = React.useState({ email: "", password: "" });

  const LoginFucntion = async () => {
    console.log("hello");
    formdata.append(`email`, data.email);
    formdata.append(`password`, data.password);
    const resp = await axios.post(`${BACKEND_LOCATION}login`, formdata);
    console.log(resp);
    if (resp.status === 200) {
      console.log(resp);
      if (resp.data.role === "admin") {
        localStorage.setItem("admin_access_token", resp.data.token);
        navigation("/admin");
      } else {
        localStorage.setItem("user_access_token", resp.data.token);
        localStorage.setItem("user_name", resp.data.company_name);
        navigation("/");
      }
    }
  };

  return (
    <div>
      <div className="logincard">
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button
          type="submit"
          style={{
            fontSize: "150%",
            width: "30%",
            height: "10%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
            backgroundColor: "#131312",
            color: "white",
          }}
          onClick={LoginFucntion}
        >
          Login
          <AiOutlineLogin />
        </button>
        <Link to="/signup" className="signup">
          create account / signup
        </Link>
      </div>
    </div>
  );
};

export default CompanyLogin;
