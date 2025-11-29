import React, { useState } from 'react';
import '../css-files/Home.css';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Students from './Students';
import logo from '../../assets/logo.png'


const Home = () => {
    const [activeSection, setActiveSection] = useState('profile');

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'students':
                return <Students />;
            case 'profile':
                return <Profile />;
            default:
                return <Profile />;
        }
    };

    return (
        <div className="appShell">
            {/* Sidebar */}
            <aside className="appShell__sidebar">
                <div className="appShell__brand">
                    <div className="appShell__logoCircle">
                        <img src={logo} alt="" />
                    </div>
                    <span className="appShell__brandText">AttendEase</span>
                </div>

                <nav className="appShell__nav">

                    <button
                        className={`appShell__navItem ${activeSection === 'profile' ? 'is-active' : ''
                            }`}
                        onClick={() => setActiveSection('profile')}
                    >
                        Profile
                    </button>

                    <button
                        className={`appShell__navItem ${activeSection === 'dashboard' ? 'is-active' : ''
                            }`}
                        onClick={() => setActiveSection('dashboard')}
                    >
                        Dashboard
                    </button>

                    <button
                        className={`appShell__navItem ${activeSection === 'students' ? 'is-active' : ''
                            }`}
                        onClick={() => setActiveSection('students')}
                    >
                        Students
                    </button>

                </nav>
            </aside>

            {/* Main content */}
            <main className="appShell__main">
                {renderContent()}
            </main>
        </div>
    );
};

export default Home;
