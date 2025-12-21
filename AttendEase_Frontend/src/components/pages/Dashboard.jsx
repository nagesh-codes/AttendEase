import React from "react";
import "../css-files/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Quick overview of today’s attendance
          </p>
        </div>
        <div className="dashboard-header-right">
          <span className="dashboard-date">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Top summary cards */}
        <section className="dashboard-summary">
          <div className="dashboard-card">
            <span className="dashboard-card-label">Total Students</span>
            <span className="dashboard-card-value">120</span>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-label">Present Today</span>
            <span className="dashboard-card-value dashboard-green">112</span>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-label">Absent Today</span>
            <span className="dashboard-card-value dashboard-red">8</span>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-label">Average Attendance</span>
            <span className="dashboard-card-value">93%</span>
          </div>
        </section>

        <section className="dashboard-content">
          {/* Left: Today’s classes */}
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2 className="dashboard-panel-title">Today&apos;s Classes</h2>
            </div>
            <ul className="dashboard-class-list">
              <li className="dashboard-class-item">
                <div>
                  <p className="dashboard-class-name">BSc CS - Semester 6</p>
                  <p className="dashboard-class-time">09:00 AM - 10:00 AM</p>
                </div>
                <span className="dashboard-badge">Completed</span>
              </li>
              <li className="dashboard-class-item">
                <div>
                  <p className="dashboard-class-name">BCA - Semester 4</p>
                  <p className="dashboard-class-time">11:00 AM - 12:00 PM</p>
                </div>
                <span className="dashboard-badge dashboard-badge-warning">
                  Ongoing
                </span>
              </li>
              <li className="dashboard-class-item">
                <div>
                  <p className="dashboard-class-name">MSc IT - Semester 2</p>
                  <p className="dashboard-class-time">02:00 PM - 03:00 PM</p>
                </div>
                <span className="dashboard-badge dashboard-badge-muted">
                  Upcoming
                </span>
              </li>
            </ul>
          </div>

          {/* Right: Recent attendance */}
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2 className="dashboard-panel-title">Recent Attendance</h2>
              <button className="dashboard-link-button">View all</button>
            </div>
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rahul Sharma</td>
                    <td>BSc CS</td>
                    <td>09:00 AM</td>
                    <td>
                      <span className="dashboard-status-pill dashboard-status-present">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Priya Patel</td>
                    <td>BCA</td>
                    <td>11:00 AM</td>
                    <td>
                      <span className="dashboard-status-pill dashboard-status-absent">
                        Absent
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Arjun Verma</td>
                    <td>MSc IT</td>
                    <td>02:00 PM</td>
                    <td>
                      <span className="dashboard-status-pill dashboard-status-late">
                        Late
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
