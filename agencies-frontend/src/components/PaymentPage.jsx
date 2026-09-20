import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // -- Timer state management --
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [showTimerExpiredModal, setShowTimerExpiredModal] = useState(false);

  // -- Payment method states --
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    selectedWallet: '',
    selectedBank: '',
  });

  // Payment details from location.state
  const totalAmount = location.state?.totalAmount || 1049; 
  // Fallback to 1049 (example) if not passed

  // --- Timer logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowTimerExpiredModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- Format the mm:ss time ---
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  // --- Payment method handlers ---
  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
  };

  // --- Input changes for forms ---
  const handleInputChange = (field, value) => {
    setPaymentDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // --- "Pay Now" business logic ---
  const processPayment = () => {
    // Your existing payment processing logic or fetch/axios calls go here
    console.log('Payment details:', paymentDetails);
    console.log('Selected Method:', selectedMethod);

    // For demo, we just navigate to confirmation or success
    navigate('/confirmation');
  };

  // --- Timer expiry modal close handler ---
  const handleTimerExpiredModalClose = () => {
    setShowTimerExpiredModal(false);
    // You can also redirect the user back to the previous page
    navigate('/return-car'); 
    // Or navigate('/') if you want
  };

  return (
    <div className="payment-container">
      {/* Header */}
      <header className="payment-header">
        <h1>Secure Payment</h1>
        <p>Complete your payment securely</p>
      </header>

      {/* Timer Display */}
      <div className="timer-display">
        <p>Time Remaining: <strong>{formatTime(timeRemaining)}</strong></p>
      </div>

      <main className="payment-main">
        {/* Left Section - Payment Methods */}
        <div className="payment-methods">
          <h2>Choose Payment Method</h2>
          <ul>
            <li
              className={`payment-option ${selectedMethod === 'card' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodChange('card')}
            >
              <span>💳</span> Credit/Debit Card
            </li>
            <li
              className={`payment-option ${selectedMethod === 'upi' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodChange('upi')}
            >
              <span>📲</span> UPI
            </li>
            <li
              className={`payment-option ${selectedMethod === 'wallet' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodChange('wallet')}
            >
              <span>👛</span> Wallets
            </li>
            <li
              className={`payment-option ${selectedMethod === 'netbanking' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodChange('netbanking')}
            >
              <span>🏦</span> Net Banking
            </li>
          </ul>
        </div>

        {/* Right Section - Payment Details */}
        <div className="payment-details">
          <h2>Order Summary</h2>
          <div className="order-details">
            <p>Amount: <strong>₹{totalAmount}</strong></p>
            <p>Taxes: <strong>Included</strong></p>
            <p><em>Timer closes in {formatTime(timeRemaining)}</em></p>
            <hr style={{ margin: '1rem 0' }} />
            <p><strong>Total: ₹{totalAmount}</strong></p>
          </div>

          {/* Payment method forms */}
          {selectedMethod === 'card' && (
            <div className="card-payment">
              <h3>Enter Card Details</h3>
              <input
                type="text"
                placeholder="Card Number"
                maxLength={16}
                value={paymentDetails.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              />
              <input
                type="text"
                placeholder="Cardholder Name"
                value={paymentDetails.cardHolder}
                onChange={(e) => handleInputChange('cardHolder', e.target.value)}
              />
              <div className="card-details-row">
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={paymentDetails.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                />
                <input
                  type="password"
                  placeholder="CVV"
                  maxLength={3}
                  value={paymentDetails.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                />
              </div>
            </div>
          )}

          {selectedMethod === 'upi' && (
            <div className="upi-payment">
              <h3>Enter UPI ID</h3>
              <input
                type="text"
                placeholder="example@upi"
                value={paymentDetails.upiId}
                onChange={(e) => handleInputChange('upiId', e.target.value)}
              />
            </div>
          )}

          {selectedMethod === 'wallet' && (
            <div className="wallet-payment">
              <h3>Choose Wallet</h3>
              <button
                className={`wallet-option ${paymentDetails.selectedWallet === 'Paytm' ? 'selected-wallet' : ''}`}
                onClick={() => handleInputChange('selectedWallet', 'Paytm')}
              >
                Paytm
              </button>
              <button
                className={`wallet-option ${paymentDetails.selectedWallet === 'PhonePe' ? 'selected-wallet' : ''}`}
                onClick={() => handleInputChange('selectedWallet', 'PhonePe')}
              >
                PhonePe
              </button>
              <button
                className={`wallet-option ${paymentDetails.selectedWallet === 'GooglePay' ? 'selected-wallet' : ''}`}
                onClick={() => handleInputChange('selectedWallet', 'GooglePay')}
              >
                Google Pay
              </button>
            </div>
          )}

          {selectedMethod === 'netbanking' && (
            <div className="netbanking-payment">
              <h3>Choose Your Bank</h3>
              <select
                value={paymentDetails.selectedBank}
                onChange={(e) => handleInputChange('selectedBank', e.target.value)}
              >
                <option value="">Select Bank</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="axis">Axis Bank</option>
              </select>
            </div>
          )}

          {/* Pay Now Button */}
          <button className="pay-button" onClick={processPayment}>
            Pay ₹{totalAmount}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="payment-footer">
        <p>Powered by GN Secure Gateway</p>
      </footer>

      {/* Timer Expired Modal */}
      {showTimerExpiredModal && (
        <div className="timer-expired-modal">
          <div className="modal-content">
            <h2>Payment Session Expired</h2>
            <p>Your payment session has timed out. Please start again.</p>
            <button onClick={handleTimerExpiredModalClose}>
              Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
