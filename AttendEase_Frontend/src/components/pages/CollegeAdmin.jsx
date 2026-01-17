import React, { useContext, useEffect, useRef, useState } from "react";
import "../css-files/SystemAdmin.css";
import "../css-files/CollegeAdmin.css";
import "../css-files/layout.css";
import logo from "../../assets/logo.png";
import { apiClient } from "../../API/apiClient";
import { toast } from "react-toastify";
import { SystemAdminAuthContext } from "../../context/SystemAdminAuthContext";
import Papa from "papaparse"; // npm install papaparse
import {
  FaCloudUploadAlt,
  FaFileCsv,
  FaFileExcel,
  FaFileCode,
  FaTrash,
  FaPlus,
  FaChalkboardTeacher,
  FaChevronDown,
  FaChevronUp,
  FaUserPlus,
} from "react-icons/fa";

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
            className={`modern-card ${
              expandedId === stream.id ? "active" : ""
            }`}
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
                <div
                  className={`arrow-circle ${
                    expandedId === stream.id ? "rotated" : ""
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              <div
                className={`card-body ${
                  expandedId === stream.id ? "show" : ""
                }`}
              >
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
  // --- 1. College Profile State ---
  const [collegeDetails, setCollegeDetails] = useState({
    name: "Sangola Mahavidyalaya",
    address: "Kadlas Road, Sangola",
    email: "admin@sangola.ac.in",
    phone: "9876543210",
    website: "www.sangolacollege.ac.in",
  });

  // --- 2. Academic Data State ---
  const [streams, setStreams] = useState([
    { id: 1, name: "FY BCA", subjects: ["C Programming", "Maths"] },
    { id: 2, name: "SY BCA", subjects: ["Java", "DBMS"] },
  ]);

  // --- 3. New Class Creation State ---
  const [newClassName, setNewClassName] = useState("");
  const [studentFile, setStudentFile] = useState(null);
  const [parsedStudents, setParsedStudents] = useState([]);

  // --- 4. Accordion & Subject State ---
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [newSubjectInput, setNewSubjectInput] = useState("");

  // --- 5. Late Admission Form State ---
  const [singleStudent, setSingleStudent] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
  });

  // ==============================
  //        HANDLERS
  // ==============================

  // --- Profile Handler ---
  const handleProfileChange = (e) => {
    setCollegeDetails({ ...collegeDetails, [e.target.name]: e.target.value });
  };

  // --- File Parsing (Excel/CSV/JSON) ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStudentFile(file);

    const fileName = file.name.toLowerCase();

    // Excel Logic
    if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        setParsedStudents(data);
      };
      reader.readAsBinaryString(file);
    }
    // CSV Logic
    else if (fileName.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => setParsedStudents(results.data),
      });
    }
    // JSON Logic
    else if (fileName.endsWith(".json")) {
      const reader = new FileReader();
      reader.onload = (evt) => setParsedStudents(JSON.parse(evt.target.result));
      reader.readAsText(file);
    }
  };

  // --- Create Class Handler ---
  const handleCreateClass = async () => {
    if (!newClassName.trim()) {
      toast.error("Please enter a class name.");
      return;
    }
    if (!studentFile || parsedStudents.length === 0) {
      toast.error("Please upload a valid student list file.");
      return;
    }

    // Backend API Call Placeholder
    /*
    try {
      await apiClient.post('/api/college-admin/add-class', {
         name: newClassName,
         students: parsedStudents
      });
      toast.success("Class created successfully!");
    } catch(err) { toast.error("Failed"); }
    */

    // UI Update Simulation
    const newClass = {
      id: Date.now(),
      name: newClassName,
      subjects: [],
    };
    setStreams([...streams, newClass]);

    // Reset Form
    setNewClassName("");
    setStudentFile(null);
    setParsedStudents([]);
    toast.success(
      `Class "${newClassName}" created with ${parsedStudents.length} students!`
    );
  };

  // --- Accordion Handlers ---
  const toggleExpand = (id) => {
    setExpandedClassId(expandedClassId === id ? null : id);
    setNewSubjectInput("");
    setSingleStudent({ name: "", rollNo: "", email: "", phone: "" }); // Clear student form
  };

  const handleDeleteClass = (id) => {
    if (
      window.confirm(
        "Are you sure? This will delete the class and all students."
      )
    ) {
      setStreams(streams.filter((s) => s.id !== id));
      toast.info("Class deleted.");
    }
  };

  // --- Subject Handlers ---
  const handleAddSubject = (classId) => {
    if (!newSubjectInput.trim()) return;
    const updatedStreams = streams.map((s) => {
      if (s.id === classId) {
        return { ...s, subjects: [...s.subjects, newSubjectInput] };
      }
      return s;
    });
    setStreams(updatedStreams);
    setNewSubjectInput("");
    toast.success("Subject added");
  };

  const handleDeleteSubject = (classId, subIndex) => {
    const updatedStreams = streams.map((s) => {
      if (s.id === classId) {
        const newSubjects = s.subjects.filter((_, idx) => idx !== subIndex);
        return { ...s, subjects: newSubjects };
      }
      return s;
    });
    setStreams(updatedStreams);
  };

  // --- Late Admission (Single Student) Handler ---
  const handleAddSingleStudent = (classId) => {
    const { name, rollNo, email, phone } = singleStudent;

    // Validation
    if (!name || !rollNo || !phone) {
      toast.warn("Name, Roll No, and Phone are required!");
      return;
    }

    console.log(`Adding to Class ID ${classId}:`, singleStudent);

    // Backend API Call Placeholder
    /*
    await apiClient.post('/api/student/add-single', { classId, ...singleStudent });
    */

    toast.success(`Student ${name} (Roll: ${rollNo}) added successfully!`);

    // Reset Form
    setSingleStudent({ name: "", rollNo: "", email: "", phone: "" });
  };

  // Helper for File Icon
  const getFileIcon = () => {
    if (!studentFile) return <FaCloudUploadAlt className="upload-icon-large" />;
    if (studentFile.name.endsWith(".csv"))
      return <FaFileCsv className="file-icon csv" />;
    if (studentFile.name.endsWith(".json"))
      return <FaFileCode className="file-icon json" />;
    return <FaFileExcel className="file-icon xls" />;
  };

  return (
    <div className="setting-page-container">
      {/* Header */}
      <div className="page-header-box">
        <h2>College Settings</h2>
        <p>
          Manage your college profile, academic streams, and account security.
        </p>
      </div>

      {/* --- SECTION 1: COLLEGE IDENTITY --- */}
      <section className="setting-section">
        <div className="section-header-row">
          <h3>College Identity</h3>
          <p>This information will appear on generated reports.</p>
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
              rows="2"
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

      {/* --- SECTION 2: CLASS & STUDENT MANAGEMENT --- */}
      <section className="setting-section">
        <div className="section-header-row">
          <h3>Class & Student Management</h3>
          <p>Create classes, bulk upload students, or add late admissions.</p>
        </div>

        {/* A. Create Class Panel */}
        <div className="create-class-panel">
          <h4 className="panel-title">
            <FaChalkboardTeacher /> Initialize New Class
          </h4>

          <div className="form-grid">
            <div className="input-group">
              <label>Class Name</label>
              <input
                type="text"
                placeholder="e.g. FY BCA 2024"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="main-input"
              />
            </div>

            <div className="input-group">
              <label>Bulk Student Upload (Excel/CSV)</label>
              <div className={`file-drop-zone ${studentFile ? "active" : ""}`}>
                <input
                  type="file"
                  id="fileUpload"
                  accept=".csv, .xlsx, .xls, .json"
                  onChange={handleFileChange}
                  hidden
                />
                <label htmlFor="fileUpload" className="drop-zone-label">
                  <span className="icon-area">{getFileIcon()}</span>
                  <div className="text-area">
                    {studentFile ? (
                      <span className="filename">{studentFile.name}</span>
                    ) : (
                      <span>
                        Click to upload <strong>.xlsx / .csv</strong>
                      </span>
                    )}
                    <span className="support-text">
                      {parsedStudents.length > 0
                        ? `${parsedStudents.length} students ready to import`
                        : "Required for class creation"}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <button className="btn-create-main" onClick={handleCreateClass}>
            <FaPlus /> Create Class & Import Students
          </button>
        </div>

        <hr className="divider" />

        {/* B. Active Classes Accordion */}
        <div className="streams-header">
          <h4>Active Classes</h4>
        </div>

        <div className="class-accordion-list">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className={`accordion-card ${
                expandedClassId === stream.id ? "expanded" : ""
              }`}
            >
              {/* Header */}
              <div
                className="accordion-header"
                onClick={() => toggleExpand(stream.id)}
              >
                <span className="stream-name">{stream.name}</span>

                <div className="header-controls">
                  <span className="badge">
                    {stream.subjects.length} Subjects
                  </span>
                  <button
                    className="btn-icon-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClass(stream.id);
                    }}
                    title="Delete Class"
                  >
                    <FaTrash />
                  </button>
                  <span className="arrow-icon">
                    {expandedClassId === stream.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </div>
              </div>

              {/* Body */}
              {expandedClassId === stream.id && (
                <div className="accordion-body">
                  {/* 1. Subjects Section */}
                  <div className="body-section">
                    <h5 className="sub-heading">Subjects</h5>
                    <div className="subject-chips">
                      {stream.subjects.length === 0 && (
                        <span className="no-sub">No subjects yet.</span>
                      )}
                      {stream.subjects.map((sub, idx) => (
                        <div key={idx} className="chip">
                          {sub}
                          <span
                            className="x-btn"
                            onClick={() => handleDeleteSubject(stream.id, idx)}
                          >
                            ×
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="add-sub-row">
                      <input
                        type="text"
                        placeholder="Add Subject (e.g. Maths)..."
                        value={newSubjectInput}
                        onChange={(e) => setNewSubjectInput(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAddSubject(stream.id)
                        }
                      />
                      <button onClick={() => handleAddSubject(stream.id)}>
                        Add
                      </button>
                    </div>
                  </div>

                  <hr className="inner-divider" />

                  {/* 2. Late Admission Form */}
                  <div className="body-section">
                    <h5 className="sub-heading">
                      <FaUserPlus /> Late Admission (Add Single Student)
                    </h5>

                    <div className="add-student-grid">
                      {/* Roll No */}
                      <input
                        type="text"
                        placeholder="Roll No"
                        value={singleStudent.rollNo}
                        onChange={(e) =>
                          setSingleStudent({
                            ...singleStudent,
                            rollNo: e.target.value,
                          })
                        }
                        className="input-roll"
                      />

                      {/* Name */}
                      <input
                        type="text"
                        placeholder="Student Name"
                        value={singleStudent.name}
                        onChange={(e) =>
                          setSingleStudent({
                            ...singleStudent,
                            name: e.target.value,
                          })
                        }
                        className="input-name"
                      />

                      {/* Phone (New Field) */}
                      <input
                        type="number"
                        placeholder="Phone No"
                        value={singleStudent.phone}
                        onChange={(e) =>
                          setSingleStudent({
                            ...singleStudent,
                            phone: e.target.value,
                          })
                        }
                        className="input-phone"
                      />

                      {/* Email */}
                      <input
                        type="email"
                        placeholder="Email (Optional)"
                        value={singleStudent.email}
                        onChange={(e) =>
                          setSingleStudent({
                            ...singleStudent,
                            email: e.target.value,
                          })
                        }
                        className="input-email"
                      />

                      <button
                        className="btn-add-student"
                        onClick={() => handleAddSingleStudent(stream.id)}
                      >
                        <FaPlus size={12} /> Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: SECURITY --- */}
      <section className="setting-section danger-border">
        <div className="section-header-row">
          <h3>Account Security</h3>
          <p>Update your administrative login credentials.</p>
        </div>
        <div className="form-grid">
          <div className="input-group">
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

      {/* ==============================
          CSS STYLES
      ============================== */}
      <style>{`
        .setting-page-container {
          padding: 40px;
          background-color: #f4f6f9;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          box-sizing: border-box;
        }

        .page-header-box { margin-bottom: 30px; border-bottom: 1px solid #ddd; padding-bottom: 15px; }
        .page-header-box h2 { font-size: 26px; color: #2c3e50; margin: 0 0 5px 0; }
        .page-header-box p { color: #7f8c8d; font-size: 15px; margin: 0; }

        /* General Section Card */
        .setting-section {
          background: #fff;
          border-radius: 8px;
          padding: 25px;
          margin-bottom: 25px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          border: 1px solid #e0e0e0;
        }
        .section-header-row h3 { margin: 0; font-size: 18px; color: #34495e; }
        .section-header-row p { margin: 4px 0 20px 0; color: #95a5a6; font-size: 13px; }

        /* Form Inputs */
        .form-grid { display: flex; flex-wrap: wrap; gap: 20px; }
        .input-group { flex: 1 1 45%; display: flex; flex-direction: column; gap: 6px; }
        .input-group.full-width { flex: 1 1 100%; }
        
        label { font-size: 13px; font-weight: 600; color: #555; }
        input, textarea {
          padding: 10px; border: 1px solid #ced4da; border-radius: 5px; font-size: 14px;
          transition: border 0.2s;
        }
        input:focus, textarea:focus { border-color: #3498db; outline: none; }

        /* Buttons */
        .action-row { margin-top: 20px; text-align: right; }
        .btn-primary { background: #1abc9c; color: white; border: none; padding: 10px 25px; border-radius: 5px; cursor: pointer; font-weight: 600; }
        .btn-secondary { background: #34495e; color: white; border: none; padding: 10px 25px; border-radius: 5px; cursor: pointer; }

        /* Create Class Panel */
        .create-class-panel { background: #f8f9fa; padding: 20px; border-radius: 6px; border: 1px solid #e9ecef; }
        .panel-title { margin-top: 0; margin-bottom: 15px; color: #34495e; font-size: 15px; display: flex; align-items: center; gap: 8px; }
        .main-input { padding: 10px; border: 1px solid #ced4da; border-radius: 5px; }

        .file-drop-zone { border: 2px dashed #ced4da; border-radius: 5px; background: #fff; transition: 0.2s; }
        .file-drop-zone:hover { border-color: #3498db; background: #ebf5fb; }
        .file-drop-zone.active { border-color: #27ae60; background: #eafaf1; }
        .drop-zone-label { display: flex; align-items: center; gap: 12px; padding: 8px 15px; cursor: pointer; }
        .upload-icon-large { font-size: 22px; color: #95a5a6; }
        .file-icon { font-size: 22px; } .file-icon.csv { color: #27ae60; } .file-icon.xls { color: #2ecc71; } .file-icon.json { color: #f1c40f; }
        .filename { font-weight: 600; font-size: 14px; color: #2c3e50; }
        .support-text { font-size: 11px; color: #7f8c8d; }

        .btn-create-main {
          width: 100%; padding: 12px; background: #3498db; color: white; border: none; border-radius: 5px;
          font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 15px;
        }
        .btn-create-main:hover { background: #2980b9; }

        .divider { border: 0; border-top: 1px solid #eee; margin: 30px 0; }

        /* Accordion */
        .class-accordion-list { display: flex; flex-direction: column; gap: 10px; }
        .accordion-card { border: 1px solid #e0e0e0; border-radius: 6px; background: white; transition: 0.3s; overflow: hidden; }
        .accordion-card.expanded { border-color: #1abc9c; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .accordion-header {
          background: #f8f9fa; padding: 12px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
        }
        .accordion-header:hover { background: #f1f2f6; }
        .stream-name { font-weight: 700; color: #2c3e50; font-size: 15px; }

        .header-controls { display: flex; align-items: center; gap: 15px; }
        .badge { font-size: 11px; background: #dfe6e9; padding: 3px 8px; border-radius: 10px; color: #636e72; font-weight: 600; }
        .btn-icon-delete { background: none; border: 1px solid #e74c3c; color: #e74c3c; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; }
        .btn-icon-delete:hover { background: #e74c3c; color: white; }

        /* Accordion Body */
        .accordion-body { padding: 20px; border-top: 1px solid #eee; }
        .sub-heading { margin: 0 0 10px 0; font-size: 13px; color: #7f8c8d; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; display: flex; align-items: center; gap: 6px; }

        .subject-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .chip { background: #e0f2f1; color: #00695c; padding: 4px 10px; border-radius: 12px; font-size: 13px; display: flex; align-items: center; gap: 6px; }
        .x-btn { cursor: pointer; font-weight: bold; opacity: 0.6; } .x-btn:hover { opacity: 1; color: #d32f2f; }
        .no-sub { font-size: 13px; color: #aaa; font-style: italic; }

        .add-sub-row { display: flex; gap: 8px; }
        .add-sub-row input { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; }
        .add-sub-row button { padding: 8px 15px; background: #34495e; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; }

        .inner-divider { border: 0; border-top: 1px dashed #ddd; margin: 20px 0; }

        /* Late Admission Grid */
        .add-student-grid { 
          display: flex; gap: 10px; align-items: center; flex-wrap: wrap; 
          background: #fdfdfd; padding: 15px; border: 1px solid #f0f0f0; border-radius: 6px;
        }
        .input-roll { width: 80px; }
        .input-phone { width: 140px; }
        .input-name { flex: 2; min-width: 150px; }
        .input-email { flex: 2; min-width: 150px; }

        .btn-add-student {
          background-color: #27ae60; color: white; border: none; padding: 10px 18px; 
          border-radius: 5px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 5px;
        }
        .btn-add-student:hover { background-color: #219150; }

        .danger-border { border-left: 4px solid #e74c3c; }
      `}</style>
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
