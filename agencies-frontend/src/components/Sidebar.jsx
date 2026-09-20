import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  Home,
  DirectionsCar,
  Settings,
  AttachMoney,
  Message,
  PieChart,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  ChevronRight
} from '@mui/icons-material';

const Sidebar = ({ onToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    setOpenDropdown(null);
    onToggle?.(newState);
  };

  const handleDropdown = (section) => {
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
      onToggle?.(true);
    }
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpenDropdown(null);
  };

  const menuItems = [
    {
      text: 'Home',
      icon: <Home />,
      path: '/admin'
    },
    {
      text: 'Car Management',
      icon: <DirectionsCar />,
      dropdown: true,
      submenu: [
        { text: 'Add Car', path: '/admin/add-car' },
        { text: 'Edit Car', path: '/admin/edit-car' },
        { text: 'Remove Car', path: '/admin/remove-car' },
        { text: 'View Customers', path: '/admin/view-customers' }
      ]
    },
    {
      text: 'Rental Management',
      icon: <PieChart />,
      dropdown: true,
      submenu: [
        { text: 'Total Rentals', path: '/admin/total-rentals' },
        { text: 'Available Cars', path: '/admin/available-cars' }
      ]
    },
    {
      text: 'System Health',
      icon: <Settings />,
      path: '/admin/system-health'
    },
    {
      text: 'Recent Payments',
      icon: <AttachMoney />,
      path: '/admin/recent-payments'
    },
    {
      text: 'Customer Feedback',
      icon: <Message />,
      path: '/admin/customer-feedback'
    },
    
  ];

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={handleToggleSidebar}>
        <MenuIcon className="toggle-icon" />
      </button>

      <div className="sidebar-content">
        <div className="logo-section">
          {isSidebarOpen && <h3>Admin Dashboard</h3>}
        </div>

        <nav className="nav-menu">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div 
                className="nav-item"
                onClick={() => item.dropdown 
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
                        {openDropdown === item.text ? <ExpandLess /> : <ExpandMore />}
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
                      <ChevronRight className="submenu-icon" />
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

export default Sidebar;