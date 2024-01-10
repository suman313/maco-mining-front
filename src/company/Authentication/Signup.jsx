import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_LOCATION } from "../../config";
import Layout from "./Layout";

const Signup = () => {
  const formData = new FormData();
  const navigation = useNavigate();
  const [data, setdata] = React.useState({
    name: "",
    password1: "",
    password2: "",
    phone: "",
    email: "",
    company_name: "",
  });
  const submitForSignup = async () => {
    if (
      data.name !== "" &&
      data.password1 !== "" &&
      data.password2 !== "" &&
      data.phone !== "" &&
      data.email !== "" &&
      data.company_name !== ""
    ) {
      console.log("Please");
      if (data.password1 === data.password2) {
        formData.append("name", data.name);
        formData.append("password", data.password1);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("company_name", data.company_name);

        const resp = await axios.post(`${BACKEND_LOCATION}signup`, formData);
        if (resp.status === 200) {
          console.log(resp);
          navigation("/login");
          localStorage.setItem("user_id", resp.data.id);
        }
      }
    }
  };
  return (
    <Layout>
      <div className="signupfrom">
        <div className="d-flex justify-content-around name-company">
          <input
            type="text"
            name="name"
            placeholder="  Enter Name"
            onChange={(e) => {
              setdata({ ...data, name: e.target.value });
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="  Email"
            onChange={(e) => {
              setdata({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div className="d-flex justify-content-around name-company">
          <input
            type="phone"
            name="phone"
            placeholder="  Enter your phone with country code"
            onChange={(e) => {
              setdata({ ...data, phone: e.target.value });
            }}
          />
          <input
            type="text"
            name="company_name"
            placeholder=" Company Name"
            onChange={(e) => {
              setdata({ ...data, company_name: e.target.value });
            }}
          />
        </div>
        <div className="d-flex justify-content-around name-company">
          <input
            type="password"
            name="password"
            placeholder="  Password"
            onChange={(e) => {
              setdata({ ...data, password1: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="  Confirm Password"
            onChange={(e) => {
              setdata({ ...data, password2: e.target.value });
            }}
          />
        </div>
        <button type="submit" className="login-btn" onClick={submitForSignup}>
          Sign Up
        </button>
      </div>
      <Link to="/login">Already have an account? Login here...</Link>
    </Layout>
  );
};

export default Signup;
