import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainSidebar from './MainSidebar';
import './RentCar.css';

function RentCar() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const preSelectedCarId = queryParams.get('carId');

    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        carType: '',
        priceRange: '',
        brand: '',
    });

    useEffect(() => {
        fetchAvailableCars();
        if (preSelectedCarId) {
            fetchCarDetails(preSelectedCarId);
        }
    }, [preSelectedCarId]);

    const fetchAvailableCars = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/cars/available');
            if (!response.ok) throw new Error('Failed to fetch cars');
            const data = await response.json();
            setCars(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCarDetails = async (carId) => {
        try {
            const response = await fetch(`http://localhost:8080/cars/${carId}`);
            if (!response.ok) throw new Error('Failed to fetch car details');
            const data = await response.json();
            setSelectedCar(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRentSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCar || !startDate || !endDate) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            const customerId = localStorage.getItem('customerId');
            const response = await fetch('http://localhost:8080/rentals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: parseInt(customerId),
                    carId: selectedCar.id,
                    startTime: startDate,
                    endTime: endDate,
                }),
            });

            if (!response.ok) throw new Error('Failed to create rental');
            
            const rental = await response.json();
            navigate('/current-rentals');
        } catch (error) {
            setError(error.message);
        }
    };

    const filteredCars = cars.filter(car => {
        if (filters.carType && car.carType !== filters.carType) return false;
        if (filters.brand && car.carBrand !== filters.brand) return false;
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            if (car.pricePerDay < min || car.pricePerDay > max) return false;
        }
        return true;
    });

    return (
        <div className="rent-car-page">
            <MainSidebar />
            <div className="rent-car-content">
                <h1>Rent a Car</h1>

                {/* Filters Section */}
                <div className="filters-section">
                    <select
                        value={filters.carType}
                        onChange={(e) => setFilters({...filters, carType: e.target.value})}
                    >
                        <option value="">All Types</option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Sports">Sports</option>
                        <option value="Luxury">Luxury</option>
                    </select>

                    <select
                        value={filters.priceRange}
                        onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    >
                        <option value="">All Prices</option>
                        <option value="0-50">$0 - $50</option>
                        <option value="51-100">$51 - $100</option>
                        <option value="101-200">$101 - $200</option>
                        <option value="201-500">$201+</option>
                    </select>

                    <select
                        value={filters.brand}
                        onChange={(e) => setFilters({...filters, brand: e.target.value})}
                    >
                        <option value="">All Brands</option>
                        {/* Add dynamic brand options based on available cars */}
                    </select>
                </div>

                {error && <div className="error-message">{error}</div>}

                {/* Car Selection Grid */}
                <div className="cars-grid">
                    {loading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : (
                        filteredCars.map(car => (
                            <div 
                                key={car.id} 
                                className={`car-card ${selectedCar?.id === car.id ? 'selected' : ''}`}
                                onClick={() => setSelectedCar(car)}
                            >
                                <img
                                    src={`http://localhost:8080/cars/${car.id}/picture`}
                                    alt={car.name}
                                    onError={(e) => {
                                        e.target.src = "/placeholder-image.png";
                                    }}
                                />
                                <div className="car-details">
                                    <h3>{car.name}</h3>
                                    <p><strong>Brand:</strong> {car.carBrand}</p>
                                    <p><strong>Type:</strong> {car.carType}</p>
                                    <p><strong>Price per Day:</strong> ${car.pricePerDay}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Rental Form */}
                {selectedCar && (
                    <form className="rental-form" onSubmit={handleRentSubmit}>
                        <h2>Complete Your Rental</h2>
                        <div className="form-group">
                            <label>Start Date:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={startDate || new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Rent Now
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default RentCar; 