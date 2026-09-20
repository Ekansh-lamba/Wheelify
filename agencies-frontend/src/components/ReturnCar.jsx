import React, { useState, useEffect } from 'react';
import MainSidebar from './MainSidebar';
import './ReturnCar.css';

function ReturnCar() {
    const [activeRentals, setActiveRentals] = useState([]);
    const [selectedRental, setSelectedRental] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(5);
    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        fetchActiveRentals();
    }, []);

    const fetchActiveRentals = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8080/rentals/active?customerId=${customerId}`
            );
            if (!response.ok) throw new Error('Failed to fetch active rentals');
            const data = await response.json();
            setActiveRentals(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReturn = async (e) => {
        e.preventDefault();
        if (!selectedRental) {
            setError('Please select a rental to return');
            return;
        }

        try {
            // Return the car
            const returnResponse = await fetch(
                `http://localhost:8080/rentals/${selectedRental.id}/return`,
                {
                    method: 'POST',
                }
            );
            if (!returnResponse.ok) throw new Error('Failed to return car');

            // Submit feedback if provided
            if (feedback.trim() || rating) {
                const feedbackResponse = await fetch(
                    'http://localhost:8080/feedback',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            customerId: parseInt(customerId),
                            carId: selectedRental.carId,
                            rating: rating,
                            comment: feedback,
                        }),
                    }
                );
                if (!feedbackResponse.ok) throw new Error('Failed to submit feedback');
            }

            // Refresh the active rentals list
            fetchActiveRentals();
            setSelectedRental(null);
            setFeedback('');
            setRating(5);
            alert('Car returned successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="return-car-page">
            <MainSidebar />
            <div className="return-car-content">
                <h1>Return a Car</h1>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : activeRentals.length > 0 ? (
                    <div className="active-rentals-grid">
                        {activeRentals.map((rental) => (
                            <div
                                key={rental.id}
                                className={`rental-card ${selectedRental?.id === rental.id ? 'selected' : ''}`}
                                onClick={() => setSelectedRental(rental)}
                            >
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
                        <p>You have no active rentals to return.</p>
                    </div>
                )}

                {selectedRental && (
                    <form className="return-form" onSubmit={handleReturn}>
                        <h2>Return Details</h2>
                        <div className="form-group">
                            <label>Rating:</label>
                            <div className="rating-input">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${star <= rating ? 'filled' : ''}`}
                                        onClick={() => setRating(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Feedback (Optional):</label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Share your experience with this car..."
                                rows="4"
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Return Car
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ReturnCar; 