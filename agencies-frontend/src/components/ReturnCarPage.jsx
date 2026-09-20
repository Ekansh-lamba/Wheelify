import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReturnCarPage.css";
import LogoutButton from "./LogoutButton";

function ReturnCarPage() {
  const [customerName, setCustomerName] = useState("");
  const [rentalDetails, setRentalDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const customerId = localStorage.getItem("customerId");
  const carId = localStorage.getItem("carId");

  useEffect(() => {
    const fetchCustomerName = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/customer/profilebyid?id=${customerId}`
        );
        if (!response.ok) throw new Error("Failed to fetch customer details");
        const data = await response.json();
        setCustomerName(data.name);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    if (customerId) {
      fetchCustomerName();
    }
  }, [customerId]);

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        let url = `http://localhost:8080/rentals/active?customerId=${customerId}`;
        if (carId) {
          url += `&carId=${carId}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch rental details");

        const data = await response.json();
        setRentalDetails(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    if (customerId) {
      fetchRentalDetails();
    }
  }, [customerId, carId]);

  const redirectToPayment = (carId, totalAmount) => {
    localStorage.setItem("carId", carId);
    navigate("/payment", { state: { carId, totalAmount, customerName } });
  };
  
  const fetchCarPicture = (carId) => {
    return `http://localhost:8080/cars/${carId}/picture`;
  };

  return (
    <div className="returncar-background">
      <LogoutButton />
      <div className="returncar-container">
        <h1 className="welcome-title">
          Welcome, <span className="customer-name">{customerName}</span>!
        </h1>
        <h2 className="returncar-title">Return Your Car</h2>
        {errorMessage && (
          <p className="returncar-error-message">{errorMessage}</p>
        )}
        {rentalDetails.length > 0 ? (
          <div className="cars-grid">
            {rentalDetails.map((rental) => (
              <div key={rental.id} className="car-card">
                <div className="car-image-container">
                  <img
                    src={fetchCarPicture(rental.carId)} // Use rental.carId instead of car.id
                    alt={rental.carName} // Use rental.carName instead of car.name
                    className="car-image"
                    onError={(e) => { e.target.src = '/placeholder-image.png'; }} // Fallback image
                  />
                </div>
                <div className="car-info">
                  <h3 className="car-name">{rental.carName} - {rental.carBrand}</h3>
                  <p><strong>Start Time:</strong> {new Date(rental.startTime).toLocaleString()}</p>
                  <p><strong>Total Amount:</strong> ${rental.totalAmount.toFixed(2)}</p>
                  <p><strong>Elapsed Time:</strong> {rental.elapsedTime}</p>
                  <button
                    className="returncar-button returncar-confirm-button"
                    onClick={() => redirectToPayment(rental.carId, rental.totalAmount)}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="returncar-no-cars-container">
            <img src="/images/no-cars.png" alt="No Cars" className="returncar-no-cars-image" />
            <p className="returncar-no-cars-message">
              You don't have any active rentals. Let's go rent a car!
            </p>
            <div className="returncar-no-cars-actions">
              <button
                className="returncar-button returncar-no-cars-button"
                onClick={() => navigate("/cars")}
              >
                Rent a Car
              </button>
              <button
                className="returncar-button returncar-no-cars-button"
                onClick={() => navigate("/")}
              >
                Go Back Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnCarPage;
