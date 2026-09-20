import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faLifeRing,
  faBell,
  faCog,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

function LogoutButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [userInitials, setUserInitials] = useState("GU");
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/login/user-info");
        if (response.ok) {
          const userData = await response.json();
          if (userData.role === "admin") {
            setUserName("Admin");
            setUserInitials("AD");
          } else if (userData.role === "customer") {
            setUserName(userData.name || "Customer");
            setUserInitials(getInitials(userData.name || "Customer"));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    const getInitials = (fullName) => {
      const nameParts = fullName.split(" ");
      if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
      return nameParts
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2); // Limit to 2 initials
    };

    fetchUserData();
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:8080/feedback/messages?userName=${userName}`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error("Failed to fetch notifications.");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <div className="outlier-header">
      <div className="outlier-actions">
        {/* Notification Button */}
        <div className="notification-menu">
          <button
            className="outlier-notification-btn"
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
          >
            <FontAwesomeIcon icon={faBell} className="notification-icon" />
            <span className="notification-pulse"></span>
          </button>

          {showNotificationDropdown && (
            <div className="notification-dropdown">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className="notification-item">
                    <p>
                      <strong>{notification.customerName}</strong>: {notification.feedbackText}
                    </p>
                    <small>{new Date(notification.createdAt).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p className="no-notifications">
                  Hi, {userName}! No messages yet. We'll let you know when something new arrives.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="outlier-menu">
          <button
            className="outlier-profile-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="outlier-avatar">
              <div className="avatar-circle">{userInitials}</div>
            </div>
            <span className="outlier-name">{userName}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`chevron-icon ${showDropdown ? "rotate" : ""}`}
            />
          </button>

          {showDropdown && (
            <div className="outlier-dropdown">
              <div className="dropdown-section">
                <ul className="menu-list">
                  <li onClick={() => handleNavigate("/profile")}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Profile</span>
                  </li>
                  <li onClick={() => handleNavigate("/settings")}>
                    <FontAwesomeIcon icon={faCog} />
                    <span>Settings</span>
                  </li>
                  <li onClick={() => handleNavigate("/help")}>
                    <FontAwesomeIcon icon={faLifeRing} />
                    <span>Help Center</span>
                  </li>
                </ul>
              </div>

              <div className="dropdown-section">
                <button className="logout-button" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogoutButton;
