import React from 'react';
import { Link } from 'react-router-dom';
import './MainFooter.css';

function MainFooter() {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>
                        <i className="fas fa-phone"></i> +1 (800) 123-4567<br />
                        <i className="fas fa-envelope"></i> support@carental.com<br />
                        <i className="fas fa-map-marker-alt"></i> 123 Car Street, NY 10001
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Car Rental Service. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default MainFooter; 