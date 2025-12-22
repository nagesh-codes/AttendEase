export default function ApplicationList() {
  const applications = [
    {
      applicant: "Sangola Mahavidyalaya, Sangola.",
      contact: "Nagesh Ghodake (HOD)",
      email: "nagesh@gmail.com",
      date: "2025-12-12",
    },
  ];

  return (
    <>
      <style>
        {`
        .app-list {
          width: 100%;
          padding: 16px;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .app-item {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 12px;
        }

        .field {
          margin-bottom: 8px;
        }

        .label {
          font-weight: 600;
          color: #444;
        }

        .value {
          color: #111;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .actions button {
          padding: 6px 14px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }

        .approve {
          background-color: #2e7d32;
          color: #fff;
        }

        .reject {
          background-color: #c62828;
          color: #fff;
        }

        /* ========================= */
        /* Desktop View (≥ 768px) */
        /* ========================= */
        @media (min-width: 768px) {
          .app-item {
            display: grid;
            grid-template-columns: 2.5fr 2fr 2.5fr 1.5fr 2fr;
            align-items: center;
            gap: 12px;
          }

          .field {
            display: flex;
            flex-direction: column;
            margin-bottom: 0;
          }

          .actions {
            justify-content: flex-end;
          }
        }

        /* ========================= */
        /* Mobile View (< 768px) */
        /* ========================= */
        @media (max-width: 767px) {
          .field {
            display: flex;
            justify-content: space-between;
          }

          .actions {
            margin-top: 10px;
            justify-content: space-between;
          }

          .actions button {
            width: 48%;
          }
        }
        `}
      </style>

      <div className="app-list">
        {applications.map((app, index) => (
          <div className="app-item" key={index}>
            <div className="field">
              <span className="label">Applicant:</span>
              <span className="value">{app.applicant}</span>
            </div>

            <div className="field">
              <span className="label">Contact Person:</span>
              <span className="value">{app.contact}</span>
            </div>

            <div className="field">
              <span className="label">Email:</span>
              <span className="value">{app.email}</span>
            </div>

            <div className="field">
              <span className="label">Submission Date:</span>
              <span className="value">{app.date}</span>
            </div>

            <div className="actions">
              <button className="approve" type="button">
                Approve
              </button>
              <button className="reject" type="button">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
