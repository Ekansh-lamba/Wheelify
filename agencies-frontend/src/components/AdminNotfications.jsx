import React, { useState, useEffect } from "react";
import "./AdminNotifications.css";

function AdminNotifications() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/all-feedback");
        const data = await response.json();
        setFeedbackList(data);
      } catch (err) {
        setError("Error fetching feedback messages.");
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="admin-notifications-container">
      <h1>Customer Feedback</h1>
      {error && <p className="error-message">{error}</p>}
      {feedbackList.length > 0 ? (
        <ul>
          {feedbackList.map((feedback) => (
            <li key={feedback.id}>
              <p>
                <strong>{feedback.customerName}</strong> ({feedback.customerEmail}):{" "}
                {feedback.feedbackText}
              </p>
              <small>{new Date(feedback.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
}

export default AdminNotifications;
    