import React from "react";
import logo from "../../assets/logo.png";
import "../css-files/SysAdminLogin.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../API/apiClient";

const SysAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [isdisable, setIsdisable] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsdisable(true);
    const toastid = toast.loading("Sending OTP");
    try {
      const response = await apiClient.post("/api/system-admin/send-otp", {
        email,
      });
      if (response.status == 200) {
        sessionStorage.setItem("refid", response.data.refId);
        toast.update(toastid, {
          render: "OTP Sent",
          autoClose: 4000,
          type: "success",
          isLoading: false,
        });
        sessionStorage.setItem("otpsent", true);
        navigate("/system-admin-login/verify");
      } else {
        toast.update(toastid, {
          render: "This is not a system admin email.",
          autoClose: 4000,
          type: "error",
          isLoading: false,
        });
        sessionStorage.removeItem("otpsent");
      }
    } catch (error) {
      console.error(error);
      toast.update(toastid, {
        render: "This is not a system admin email.",
        autoClose: 4000,
        type: "error",
        isLoading: false,
      });
      sessionStorage.removeItem("otpsent");
    }
    setIsdisable(false);
  };

  return (
    <div className="sys-login">
      <form className="wrapper" onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="logo" />
          AttendEase
        </div>
        <div className="title">System Admin Login</div>
        <div className={`input-field`}>
          <label htmlFor="email">Enter The Email.</label>
          <input
            type="email"
            required
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={`input-field`}>
          <button type="submit" disabled={isdisable}>
            {"Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SysAdminLogin;
