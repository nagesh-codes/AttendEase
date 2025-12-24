import React from "react";
import logo from "../../assets/logo.png";
import "../css-files/SysAdminLogin.css";
import { useState } from "react";
import { apiClient } from "../../API/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SysAdminLogin = () => {
  const [otp, setOtp] = useState("");
  const [otpsent, setOtpsent] = useState(false);
  const [btntxt1, setBtntxt1] = useState("Send OTP");
  const [btntxt2, setBtntxt2] = useState("Verify");
  const [isdisable, setIsdisable] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsdisable(true);
    setBtntxt2("Verifying...");
    try {
      const response = await apiClient.post("/api/system-admin/verify-otp", {
        otp,
        refId: sessionStorage.getItem("refid"),
      });
      toast.success("OTP Successfully Verified.");
      localStorage.setItem('refreshToken',)
      console.log(response);
      navigate("/system-admin-panel");
    } catch (error) {
      console.error(error);
      toast.error("Incorrect OTP");
    }
    setIsdisable(false);
    setBtntxt2("Verify");
  };

  const sendOTP = async () => {
    setIsdisable(true);
    setBtntxt1("Sending OTP...");
    try {
      const response = await apiClient.post("/api/system-admin/send-otp");
      sessionStorage.setItem("refid", response.data.refId);
      toast.success("OTP Successfully Sent");
      setOtpsent(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Send OTP");
      setOtpsent(false);
    }
    setIsdisable(false);
    setBtntxt1("Semd OTP");
  };

  return (
    <div className="sys-login">
      <form className="wrapper" onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="logo" />
          AttendEase
        </div>
        <div className="title">System Admin Login</div>
        <div className={`input-field ${otpsent ? "hide" : ""}`}>
          <button type="button" onClick={sendOTP} disabled={isdisable}>
            {btntxt1}
          </button>
        </div>
        <div className={`rem-box ${otpsent ? "" : "hide"}`}>
          <label htmlFor="otp">Enter Your OTP</label>
          <input
            type="text"
            value={otp}
            onInput={(e) => setOtp(e.target.value)}
            required
            id="otp"
            minLength="6"
            maxLength="6"
          />
        </div>
        <div className={`btn-field ${otpsent ? "" : "hide"}`}>
          <button type="submit" disabled={isdisable}>
            {btntxt2}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SysAdminLogin;
