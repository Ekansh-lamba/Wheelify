import React, { useState } from 'react';
import MainSidebar from './MainSidebar';
import './Support.css';

function Support() {
    const [ticketType, setTicketType] = useState('general');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const customerId = localStorage.getItem('customerId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('customerId', customerId);
            formData.append('type', ticketType);
            formData.append('subject', subject);
            formData.append('message', message);
            attachments.forEach(file => {
                formData.append('attachments', file);
            });

            const response = await fetch('http://localhost:8080/support/ticket', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to create support ticket');

            setSuccess('Support ticket created successfully! We will get back to you soon.');
            setTicketType('general');
            setSubject('');
            setMessage('');
            setAttachments([]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachments(prev => [...prev, ...files]);
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="support-page">
            <MainSidebar />
            <div className="support-content">
                <h1>Customer Support</h1>

                <div className="support-grid">
                    {/* FAQ Section */}
                    <div className="support-section faq-section">
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-list">
                            <details>
                                <summary>How do I rent a car?</summary>
                                <p>To rent a car, simply browse our available vehicles, select your desired dates, and complete the booking process. You'll need a valid driver's license and credit card.</p>
                            </details>
                            <details>
                                <summary>What is the cancellation policy?</summary>
                                <p>Cancellations made 24 hours before the rental start time are fully refundable. Later cancellations may incur charges.</p>
                            </details>
                            <details>
                                <summary>How does the insurance work?</summary>
                                <p>We offer various insurance options to protect you during your rental. Basic insurance is included, and additional coverage is available.</p>
                            </details>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="support-section contact-form">
                        <h2>Create Support Ticket</h2>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Ticket Type:</label>
                                <select
                                    value={ticketType}
                                    onChange={(e) => setTicketType(e.target.value)}
                                    required
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="technical">Technical Support</option>
                                    <option value="billing">Billing Issue</option>
                                    <option value="complaint">Complaint</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Subject:</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                    placeholder="Brief description of your issue"
                                />
                            </div>

                            <div className="form-group">
                                <label>Message:</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows="5"
                                    placeholder="Please describe your issue in detail"
                                />
                            </div>

                            <div className="form-group">
                                <label>Attachments:</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf,.doc,.docx"
                                />
                                <div className="attachments-list">
                                    {attachments.map((file, index) => (
                                        <div key={index} className="attachment-item">
                                            <span>{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeAttachment(index)}
                                                className="remove-attachment"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Ticket'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="support-section contact-info">
                        <h2>Contact Information</h2>
                        <div className="contact-details">
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <div>
                                    <h3>Phone Support</h3>
                                    <p>+1 (800) 123-4567</p>
                                    <p className="text-muted">Available 24/7</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <h3>Email Support</h3>
                                    <p>support@carental.com</p>
                                    <p className="text-muted">Response within 24 hours</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <h3>Main Office</h3>
                                    <p>123 Car Street</p>
                                    <p>New York, NY 10001</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support; 