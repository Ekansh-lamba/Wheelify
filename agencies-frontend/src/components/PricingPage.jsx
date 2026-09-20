import React from 'react';
import './PricingPage.css';

const PricingPage = () => {
  return (
    <div className="pricing-container">
      {/* Decorative Elements */}
      <div className="decorative-yellow" />
      <div className="decorative-teal" />

      <nav className="navbar">
        <div className="logo-container">
          <span className="logo-symbol">ƒ</span>
          <span className="logo-text">Forethought</span>
        </div>
        
        <div className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#industries">Industries</a>
          <a href="#resources">Resources</a>
          <a href="#company">Company</a>
          <a href="#pricing">Pricing</a>
          <button className="demo-button">Request a demo</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-grid">
          <div className="left-column">
            <h1>Want to learn more about Forethought pricing?</h1>
            <p>
              Contact our sales team today to discuss your goals and receive a personalized quote. 
              We'll work closely with you to understand your organization's needs and provide 
              detailed information on how Forethought can support your objectives.
            </p>
          </div>

          <div className="right-column">
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="First name*" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Last name*" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone number*" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Work email*" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Job title" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Company name*" required />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;