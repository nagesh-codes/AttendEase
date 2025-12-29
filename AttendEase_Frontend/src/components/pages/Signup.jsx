import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../css-files/Signup.css";
import { apiClient } from "../../API/apiClient";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [show, setShow] = useState(true);
  const [rshow, setRshow] = useState(true);
  const [isdisable, setIsdisable] = useState(false);
  const [btntxt, setBtntxt] = useState("Fill All Fielda!"); //Signup
  const [college, setCollege] = useState([]);
  const [clg, setClg] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [isEmailCheking, setIsEmailChecking] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameChecking, setIsUsernameChecking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != rpassword) {
      toast.error("password does not matched");
      return;
    }
    setIsdisable(true);
    setBtntxt("Checking...");
    try {
      const response = await apiClient
        .post("/api/auth/signup", {
          email,
          password,
          username,
          name,
          collegeId: clg,
        })
        .then(() => {
          toast.success("Account Successfully Created.");
          navigate("/login");
        });
    } catch (er) {
      toast.error("Email or Username is Already registered with AttendEase.");
    }
    setBtntxt("Signup");
    setIsdisable(false);
  };

  useEffect(() => {
    const getColleges = async () => {
      try {
        const clg = await apiClient.get("/api/colleges/getCollegeList");
        setCollege(clg.data);
      } catch (e) {
        setCollege([]);
      }
    };

    getColleges();
  }, []);

  useEffect(() => {
    setIsdisable(true);
    if (!email) {
      setIsEmailChecking(false);
      return;
    }

    const delayDebounceFunc = setTimeout(async () => {
      setIsEmailChecking(true);
      setEmailError("Checking.");
      try {
        const response = await apiClient.post("/api/auth/checkEmail", {
          email,
        });
        if (response.data.exists) {
          setEmailError("This email is already registered.");
        } else {
          setEmailError("");
          setIsdisable(false);
        }
      } catch (error) {
        console.error("check failed" + error.message);
      } finally {
        setIsEmailChecking(false);
      }
    }, 700);

    return () => clearTimeout(delayDebounceFunc);
  }, [email]);

  useEffect(() => {
    setIsdisable(true);
    if (!username) {
      setIsUsernameChecking(false);
      return;
    }

    const delayDebounceFunc = setTimeout(async () => {
      setIsUsernameChecking(true);
      setUsernameError("Checking.");
      try {
        const response = await apiClient.post("/api/auth/checkUsername", {
          username,
        });
        if (response.data.exists) {
          setUsernameError("This Username is already registered.");
        } else {
          setUsernameError("");
          setIsdisable(false);
        }
      } catch (error) {
        console.error("check failed" + error.message);
      } finally {
        setIsUsernameChecking(false);
      }
    }, 700);

    return () => clearTimeout(delayDebounceFunc);
  }, [username]);

  return (
    <div className="SignupPage">
      <form className="wrapper" onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="logo" />
          AttendEase
        </div>
        <div className="title">Signup</div>
        <div className="div">
          <div className="input-field">
            <label htmlFor="name">Enter Your Name</label>
            <input
              type="text"
              value={name}
              onInput={(e) => setName(e.target.value)}
              required
              id="name"
            />
          </div>
          <div className="input-field">
            <label htmlFor="username">Create Your Username</label>
            <input
              type="text"
              value={username}
              onInput={(e) => setUsername(e.target.value.trim())}
              required
              id="username"
            />
            <p
              style={{
                color: isUsernameChecking ? "blue" : "red",
              }}
            >
              {usernameError}
            </p>
          </div>
        </div>
        <div className="div">
          <div className="input-field">
            <label htmlFor="email">Enter Your Email Address</label>
            <input
              type="email"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              required
              id="email"
            />
            <p
              style={{
                color: isEmailCheking ? "blue" : "red",
              }}
            >
              {emailError}
            </p>
          </div>
          <div className="input-field">
            <label htmlFor="college">Choose Your College</label>
            <select
              value={clg}
              onChange={(e) => setClg(e.target.value)}
              id="college"
            >
              <option value="0">-- Select Your College --</option>
              {college.length > 0 ? (
                college.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading...</option>
              )}
            </select>
          </div>
        </div>
        <div className="div">
          <div className="input-field">
            <label htmlFor="password">Enter Your Password</label>
            <div>
              <input
                type={show ? "password" : "text"}
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                required
                id="password"
                className="diff-padding"
              />
              <span onClick={(e) => setShow(!show)}>
                {" "}
                {show ? <FaEyeSlash /> : <FaEye />}{" "}
              </span>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="rpassword">Re-Type Your Password</label>
            <div>
              <input
                type={rshow ? "password" : "text"}
                value={rpassword}
                onInput={(e) => setRpassword(e.target.value)}
                required
                id="rpassword"
                className="diff-padding"
              />
              <span onClick={(e) => setRshow(!rshow)}>
                {" "}
                {rshow ? <FaEyeSlash /> : <FaEye />}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="btn-field" >
          <button type="submit" disabled={isdisable} style={{cursor:isdisable ? 'not-allowed' : 'pointer'}}>
            {btntxt}
          </button>
        </div>
        <div className="footer">
          <span>
            {" "}
            Already Have An Account? <Link to={"/"}>Login</Link>{" "}
          </span>
          <span>
            <Link to={"/apply-college"}>
              {" "}
              Want To List Your College with AttendEase{" "}
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
