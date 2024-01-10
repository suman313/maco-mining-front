import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_LOCATION } from "../../config";
import Layout from "./Layout";
import Alert from "react-bootstrap/Alert";
import "./style.css";

const Login = () => {
  const formdata = new FormData();
  const navigation = useNavigate();
  const [data, setData] = React.useState({ email: "", password: "" });
  const [show, setShow] = React.useState(false);
  const [errormsg, setErrormsg] = React.useState("");
  React.useEffect(() => {
    // const resp = axios
    //   .get(`${BACKEND_LOCATION}get-all-devices`, { withCredentials: true })
    //   .then(() => {
    //     navigation("/");
    //   });
    // if (resp.status === 200) {
    //   navigation("/");
    // }
  });
  const LoginFucntion = async () => {
    formdata.append(`email`, data.email);
    formdata.append(`password`, data.password);

    try {
      const resp = await axios.post(`${BACKEND_LOCATION}login`, formdata);
      console.log(resp);
      if (resp.data.role === "admin") {
        localStorage.setItem("admin_access_token", resp.data.token);
        navigation("/admin");
      } else {
        localStorage.setItem("user_access_token", resp.data.token);
        localStorage.setItem("user_name", resp.data.company_name);
        navigation("/");
      }
    } catch (error) {
      console.log(error);
      setShow(true);
      setErrormsg(error.message);
    }
  };

  return (
    <Layout>
      <div className="login">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button className="login-btn" type="submit" onClick={LoginFucntion}>
          Login
        </button>
        <div className="switch-signup">
          <Link to="/signup">New User ? Sign Up here...</Link>
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
