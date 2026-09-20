import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css';

const SplashPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/main');
        }, 5500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-container">
            <div className="splash-background"></div>
            <div className="splash-content">
                <div className="logo-container">
                    <div className="logo-circle">
                        <span className="logo-text">Wheelify</span>
                    </div>
                    <div className="logo-rings">
                        <div className="ring ring1"></div>
                        <div className="ring ring2"></div>
                        <div className="ring ring3"></div>
                    </div>
                </div>
                <h1 className="splash-title">Wheelify RENTALS</h1>
                <p className="splash-subtitle">Your Premium Car Rental Experience</p>
                <div className="loading-container">
                    <div className="loading-bar">
                        <div className="loading-progress"></div>
                    </div>
                    <p className="loading-text">Loading your experience...</p>
                </div>
            </div>
        </div>
    );
};

export default SplashPage; 