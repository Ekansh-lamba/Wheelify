import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="landing-page">
            {/* Parallax Background */}
            <div className="parallax-background"></div>

            {/* Content Section */}
            <div className="landing-content">
                <div className="content-wrapper">
                    <h1 className="landing-title">Discover Luxury on Wheels</h1>
                    <p className="landing-subtitle">Redefining your car rental experience.</p>
                    <p className="landing-description">
                        Explore a wide range of premium cars at the best prices. Exceptional service, seamless booking, and luxury tailored for you.
                    </p>
                    <div className="landing-buttons">
                        <button onClick={() => navigate('/main')} className="explore-button">
                            Explore More
                        </button>
                        <button onClick={handleLogin} className="rent-button">
                            Rent a Car
                        </button> 
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="landing-footer">
                <p>© 2024 Wheelify Rentals. Your journey begins here.</p>
            </footer>
        </div>
    );
}

export default LandingPage;
