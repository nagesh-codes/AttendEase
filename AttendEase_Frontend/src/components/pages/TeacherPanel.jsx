import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFileCsv,
  FaFileExcel,
  FaFileCode,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { SystemAdminAuthContext } from "../../context/SystemAdminAuthContext";
import logo from "../../assets/logo.png";
import "../css-files/layout.css";
import { apiClient } from "../../API/apiClient";
import { toast } from "react-toastify";

const Dashboard = () => {
  return <div>this is the dashboard tab</div>;
};

const MarkAttendance = () => {
  return <div>currently you dont have any classes</div>;
};

const MySchedule = () => {
  return <div>currently you dont have any classes</div>;
};

const AddNewClass = () => {
  // --- Mock Data ---
  const classData = [
    {
      id: 1,
      name: "FY BCA",
      subjects: ["C Programming", "Web Basics", "Maths"],
    },
    {
      id: 2,
      name: "SY BCA",
      subjects: ["Core Java", "Data Structures", "DBMS"],
    },
    {
      id: 3,
      name: "TY BCA",
      subjects: ["Advanced Java", "ReactJS", "Project"],
    },
  ];

  // --- State ---
  const [selectedClassId, setSelectedClassId] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [file, setFile] = useState(null);

  // --- Handlers ---
  const handleClassChange = (e) => {
    const classId = parseInt(e.target.value);
    setSelectedClassId(classId);
    setSelectedSubject("");
    const selectedClass = classData.find((c) => c.id === classId);
    setAvailableSubjects(selectedClass ? selectedClass.subjects : []);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClassId || !selectedSubject || !file) {
      alert("Please fill all fields and upload a file.");
      return;
    }
    console.log("Submitting:", {
      classId: selectedClassId,
      subject: selectedSubject,
      file: file.name,
    });
  };

  const getFileIcon = () => {
    if (!file) return <FaCloudUploadAlt size={40} color="#cbd5e0" />;
    if (file.name.endsWith(".csv"))
      return <FaFileCsv size={40} color="#27ae60" />;
    if (file.name.endsWith(".json"))
      return <FaFileCode size={40} color="#f1c40f" />;
    return <FaFileExcel size={40} color="#2ecc71" />;
  };

  const getStreanData = async () => {
    try {
      const response = await apiClient.get("/api/teacher/get-stream-data", {
        params: { teacherId: 7, collegeId: 16 },
      });
      console.log(response);
      toast.success("data arrived");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="add-class-container">
      {/* Header */}
      <div className="form-header">
        <div className="icon-wrapper">
          <FaChalkboardTeacher />
        </div>
        <div>
          <h2>Initialize New Class</h2>
          <p>Select stream details and upload student enrollment list.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-body">
        {/* Row 1: Dropdowns - They will now stretch to fill width */}
        <div className="form-row">
          <div className="form-group">
            <label>Select Class Stream</label>
            <select
              value={selectedClassId}
              onChange={handleClassChange}
              required
            >
              <option value="">-- Choose Class --</option>
              {classData.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedClassId}
              required
            >
              <option value="">
                {selectedClassId
                  ? "-- Choose Subject --"
                  : "-- Select Class First --"}
              </option>
              {availableSubjects.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: File Upload */}
        <div className="file-upload-section">
          <label className="upload-label">
            Upload Student List (JSON / CSV / Excel)
          </label>

          <div className={`upload-box ${file ? "has-file" : ""}`}>
            <input
              type="file"
              id="studentFile"
              accept=".json, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileChange}
              hidden
            />
            <label htmlFor="studentFile" className="upload-click-area">
              <div className="icon-area">{getFileIcon()}</div>
              <div className="text-area">
                {file ? (
                  <span className="file-name">{file.name}</span>
                ) : (
                  <span>
                    Drag & drop or <span className="highlight">browse</span> to
                    upload
                  </span>
                )}
                <span className="support-text">
                  Supports: .json, .csv, .xlsx
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-create">
          Create Class & Import
        </button>
      </form>

      {/* --- CSS STYLES --- */}
      <style>{`
        .add-class-container {
          width: 100%; /* Full Width */
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          font-family: 'Segoe UI', sans-serif;
          box-sizing: border-box; /* Ensures padding doesn't overflow width */
        }

        /* Header */
        .form-header { display: flex; gap: 15px; align-items: center; margin-bottom: 30px; }
        .icon-wrapper {
            width: 50px; height: 50px; background: #e0f2fe; color: #0284c7;
            border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;
        }
        .form-header h2 { margin: 0; color: #1e293b; font-size: 22px; }
        .form-header p { margin: 5px 0 0 0; color: #64748b; font-size: 14px; }

        /* Form Layout */
        .form-body { display: flex; flex-direction: column; gap: 25px; }
        
        .form-row { 
            display: flex; 
            gap: 20px; 
            width: 100%; /* Stretch row */
        }
        
        /* Ensure Inputs take equal space */
        .form-group { 
            flex: 1; /* Both dropdowns take 50% space */
            display: flex; 
            flex-direction: column; 
            gap: 8px; 
        }
        
        label { font-size: 14px; font-weight: 600; color: #334155; }

        select {
          width: 100%; /* Fill the group */
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 14px;
          background: #f8fafc;
          outline: none;
          transition: 0.2s;
        }
        select:focus { border-color: #0284c7; background: #fff; }

        /* File Upload */
        .file-upload-section { display: flex; flex-direction: column; gap: 10px; }
        .upload-box {
          width: 100%;
          border: 2px dashed #cbd5e1;
          border-radius: 10px;
          transition: all 0.2s ease;
          background: #f8fafc;
        }
        .upload-box:hover { border-color: #0284c7; background: #f0f9ff; }
        .upload-box.has-file { border-style: solid; border-color: #22c55e; background: #f0fdf4; }

        .upload-click-area {
          padding: 40px; /* Bigger click area */
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          cursor: pointer;
          width: 100%;
          box-sizing: border-box;
        }

        .text-area { display: flex; flex-direction: column; gap: 4px; }
        .highlight { color: #0284c7; font-weight: 600; text-decoration: underline; }
        .file-name { font-weight: 600; color: #1e293b; font-size: 16px; }

        /* Button */
        .btn-create {
          width: 100%; /* Full width button */
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          color: white;
          padding: 16px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 10px;
        }
        .btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
        }
      `}</style>
    </div>
  );
};

const Profile = () => {
  return <div>this is the profile tab</div>;
};

const Reports = () => {
  return <div>this is the reports tab</div>;
};

const TeacherPanel = () => {
  const { logout } = useContext(SystemAdminAuthContext);
  const sidebarRef = useRef(null);
  const [activeSection, setActiveSection] = useState(
    sessionStorage.getItem("current_tab") || "Dashboard"
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
      case "Dashboard":
        sessionStorage.setItem("current_tab", "Dashboard");
        return <Dashboard />;
      case "Mark Attendance":
        sessionStorage.setItem("current_tab", "Mark Attendance");
        return <MarkAttendance />;
      case "My Schedule":
        sessionStorage.setItem("current_tab", "My Schedule");
        return <MySchedule />;
      case "Add New Class":
        sessionStorage.setItem("current_tab", "Add New Class");
        return <AddNewClass />;
      case "Reports":
        sessionStorage.setItem("current_tab", "Reports");
        return <Reports />;
      case "Profile":
        sessionStorage.setItem("current_tab", "Profile");
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="layout">
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
            activeSection === "Dashboard" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Dashboard")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="18"
            width="18"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Dashboard</span>
        </div>
        <div
          className={`sa-menu-item ${
            activeSection === "Mark Attendance" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Mark Attendance")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="18"
            width="18"
          >
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          <span>Mark Attendance</span>
        </div>

        <div
          className={`sa-menu-item ${
            activeSection === "My Schedule" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("My Schedule")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="18"
            width="18"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>My Schedule</span>
        </div>

        <div
          className={`sa-menu-item ${
            activeSection === "Add New Class" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Add New Class")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="18"
            width="18"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
            <line x1="12" y1="7" x2="12" y2="13"></line>
            <line x1="9" y1="10" x2="15" y2="10"></line>
          </svg>
          <span>Add New Class</span>
        </div>

        <div
          className={`sa-menu-item ${
            activeSection === "Reports" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Reports")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="18"
            width="18"
          >
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <span>Reports</span>
        </div>

        <div
          className={`sa-menu-item ${
            activeSection === "Profile" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Profile")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="18"
            width="18"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Profile</span>
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
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default TeacherPanel;
