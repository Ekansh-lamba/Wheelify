import React, { useState, useEffect } from 'react';
import MainSidebar from './MainSidebar';
import './Feedback.css';

function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [newFeedback, setNewFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(5);
    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8080/feedback/customer/${customerId}`
            );
            if (!response.ok) throw new Error('Failed to fetch feedbacks');
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        if (!newFeedback.trim()) {
            setError('Please enter your feedback');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: parseInt(customerId),
                    rating: rating,
                    comment: newFeedback,
                    type: 'GENERAL'
                }),
            });

            if (!response.ok) throw new Error('Failed to submit feedback');

            setNewFeedback('');
            setRating(5);
            fetchFeedbacks();
            alert('Feedback submitted successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="feedback-page">
            <MainSidebar />
            <div className="feedback-content">
                <h1>Feedback</h1>

                {/* Submit New Feedback */}
                <div className="new-feedback-section">
                    <h2>Submit Feedback</h2>
                    <form onSubmit={handleSubmitFeedback}>
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
                            <label>Your Feedback:</label>
                            <textarea
                                value={newFeedback}
                                onChange={(e) => setNewFeedback(e.target.value)}
                                placeholder="Share your thoughts..."
                                rows="4"
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="submit-button">
                            Submit Feedback
                        </button>
                    </form>
                </div>

                {/* Previous Feedbacks */}
                <div className="previous-feedbacks">
                    <h2>Your Previous Feedbacks</h2>
                    {loading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : feedbacks.length > 0 ? (
                        <div className="feedbacks-grid">
                            {feedbacks.map((feedback) => (
                                <div key={feedback.id} className="feedback-card">
                                    <div className="feedback-header">
                                        <div className="rating">
                                            {[...Array(5)].map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`star ${index < feedback.rating ? 'filled' : ''}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <div className="feedback-date">
                                            {new Date(feedback.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <p className="feedback-comment">{feedback.comment}</p>
                                    {feedback.response && (
                                        <div className="feedback-response">
                                            <strong>Response:</strong>
                                            <p>{feedback.response}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-feedbacks">
                            <p>You haven't submitted any feedbacks yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Feedback; 