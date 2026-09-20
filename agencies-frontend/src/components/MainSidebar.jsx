import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Home,
    DirectionsCar,
    History,
    Favorite,
    Star,
    VpnKey,
    Undo,
    Comment,
    Settings,
    Headset,
    Menu as MenuIcon,
} from '@mui/icons-material';
import './MainSidebar.css';

const MainSidebar = ({ onToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const customerName = localStorage.getItem('customerName') || 'Guest';
    const loyaltyPoints = localStorage.getItem('loyaltyPoints') || 0;
    const loyaltyLevel = localStorage.getItem('loyaltyLevel') || 'Bronze';

    const handleToggleSidebar = () => {
        const newState = !isSidebarOpen;
        setIsSidebarOpen(newState);
        onToggle?.(newState);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <Home />, path: '/dashboard' },
        { text: 'Current Rentals', icon: <DirectionsCar />, path: '/current-rentals' },
        { text: 'Rental History', icon: <History />, path: '/rental-history' },
        { text: 'Wishlist', icon: <Favorite />, path: '/wishlist' },
        { text: 'Recommendations', icon: <Star />, path: '/recommendations' },
        { text: 'Rent a Car', icon: <VpnKey />, path: '/rent-car' },
        { text: 'Return Car', icon: <Undo />, path: '/return-car' },
        { text: 'Feedback', icon: <Comment />, path: '/feedback' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
    ];

    return (
        <div className={`main-sidebar ${isSidebarOpen ? "open" : ""}`}>
            <button className="toggle-btn" onClick={handleToggleSidebar}>
                <MenuIcon className="toggle-icon" />
            </button>
            
            <div className="sidebar-content">
                <div className="profile-section">
                    <div className="profile-image">
                        {customerName.charAt(0).toUpperCase()}
                    </div>
                    {isSidebarOpen && (
                        <>
                            <h3>{customerName}</h3>
                            <div className="loyalty-info">
                                <p>Points: {loyaltyPoints}</p>
                                <p>Level: {loyaltyLevel}</p>
                            </div>
                        </>
                    )}
                </div>

                <nav className="nav-menu">
                    {menuItems.map((item, index) => (
                        <Link key={index} to={item.path} className="nav-item">
                            <span className="nav-icon">{item.icon}</span>
                            {isSidebarOpen && <span>{item.text}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button onClick={() => navigate('/support')} className="support-btn">
                        <Headset />
                        {isSidebarOpen && <span>Support</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainSidebar; 