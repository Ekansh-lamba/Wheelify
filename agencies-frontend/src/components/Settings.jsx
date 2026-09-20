import React, { useState, useEffect } from 'react';
import MainSidebar from './MainSidebar';
import './Settings.css';

function Settings() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        preferredCurrency: 'INR',
        notifications: {
            email: true,
            sms: true,
            promotions: false
        },
        darkMode: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8080/customer/profile?customerId=${customerId}`
            );
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            setProfile(prevProfile => ({
                ...prevProfile,
                ...data
            }));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setProfile(prev => ({
                ...prev,
                notifications: {
                    ...prev.notifications,
                    [name]: checked
                }
            }));
        } else {
            setProfile(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess('');

        try {
            const response = await fetch(
                `http://localhost:8080/customer/profile/${customerId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(profile),
                }
            );

            if (!response.ok) throw new Error('Failed to update profile');
            
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        // Implement password change logic
    };

    return (
        <div className="settings-page">
            <MainSidebar />
            <div className="settings-content">
                <h1>Settings</h1>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="settings-grid">
                    {/* Profile Settings */}
                    <div className="settings-section">
                        <h2>Profile Settings</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <textarea
                                    name="address"
                                    value={profile.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                />
                            </div>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>

                    {/* Preferences */}
                    <div className="settings-section">
                        <h2>Preferences</h2>
                        <div className="form-group">
                            <label>Preferred Currency:</label>
                            <select
                                name="preferredCurrency"
                                value={profile.preferredCurrency}
                                onChange={handleInputChange}
                            >
                                <option value="INR">Indian Rupee (₹)</option>
                                <option value="USD">US Dollar ($)</option>
                                <option value="EUR">Euro (€)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Dark Mode:</label>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    name="darkMode"
                                    checked={profile.darkMode}
                                    onChange={handleInputChange}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="settings-section">
                        <h2>Notifications</h2>
                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="email"
                                    checked={profile.notifications.email}
                                    onChange={handleInputChange}
                                />
                                Email Notifications
                            </label>
                        </div>
                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="sms"
                                    checked={profile.notifications.sms}
                                    onChange={handleInputChange}
                                />
                                SMS Notifications
                            </label>
                        </div>
                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="promotions"
                                    checked={profile.notifications.promotions}
                                    onChange={handleInputChange}
                                />
                                Promotional Notifications
                            </label>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="settings-section">
                        <h2>Security</h2>
                        <form onSubmit={handlePasswordChange}>
                            <div className="form-group">
                                <label>Current Password:</label>
                                <input type="password" name="currentPassword" />
                            </div>
                            <div className="form-group">
                                <label>New Password:</label>
                                <input type="password" name="newPassword" />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password:</label>
                                <input type="password" name="confirmPassword" />
                            </div>
                            <button type="submit">Change Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings; 