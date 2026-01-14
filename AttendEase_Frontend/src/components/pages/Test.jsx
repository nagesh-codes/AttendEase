import React from 'react';
import { Check, X, Mail, GraduationCap } from 'lucide-react';

const ApplicationList = ({ applications = [
  { id: 1, name: "Alice Johnson", username: "alice_j", email: "alice@example.edu", college: "Harvard University" },
  { id: 2, name: "Mark Smith", username: "msmith99", email: "mark.s@college.com", college: "Stanford University" },
  { id: 3, name: "Sarah Lee", username: "slee_dev", email: "sarah@tech.edu", college: "MIT" }
], onApprove, onReject }) => {
  return (
    <>
      {/* Vanilla CSS Block */}
      <style>{`
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin: 20px;
          font-family: sans-serif;
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
          background-color: #ffffff;
        }
        .user-table thead {
          background-color: #f9fafb;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
          color: #374151;
        }
        .user-table th, .user-table td {
          padding: 16px 24px;
        }
        .user-table tbody tr {
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
        }
        .user-table tbody tr:hover {
          background-color: #f9fafb;
        }
        .applicant-name {
          font-weight: 600;
          color: #111827;
        }
        .applicant-email {
          display: flex;
          align-items: center;
          color: #6b7280;
          font-size:   asdf12px;
          margin-top: 4px;
        }
        .college-info {
          display: flex;
          align-items: center;
          color: #374151;
        }
        .status-badge {
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          background-color: #fef9c3;
          color: #854d0e;
        }
        .action-container {
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .btn-action {
          padding: 8px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-approve { background-color: #f0fdf4; color: #16a34a; }
        .btn-approve:hover { background-color: #16a34a; color: white; }
        .btn-reject { background-color: #fef2f2; color: #dc2626; }
        .btn-reject:hover { background-color: #dc2626; color: white; }
      `}</style>

      {/* Table Structure */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Username</th>
              <th>College</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>
                  <div className="applicant-name">{app.name}</div>
                  <div className="applicant-email">
                    <Mail size={12} style={{ marginRight: '4px' }} /> {app.email}
                  </div>
                </td>
                <td style={{ color: '#4b5563' }}>@{app.username}</td>
                <td>
                  <div className="college-info">
                    <GraduationCap size={16} style={{ marginRight: '8px', color: '#3b82f6' }} />
                    {app.college}
                  </div>
                </td>
                <td>
                  <span className="status-badge">Pending</span>
                </td>
                <td>
                  <div className="action-container">
                    <button 
                      onClick={() => onApprove(app.id)}
                      className="btn-action btn-approve"
                      title="Approve"
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      onClick={() => onReject(app.id)}
                      className="btn-action btn-reject"
                      title="Reject"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApplicationList;
