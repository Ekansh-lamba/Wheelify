import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarPage.css';
import LogoutButton from './LogoutButton';

const CarPage = () => {
  const [cars, setCars] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carStatus, setCarStatus] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const customerId = localStorage.getItem('customerId');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const customerResponse = await fetch(`http://localhost:8080/customer/profilebyid?id=${customerId}`);
        if (!customerResponse.ok) throw new Error('Failed to fetch customer details');
        const customerData = await customerResponse.json();
        setCustomer(customerData);

        const carResponse = await fetch('http://localhost:8080/cars');
        if (!carResponse.ok) throw new Error('Failed to fetch car details');
        const carData = await carResponse.json();

        const statusPromises = carData.map(async (car) => {
          const rentalResponse = await fetch(`http://localhost:8080/rentals/check-active?carId=${car.id}`);
          if (rentalResponse.ok) {
            const rentalStatus = await rentalResponse.json();
            return { carId: car.id, isBooked: rentalStatus.booked };
          }
          return { carId: car.id, isBooked: false };
        });

        const statusResults = await Promise.all(statusPromises);
        const statusMap = statusResults.reduce((acc, { carId, isBooked }) => {
          acc[carId] = isBooked;
          return acc;
        }, {});
        setCarStatus(statusMap);
        setCars(carData);

        const wishlistResponse = await fetch(`http://localhost:8080/wishlist?customerId=${customerId}`);
        if (wishlistResponse.ok) {
          setWishlist(await wishlistResponse.json());
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (customerId) fetchDetails();
    else setError('Customer ID not found in localStorage');
  }, [customerId]);

  const fetchCarPicture = (carId) => {
    return `http://localhost:8080/cars/${carId}/picture`;
  };

  const handleAddToWishlist = async (car, e) => {
    e.stopPropagation();
    try {
      const response = await fetch('http://localhost:8080/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, carId: car.id }),
      });

      if (response.ok) {
        setWishlist((prev) => [...prev, car]);
      } else {
        throw new Error('Failed to add to wishlist');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const isCarInWishlist = (carId) => wishlist.some((car) => car.id === carId);

  const filteredCars = filterType === 'all' 
    ? cars 
    : cars.filter(car => car.carType.toLowerCase() === filterType.toLowerCase());

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          <div className="loader-wheel"></div>
          <div className="loader-text">Loading Premium Cars</div>
        </div>
      </div>
    );
  }

  return (
    <div className="car-page">
      {/* Navigation Header */}
      <div className="nav-header">
        <button className="back-button" onClick={() => navigate('/customer')}>
          <span className="back-icon">←</span>
          Back to Dashboard
        </button>
      </div>
      <LogoutButton />

      {/* Welcome Section */}
      <div className="welcome-section">
        {customer && (
          <h1 className="welcome-title">Welcome, {customer.name}</h1>
        )}
        <p className="welcome-subtitle">Discover Your Perfect Drive</p>
      </div>

      {error ? (
        <div className="error-container">
          <p className="error-message">Error: {error}</p>
        </div>
      ) : (
        <>
          {/* Filter Section */}
          <div className="filter-section">
            <button 
              className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All Cars
            </button>
            <button 
              className={`filter-button ${filterType === 'SUV' ? 'active' : ''}`}
              onClick={() => setFilterType('SUV')}
            >
              SUVs
            </button>
            <button 
              className={`filter-button ${filterType === 'Sedan' ? 'active' : ''}`}
              onClick={() => setFilterType('Sedan')}
            >
              Sedans
            </button>
            <button 
              className={`filter-button ${filterType === 'Sports' ? 'active' : ''}`}
              onClick={() => setFilterType('Sports')}
            >
              Sports Cars
            </button>
          </div>

          {/* Cars Grid */}
          <div className="cars-grid">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className={`car-card ${carStatus[car.id] ? 'booked' : ''}`}
                onClick={() => !carStatus[car.id] && setSelectedCar(car)}
              >
                <div className="car-image-container">
                  <img
                    src={fetchCarPicture(car.id)}
                    alt={car.name}
                    className="car-image"
                    onError={(e) => { e.target.src = '/placeholder-image.png'; }}
                  />
                  <button
                    className={`wishlist-button ${isCarInWishlist(car.id) ? 'in-wishlist' : ''}`}
                    onClick={(e) => handleAddToWishlist(car, e)}
                  >
                    <span className="wishlist-icon">
                      {isCarInWishlist(car.id) ? '❤️' : '🤍'}
                    </span>
                  </button>
                  {carStatus[car.id] && (
                    <div className="booked-badge">Not Available</div>
                  )}
                </div>

                <div className="car-info">
                  <div className="car-header">
                    <h2 className="car-name">{car.name}</h2>
                    <span className="car-type">{car.carType}</span>
                  </div>
                  <div className="car-details">
                    <div className="detail-item">
                      <span className="detail-icon">🚗</span>
                      <span className="detail-text">{car.carBrand}</span>
                    </div>
                    <div className="detail-item">
                      <span 
                        className="color-indicator"
                        style={{ backgroundColor: car.carColor.toLowerCase() }}
                      />
                      <span className="detail-text">{car.carColor}</span>
                    </div>
                    <div className="detail-item registration">
                      Reg: {car.carRegistrationNumber}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedCar && (
        <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCar(null)}>×</button>
            
            <div className="modal-grid">
              <div className="modal-image-container">
                <img
                  src={fetchCarPicture(selectedCar.id)}
                  alt={selectedCar.name}
                  className="modal-image"
                  onError={(e) => { e.target.src = '/placeholder-image.png'; }}
                />
              </div>

              <div className="modal-info">
                <h2 className="modal-title">{selectedCar.name}</h2>
                <div className="modal-details">
                  <div className="modal-detail-item">
                    <span className="detail-label">Brand</span>
                    <span className="detail-value">{selectedCar.carBrand}</span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Type</span>
                    <span className="detail-value">{selectedCar.carType}</span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Color</span>
                    <div className="color-detail">
                      <span 
                        className="modal-color-indicator"
                        style={{ backgroundColor: selectedCar.carColor.toLowerCase() }}
                      />
                      <span className="detail-value">{selectedCar.carColor}</span>
                    </div>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Registration</span>
                    <span className="detail-value">{selectedCar.carRegistrationNumber}</span>
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    className="cancel-button"
                    onClick={() => setSelectedCar(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`rent-button ${carStatus[selectedCar.id] ? 'disabled' : ''}`}
                    onClick={() => navigate('/advance-payment', { state: selectedCar })}
                    disabled={carStatus[selectedCar.id]}
                  >
                    {carStatus[selectedCar.id] ? 'Already Booked' : 'Rent Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarPage;
