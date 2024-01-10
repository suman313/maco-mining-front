import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_LOCATION } from "../config";
import Layout from "./Layout";
import Alert from "react-bootstrap/Alert";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import './signup.css'

const AdminEngSignup = () => {

    

  const formData = new FormData();
  const navigation = useNavigate();  
  const [alert, setAlert] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  const [phone, setPhone] = useState();
  const [data, setdata] = React.useState({
    name: "",
    password1: "",
    password2: "",
    email: "",
    company_name: "",
  });
  const submitForSignup = async () => {
    if (
      data.name !== "" &&
      data.password1 !== "" &&
      data.password2 !== "" &&
      data.email !== "" &&
      data.company_name !== ""
    ) {
      if (data.password1 === data.password2) {
        formData.append("name", data.name);
        formData.append("password", data.password1);
        formData.append("email", data.email);
        formData.append("phone", phone);
        formData.append("company_name", data.company_name);

        
        try {
          const resp = await axios.post(
            `${BACKEND_LOCATION}admin/engineer/signup`,
            formData
          );
          if (resp.status === 200) {
            console.log(resp);
            navigation("/login");
            localStorage.setItem("user_id", resp.data.msg);
          }
        } catch (error) {
          
          setErrmsg(error.message)
          setAlert(true)
        }
      }
      else {
        alert("Password does not match!")
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
            placeholder="Enter Name"
            onChange={(e) => {
              setdata({ ...data, name: e.target.value });
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setdata({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div className="d-flex justify-content-around align-items-center name-company">
        <div 
        id="phoneInput">
        <PhoneInput
         placeholder="Enter phone number"
         value={phone}
         onChange={setPhone}/>
         </div>
          <input
            id="company_name"
            type="text"
            name="company_name"
            placeholder="Company Name"
            onChange={(e) => {
              setdata({ ...data, company_name: e.target.value });
            }}
          />
        </div>
        <div className="d-flex justify-content-around name-company">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setdata({ ...data, password1: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setdata({ ...data, password2: e.target.value });
            }}
          />
        </div>
        <button type="submit" className="login-btn" onClick={submitForSignup}>
          Sign Up
        </button>
      </div>
      {alert && (
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          {errmsg}
        </Alert>
      )}
      <Link to="/login">Already have an account? Login here...</Link>
    </Layout>
  );
};

export default AdminEngSignup;
