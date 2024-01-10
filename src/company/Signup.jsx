import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_LOCATION } from "../config";

const CompanySignup = () => {
  const formData = new FormData();
  const navigation = useNavigate();
  const [data, setdata] = React.useState({
    name: "",
    CompanyName: "",
    password1: "",
    password2: "",
    phone: "",
    email: "",
  });
  const submitForSignup = async () => {
    if (
      data.name !== "" &&
      data.password1 !== "" &&
      data.password2 !== "" &&
      data.CompanyName !== "" &&
      data.phone !== "" &&
      data.email !== ""
    ) {
      console.log("Please");
      if (data.password1 === data.password2) {
        formData.append("name", data.name);
        formData.append("password", data.password1);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("company_name", data.CompanyName);

        const resp = await axios.post(`${BACKEND_LOCATION}signup`, formData);
        if (resp.status === 200) {
          console.log(resp);

          localStorage.setItem("user_id", resp.data.id);
          navigation("/login");
        }
      }
    }
  };
  return (
    <>
      <div className="signupfrom">
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) => {
            setdata({ ...data, name: e.target.value });
          }}
        />
        <input
          type="text"
          name="CompanyName"
          placeholder="Company Name"
          onChange={(e) => {
            setdata({ ...data, CompanyName: e.target.value });
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="email@gmail.com"
          onChange={(e) => {
            setdata({ ...data, email: e.target.value });
          }}
        />
        <input
          type="phone"
          name="phone"
          placeholder="+919800000000"
          onChange={(e) => {
            setdata({ ...data, phone: e.target.value });
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="*********"
          onChange={(e) => {
            setdata({ ...data, password1: e.target.value });
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="*********"
          onChange={(e) => {
            setdata({ ...data, password2: e.target.value });
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
          onClick={submitForSignup}
        >
          Signup
        </button>
      </div>
    </>
  );
};

export default CompanySignup;
