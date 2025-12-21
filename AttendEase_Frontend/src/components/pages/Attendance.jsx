import React from "react";
import "../css-files/Attendance.css";

const Attendance = () => {
  return (
    <div className="attendance-page">
      <header className="attendance-header">
        <h1 className="attendance-title">Attendance</h1>
        <div className="attendance-filters">
          <select className="attendance-select">
            <option>All Classes</option>
            <option>BSc CS - Sem 6</option>
            <option>BCA - Sem 4</option>
          </select>
          <input type="date" className="attendance-date" />
        </div>
      </header>

      <div className="attendance-table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student</th>
              <th>Class</th>
              <th>Status</th>
              <th>Marked At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Rahul Sharma</td>
              <td>BSc CS</td>
              <td>
                <span className="attendance-pill attendance-present">
                  Present
                </span>
              </td>
              <td>09:05 AM</td>
            </tr>
            <tr>
              <td>102</td>
              <td>Priya Patel</td>
              <td>BSc CS</td>
              <td>
                <span className="attendance-pill attendance-absent">
                  Absent
                </span>
              </td>
              <td>—</td>
            </tr>
            <tr>
              <td>103</td>
              <td>Arjun Verma</td>
              <td>BSc CS</td>
              <td>
                <span className="attendance-pill attendance-late">Late</span>
              </td>
              <td>09:15 AM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
