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
  FaUserGraduate,
  FaTimes,
  FaSave,
  FaPhone,
  FaEnvelope,
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
    localStorage.getItem("collegeId") | 0,
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
                  optionsWithTime,
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
        },
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
        },
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
                  optionsWithTime,
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
  // ==============================
  // 1. STATE MANAGEMENT
  // ==============================

  // College Profile
  const [collegeDetails, setCollegeDetails] = useState({
    name: "Loading...",
    address: "",
    email: "",
    phone: "",
    website: "",
  });

  // Academic Data (Classes, Subjects, Students)
  const [streams, setStreams] = useState([]); // This will hold your classes

  // New Class Form
  const [newClassName, setNewClassName] = useState("");
  const [studentFile, setStudentFile] = useState(null);
  const [parsedStudents, setParsedStudents] = useState([]);

  // Accordion & UI State
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [newSubjectInput, setNewSubjectInput] = useState("");

  // Modal State (Student Management)
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    roll: "",
    name: "",
    email: "",
    phone: "",
  });

  // ==============================
  // 2. INITIAL DATA FETCHING
  // ==============================
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    // try {
    //   const [collegeRes, classRes] = await Promise.all([
    //     apiClient.get('/api/college-admin/get-college-info'),
    //     apiClient.get('/api/college-admin/get-classes')
    //   ]);
    //   setCollegeDetails(collegeRes.data);
    //   setStreams(classRes.data);
    // } catch (error) {
    //   console.error("Error fetching data", error);

    // --- MOCK DATA FOR UI TESTING (Remove when API is ready) ---
    setCollegeDetails({
      name: "Sangola Mahavidyalaya",
      address: "Kadlas Road, Sangola",
      email: "admin@sangola.ac.in",
      phone: "9876543210",
    });
    setStreams([
      {
        id: 1,
        name: "FY BCA",
        subjects: ["C Programming", "Maths"],
        students: [
          // { id: 101, roll: "101", name: "Amit Sharma", phone: "9988776655", email: "amit@test.com" },
          // { id: 102, roll: "102", name: "Priya Patil", phone: "8877665544", email: "priya@test.com" },
        ],
      },
    ]);
    // }
  };

  // ==============================
  // 3. HANDLERS
  // ==============================

  // --- Profile ---
  const handleProfileChange = (e) => {
    setCollegeDetails({ ...collegeDetails, [e.target.name]: e.target.value });
  };

  // --- File Parsing Logic ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStudentFile(file);

    const fileName = file.name.toLowerCase();

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
    } else if (fileName.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => setParsedStudents(results.data),
      });
    }
  };

  // --- Class Creation ---
  const handleCreateClass = async () => {
    if (!newClassName.trim()) {
      toast.error("Class Name is required");
      return;
    }
    if (!studentFile || parsedStudents.length === 0) {
      toast.error("Student File is mandatory");
      return;
    }

    const toastId = toast.loading("Creating Class...");

    try {
      // await apiClient.post('/api/college-admin/add-class', {
      //   className: newClassName,
      //   students: parsedStudents
      // });

      // Mock Success
      const newClassObj = {
        id: Date.now(),
        name: newClassName,
        subjects: [],
        students: parsedStudents.map((s, i) => ({ ...s, id: Date.now() + i })), // Map file data to structure
      };

      setStreams([...streams, newClassObj]);
      toast.update(toastId, {
        render: "Class Created Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Reset
      setNewClassName("");
      setStudentFile(null);
      setParsedStudents([]);
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to create class",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // --- Accordion & Subjects ---
  const toggleExpand = (id) =>
    setExpandedClassId(expandedClassId === id ? null : id);

  const handleAddSubject = (classId) => {
    if (!newSubjectInput.trim()) return;

    // API Call would go here
    const updatedStreams = streams.map((s) =>
      s.id === classId
        ? { ...s, subjects: [...s.subjects, newSubjectInput] }
        : s,
    );
    setStreams(updatedStreams);
    setNewSubjectInput("");
    toast.success("Subject Added");
  };

  const handleDeleteSubject = (classId, idx) => {
    if (!window.confirm("Delete subject?")) return;

    const updatedStreams = streams.map((s) =>
      s.id === classId
        ? { ...s, subjects: s.subjects.filter((_, i) => i !== idx) }
        : s,
    );
    setStreams(updatedStreams);
  };

  const handleDeleteClass = (id) => {
    if (!window.confirm("Delete entire class and all students?")) return;

    setStreams(streams.filter((s) => s.id !== id));
    toast.info("Class Deleted");
  };

  // --- MODAL: Student Management ---
  const openStudentModal = (cls) => {
    setSelectedClass(cls); // Set the current class to view
    setShowStudentModal(true);
    setShowAddStudentForm(false);
  };

  const handleAddSingleStudent = () => {
    const { roll, name, email, phone } = newStudent;
    if (!roll || !name) {
      toast.warn("Roll No and Name are required");
      return;
    }

    // 1. Update the 'selectedClass' (Modal View)
    const newStudentObj = { id: Date.now(), roll, name, email, phone };
    const updatedClass = {
      ...selectedClass,
      students: [...(selectedClass.students || []), newStudentObj],
    };
    setSelectedClass(updatedClass);

    // 2. Update the main 'streams' state (Global View)
    const updatedStreams = streams.map((s) =>
      s.id === updatedClass.id ? updatedClass : s,
    );
    setStreams(updatedStreams);

    // 3. Reset Form
    setNewStudent({ roll: "", name: "", email: "", phone: "" });
    setShowAddStudentForm(false);
    toast.success("Student Added Successfully");
  };

  const handleDeleteStudent = (studentId) => {
    if (!window.confirm("Remove this student?")) return;

    const updatedClass = {
      ...selectedClass,
      students: selectedClass.students.filter((s) => s.id !== studentId),
    };

    setSelectedClass(updatedClass);
    setStreams(
      streams.map((s) => (s.id === updatedClass.id ? updatedClass : s)),
    );
    toast.success("Student Removed");
  };

  const getFileIcon = () => {
    if (!studentFile) return <FaCloudUploadAlt className="upload-icon-large" />;
    if (studentFile.name.endsWith(".csv"))
      return <FaFileCsv className="file-icon csv" />;
    return <FaFileExcel className="file-icon xls" />;
  };

  // ==============================
  // 4. RENDER UI
  // ==============================
  return (
    <div className="setting-page-container">
      {/* Header */}
      <div className="page-header-box">
        <h2>College Settings</h2>
        <p>Manage college profile, academic streams, and student enrollment.</p>
      </div>

      {/* --- SECTION 1: COLLEGE IDENTITY --- */}
      <section className="setting-section">
        <div className="section-header-row">
          <h3>College Identity</h3>
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
          <button className="btn-primary">Save Changes</button>
        </div>
      </section>

      {/* --- SECTION 2: CREATE NEW CLASS --- */}
      <section className="setting-section">
        <div className="section-header-row">
          <h3>Create New Class</h3>
          <p>Initialize a class by uploading the student list (Excel/CSV).</p>
        </div>
        <div className="create-class-panel">
          <div className="form-grid">
            <div className="input-group">
              <label>Class Name</label>
              <input
                type="text"
                placeholder="e.g. TY BCA 2026"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Student List (Mandatory)</label>
              <div className={`file-drop-zone ${studentFile ? "active" : ""}`}>
                <input
                  type="file"
                  id="fileUpload"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileChange}
                  hidden
                />
                <label htmlFor="fileUpload" className="drop-zone-label">
                  <span className="icon-area">{getFileIcon()}</span>
                  <div className="text-area">
                    {studentFile ? (
                      <span className="filename">{studentFile.name}</span>
                    ) : (
                      <span>Upload .xlsx / .csv</span>
                    )}
                    <span className="support-text">
                      {parsedStudents.length > 0
                        ? `${parsedStudents.length} students ready`
                        : "Required"}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <button className="btn-create-main" onClick={handleCreateClass}>
            <FaPlus /> Create Class & Import
          </button>
        </div>
      </section>

      {/* --- SECTION 3: ACTIVE CLASSES --- */}
      <section className="setting-section">
        <div className="section-header-row">
          <h3>Active Classes & Subjects</h3>
        </div>
        <div className="class-accordion-list">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className={`accordion-card ${expandedClassId === stream.id ? "expanded" : ""}`}
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
                  <span className="badge-blue">
                    {stream.students?.length || 0} Students
                  </span>
                  <button
                    className="btn-icon-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClass(stream.id);
                    }}
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
                  {/* Subjects Area */}
                  <div className="body-section">
                    <h5 className="sub-heading">Subjects</h5>
                    <div className="subject-chips">
                      {stream.subjects.map((sub, idx) => (
                        <div key={idx} className="chip">
                          {sub}{" "}
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
                        placeholder="Add Subject..."
                        value={newSubjectInput}
                        onChange={(e) => setNewSubjectInput(e.target.value)}
                      />
                      <button onClick={() => handleAddSubject(stream.id)}>
                        Add
                      </button>
                    </div>
                  </div>

                  <hr className="inner-divider" />

                  {/* Student Management Button */}
                  <div className="body-section">
                    <button
                      className="btn-manage-students"
                      onClick={() => openStudentModal(stream)}
                    >
                      <FaUserGraduate /> View & Manage Students
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {streams.length === 0 && (
            <p className="no-data-msg">No classes created yet.</p>
          )}
        </div>
      </section>

      {/* --- MODAL: STUDENT MANAGEMENT --- */}
      {showStudentModal && selectedClass && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                Students in{" "}
                <span className="highlight-text">{selectedClass.name}</span>
              </h3>
              <button
                className="close-btn"
                onClick={() => setShowStudentModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              {/* Toolbar */}
              <div className="modal-top-actions">
                <button
                  className={`btn-toggle-add ${showAddStudentForm ? "active" : ""}`}
                  onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                >
                  {showAddStudentForm ? (
                    "Cancel"
                  ) : (
                    <>
                      <FaPlus /> Add New Student
                    </>
                  )}
                </button>
                <div className="student-count">
                  Total Students:{" "}
                  <strong>{selectedClass.students?.length || 0}</strong>
                </div>
              </div>

              {/* Add Student Form */}
              {showAddStudentForm && (
                <div className="add-student-form-row">
                  <input
                    type="text"
                    placeholder="Roll No"
                    value={newStudent.roll}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, roll: e.target.value })
                    }
                    className="inp-small"
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                    className="inp-med"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={newStudent.phone}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, phone: e.target.value })
                    }
                    className="inp-med"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newStudent.email}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, email: e.target.value })
                    }
                    className="inp-large"
                  />
                  <button
                    className="btn-save-student"
                    onClick={handleAddSingleStudent}
                  >
                    <FaSave /> Save
                  </button>
                </div>
              )}

              {/* Data Table */}
              <div className="table-wrapper">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th width="15%">Roll No</th>
                      <th width="30%">Name</th>
                      <th width="20%">
                        <FaPhone size={10} /> Phone
                      </th>
                      <th width="25%">
                        <FaEnvelope size={10} /> Email
                      </th>
                      <th width="10%" align="center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClass.students &&
                    selectedClass.students.length > 0 ? (
                      selectedClass.students.map((std) => (
                        <tr key={std.id}>
                          <td>{std.roll || std["Roll No"]}</td>
                          <td>{std.name || std["Name"]}</td>
                          <td>{std.phone || "-"}</td>
                          <td>{std.email || "-"}</td>
                          <td align="center">
                            <button
                              className="btn-delete-row"
                              onClick={() => handleDeleteStudent(std.id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data-msg">
                          No students found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- STYLES (Styled JSX) --- */}
      <style>{`
        .setting-page-container { padding: 40px; background: #f4f6f9; min-height: 100vh; font-family: 'Segoe UI', sans-serif; box-sizing: border-box; }
        
        /* Header */
        .page-header-box { margin-bottom: 30px; border-bottom: 1px solid #ddd; padding-bottom: 15px; }
        .page-header-box h2 { font-size: 26px; color: #2c3e50; margin: 0 0 5px 0; }
        .page-header-box p { color: #7f8c8d; font-size: 15px; margin: 0; }

        /* Sections */
        .setting-section { background: #fff; padding: 25px; border-radius: 8px; margin-bottom: 25px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border: 1px solid #e0e0e0; }
        .section-header-row h3 { margin: 0; font-size: 18px; color: #34495e; }
        .section-header-row p { margin: 5px 0 15px; font-size: 13px; color: #95a5a6; }

        /* Forms Grid */
        .form-grid { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 15px; }
        .input-group { flex: 1 1 45%; display: flex; flex-direction: column; gap: 6px; }
        .input-group.full-width { flex: 1 1 100%; }
        label { font-size: 13px; font-weight: 600; color: #555; }
        input, textarea { padding: 10px; border: 1px solid #ced4da; border-radius: 5px; font-size: 14px; transition: 0.2s; }
        input:focus { border-color: #3498db; outline: none; }

        /* File Upload */
        .file-drop-zone { border: 2px dashed #ced4da; border-radius: 5px; background: #fff; transition: 0.2s; }
        .file-drop-zone.active { border-color: #27ae60; background: #eafaf1; }
        .drop-zone-label { display: flex; align-items: center; gap: 12px; padding: 10px; cursor: pointer; }
        .upload-icon-large { font-size: 22px; color: #95a5a6; }
        .filename { font-weight: 600; font-size: 14px; color: #2c3e50; }
        .support-text { font-size: 11px; color: #7f8c8d; margin-left: auto; }
        .file-icon.csv { color: #27ae60; font-size: 22px; } .file-icon.xls { color: #2ecc71; font-size: 22px; }

        /* Buttons */
        .btn-create-main { width: 100%; padding: 12px; background: #3498db; color: white; border: none; border-radius: 5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-primary { background: #1abc9c; color: white; border: none; padding: 10px 25px; border-radius: 5px; cursor: pointer; font-weight: 600; }
        
        /* Accordion */
        .class-accordion-list { display: flex; flex-direction: column; gap: 10px; }
        .accordion-card { border: 1px solid #ddd; border-radius: 6px; background: white; overflow: hidden; }
        .accordion-card.expanded { border-color: #3498db; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .accordion-header { padding: 15px; background: #f8f9fa; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
        .stream-name { font-weight: 700; color: #2c3e50; font-size: 15px; }
        .header-controls { display: flex; gap: 10px; align-items: center; }
        .badge { background: #eee; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666; }
        .badge-blue { background: #e3f2fd; color: #1565c0; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
        .btn-icon-delete { background: none; border: 1px solid #e74c3c; color: #e74c3c; padding: 4px; border-radius: 4px; cursor: pointer; font-size: 12px; }
        .btn-icon-delete:hover { background: #e74c3c; color: white; }

        /* Accordion Body */
        .accordion-body { padding: 20px; border-top: 1px solid #eee; }
        .sub-heading { margin: 0 0 10px 0; font-size: 13px; color: #7f8c8d; text-transform: uppercase; font-weight: 700; }
        
        .subject-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
        .chip { background: #e0f2f1; padding: 5px 12px; border-radius: 15px; font-size: 13px; color: #00695c; display: flex; align-items: center; gap: 6px; }
        .x-btn { cursor: pointer; font-weight: bold; opacity: 0.6; } .x-btn:hover { opacity: 1; color: #d32f2f; }
        
        .add-sub-row { display: flex; gap: 10px; max-width: 400px; }
        .add-sub-row button { background: #34495e; color: white; border: none; padding: 0 15px; border-radius: 4px; cursor: pointer; }
        
        .inner-divider { border: 0; border-top: 1px dashed #ddd; margin: 20px 0; }
        
        .btn-manage-students { background: #2c3e50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600; width: fit-content; }
        
        /* === MODAL STYLES === */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .modal-content { background: white; width: 850px; max-height: 85vh; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .modal-header { padding: 15px 25px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; }
        .highlight-text { color: #3498db; }
        .close-btn { background: none; border: none; font-size: 18px; cursor: pointer; color: #7f8c8d; }
        
        .modal-body { padding: 25px; overflow-y: auto; }
        
        .modal-top-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .btn-toggle-add { background: #27ae60; color: white; border: none; padding: 8px 18px; border-radius: 5px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 6px; }
        .btn-toggle-add.active { background: #7f8c8d; }
        
        /* Add Student Form Row */
        .add-student-form-row { display: flex; gap: 10px; background: #f1f8e9; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #c5e1a5; align-items: center; }
        .inp-small { width: 80px; } .inp-med { flex: 1; } .inp-large { flex: 1.5; }
        .btn-save-student { background: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
        
        /* Table */
        .table-wrapper { border: 1px solid #eee; border-radius: 6px; overflow: hidden; }
        .student-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .student-table th { background: #f8f9fa; padding: 12px 15px; text-align: left; color: #555; font-weight: 600; border-bottom: 1px solid #eee; }
        .student-table td { padding: 10px 15px; border-bottom: 1px solid #f5f5f5; color: #333; }
        .student-table tr:hover { background: #fafafa; }
        .btn-delete-row { background: none; border: none; color: #e74c3c; cursor: pointer; transition: 0.2s; }
        .btn-delete-row:hover { transform: scale(1.2); }
        .no-data-msg { padding: 30px; text-align: center; color: #aaa; font-style: italic; }

      `}</style>
    </div>
  );
};

const CollegeAdmin = () => {
  const { logout } = useContext(SystemAdminAuthContext);
  const sidebarRef = useRef(null);
  const [activeSection, setActiveSection] = useState(
    sessionStorage.getItem("current_tab") || "Teachers",
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
