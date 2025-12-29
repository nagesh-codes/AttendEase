import React, { useEffect, useState } from "react";
import "../css-files/Home.css";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import logo from "../../assets/logo.png";
import Classes from "./Classes";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeSection, setActiveSection] = useState(
    sessionStorage.getItem("currentSection") || "profile"
  );
  const navigate = useNavigate();

  const renderContent = () => {
    sessionStorage.setItem("currentSection", activeSection);
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "classes":
        return <Classes />;
      case "profile":
        return <Profile />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="appShell">
      {/* Sidebar */}
      <aside className="appShell__sidebar">
        <div className="appShell__brand">
          <div className="appShell__logoCircle">
            <img src={logo} alt="" />
          </div>
          <span className="appShell__brandText">AttendEase</span>
        </div>

        <nav className="appShell__nav">
          <button
            className={`appShell__navItem ${
              activeSection === "profile" ? "is-active" : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </button>

          <button
            className={`appShell__navItem ${
              activeSection === "dashboard" ? "is-active" : ""
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`appShell__navItem ${
              activeSection === "classes" ? "is-active" : ""
            }`}
            onClick={() => setActiveSection("classes")}
          >
            Classes
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="appShell__main">{renderContent()}</main>
    </div>
  );
};

export default Home;
