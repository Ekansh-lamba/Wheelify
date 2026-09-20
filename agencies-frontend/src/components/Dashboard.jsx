import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from './MainSidebar';
import './Dashboard.css';
import LogoutButton from './LogoutButton';

function Dashboard() {
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState("");
    const [currentRentals, setCurrentRentals] = useState([]);
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [loyaltyLevel, setLoyaltyLevel] = useState("Bronze");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const loginId = localStorage.getItem("loginId");
                if (!loginId) {
                    navigate("/login");
                    return;
                }

                // Fetch customer profile
                const profileResponse = await fetch(
                    `http://localhost:8080/customer/profile?loginId=${loginId}`
                );
                if (!profileResponse.ok) {
                    throw new Error("Failed to fetch customer profile.");
                }
                const profileData = await profileResponse.json();
                setCustomerName(profileData.name || "Customer");
                
                const customerId = profileData.id;
                localStorage.setItem("customerId", customerId);

                // Fetch active rentals
                const activeRentalsResponse = await fetch(
                    `http://localhost:8080/rentals/active?customerId=${customerId}`
                );
                if (activeRentalsResponse.ok) {
                    setCurrentRentals(await activeRentalsResponse.json());
                }

                // Fetch loyalty info
                const loyaltyResponse = await fetch(
                    `http://localhost:8080/loyalty?customerId=${customerId}`
                );
                if (loyaltyResponse.ok) {
                    const loyaltyData = await loyaltyResponse.json();
                    setLoyaltyPoints(loyaltyData.points);
                    setLoyaltyLevel(loyaltyData.level);
                }
            } catch (error) {
                setError("Failed to load dashboard data.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const fetchCarPicture = (carId) => {
        return `http://localhost:8080/cars/${carId}/picture`;
    };

    return (
        <div className="dashboard-container">
            <MainSidebar />
            <div className="dashboard-content">
                <LogoutButton />
                
                {/* Welcome Section */}
                <div className="welcome-section">
                    <h1>Welcome, {customerName}!</h1>
                    <div className="loyalty-status">
                        <h3>Loyalty Status</h3>
                        <p>Points: {loyaltyPoints}</p>
                        <p>Level: {loyaltyLevel}</p>
                    </div>
                </div>

                {/* Current Rentals Section */}
                <div className="current-rentals-section">
                    <h2>Current Rentals</h2>
                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : currentRentals.length > 0 ? (
                        <div className="rentals-grid">
                            {currentRentals.map((rental) => (
                                <div key={rental.id} className="rental-card">
                                    <img
                                        src={fetchCarPicture(rental.carId)}
                                        alt="Car"
                                        onError={(e) => {
                                            e.target.src = "/placeholder-image.png";
                                        }}
                                    />
                                    <div className="rental-info">
                                        <h3>{rental.carName}</h3>
                                        <p><strong>Brand:</strong> {rental.carBrand}</p>
                                        <p><strong>Start Date:</strong> {new Date(rental.startTime).toLocaleDateString()}</p>
                                        <p><strong>Total Amount:</strong> ${rental.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-rentals">
                            <p>You have no active rentals.</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <button onClick={() => navigate('/rent-car')}>Rent a Car</button>
                        <button onClick={() => navigate('/return-car')}>Return a Car</button>
                        <button onClick={() => navigate('/wishlist')}>View Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard; 