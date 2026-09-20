import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainHeader.css';

function MainHeader() {
    const navigate = useNavigate();
    const customerName = localStorage.getItem('customerName');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className="main-header">
            <div className="header-content">
                <div className="logo" onClick={() => navigate('/dashboard')}>
                    <img src="/logo.png" alt="Car Rental Logo" />
                    <h1>Car Rental Service</h1>
                </div>
                
                <div className="header-right">
                    <div className="user-info">
                        <span className="welcome-text">Welcome, {customerName}</span>
                        <div className="user-menu">
                            <button onClick={() => navigate('/settings')}>
                                <i className="fas fa-cog"></i> Settings
                            </button>
                            <button onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>
                    </div>
                    <div className="notifications">
                        <i className="fas fa-bell"></i>
                        <span className="notification-badge">3</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default MainHeader; 