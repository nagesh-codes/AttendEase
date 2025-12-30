import React, { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { SystemAdminAuthContext } from "../../context/SystemAdminAuthContext";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../API/apiClient";
import "../css-files/SysAdminVerifyOtp.css";

const SysAdminVerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isdisable, setIsdisable] = useState(false);
  const { login } = useContext(SystemAdminAuthContext);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      toast.error("Please enter the full 6-digit OTP");
      return;
    }

    setIsdisable(true);
    const toastid = toast.loading("Verifying The OTP.");
    try {
      const response = await apiClient.post("/api/system-admin/verify-otp", {
        otp: finalOtp,
        refId: sessionStorage.getItem("refid"),
      });

      if (response.status === 200) {
        toast.update(toastid, {
          render: "OTP Successfully Verified",
          autoClose: 4000,
          type: "success",
          isLoading: false,
        });
        login(response.data);
        navigate("/system-admin-panel");
      }
    } catch (error) {
      toast.update(toastid, {
        render: "Incorrect OTP",
        autoClose: 4000,
        isLoading: false,
        type: "error",
      });
    }
    setIsdisable(false);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("otpsent")) {
      navigate("/system-admin-login");
    }
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  return (
    <div className="sys-verify">
      <form className="wrapper" onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="logo" />
          AttendEase
        </div>
        <div className="title">Verify Your OTP</div>

        <div className="otp-container">
          <label className="otp-label">Enter 6-digit Code</label>
          <div className="otp-inputs">
            {otp.map((data, index) => {
              return (
                <input
                  className="otp-box"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : null}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              );
            })}
          </div>
        </div>

        <div className={`btn-field`}>
          <button type="submit" disabled={isdisable || otp.join("").length < 6}>
            {isdisable ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SysAdminVerifyOtp;
