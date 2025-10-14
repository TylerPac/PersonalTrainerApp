import { useState } from 'react';
import './Layout.css';

const Layout = ({ children, currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: '📊' 
    },
    { 
      id: 'workout', 
      label: 'Workout', 
      icon: '🏋️' 
    },
    { 
      id: 'nutrition', 
      label: 'Nutrition', 
      icon: '🍎' 
    }
  ];

  return (
    <div className="layout-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">💪</span>
            <span className="logo-text">FitTracker</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              {currentUser?.username?.charAt(0)?.toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{currentUser?.username}</div>
              <div className="user-email">{currentUser?.email}</div>
            </div>
          </div>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h1 className="page-title">
            {menuItems.find(item => item.id === activeTab)?.label}
          </h1>
          <div className="header-right">
            <div className="user-badge">
              <div className="user-avatar-small">
                {currentUser?.username?.charAt(0)?.toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-name-header">{currentUser?.username}</span>
                <span className="user-email-header">{currentUser?.email}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="content-body">
          {children({ activeTab, setActiveTab })}
        </div>
      </div>
    </div>
  );
};

export default Layout;