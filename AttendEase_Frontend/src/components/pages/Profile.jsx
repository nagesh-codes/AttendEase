// src/components/pages/Profile.jsx
import React from "react";
import "../css-files/Profile.css";

const Profile = ({ user, onLogout }) => {
  // dummy fallback data if props not passed
  const currentUser = user || {
    name: "Nagesh Kumar",
    role: "Final Year · CSE",
    email: "nagesh@example.com",
    username: "nagesh123",
    section: "CS-A",
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    // fallback for now
    console.log("Logout clicked");
  };

  return (
    <div className="profile-page">
      <div className="profile-shell">
        {/* top bar */}
        <header className="profile-topbar">
          <div className="profile-topbar-left">
            <span className="profile-app-logo">A</span>
            <span className="profile-app-title">AttendEase</span>
          </div>
          <button className="profile-logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </header>

        {/* main content */}
        <main className="profile-main">
          <section className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <span className="profile-avatar-text">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
              <div className="profile-header-text">
                <h1 className="profile-name">{currentUser.name}</h1>
                <p className="profile-role">{currentUser.role}</p>
              </div>
            </div>

            <div className="profile-info">
              <div className="profile-info-row">
                <span className="profile-info-label">Username</span>
                <span className="profile-info-value">
                  {currentUser.username}
                </span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Email</span>
                <span className="profile-info-value">{currentUser.email}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Section</span>
                <span className="profile-info-value">
                  {currentUser.section}
                </span>
              </div>
            </div>

            {/* quick actions / choice boxes */}
            <div className="profile-actions-grid">
              <button className="profile-action-card">
                <span className="profile-action-title">Edit profile</span>
                <span className="profile-action-desc">
                  Update your basic information.
                </span>
              </button>

              <button className="profile-action-card">
                <span className="profile-action-title">Change password</span>
                <span className="profile-action-desc">
                  Keep your account secure.
                </span>
              </button>

              <button className="profile-action-card">
                <span className="profile-action-title">Notification prefs</span>
                <span className="profile-action-desc">
                  Control email / SMS alerts.
                </span>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
