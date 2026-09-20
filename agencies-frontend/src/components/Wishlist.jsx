import React, { useEffect, useState } from 'react';
import MainSidebar from './MainSidebar';
import './Wishlist.css';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const customerId = localStorage.getItem("customerId");

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8080/wishlist?customerId=${customerId}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch wishlist');
            }
            const data = await response.json();
            setWishlist(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (carId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/wishlist/${customerId}/${carId}`,
                {
                    method: 'DELETE',
                }
            );
            if (response.ok) {
                setWishlist(wishlist.filter(car => car.id !== carId));
            } else {
                throw new Error('Failed to remove from wishlist');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const rentCar = async (carId) => {
        try {
            // Navigate to rent car page with selected car
            window.location.href = `/rent-car?carId=${carId}`;
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchCarPicture = (carId) => {
        return `http://localhost:8080/cars/${carId}/picture`;
    };

    return (
        <div className="wishlist-page">
            <MainSidebar />
            <div className="wishlist-content">
                <h1>My Wishlist</h1>

                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map((car) => (
                            <div key={car.id} className="wishlist-card">
                                <div className="car-image-container">
                                    <img
                                        src={fetchCarPicture(car.id)}
                                        alt={car.name}
                                        onError={(e) => {
                                            e.target.src = "/placeholder-image.png";
                                        }}
                                    />
                                    <button 
                                        className="remove-button"
                                        onClick={() => removeFromWishlist(car.id)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="car-details">
                                    <h3>{car.name}</h3>
                                    <p><strong>Brand:</strong> {car.carBrand}</p>
                                    <p><strong>Type:</strong> {car.carType}</p>
                                    <p><strong>Color:</strong> {car.carColor}</p>
                                    <p><strong>Price per Day:</strong> ${car.pricePerDay}</p>
                                    <div className="car-actions">
                                        <button 
                                            className="rent-button"
                                            onClick={() => rentCar(car.id)}
                                        >
                                            Rent Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {wishlist.length === 0 && !loading && (
                    <div className="empty-wishlist">
                        <p>Your wishlist is empty.</p>
                        <button onClick={() => window.location.href = '/cars'}>
                            Browse Cars
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist; 