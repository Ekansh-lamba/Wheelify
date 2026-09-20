import React, { useEffect, useState } from 'react';
import MainSidebar from './MainSidebar';
import './RentalHistory.css';

function RentalHistory() {
    const [rentalHistory, setRentalHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        carType: '',
    });

    useEffect(() => {
        fetchRentalHistory();
    }, []);

    const fetchRentalHistory = async () => {
        setLoading(true);
        try {
            const customerId = localStorage.getItem("customerId");
            const response = await fetch(
                `http://localhost:8080/rentals/rental-history/${customerId}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch rental history');
            }
            const data = await response.json();
            setRentalHistory(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCarPicture = (carId) => {
        return `http://localhost:8080/cars/${carId}/picture`;
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const filteredHistory = rentalHistory.filter(rental => {
        if (filters.carType && rental.carType !== filters.carType) return false;
        if (filters.startDate && new Date(rental.startTime) < new Date(filters.startDate)) return false;
        if (filters.endDate && new Date(rental.endTime) > new Date(filters.endDate)) return false;
        return true;
    });

    return (
        <div className="rental-history-page">
            <MainSidebar />
            <div className="rental-history-content">
                <h1>Rental History</h1>

                {/* Filters Section */}
                <div className="filters-section">
                    <div className="filter-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="filter-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Car Type:</label>
                        <select
                            name="carType"
                            value={filters.carType}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Types</option>
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Sports">Sports</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="rental-history-grid">
                        {filteredHistory.map((rental) => (
                            <div key={rental.id} className="rental-card">
                                <img
                                    src={fetchCarPicture(rental.carId)}
                                    alt={rental.carName}
                                    onError={(e) => {
                                        e.target.src = "/placeholder-image.png";
                                    }}
                                />
                                <div className="rental-details">
                                    <h3>{rental.carName}</h3>
                                    <p><strong>Brand:</strong> {rental.carBrand}</p>
                                    <p><strong>Type:</strong> {rental.carType}</p>
                                    <p><strong>Start Date:</strong> {new Date(rental.startTime).toLocaleDateString()}</p>
                                    <p><strong>End Date:</strong> {new Date(rental.endTime).toLocaleDateString()}</p>
                                    <p><strong>Total Amount:</strong> ${rental.totalAmount.toFixed(2)}</p>
                                    <div className="rental-status">
                                        Status: <span className={`status-${rental.status.toLowerCase()}`}>
                                            {rental.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredHistory.length === 0 && !loading && (
                    <div className="no-rentals">
                        <p>No rental history found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RentalHistory; 