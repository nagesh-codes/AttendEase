import React, { useEffect, useState } from "react";
import "../css-files/SystemAdmin.css";
import { apiClient } from "../../API/apiClient";

const optionsWithTime = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};

const CollegeApplications = () => {
  const [ClgAppn, setClgAppn] = useState([]);

  useEffect(() => {
    const getPendingCollegeApplications = async () => {
      try {
        const response = await apiClient.get(
          "api/system-admin/pendingCollegeApplications"
        );
        setClgAppn(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPendingCollegeApplications();
  }, []);

  return (
    <div className="college-application ">
      <div className="wrapper">
        <div className="header">College Applications</div>
        <div className="application-list">
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
                    {new Date(data.createdAt).toLocaleString('en-US', optionsWithTime)}
                  </div>
                  <div className="btn-field">
                    <button type="button">Approve</button>
                    <button type="button">Reject</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="r"></div>
          )}
        </div>
      </div>
    </div>
  );
};
const CollegesContent = () => (
  <div className="sa-placeholder-page">
    <h2>Colleges Management</h2>
    <p>Content for Colleges goes here.</p>
  </div>
);
const UsersContent = () => (
  <div className="sa-placeholder-page">
    <h2>User Management</h2>
    <p>Content for Users goes here.</p>
  </div>
);

const SystemAdmin = () => {
  const [activeSection, setActiveSection] = useState("College Application");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderPlaceholderList = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <div className="list-item-wrapper" key={index}>
        <div className="placeholder-icon"></div>
        <div className="placeholder-text-group">
          <div className="placeholder-bar long"></div>
          <div className="placeholder-bar short"></div>
        </div>
      </div>
    ));
  };

  const handleMenuClick = (sectionName) => {
    setActiveSection(sectionName);
    setIsMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "College Application":
        // return (
        //   <>
        //     <h1 className="sa-page-title">System Admin Dashboard</h1>
        //     <div className="sa-dashboard-grid">
        //       <section className="sa-card">
        //         <h2 className="sa-card-title">Recent College Applications</h2>
        //         <div className="sa-card-body">{renderPlaceholderList(6)}</div>
        //       </section>
        //       <section className="sa-card">
        //         <h2 className="sa-card-title">Active Colleges</h2>
        //         <div className="sa-card-body">{renderPlaceholderList(3)}</div>
        //       </section>
        //     </div>
        //   </>
        // );
        return <CollegeApplications />;
      case "Colleges":
        return <CollegesContent />;
      case "Users":
        return <UsersContent />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="system-admin-wrapper">
      {/* Sidebar - Dynamic class added if open on mobile */}
      <aside
        className={`sa-sidebar ${isMobileSidebarOpen ? "mobile-open" : ""}`}
      >
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
      </aside>

      <main className="sa-main-content">
        <header className="sa-header">
          {/* Hamburger icon with toggle handler */}
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
