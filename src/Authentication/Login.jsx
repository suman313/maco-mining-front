import React, { useEffect } from "react";
import axios from "axios";
// import { useSelector, useDispatch } from 'react-redux'
// import {setUser, setToken} from "../slicers/UserSlice"
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_LOCATION } from "../config";
import Layout from "./Layout";
import Alert from "react-bootstrap/Alert";
import "./style.css";

const Login = () => {
  const formData = new FormData();
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const [data, setData] = React.useState({ email: "", password: "" });
  const [show, setShow] = React.useState(false);
  const [errormsg, setErrormsg] = React.useState("");
  const [visible, setVisible] = React.useState(true);

  useEffect(()=>{
    checkIfLoggedIn();
  }, [])

  const checkIfLoggedIn = ()=>{
    let isLoggedIn = localStorage.getItem("role");
    if(isLoggedIn){
    navigate('/admin');
    }
    else {
      return;
    }
  }

  const LoginFucntion = async () => {
    

    if (formData.get("email") === undefined &&  formData.get("password") === undefined) {
    formData.append("email", data.email);
    formData.append("password", data.password);
    } else {
      formData.delete("email")
      formData.delete("password")
      formData.append("email", data.email);
      formData.append("password", data.password);
      
    }

    try {
      const resp = await axios.post(`${BACKEND_LOCATION}login`, formData);
      console.log(resp)
      localStorage.setItem("x_access_token", resp.data.token);
      localStorage.setItem("role", resp.data.role);
      localStorage.setItem("company_name", resp.data.company_name)
      navigate("/admin")
      console.log(resp);
      // if (resp.data.role === "admin") {
      //   localStorage.setItem("admin_access_token", resp.data.token);
      //   localStorage.setItem("userAuth","Admin" )
      //   localStorage.setItem("role", "admin")
      //   // dispatch(setUser("Admin"))
      //   // dispatch(setToken(resp.data.token))
      //   navigate("/admin");
      // } else {
      //   localStorage.setItem("user_access_token", resp.data.token);
      //   localStorage.setItem("user_name", resp.data.company_name);
      //   localStorage.setItem("userAuth",  resp.data.company_name)
      //   localStorage.setItem("role", "company")
      //   // setUser("Company")
      //   // dispatch(setUser(resp.data.company_name))        
      //   // dispatch(setToken(resp.data.token))
      //   navigate("/company");
      // }
    } catch (error) {
      
      setShow(true);
      setErrormsg(error.message);
    }
  };

  const showPassword = () => {
    let passType = document.getElementById("password");
    if (passType.type === "password") {
      passType.type = "text";
      setVisible(false);
    } else {
      passType.type = "password";
      setVisible(true);
    }
  };

  return (
    <Layout>
      <div className="d-flex flex-column login">
        <div className="d-flex justify-content-between align-items-center p-2 email-field">
          <input
            type="text"
            name="email"
            placeholder="Email"
            id="email"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 pss-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
          {visible ? (
            <span class="material-symbols-outlined" onClick={showPassword}>
              visibility
            </span>
          ) : (
            <span class="material-symbols-outlined" onClick={showPassword}>visibility_off</span>
          )}
        </div>
        <button className="login-btn" type="submit" onClick={LoginFucntion}>
          Login
        </button>
        <div className="switch-signup">
          <Link to="/admin_signup"> Sign Up as Admin...</Link>
        </div>
        <div className="switch-signup">
          <Link to="/admin_engineer_signup"> Sign Up as Admin Engineer...</Link>
        </div>
        <div className="switch-signup">
          <Link to="/company_signup"> Sign Up as Company...</Link>
        </div>
        <div className="switch-signup">
          <Link to="/company_engineer_signup"> Sign Up as Company Engineer...</Link>
        </div>
      </div>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          {errormsg}
        </Alert>
      )}
    </Layout>
  );
};

export default Login;
