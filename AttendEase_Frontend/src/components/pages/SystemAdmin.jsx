import React, { useContext, useEffect, useRef, useState } from "react";
import "../css-files/SystemAdmin.css";
import logo from "../../assets/logo.png";
import { apiClient } from "../../API/apiClient";
import { toast } from "react-toastify";
import { SystemAdminAuthContext } from "../../context/SystemAdminAuthContext";

const optionsWithTime = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const CollegeApplications = () => {
  const [ClgAppn, setClgAppn] = useState([]);

  useEffect(() => {
    getPendingCollegeApplications();
  }, []);

  const getPendingCollegeApplications = async () => {
    try {
      const response = await apiClient.get(
        "/api/system-admin/pendingCollegeApplications"
      );
      setClgAppn(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCollegeStatus = async (id, newStatus) => {
    const toastId = toast.loading("Updating status...");
    try {
      const response = await apiClient.patch(
        "api/system-admin/updateCollegeStatus",
        {
          id,
          status: newStatus,
        }
      );

      if (response) {
        toast.update(toastId, {
          render: `Application has been ${newStatus.toLowerCase()}!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setClgAppn([]);
        getPendingCollegeApplications();
      } else {
        const errorMessage = "Failed to update status. Try again.";
        toast.update(toastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error(error.message);
      const errorMessage =
        error.response?.data?.message || "Failed to update status. Try again.";
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="list">
      {ClgAppn.length > 0 ? (
        ClgAppn.map((data, key) => {
          return (
            <div className="appn" key={key}>
              <div className="ClgName">
                <span>Applicant:</span>
                {data.collegeName}
              </div>
              <div className="AuthName">
                <span>contact person:</span>
                {data.authorityName} ( {data.authorityRole} )
              </div>
              <div className="Email">
                <span>Email:</span>
                {data.officialEmail}
              </div>
              <div className="App-time">
                <span>Submission Date:</span>
                {new Date(data.createdAt).toLocaleString(
                  "en-US",
                  optionsWithTime
                )}
              </div>
              <div className="btn-field">
                <button
                  type="button"
                  onClick={() => {
                    updateCollegeStatus(data.id, "APPROVED");
                  }}
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateCollegeStatus(data.id, "REJECTED");
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="loading"> Loading Applications </div>
      )}
    </div>
  );
};

const CollegesContent = () => {
  const [clg, setClg] = useState([]);

  const getCollegeList = async () => {
    try {
      const response = await apiClient.get(
        "/api/system-admin/getCollegeInfoList"
      );
      if (response) {
        setClg(response.data);
      } else {
        toast.error("Internal Server Error");
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCollegeList();
  }, []);

  return (
    <div className="college-list list">
      {clg.length > 0 ? (
        clg.map((data, key) => {
          return (
            <div className="appn" key={key}>
              <div className="ClgName field">
                <span>College Name:</span>
                {data.name}
              </div>
              <div className="AuthName field">
                <span>Created By:</span>
                {data.createdBy ? data.createdBy : "N/A"}
              </div>
              <div className="Email field">
                <span>Email:</span>
                {data.email ? data.email : "N/A"}
              </div>
              <div className="App-time field">
                <span>Creation Date:</span>
                {new Date(data.createdAt).toLocaleString(
                  "en-US",
                  optionsWithTime
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="loading"> Loading Applications </div>
      )}
    </div>
  );
};
const UsersContent = () => {
  const [clg, setClg] = useState([]);

  const getUsersInfo = async () => {
    try {
      const response = await apiClient.get(
        "/api/system-admin/getUsersInfoList"
      );
      setClg(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUsersInfo();
  }, []);
  return (
    <div className="list">
      {clg.length > 0 ? (
        clg.map((data, key) => {
          return (
            <div className="appn" key={key}>
              <div className="field">
                <span>Name:</span>
                {data.name}
              </div>
              <div className="field">
                <span>username:</span>
                {data.username ? data.username : "N/A"}
              </div>
              <div className="field">
                <span>Email:</span>
                {data.email ? data.email : "N/A"}
              </div>
              <div className="field">
                <span>Role:</span>
                {data.role ? data.role : "N/A"}
              </div>
              <div className="field">
                <span>College:</span>
                {data.college?.name ? data.college?.name : "N/A"}
              </div>
              <div className="App-time">
                <span>Created At:</span>
                {new Date(data.createdAt).toLocaleString(
                  "en-US",
                  optionsWithTime
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="loading"> Loading Applications </div>
      )}
    </div>
  );
};

const SystemAdmin = () => {
  const { logout } = useContext(SystemAdminAuthContext);
  const sidebarRef = useRef(null);
  const [activeSection, setActiveSection] = useState(
    sessionStorage.getItem("current_tab") || "Users"
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!isMobileSidebarOpen) return;
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileSidebarOpen]);

  const handleMenuClick = (sectionName) => {
    setActiveSection(sectionName);
    setIsMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success("successfully Loged Out!");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "College Application":
        sessionStorage.setItem("current_tab", "College Application");
        return <CollegeApplications />;
      case "Colleges":
        sessionStorage.setItem("current_tab", "Colleges");
        return <CollegesContent />;
      case "Users":
        sessionStorage.setItem("current_tab", "Users");
        return <UsersContent />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="system-admin-wrapper">
      {/* Sidebar - Dynamic class added if open on mobile */}
      <aside
        ref={sidebarRef}
        className={`sa-sidebar ${isMobileSidebarOpen ? "mobile-open" : ""}`}
      >
        <div className={`app-name`}>
          <img src={logo} alt="" height="50" />
          <span>AttendEase</span>
        </div>

        <div
          className={`sa-menu-item ${
            activeSection === "Users" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Users")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="menu-icon"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Users</span>
        </div>
        <div
          className={`sa-menu-item ${
            activeSection === "Colleges" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Colleges")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="menu-icon"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Colleges</span>
        </div>

        <div
          className={`sa-menu-item ${
            activeSection === "College Application" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("College Application")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="menu-icon"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>College Application</span>
        </div>

        <div className={`sa-menu-item logout`} onClick={() => handleLogout()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="menu-icon"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        </div>
      </aside>

      <main className="sa-main-content">
        <header className="sa-header">
          <div className="sa-hamburger" onClick={toggleMobileSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
          {/* <div className="sa-profile-icon"></div> */}
        </header>

        {/* Render the dynamic content based on active state */}
        {renderContent()}
      </main>
    </div>
  );
};

export default SystemAdmin;
