import React, { useEffect, useState } from "react";
import "../css-files/ApplyCollege.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { apiClient } from "../../API/apiClient";
import { toast } from "react-toastify";

const ApplyCollege = () => {
  const [clgName, setClgName] = useState("");
  const [authorityName, setAuthorityName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(false);
  const [btntxt, setBtntxt] = useState("Submit");
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    const toastid = toast.loading("Submitting Your Application...");
    e.preventDefault();
    setDisable(true);
    console.log({
      collegeName: clgName,
      AuthorityName: authorityName,
      AuthorityRole: role,
      email,
    });
    setBtntxt("Submitting");
    try {
      const response = await apiClient.post(
        "/api/college-application/collegeApplication",
        {
          collegeName: clgName,
          authorityName,
          authorityRole: role,
          officialEmail: email,
        }
      );
      if (response) {
        toast.update(toastid, {
          render: `Application has been Submitted!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        localStorage.setItem("Application", "submitted");
        setIsApplicationSubmitted(true);
      } else {
        toast.update(toastid, {
          render: `Can't Submit Your Application`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastid, {
        render: `Can't Submit Your Application, Please Try Again`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
    setDisable(false);
    setBtntxt("Submit");
  };

  useEffect(() => {
    if (localStorage.getItem("Application") === "submitted") {
      setIsApplicationSubmitted(true);
    } else {
      setIsApplicationSubmitted(false);
    }
  }, []);

  return (
    <div className="ApplyCollege">
      <form
        className={isApplicationSubmitted ? "hide" : "wrapper"}
        onSubmit={handleSubmit}
      >
        <div className="logo">
          <img src={logo} alt="logo" />
          AttendEase
        </div>
        <div className="title">Apply to Add Your College.</div>
        <div className="input-field">
          <label htmlFor="name">Enter Your College Name.</label>
          <input
            type="text"
            value={clgName}
            onInput={(e) => setClgName(e.target.value)}
            required
            id="name"
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Authority Name</label>
          <input
            type="text"
            value={authorityName}
            onInput={(e) => setAuthorityName(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="role">Authority Role</label>
          <select
            id="role"
            value={role}
            onInput={(e) => setRole(e.target.value)}
            required
          >
            <option value="">-- Select The Role --</option>
            <option value="Principle">Principle</option>
            <option value="HOD">HOD</option>
            <option value="Vice Principle">Vice Principle</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="email">Enter The Official College Email.</label>
          <input
            type="email"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            required
            id="email"
          />
        </div>
        <div className="btn-field">
          <button type="submit" disabled={disable}>
            {btntxt}
          </button>
        </div>
        <div className="footer">
          Submit your request and our team will review it shortly.
        </div>
      </form>

      <h2 className={isApplicationSubmitted ? "submitted" : "hide"}>
        Application Already Submitted from your device ✅
      </h2>
    </div>
  );
};

export default ApplyCollege;
