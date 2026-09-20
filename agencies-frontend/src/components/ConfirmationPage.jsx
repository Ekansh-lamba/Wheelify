import React from "react";

const ConfirmationPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#28a745" }}>Payment Successful 🎉</h1>
        <p>Your payment has been processed successfully.</p>
        <button
          onClick={() => (window.location.href = "/confirmation")}
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
