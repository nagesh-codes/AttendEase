import React, { useContext, useEffect, useRef, useState } from "react";
import "../css-files/SystemAdmin.css";
import "../css-files/CollegeAdmin.css";
import "../css-files/layout.css";
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

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [collegeId, setCollegeId] = useState(
    localStorage.getItem("collegeId") | 0
  );

  const getAllTeachers = async () => {
    try {
      const response = await apiClient.get("/api/college-admin/get-teachers", {
        params: { collegeId },
      });
      if (response.status == 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      toast.error("internal server error");
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  return (
    <div className="teachers list">
      {teachers.length > 0 ? (
        teachers.map((data, key) => {
          return (
            <div className="appn" key={key}>
              <div className="ClgName field">
                <span>Name:</span>
                {data.name}
              </div>
              <div className="username field">
                <span>Username:</span>
                {data.username}
              </div>
              <div className="email field">
                <span>Email:</span>
                {data.email}
              </div>
              <div className="App-time field">
                <span>Submission Date:</span>
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

const Classes = () => {
  const [streams, setStreams] = useState([
    { id: 1, name: "FY BCA", subjects: ["C Programming", "Web Basics", "Maths"] },
    { id: 2, name: "SY BCA", subjects: ["Core Java", "Data Structures", "DBMS"] },
    { id: 3, name: "TY BCA", subjects: ["Advanced Java", "ReactJS", "Project"] },
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="classes-view-container">
      
      <div className="view-header">
        <div className="header-icon-box">📚</div>
        <div>
            <h3>Academic Classes</h3>
            <p>View all active streams and their curriculum</p>
        </div>
      </div>

      <div className="class-grid">
        {streams.map((stream, index) => (
          <div 
            key={stream.id} 
            className={`modern-card ${expandedId === stream.id ? "active" : ""}`}
            onClick={() => toggleExpand(stream.id)}
            style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
          >
            <div className="card-accent-bar"></div>
            <div className="card-content">
              <div className="card-top">
                <div className="class-info">
                  <h4 className="class-title">{stream.name}</h4>
                  <span className="subject-count-badge">
                    {stream.subjects.length} Subjects
                  </span>
                </div>
                <div className={`arrow-circle ${expandedId === stream.id ? "rotated" : ""}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              <div className={`card-body ${expandedId === stream.id ? "show" : ""}`}>
                <div className="divider"></div>
                
                {stream.subjects.length > 0 ? (
                  <div className="subject-pills-container">
                    {stream.subjects.map((sub, idx) => (
                      <div key={idx} className="modern-pill">
                        <span className="dot">•</span> {sub}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No subjects assigned yet.</p>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
      <style>{`
        .classes-view-container {
          padding: 30px;
          background: #f4f7f6; /* Very light cool gray */
          min-height: 100%;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }

        /* Header Styling */
        .view-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
        }
        .header-icon-box {
          width: 50px; height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 24px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(118, 75, 162, 0.3);
        }
        .view-header h3 { margin: 0; color: #2d3748; font-size: 24px; font-weight: 700; }
        .view-header p { margin: 4px 0 0 0; color: #718096; font-size: 14px; }

        /* Card List */
        .class-grid { display: flex; flex-direction: column; gap: 16px; }

        .modern-card {
          background: white;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.04);
          animation: fadeUp 0.5s ease backwards;
        }

        .modern-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        /* Color Bar on Left */
        .card-accent-bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 5px;
          background: linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%);
        }
        .modern-card.active .card-accent-bar {
          background: linear-gradient(to bottom, #43e97b 0%, #38f9d7 100%);
        }

        /* Content Area */
        .card-content { padding: 20px 24px 20px 30px; }

        .card-top {
          display: flex; justify-content: space-between; align-items: center;
        }

        .class-title { margin: 0; font-size: 18px; color: #2d3748; font-weight: 600; }
        
        .subject-count-badge {
          background: #edf2f7; color: #718096;
          font-size: 12px; padding: 4px 10px; border-radius: 20px;
          margin-left: 12px; font-weight: 500;
        }

        /* Arrow Animation */
        .arrow-circle {
          width: 32px; height: 32px;
          background: #f7fafc;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #a0aec0;
          transition: all 0.3s ease;
        }
        .modern-card:hover .arrow-circle { background: #e2e8f0; color: #4a5568; }
        .arrow-circle.rotated { transform: rotate(180deg); background: #ebf8ff; color: #3182ce; }

        /* Body & Subjects */
        .card-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease-in-out, opacity 0.3s ease;
          opacity: 0;
        }
        .card-body.show {
          max-height: 500px; /* Big enough to fit contents */
          opacity: 1;
          margin-top: 15px;
        }

        .divider { height: 1px; background: #e2e8f0; margin-bottom: 15px; }

        .subject-pills-container { display: flex; flex-wrap: wrap; gap: 10px; }

        .modern-pill {
          background: linear-gradient(135deg, #f6f9fc 0%, #f1f4f8 100%);
          border: 1px solid #e2e8f0;
          color: #4a5568;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          display: flex; align-items: center; gap: 8px;
          transition: 0.2s;
        }
        
        .modern-pill:hover {
          background: white;
          border-color: #bee3f8;
          color: #3182ce;
          box-shadow: 0 2px 6px rgba(49, 130, 206, 0.1);
        }

        .dot { color: #4299e1; font-weight: bold; font-size: 18px; line-height: 0; }
        .empty-state { color: #a0aec0; font-style: italic; font-size: 14px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const TeacherRequest = () => {
  const [PendingTeachers, setPendinTeachers] = useState([]);

  const getPendingTeachers = async () => {
    try {
      const response = await apiClient.get(
        "/api/college-admin/pending-teachers",
        {
          params: { username: "mycollege", collegeId: 16 },
        }
      );
      if (response.status == 200) {
        setPendinTeachers(response.data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("internal server error");
    }
  };

  useEffect(() => {
    getPendingTeachers();
  }, []);

  const updateTeacherRequest = async (id, status) => {
    const toastId = toast.loading("Making Changes");
    try {
      const response = await apiClient.patch(
        "/api/college-admin/update-teacher-appn",
        {
          id,
          status,
          collegeId: 16,
        }
      );
      if (response.status == 200) {
        toast.update(toastId, {
          render: id,
          isLoading: false,
          type: "success",
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "Cannot Make Changes At This Time",
          isLoading: false,
          type: "error",
          autoClose: 4000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Cannot Make Changes At This Time",
        isLoading: false,
        type: "error",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="pending-teachers list">
      {PendingTeachers.length > 0 ? (
        PendingTeachers.map((data, key) => {
          return (
            <div className="appn" key={key}>
              <div className="ClgName field">
                <span>Name:</span>
                {data.name}
              </div>
              <div className="username field">
                <span>Username:</span>
                {data.username}
              </div>
              <div className="email field">
                <span>Email:</span>
                {data.email}
              </div>
              <div className="App-time field">
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
                    updateTeacherRequest(data.id, "ACTIVE");
                  }}
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateTeacherRequest(data.id, "REJECTED");
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

const Setting = () => {
  const [collegeId, setCollegeId] = useState(
    localStorage.getItem("collegeId") | 0
  );
  const [collegeDetails, setCollegeDetails] = useState({
    name: "Getting Details...",
    address: "Getting Details...",
    email: "Getting Details...",
    phone: "Getting Details...",
  });

  const [streams, setStreams] = useState([
    { name: "Class Name", subjects: ["Subject 1", "Subject 2"] },
  ]);

  const [newClassName, setNewClassName] = useState("");

  const [subjectInputs, setSubjectInputs] = useState({});
  const [newSubjectName, setNewSubjectName] = useState("");

  const handleProfileChange = (e) => {
    setCollegeDetails({ ...collegeDetails, [e.target.name]: e.target.value });
  };

  const handleAddClass = async () => {
    if (newClassName.trim() == "") return;
    const toastid = toast.loading("Adding Your Class");
    try {
      const response = await apiClient.post("/api/college-admin/add-class", {
        collegeId,
        className: newClassName.trim(),
      });
      if (response.status == 200) {
        toast.update(toastid, {
          render: `Class ${newClassName} is Added.`,
          autoClose: 4000,
          isLoading: false,
          type: "success",
        });
      } else {
        toast.update(toastid, {
          render: `Class ${newClassName} Not Added.`,
          autoClose: 4000,
          isLoading: false,
          type: "error",
        });
      }
    } catch (error) {
      toast.update(toastid, {
        render: `Class ${newClassName} Not Added.`,
        autoClose: 4000,
        isLoading: false,
        type: "error",
      });
    }
  };

  const handleDeleteClass = async (index, id) => {
    if (
      window.confirm(
        "Are you sure? This will delete the class and ALL its subjects."
      )
    ) {
      const toastid = toast.loading("Deleting Your Class");
      try {
        const response = await apiClient.delete(
          "/api/college-admin/delete-class",
          {
            params: { classId: id },
          }
        );
        console.log(response);
        if (response.status == 200) {
          toast.update(toastid, {
            render: "Class and Its Subject Successfully Deleted",
            isLoading: false,
            type: "success",
            autoClose: 4000,
          });
          const updated = streams.filter((_, i) => i !== index);
          setStreams(updated);
        } else {
          toast.update(toastid, {
            render: "We Cant Delete Your Class, Right now!",
            isLoading: false,
            type: "error",
            autoClose: 4000,
          });
        }
      } catch (error) {
        toast.update(toastid, {
          render: "We Cant Delete Your Class, Right now!",
          isLoading: false,
          type: "error",
          autoClose: 4000,
        });
      }
    }
  };

  const handleSubjectInputChange = async (classIndex, value) => {
    setSubjectInputs({ ...subjectInputs, [classIndex]: value });
  };

  const handleAddSubject = async (classIndex, id, subject_Name) => {
    const updatedStreams = [...streams];
    const subjectName = subjectInputs[classIndex];
    if (subjectName && subjectName.trim() !== "") {
      const toastid = toast.loading(`Adding the ${subjectName} subject.`);
      try {
        const response = await apiClient.post(
          "/api/college-admin/add-subject",
          {
            classId: id,
            subjectName,
          }
        );
        if (response.status == 200) {
          toast.update(toastid, {
            render: `${subjectName} subject Added.`,
            autoClose: 4000,
            isLoading: false,
            type: "success",
          });
          updatedStreams[classIndex].subjects.push(subjectName);
          setStreams(updatedStreams);

          setSubjectInputs({ ...subjectInputs, [classIndex]: "" });
        } else {
          toast.update(toastid, {
            render: `${subjectName} subject Not Added.`,
            autoClose: 4000,
            isLoading: false,
            type: "error",
          });
        }
      } catch (error) {
        toast.update(toastid, {
          render: `${subject_Name} subject Not Added.`,
          autoClose: 4000,
          isLoading: false,
          type: "error",
        });
      }
    }
  };

  const handleDeleteSubject = async (
    classIndex,
    subjectIndex,
    id,
    subjectName
  ) => {
    if (window.confirm("Are you sure? This will delete the subjects.")) {
      const updatedStreams = [...streams];
      const toastid = toast.loading(`Deleting the ${subjectName} subject.`);
      try {
        const response = await apiClient.delete(
          "/api/college-admin/delete-subject",
          {
            params: {
              classId: id,
              subjectName,
            },
          }
        );
        if (response.status == 200) {
          toast.update(toastid, {
            render: `${subjectName} subject Deleted`,
            autoClose: 4000,
            isLoading: false,
            type: "success",
          });
          updatedStreams[classIndex].subjects = updatedStreams[
            classIndex
          ].subjects.filter((_, i) => i !== subjectIndex);
          setStreams(updatedStreams);
        } else {
          toast.update(toastid, {
            render: `${subjectName} subject Not Deleted.`,
            autoClose: 4000,
            isLoading: false,
            type: "error",
          });
        }
      } catch (error) {
        toast.update(toastid, {
          render: `${subject_Name} subject Not Deleted.`,
          autoClose: 4000,
          isLoading: false,
          type: "error",
        });
      }
    }
  };

  const getAllCollegeData = async () => {
    try {
      const collegeInfoPromise = apiClient.get(
        "/api/college-admin/get-college-info",
        {
          params: { collegeId: 16 },
        }
      );
      const streamInfoPromise = apiClient.get(
        "/api/college-admin/get-college-class",
        {
          params: { collegeId: 16 },
        }
      );
      const [collegeInfoResult, streamInfoResult] = await Promise.allSettled([
        collegeInfoPromise,
        streamInfoPromise,
      ]);

      if (collegeInfoResult.status == "fulfilled") {
        setCollegeDetails(collegeInfoResult.value.data);
      } else {
        toast.error("we cant get the college details at this time");
      }

      if (streamInfoResult.status == "fulfilled") {
        setStreams(streamInfoResult.value.data);
      } else {
        toast.error("we cant get the stream at this time");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllCollegeData();
  }, []);

  return (
    <div className="setting-page-container">
      <div className="page-header-box">
        <h2>College Settings</h2>
        <p>
          Manage your college profile, academic streams, and account security.
        </p>
      </div>

      <section className="setting-section">
        <div className="section-header-row">
          <h3>College Identity</h3>
          <p>
            This information will appear on generated reports and student
            portals.
          </p>
        </div>

        <div className="form-grid">
          <div className="input-group full-width">
            <label>College Name</label>
            <input
              type="text"
              name="name"
              value={collegeDetails.name}
              onChange={handleProfileChange}
            />
          </div>

          <div className="input-group full-width">
            <label>Address</label>
            <textarea
              name="address"
              rows="3"
              value={collegeDetails.address}
              onChange={handleProfileChange}
            ></textarea>
          </div>

          <div className="input-group">
            <label>Official Email</label>
            <input
              type="email"
              name="email"
              value={collegeDetails.email}
              onChange={handleProfileChange}
            />
          </div>

          <div className="input-group">
            <label>Contact Phone</label>
            <input
              type="text"
              name="phone"
              value={collegeDetails.phone}
              onChange={handleProfileChange}
            />
          </div>
        </div>
        <div className="action-row">
          <button className="btn-primary">Save Profile Changes</button>
        </div>
      </section>

      <section className="setting-section">
        <div className="section-header-row">
          <h3>Class & Subject Management</h3>
          <p>Create classes and assign specific subjects to them.</p>
        </div>

        <div className="add-class-wrapper">
          <div className="add-class-box">
            <input
              type="text"
              placeholder="Create New Class (e.g. MSc Computer Science)"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <button className="btn-add" onClick={handleAddClass}>
              + Create Class
            </button>
          </div>
        </div>

        <div className="streams-container">
          {streams.map((stream, classIndex) => (
            <div key={classIndex} className="stream-card">
              <div className="stream-header">
                <h4 className="stream-title">{stream.name}</h4>
                <button
                  className="btn-icon-delete"
                  onClick={() => handleDeleteClass(classIndex, stream.id)}
                  title="Delete Class"
                >
                  Delete Class
                </button>
              </div>

              <div className="stream-body">
                <p className="sub-label">Subjects:</p>

                {stream.subjects.length === 0 ? (
                  <p className="no-data">No subjects added yet.</p>
                ) : (
                  <div className="subject-chips">
                    {stream.subjects.map((sub, subIndex) => (
                      <div key={subIndex} className="subject-chip">
                        {sub}
                        <span
                          className="remove-chip"
                          onClick={() =>
                            handleDeleteSubject(
                              classIndex,
                              subIndex,
                              stream.id,
                              sub
                            )
                          }
                        >
                          ×
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="add-subject-row">
                  <input
                    type="text"
                    placeholder="Add Subject..."
                    className="small-input"
                    value={subjectInputs[classIndex] || ""}
                    onChange={(e) => {
                      handleSubjectInputChange(classIndex, e.target.value);
                      setNewSubjectName(e.target.value);
                    }}
                  />
                  <button
                    className="btn-small-add"
                    onClick={() =>
                      handleAddSubject(classIndex, stream.id, newSubjectName)
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="setting-section danger-border">
        <div className="section-header-row">
          <h3>Account Security</h3>
          <p>Update your administrative login credentials.</p>
        </div>

        <div className="form-grid">
          <div className="input-group full-width">
            <label>Current Password</label>
            <input type="password" placeholder="********" />
          </div>
          <div className="input-group">
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm new password" />
          </div>
        </div>
        <div className="action-row">
          <button className="btn-secondary">Update Password</button>
        </div>
      </section>
    </div>
  );
};

const CollegeAdmin = () => {
  const { logout } = useContext(SystemAdminAuthContext);
  const sidebarRef = useRef(null);
  const [activeSection, setActiveSection] = useState(
    sessionStorage.getItem("current_tab") || "Teachers"
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
      case "Teachers":
        sessionStorage.setItem("current_tab", "Teachers");
        return <Teachers />;
      case "Classes":
        sessionStorage.setItem("current_tab", "Classes");
        return <Classes />;
      case "Teacher Requests":
        sessionStorage.setItem("current_tab", "Teacher Requests");
        return <TeacherRequest />;
      case "Setting":
        sessionStorage.setItem("current_tab", "Setting");
        return <Setting />;
      default:
        return <div>Page not found</div>;
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
            activeSection === "Teachers" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Teachers")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
          >
            <path d="M7 3h10v18H7z" />
            <path d="M11 7h2" />
            <path d="M11 11h2" />
            <path d="M2 21h20" />
          </svg>
          <span>Teachers</span>
        </div>
        <div
          className={`sa-menu-item ${
            activeSection === "Classes" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Classes")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span>Classes</span>
        </div>

        <div
          className={`sa-menu-item ${
            activeSection === "Teacher Requests" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Teacher Requests")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          <span>Teacher Requests</span>
        </div>

        <div
          className={`sa-menu-item ${
            activeSection === "Setting" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Setting")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span>Setting</span>
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

export default CollegeAdmin;
