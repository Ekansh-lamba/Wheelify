import React, { useEffect, useState } from 'react';
import MainSidebar from './MainSidebar';
import './Recommendations.css';

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [mostBookedCar, setMostBookedCar] = useState(null);
    const [similarCars, setSimilarCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const customerId = localStorage.getItem("customerId");

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            // Fetch most booked car
            const mostBookedResponse = await fetch(
                `http://localhost:8080/rentals/most-booked-car/${customerId}`
            );
            if (mostBookedResponse.ok) {
                const mostBookedData = await mostBookedResponse.json();
                setMostBookedCar(mostBookedData);

                // Fetch similar cars based on most booked car
                if (mostBookedData) {
                    const similarResponse = await fetch(
                        `http://localhost:8080/cars/similar/${mostBookedData.id}`
                    );
                    if (similarResponse.ok) {
                        const similarData = await similarResponse.json();
                        setSimilarCars(similarData);
                    }
                }
            }

            // Fetch personalized recommendations
            const recommendationsResponse = await fetch(
                `http://localhost:8080/recommendations/${customerId}`
            );
            if (recommendationsResponse.ok) {
                const recommendationsData = await recommendationsResponse.json();
                setRecommendations(recommendationsData);
            }
        } catch (error) {
            setError('Failed to fetch recommendations');
        } finally {
            setLoading(false);
        }
    };

    const fetchCarPicture = (carId) => {
        return `http://localhost:8080/cars/${carId}/picture`;
    };

    const addToWishlist = async (carId) => {
        try {
            const response = await fetch("http://localhost:8080/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: parseInt(customerId),
                    carId: carId,
                }),
            });
            if (response.ok) {
                alert("Added to wishlist successfully!");
            } else {
                throw new Error("Failed to add to wishlist");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="recommendations-page">
            <MainSidebar />
            <div className="recommendations-content">
                <h1>Recommended for You</h1>

                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <>
                        {/* Most Booked Car Section */}
                        {mostBookedCar && (
                            <div className="section">
                                <h2>Your Favorite Car</h2>
                                <div className="car-card featured">
                                    <img
                                        src={fetchCarPicture(mostBookedCar.id)}
                                        alt={mostBookedCar.name}
                                        onError={(e) => {
                                            e.target.src = "/placeholder-image.png";
                                        }}
                                    />
                                    <div className="car-details">
                                        <h3>{mostBookedCar.name}</h3>
                                        <p><strong>Brand:</strong> {mostBookedCar.carBrand}</p>
                                        <p><strong>Type:</strong> {mostBookedCar.carType}</p>
                                        <div className="car-actions">
                                            <button onClick={() => window.location.href = `/rent-car?carId=${mostBookedCar.id}`}>
                                                Rent Again
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Similar Cars Section */}
                        {similarCars.length > 0 && (
                            <div className="section">
                                <h2>Similar Cars You Might Like</h2>
                                <div className="cars-grid">
                                    {similarCars.map((car) => (
                                        <div key={car.id} className="car-card">
                                            <img
                                                src={fetchCarPicture(car.id)}
                                                alt={car.name}
                                                onError={(e) => {
                                                    e.target.src = "/placeholder-image.png";
                                                }}
                                            />
                                            <div className="car-details">
                                                <h3>{car.name}</h3>
                                                <p><strong>Brand:</strong> {car.carBrand}</p>
                                                <p><strong>Type:</strong> {car.carType}</p>
                                                <div className="car-actions">
                                                    <button onClick={() => addToWishlist(car.id)}>
                                                        Add to Wishlist
                                                    </button>
                                                    <button onClick={() => window.location.href = `/rent-car?carId=${car.id}`}>
                                                        Rent Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Personalized Recommendations */}
                        {recommendations.length > 0 && (
                            <div className="section">
                                <h2>Personalized Recommendations</h2>
                                <div className="cars-grid">
                                    {recommendations.map((car) => (
                                        <div key={car.id} className="car-card">
                                            <img
                                                src={fetchCarPicture(car.id)}
                                                alt={car.name}
                                                onError={(e) => {
                                                    e.target.src = "/placeholder-image.png";
                                                }}
                                            />
                                            <div className="car-details">
                                                <h3>{car.name}</h3>
                                                <p><strong>Brand:</strong> {car.carBrand}</p>
                                                <p><strong>Type:</strong> {car.carType}</p>
                                                <div className="car-actions">
                                                    <button onClick={() => addToWishlist(car.id)}>
                                                        Add to Wishlist
                                                    </button>
                                                    <button onClick={() => window.location.href = `/rent-car?carId=${car.id}`}>
                                                        Rent Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Recommendations; 