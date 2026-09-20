import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerSidebar.css";
import {
  Home,
  DirectionsCar,
  Loyalty,
  History,
  Feedback,
  Settings,
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

const CustomerSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdown = (section) => {
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpenDropdown(null);
  };

  const menuItems = [
    {
      text: "Home",
      icon: <Home />,
      path: "/customer/home",
    },
    {
      text: "My Rentals",
      icon: <DirectionsCar />,
      dropdown: true,
      submenu: [
        { text: "Active Rentals", path: "/customer/active-rentals" },
        { text: "Rental History", path: "/customer/rental-history" },
      ],
    },
    {
      text: "Loyalty Rewards",
      icon: <Loyalty />,
      path: "/customer/loyalty-rewards",
    },
    {
      text: "Give Feedback",
      icon: <Feedback />,
      path: "/customer/feedback",
    },
    {
      text: "Settings",
      icon: <Settings />,
      path: "/customer/settings",
    },
  ];

  return (
    <div className={`customer-sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={handleToggleSidebar}>
        <MenuIcon className="toggle-icon" />
      </button>

      <div className="sidebar-content">
        <div className="logo-section">
          {isSidebarOpen && <h3>Customer Dashboard</h3>}
        </div>

        <nav className="nav-menu">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                className="nav-item"
                onClick={() =>
                  item.dropdown
                    ? handleDropdown(item.text)
                    : handleNavigate(item.path)
                }
              >
                <span className="nav-icon">{item.icon}</span>
                {isSidebarOpen && (
                  <>
                    <span>{item.text}</span>
                    {item.dropdown && (
                      <span className="dropdown-arrow">
                        {openDropdown === item.text ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </span>
                    )}
                  </>
                )}
              </div>

              {item.dropdown && openDropdown === item.text && isSidebarOpen && (
                <div className="dropdown-menu">
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="dropdown-item"
                      onClick={() => handleNavigate(subItem.path)}
                    >
                      <span>{subItem.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CustomerSidebar;
