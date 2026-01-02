import React, { useEffect } from "react";
import "../css-files/Login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiClient } from "../../API/apiClient";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [isdisable, setIsdisable] = useState(false);
  const [btntxt, setBtntxt] = useState("Login");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsdisable(true);
    setBtntxt("Checking...");
    const toastid = toast.loading("Checking your credentials");
    try {
      const response = await apiClient.post("/api/auth/login", {
        username,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        toast.update(toastid, {
          render: "Successfully Login!",
          type: "success",
          isLoading: false,
          autoClose: 4000,
        });
        navigate("/dashboard");
      } else {
        toast.update(toastid, {
          render: "Combination is not valid",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (er) {
      toast.update(toastid, {
        render: "Combination is not valid",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
    setBtntxt("Login");
    setIsdisable(false);
  };

  return (
    <div className="LoginPage">
      <form className="wrapper" onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="logo" />
          AttendEase
        </div>
        <div className="title">Login</div>
        <div className="input-field">
          <label htmlFor="username">Enter Your Username</label>
          <input
            type="text"
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            required
            id="username"
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Enter Your Password</label>
          <div>
            <input
              type={show ? "password" : "text"}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              required
              id="password"
            />
            <span onClick={(e) => setShow(!show)}>
              {" "}
              {show ? <FaEyeSlash /> : <FaEye />}{" "}
            </span>
          </div>
        </div>
        <div className="btn-field">
          <button type="submit" disabled={isdisable}>
            {btntxt}
          </button>
        </div>
        <div className="footer">
          <span>
            Don't Have Any Account? <Link to={"/signup"}>Signup</Link>
          </span>
          <span>
            <Link to={"/system-admin-login"}>
              Are You AttendEase System Admin ? Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
