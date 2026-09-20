import React, { useEffect, useState } from 'react';
import MainSidebar from './MainSidebar';
import './CurrentRentals.css';

function CurrentRentals() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        fetchCurrentRentals();
    }, []);

    const fetchCurrentRentals = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8080/rentals/active?customerId=${customerId}`
            );
            if (!response.ok) throw new Error('Failed to fetch current rentals');
            const data = await response.json();
            setRentals(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="current-rentals-page">
            <MainSidebar />
            <div className="current-rentals-content">
                <h1>Current Rentals</h1>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : rentals.length > 0 ? (
                    <div className="rentals-grid">
                        {rentals.map((rental) => (
                            <div key={rental.id} className="rental-card">
                                <img
                                    src={`http://localhost:8080/cars/${rental.carId}/picture`}
                                    alt={rental.carName}
                                    onError={(e) => {
                                        e.target.src = "/placeholder-image.png";
                                    }}
                                />
                                <div className="rental-details">
                                    <h3>{rental.carName}</h3>
                                    <p><strong>Brand:</strong> {rental.carBrand}</p>
                                    <p><strong>Start Date:</strong> {new Date(rental.startTime).toLocaleDateString()}</p>
                                    <p><strong>End Date:</strong> {new Date(rental.endTime).toLocaleDateString()}</p>
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
        </div>
    );
}

export default CurrentRentals; 