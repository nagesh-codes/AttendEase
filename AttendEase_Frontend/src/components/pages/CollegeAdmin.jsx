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
  // --- State ---
  const [collegeDetails, setCollegeDetails] = useState({
    name: "Sangola Mahavidyalaya",
    address: "Kadlas Road, Sangola",
    email: "admin@sangola.ac.in",
    phone: "9876543210",
  });

  // Added 'students' array to mock data for demonstration
  const [streams, setStreams] = useState([
    {
      id: 1,
      name: "FY BCA",
      subjects: ["C Programming", "Maths"],
      students: [
        {
          id: 101,
          name: "Amit Sharma",
          roll: "101",
          email: "amit@gmail.com",
          phone: "9988776655",
        },
        {
          id: 102,
          name: "Priya Patil",
          roll: "102",
          email: "priya@gmail.com",
          phone: "8877665544",
        },
      ],
    },
    {
      id: 2,
      name: "SY BCA",
      subjects: ["Java", "DBMS"],
      students: [],
    },
  ]);

  const [newClassName, setNewClassName] = useState("");
  const [studentFile, setStudentFile] = useState(null);
  const [parsedStudents, setParsedStudents] = useState([]);
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [newSubjectInput, setNewSubjectInput] = useState("");

  // --- Modal State ---
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null); // Stores the full class object
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  // Single Student Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    roll: "",
    email: "",
    phone: "",
  });

  // ==============================
  //        HANDLERS
  // ==============================

  const handleCreateClass = () => {
    if (!newClassName.trim() || !studentFile) {
      toast.error("Please fill details and upload file");
      return;
    }
    // Create class with the parsed students from file
    const newClassObj = {
      id: Date.now(),
      name: newClassName,
      subjects: [],
      students: parsedStudents, // Assuming parsedStudents has correct structure
    };
    setStreams([...streams, newClassObj]);
    setNewClassName("");
    setStudentFile(null);
    setParsedStudents([]);
    toast.success("Class Created Successfully");
  };

  // --- Modal Handlers ---
  const openStudentModal = (cls) => {
    setSelectedClass(cls);
    setShowStudentModal(true);
    setShowAddStudentForm(false); // Reset form visibility
  };

  const closeStudentModal = () => {
    setShowStudentModal(false);
    setSelectedClass(null);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm("Delete this student?")) {
      const updatedClass = {
        ...selectedClass,
        students: selectedClass.students.filter((s) => s.id !== studentId),
      };

      // Update local 'streams' state
      const updatedStreams = streams.map((s) =>
        s.id === updatedClass.id ? updatedClass : s
      );
      setStreams(updatedStreams);
      setSelectedClass(updatedClass); // Update modal view
      toast.success("Student deleted");
    }
  };

  const handleAddStudentSubmit = () => {
    if (!newStudent.name || !newStudent.roll) {
      toast.warn("Name and Roll No are required");
      return;
    }

    const newStudentObj = { ...newStudent, id: Date.now() };
    const updatedClass = {
      ...selectedClass,
      students: [...selectedClass.students, newStudentObj],
    };

    const updatedStreams = streams.map((s) =>
      s.id === updatedClass.id ? updatedClass : s
    );
    setStreams(updatedStreams);
    setSelectedClass(updatedClass); // Update modal view

    setNewStudent({ name: "", roll: "", email: "", phone: "" });
    setShowAddStudentForm(false);
    toast.success("Student Added!");
  };

  // --- Existing File/Subject Handlers ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentFile(file);
      // ... (Keep existing Excel/CSV parsing logic here) ...
      // For demo, just setting dummy data if parsing isn't connected
      setParsedStudents([{ Name: "Demo Student", Roll: "001" }]);
    }
  };

  const handleAddSubject = (classId) => {
    if (!newSubjectInput.trim()) return;
    const updatedStreams = streams.map((s) =>
      s.id === classId
        ? { ...s, subjects: [...s.subjects, newSubjectInput] }
        : s
    );
    setStreams(updatedStreams);
    setNewSubjectInput("");
  };

  const handleDeleteSubject = (classId, idx) => {
    const updatedStreams = streams.map((s) =>
      s.id === classId
        ? { ...s, subjects: s.subjects.filter((_, i) => i !== idx) }
        : s
    );
    setStreams(updatedStreams);
  };

  const toggleExpand = (id) =>
    setExpandedClassId(expandedClassId === id ? null : id);

  return (
    <div className="setting-page-container">
      <div className="page-header-box">
        <h2>College Settings</h2>
        <p>Manage college profile, classes, and student enrollment.</p>
      </div>

      {/* 1. Create Class Section */}
      <section className="setting-section">
        <div className="section-header-row">
          <h3>Create New Class</h3>
        </div>
        <div className="create-class-panel">
          <div className="form-grid">
            <div className="input-group">
              <label>Class Name</label>
              <input
                type="text"
                placeholder="e.g. TY BCA"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Student List (Excel/CSV)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input-simple"
              />
            </div>
          </div>
          <button className="btn-create-main" onClick={handleCreateClass}>
            <FaPlus /> Create Class
          </button>
        </div>
      </section>

      {/* 2. Active Classes Accordion */}
      <section className="setting-section">
        <div className="section-header-row">
          <h3>Active Classes</h3>
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
                  <span className="badge-blue">
                    {stream.students?.length || 0} Students
                  </span>
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
                  {/* Subjects */}
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
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {showStudentModal && selectedClass && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Students in {selectedClass.name}</h3>
              <button className="close-btn" onClick={closeStudentModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              {/* Top Bar */}
              <div className="modal-top-actions">
                <button
                  className={`btn-toggle-add ${
                    showAddStudentForm ? "active" : ""
                  }`}
                  onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                >
                  {showAddStudentForm ? "Cancel Adding" : "+ Add New Student"}
                </button>
                <div className="student-count">
                  Total: {selectedClass.students?.length || 0}
                </div>
              </div>

              {/* Add Student Form (Collapsible) */}
              {showAddStudentForm && (
                <div className="add-student-form-row">
                  <input
                    type="text"
                    placeholder="Roll No"
                    value={newStudent.roll}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, roll: e.target.value })
                    }
                    style={{ width: "80px" }}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                    style={{ flex: 2 }}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={newStudent.phone}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, phone: e.target.value })
                    }
                    style={{ flex: 1 }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newStudent.email}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, email: e.target.value })
                    }
                    style={{ flex: 1.5 }}
                  />
                  <button
                    className="btn-save-student"
                    onClick={handleAddStudentSubmit}
                  >
                    <FaSave />
                  </button>
                </div>
              )}

              {/* Student Table */}
              <div className="table-wrapper">
                {selectedClass.students && selectedClass.students.length > 0 ? (
                  <table className="student-table">
                    <thead>
                      <tr>
                        <th>Roll</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClass.students.map((std) => (
                        <tr key={std.id}>
                          <td>{std.roll}</td>
                          <td>{std.name}</td>
                          <td>{std.phone || "-"}</td>
                          <td>{std.email || "-"}</td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              className="btn-delete-row"
                              onClick={() => handleDeleteStudent(std.id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-data-msg">No students enrolled yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .setting-page-container { padding: 40px; background: #f4f6f9; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
        .setting-section { background: #fff; padding: 25px; border-radius: 8px; margin-bottom: 25px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .section-header-row h3 { margin: 0 0 15px 0; color: #34495e; }
        
        /* Inputs & Buttons */
        input { padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        .btn-create-main { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 8px; margin-top: 15px; }
        
        /* Accordion */
        .class-accordion-list { display: flex; flex-direction: column; gap: 10px; }
        .accordion-card { border: 1px solid #ddd; border-radius: 6px; background: white; overflow: hidden; }
        .accordion-header { padding: 15px; background: #f8f9fa; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
        .header-controls { display: flex; gap: 10px; align-items: center; }
        .badge { background: #eee; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .badge-blue { background: #e3f2fd; color: #1565c0; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
        
        .accordion-body { padding: 20px; border-top: 1px solid #eee; }
        .btn-manage-students { background: #2c3e50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .btn-manage-students:hover { background: #1a252f; }
        
        /* Subject Chips */
        .subject-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
        .chip { background: #e0f2f1; padding: 5px 10px; border-radius: 15px; font-size: 13px; color: #00695c; display: flex; align-items: center; gap: 5px; }
        .add-sub-row { display: flex; gap: 10px; max-width: 400px; }

        /* MODAL STYLES */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;
        }
        .modal-content {
          background: white; width: 800px; max-height: 85vh; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .modal-header {
          padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; background: #f8f9fa;
        }
        .modal-header h3 { margin: 0; color: #2c3e50; }
        .close-btn { background: none; border: none; font-size: 18px; cursor: pointer; color: #7f8c8d; }
        
        .modal-body { padding: 20px; overflow-y: auto; }
        
        .modal-top-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .btn-toggle-add { background: #27ae60; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: 600; }
        .btn-toggle-add.active { background: #7f8c8d; }
        .student-count { font-size: 14px; color: #7f8c8d; font-weight: 600; }

        .add-student-form-row {
          display: flex; gap: 10px; background: #f1f8e9; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #c5e1a5;
        }
        .btn-save-student { background: #2ecc71; color: white; border: none; padding: 0 20px; border-radius: 5px; cursor: pointer; }

        /* Table */
        .table-wrapper { border: 1px solid #eee; border-radius: 6px; overflow: hidden; }
        .student-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .student-table th { background: #f8f9fa; padding: 12px; text-align: left; color: #555; font-weight: 600; border-bottom: 1px solid #eee; }
        .student-table td { padding: 10px 12px; border-bottom: 1px solid #f5f5f5; color: #333; }
        .student-table tr:last-child td { border-bottom: none; }
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
