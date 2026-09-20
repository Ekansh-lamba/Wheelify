import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './MainPage.css';
import App from './App';
import LogoutButton from './components/LogoutButton';


function MainPage() {
    const navigate = useNavigate();
    const [searchLocation, setSearchLocation] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [error, setError] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [featuredCars, setFeaturedCars] = useState([]);
    const [locationStatus, setLocationStatus] = useState('pending');
    const [activeSection, setActiveSection] = useState('features');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // New states for rental search
    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [sameLocation, setSameLocation] = useState(true);
    const [driverAge, setDriverAge] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        console.log('Checking user data on mount:', user); // Log before checking
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setIsLoggedIn(true);
                console.log('User data:', parsedUser); // Log parsed user data
            } catch (error) {
                console.error('Error parsing user data:', error); // Handle JSON parsing errors
            }
        } else {
            console.log('No user data found.');
        }
    }, []);
    
    

    // View more cars handler
    const handleViewMoreClick = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login'); // Redirect to login if not logged in
        } else {
            navigate('/cars'); // Redirect to cars page if logged in
        }
    };
    
    
    const sections = {
        features: (
            <section id="features" className="content-section">
                <button className="close-dialog" onClick={() => handleSectionClick(null)}>×</button>
                <div className="section-container">
                    <h2 className="section-title">Why Choose Wheelify Rentals</h2>
                    <p className="section-subtitle">
                        Experience premium car rental service with features designed for your convenience and peace of mind.
                    </p>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚗</div>
                            <h3 className="feature-title">Premium Fleet</h3>
                            <p className="feature-description">
                                Access to a wide range of well-maintained, luxury and economy vehicles updated regularly for your comfort.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Instant Booking</h3>
                            <p className="feature-description">
                                Quick and easy online booking system with instant confirmation and flexible modification options.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3 className="feature-title">Best Price Guarantee</h3>
                            <p className="feature-description">
                                Competitive pricing with no hidden fees, and price matching to ensure you get the best deals.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🛡️</div>
                            <h3 className="feature-title">24/7 Support</h3>
                            <p className="feature-description">
                                Round-the-clock customer support and roadside assistance for a worry-free journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        ),
        about: (
            <section id="about" className="content-section">
                <button className="close-dialog" onClick={() => handleSectionClick(null)}>×</button>
                <div className="section-container">
                    <h2 className="section-title">About Wheelify Rentals</h2>
                    <p className="section-subtitle">Your trusted partner in mobility since 2015</p>
                    <div className="about-content">
                        <div className="about-image">
                            <img src="/api/placeholder/600/400" alt="About Wheelify Rentals" />
                        </div>
                        <div className="about-text">
                            <h3>Driving Excellence in Car Rentals</h3>
                            <p>
                                At Wheelify Rentals, we're committed to providing exceptional car rental experiences through quality service,
                                transparency, and customer satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        ),
        help: (
            <section id="help" className="content-section">
                <button className="close-dialog" onClick={() => handleSectionClick(null)}>×</button>
                <div className="section-container">
                    <h2 className="section-title">Help Center</h2>
                    <p className="section-subtitle">Find quick answers to your questions</p>
                    <div className="help-grid">
                        <div className="help-card">
                            <h3>Booking Process</h3>
                            <ul className="help-list">
                                <li>How to make a reservation</li>
                                <li>Modification and cancellation policies</li>
                                <li>Payment methods accepted</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        ),
        contact: (
            <section id="contact" className="content-section">
                <button className="close-dialog" onClick={() => handleSectionClick(null)}>×</button>
                <div className="section-container">
                    <h2 className="section-title">Contact Us</h2>
                    <p className="section-subtitle">Get in touch with our team for assistance</p>
                    <div className="contact-container">
                        <div className="contact-info">
                            <p>📞 +1 (555) 123-4567</p>
                            <p>📧 support@wheelifyrentals.com</p>
                        </div>
                    </div>
                </div>
            </section>
        ),
        privacyPolicy: (
            <section id="privacy-policy" className="content-section">
                <button className="close-dialog" onClick={() => handleSectionClick(null)}>×</button>
                <div className="section-container">
                    <h2 className="section-title">Privacy Policy</h2>
                    <p className="section-subtitle">
                        At Wheelify Rentals, your privacy is a top priority. We are committed to protecting your personal information.
                    </p>
                    <div className="privacy-content">
                        <h3>What Information We Collect</h3>
                        <p>
                            - Personal details such as name, email address, phone number, and billing information.<br />
                            - Rental preferences and travel information.<br />
                            - Device and browser data collected through cookies for website optimization.<br />
                        </p>
                        <h3>How We Use Your Information</h3>
                        <p>
                            - To process and manage your car rental bookings.<br />
                            - To send important updates and promotional offers.<br />
                            - To improve our website and provide a seamless user experience.<br />
                        </p>
                        <h3>Your Rights</h3>
                        <p>
                            You have the right to access, update, or delete your personal information at any time. 
                            Please contact us at 📧 support@wheelifyrentals.com to exercise these rights.
                        </p>
                    </div>
                </div>
            </section>
        ),
        rating: (
            <section id="rating" className="content-section">
                <button className="close-dialog" onClick={() => handleSectionClick(null)}>×</button>
                <div className="section-container">
                    <h2 className="section-title">Customer Ratings</h2>
                    <p className="section-subtitle">Here's what our customers say about us:</p>
                    <div className="rating-content">
                        <div className="rating-card">
                            <h3>⭐ 5/5</h3>
                            <p>
                                "Fantastic service! The booking process was smooth, and the car was in excellent condition."
                                <br />
                                <strong>- Sarah L.</strong>
                            </p>
                        </div>
                        <div className="rating-card">
                            <h3>⭐ 4.5/5</h3>
                            <p>
                                "Great experience overall! Customer support was very helpful."
                                <br />
                                <strong>- Michael B.</strong>
                            </p>
                        </div>
                        <div className="rating-card">
                            <h3>⭐ 4.8/5</h3>
                            <p>
                                "Impressed by the variety of vehicles available. Will definitely use again!"
                                <br />
                                <strong>- Lisa K.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    };

    // Fetch cities on component mount
    useEffect(() => {
        const fetchCities = async () => {
            try {
                console.log("Fetching cities...");
                const response = await fetch('http://localhost:8080/cities');
                if (!response.ok) throw new Error('Failed to fetch cities');
                const data = await response.json();
                console.log("Cities fetched: ", data);
                const uniqueCities = [...new Set(data.map(location => location.cityName))];
                setCities(uniqueCities);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);
    

    // Fetch locations when a city is selected
    useEffect(() => {
        const fetchLocations = async () => {
            if (!selectedCity) return;
            try {
                console.log("Fetching locations for city:", selectedCity);
                const response = await fetch(`http://localhost:8080/locations?city=${selectedCity}`);
                if (!response.ok) throw new Error('Failed to fetch locations');
                const data = await response.json();
                console.log("Locations fetched: ", data);
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations();
    }, [selectedCity]);
    

    // Handle section click with dialog functionality
    const handleSectionClick = (section) => {
        setActiveSection(section);
        const overlay = document.querySelector('.dialog-overlay');
        const content = document.querySelector('.section-content');
        
        if (section) {
            overlay.classList.add('active');
            content.classList.add('active');
            document.body.style.overflow = 'hidden';
            setIsDialogOpen(true);
        } else {
            overlay.classList.remove('active');
            content.classList.remove('active');
            document.body.style.overflow = '';
            setIsDialogOpen(false);
        }
    };

     // Mock login functionality

    // Logout functionality
    const handleLogout = () => {
        localStorage.removeItem('user'); // This should remove the user data
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to login page
    };
    

    // Weather fetch functions
    const fetchWeatherByLocation = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `http://localhost:8080/weather?latitude=${latitude}&longitude=${longitude}`
            );
            if (!response.ok) throw new Error("Failed to fetch weather data");
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            return data;
        } catch (err) {
            throw new Error(`Weather fetch failed: ${err.message}`);
        }
    };

    const fetchWeatherByCity = async (city) => {
        try {
            const response = await fetch(
                `http://localhost:8080/weather?city=${encodeURIComponent(city)}`
            );
            if (!response.ok) throw new Error("Failed to fetch weather data");
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            return data;
        } catch (err) {
            throw new Error(`Weather fetch failed: ${err.message}`);
        }
    };

    // Add overlay click handler
    useEffect(() => {
        const overlay = document.querySelector('.dialog-overlay');
        const handleOverlayClick = () => handleSectionClick(null);
        overlay.addEventListener('click', handleOverlayClick);
        
        return () => {
            overlay.removeEventListener('click', handleOverlayClick);
        };
    }, []);

    // Close dialog on escape key
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isDialogOpen) {
                handleSectionClick(null);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isDialogOpen]);

    // Location and Weather Effect
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setLocationStatus('denied');
            setError("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                setLocationStatus('granted');
                const { latitude, longitude } = position.coords;
                
                try {
                    const weatherData = await fetchWeatherByLocation(latitude, longitude);
                    setWeatherInfo(weatherData);
                    setError(null);
                } catch (err) {
                    setError(err.message);
                }
            },
            (err) => {
                setLocationStatus('denied');
                setError("Location permission denied");
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }, []);

    // Featured Cars Effect
    useEffect(() => {
        const fetchFeaturedCars = async () => {
            try {
                const response = await fetch("http://localhost:8080/cars");
                if (!response.ok) throw new Error("Failed to fetch car details.");
                const data = await response.json();
                setFeaturedCars(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchFeaturedCars();
    }, []);

    // Navigation Handlers
    const handleLogin = (userData) => {
        try {
            const { id, name, email } = userData; // Extract necessary fields
            const userToStore = { id, name, email }; // Create a new object with only needed fields
            
            localStorage.setItem('user', JSON.stringify(userToStore)); // Store user data
            setIsLoggedIn(true); // Update login state
            navigate('/login'); // Redirect to the main page after successful login
        } catch (error) {
            console.error('Error during login:', error); // Log any errors
            // Optionally: Show an error message to the user
        }
    };
    
    const handleSearch = async () => {
        if (!searchLocation.trim()) {
            alert('Please enter a location!');
            return;
        }
        setShowOptions(true);
        try {
            const weatherData = await fetchWeatherByCity(searchLocation);
            setWeatherInfo(weatherData);
            setError(null);
        } catch (err) {
            setError(err.message);
            setWeatherInfo(null);
        }
    };

    const handleRentalSearch = () => {
        console.log({
            selectedCity,
            selectedLocation,
            pickupDate,
            dropoffDate,
            sameLocation,
            driverAge
        });
        // Implement your search logic here
    };

    const handleTravelGuidance = () => {
        if (!searchLocation.trim()) {
            alert('Please enter a city to explore travel guidance!');
            return;
        }
        navigate(`/travel-guidance/${searchLocation}`);
    };

    const handleTourismPromotion = () => {
        if (!searchLocation.trim()) {
            alert('Please enter a city to explore tourist attractions!');
            return;
        }
        navigate(`/tourism-promotion/${searchLocation}`);
    };

    // Weather display component
    const WeatherDisplay = ({ weatherInfo }) => {
        if (!weatherInfo) return null;
        return (
            <div className="weather-info">
                <h2>Weather in {weatherInfo.city}</h2>
                <div className="weather-details">
                    <div className="weather-primary">
                        <p className="temperature">{weatherInfo.temperature}°C</p>
                        <p className="weather-desc">{weatherInfo.weather}</p>
                    </div>
                    <div className="weather-secondary">
                        <p>Feels like: {weatherInfo.feels_like}°C</p>
                        <p>Humidity: {weatherInfo.humidity}%</p>
                        {weatherInfo.wind_speed && (
                            <p>Wind: {weatherInfo.wind_speed} m/s</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div
             className={`main-content ${isSidebarOpen ? "content-shrink" : ""}`}>
                <div className="main-container">
                    {/* Header Section */}
                    <header className="header">
                        <div className="logo">W R</div>
                        <nav className="navigation">
                            <button
                                className={`nav-button features ${activeSection === 'features' ? 'active' : ''}`}
                                onClick={() => handleSectionClick('features')}
                            >
                                Features
                            </button>
                            <button
                                className={`nav-button about ${activeSection === 'about' ? 'active' : ''}`}
                                onClick={() => handleSectionClick('about')}
                            >
                                About
                            </button>
                            <button
                                className={`nav-button help ${activeSection === 'help' ? 'active' : ''}`}
                                onClick={() => handleSectionClick('help')}
                            >
                                Help
                            </button>
                            <button
                                className={`nav-button contact ${activeSection === 'contact' ? 'active' : ''}`}
                                onClick={() => handleSectionClick('contact')}
                            >
                                Contact
                            </button>
                        </nav>
                        <div className="header-buttons">
                            {isLoggedIn ? (
                                <>
                                    <LogoutButton />
                                </>
                            ) : (
                                <button className="header-btn login" onClick={handleLogin}>
                                    Login/Sign Up
                                </button>
                            )}
                        </div>
                    </header>

                    {/* Dialog Overlay */}
                    <div className="dialog-overlay"></div>

                    {/* Dynamic Section Content */}
                    <div className="section-content">
                        {activeSection && sections[activeSection]}
                    </div>

                    {/* Hero Section */}
                    <section className="hero">
                        <div className="hero-content">
                            <h1>Welcome to Wheelify Rentals</h1>
                            <p>Your one-stop solution for car rentals and bookings.</p>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Enter the city name..."
                                    className="search-input"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                />
                                <button className="search-btn" onClick={handleSearch}>Set</button>
                            </div>
                            {showOptions && (
                                <div className="additional-options">
                                    <div className="option-box" onClick={handleTravelGuidance}>
                                        <h3>Travel Guidance</h3>
                                        <p>Discover the best travel tips and plans for your city.</p>
                                    </div>
                                    <div className="option-box" onClick={handleTourismPromotion}>
                                        <h3>Tourism Promotion</h3>
                                        <p>Explore popular tourist attractions and footfall places.</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Weather display in hero section */}
                            {error ? (
                                <div className="weather-error">{error}</div>
                            ) : (
                                weatherInfo && <WeatherDisplay weatherInfo={weatherInfo} />
                            )}
                        </div>
                    </section>

                    {/* Rental Search Section */}
                    <section className="rental-search-section">
                        <h2>Rent a car with Wheelify Rentals</h2>
                        <p>Get great prices from trusted rentals, check customer reviews, and book easily.</p>
                        <div className="rental-search-form">
                            {/* City Dropdown */}
                            <div className="dropdown-container">
                                <div 
                                    className="dropdown-header"
                                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                >
                                    <span>{selectedCity || 'Select City'}</span>
                                    <ChevronDown className={`dropdown-icon ${isCityDropdownOpen ? 'open' : ''}`} />
                                </div>
                                {isCityDropdownOpen && (
                                    <div className="dropdown-list">
                                        {/* Permanent "Select City" Option */}
                                        <div
                                            className="dropdown-item"
                                            onClick={() => {
                                                setSelectedCity(''); // Reset selected city
                                                setSelectedLocation(''); // Reset selected location
                                                setPickupDate(''); // Reset pickup date
                                                setDropoffDate(''); // Reset dropoff date
                                                setIsCityDropdownOpen(false);
                                            }}
                                        >
                                            Select City
                                        </div>
                                        {/* Map through cities */}
                                        {cities.map((city, index) => (
                                            <div
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setSelectedCity(city);
                                                    setSelectedLocation(''); // Reset location when a city is selected
                                                    setPickupDate(''); // Reset pickup date when a city is selected
                                                    setDropoffDate(''); // Reset dropoff date when a city is selected
                                                    setIsCityDropdownOpen(false);
                                                }}
                                            >
                                                {city}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Location Dropdown */}
                           <div className="dropdown-container">
                                <div 
                                    className="dropdown-header"
                                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                                >
                                    <span>{selectedLocation || 'Select Location'}</span>
                                    <ChevronDown className={`dropdown-icon ${isLocationDropdownOpen ? 'open' : ''}`} />
                                </div>
                                {isLocationDropdownOpen && (
                                    <div className="dropdown-list">
                                        {/* Permanent "Select Location" Option */}
                                        <div
                                            className="dropdown-item"
                                            onClick={() => {
                                                setSelectedLocation(''); // Reset selected location
                                                setPickupDate(''); // Reset pickup date
                                                setDropoffDate(''); // Reset dropoff date
                                                setIsLocationDropdownOpen(false);
                                            }}
                                        >
                                            Select Location
                                        </div>
                                        {/* Map through locations */}
                                        {locations.map((location, index) => (
                                            <div
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setSelectedLocation(location.locationName);
                                                    setPickupDate(''); // Reset pickup date when a location is selected
                                                    setDropoffDate(''); // Reset dropoff date when a location is selected
                                                    setIsLocationDropdownOpen(false);
                                                }}
                                            >
                                                {location.locationName}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>



                            {/* Date inputs */}
                                <input
                                    type="date"
                                    className="rental-input"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    placeholder="Pick-up day"
                                />
                                <input
                                    type="date"
                                    className="rental-input"
                                    value={dropoffDate}
                                    onChange={(e) => setDropoffDate(e.target.value)}
                                    min={pickupDate || new Date().toISOString().split('T')[0]}
                                    placeholder="Drop-off day"
                                />


                            {/* Checkboxes */}
                            <div className="checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={sameLocation}
                                        onChange={(e) => setSameLocation(e.target.checked)}
                                    />
                                    Drop-off at the same place of pick-up
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={driverAge}
                                        onChange={(e) => setDriverAge(e.target.checked)}
                                    />
                                    Driver: 30 to 65 years old
                                </label>
                            </div>

                            <button className="rental-search-btn" onClick={handleRentalSearch}>
                                Research
                            </button>
                        </div>
                    </section>

                    {/* Featured Cars Section */}
                    <section className="featured-cars">
                    <h2 className="featured-title">Featured Cars</h2>
                    <div className="slider-container">
                        {featuredCars.map((car) => (
                            <div key={car.id} className="car-card">
                            <img
                                src={`data:image/jpeg;base64,${car.picture}`}
                                alt={car.name}
                                className="car-image"
                            />
                            <div className="car-info">
                                <h3 className="car-name">{car.name}</h3>
                                <p className="car-brand">{car.carBrand}</p>
                                <p className="car-rate">${car.hourlyRate}/day</p>
                            </div>
                        </div>                
                        ))}
                    </div>
                    {/* View More Button */}
                    <button onClick={handleViewMoreClick} className="view-more-btn">View More Cars</button>
                </section>



                {/* QR Code Section */}
                <section className="qr-section">
                    <div className="qr-content">
                        <h2>Get the App</h2>
                        <p>Scan the QR code to download the Wheelify Rentals App for convenient bookings.</p>
                        <div className="qr-codes">
                            <img src="/api/placeholder/150/150" alt="Google Play QR" className="qr-img" />
                            <img src="/api/placeholder/150/150" alt="App Store QR" className="qr-img" />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-columns">
                        <div className="footer-column">
                            <h3>Company</h3>
                            <a href="#about" onClick={() => handleSectionClick('about')} >About Us</a>
                            <a href="#ratings"onClick={() => handleSectionClick('rating')}
                            >Ratings</a>
                            <a href="#privacy"onClick={() => handleSectionClick('privacyPolicy')}
                            >Privacy Policy</a>
                        </div>
                        <div className="footer-column">
                            <h3>Support</h3>
                            <a href="#help" onClick={() => handleSectionClick('help')}
                            >Help Center</a>
                            <a href="#contact" onClick={() => handleSectionClick('contact')}
                            >Contact Us</a>
                        </div>
                        <div className="footer-column">
                            <h3>Download</h3>
                            <img src="/api/placeholder/150/150" alt="Play Store" className="store-img" />
                            <img src="/api/placeholder/150/150" alt="App Store" className="store-img" />
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 Wheelify Rentals. All rights reserved.</p>
                    </div>
                </footer>
                </div>
            </div>
        
    );
}

export default MainPage;