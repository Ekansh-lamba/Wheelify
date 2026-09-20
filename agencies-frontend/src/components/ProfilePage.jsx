import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

function ProfilePage({ userType, loginId }) {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [formValue, setFormValue] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saveError, setSaveError] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            setError(null);
            setSaveError(null);

            console.log("userType:", userType); // Check if userType is passed correctly
            console.log("loginId:", loginId); // Check if loginId is passed correctly

            // Check if userType and loginId are provided
            if (!userType || !loginId) {
                console.error("Missing required user information");
                setError("Missing required user information");
                setLoading(false);
                return;
            }

            try {
                // Determine the endpoint based on user type
                const endpoint = userType === "admin" ? `/admin/profile` : `/customer/profile`;
                const apiUrl = `http://localhost:8080${endpoint}?loginId=${loginId}`;

                console.log("Fetching profile data from:", apiUrl); // Log the API URL

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                
                console.log("Fetched profile data:", data); // Log the fetched data

                if (!data) {
                    throw new Error("No profile data received");
                }

                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [userType, loginId]);

    const handleEdit = (field) => {
        console.log(`Editing field: ${field}`); // Log the field being edited
        setSaveError(null);
        setEditingField(field);
        setFormValue(profileData[field] || "");
    };

    const handleSave = async () => {
        console.log(`Saving field: ${editingField} with value: ${formValue}`); // Log the field and value being saved
        setSaveError(null);
        try {
            if (!editingField || !userType || !loginId) {
                throw new Error("Missing required information for save");
            }

            const updatedData = { ...profileData, [editingField]: formValue };
            const endpoint = userType === "admin" ? "/admin/profile" : "/customer/profile";

            console.log("Saving updated profile data:", updatedData); // Log the data being saved

            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error(`Failed to update profile: ${response.status}`);
            }

            const savedData = await response.json();
            console.log("Successfully saved profile data:", savedData); // Log the saved data
            setProfileData(savedData);
            setEditingField(null);
            setFormValue("");
        } catch (error) {
            console.error("Error saving profile data:", error);
            setSaveError(error.message);
        }
    };

    const handleCancel = () => {
        console.log("Canceling edit operation"); // Log when editing is canceled
        setEditingField(null);
        setFormValue("");
        setSaveError(null);
    };

    const renderLoading = () => (
        <div className="profile-page loading">
            <div className="loading-spinner"></div>
            <p>Loading profile data...</p>
        </div>
    );

    const renderError = () => (
        <div className="profile-page error">
            <h2>Error Loading Profile</h2>
            <p className="error-message">{error}</p>
            <button 
                className="retry-button"
                onClick={() => window.location.reload()}
            >
                Retry
            </button>
        </div>
    );

    const renderNoData = () => (
        <div className="profile-page no-data">
            <h2>No Profile Data</h2>
            <p>Unable to load profile information.</p>
            <button 
                className="retry-button"
                onClick={() => window.location.reload()}
            >
                Retry
            </button>
        </div>
    );

    const renderField = (key, value) => (
        <div className="profile-row" key={key}>
            <span className="field-name">
                {key.charAt(0).toUpperCase() + 
                 key.slice(1).replace(/([A-Z])/g, " $1")}:
            </span>
            
            {editingField === key ? (
                <div className="edit-field">
                    <input
                        type="text"
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        className="edit-input"
                    />
                    <div className="button-group">
                        <button className="save-btn" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="display-field">
                    <span className="field-value">
                        {value || "Not provided"}
                    </span>
                    <button 
                        className="edit-btn"
                        onClick={() => handleEdit(key)}
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );

    if (loading) return renderLoading();
    if (error) return renderError();
    if (!profileData) return renderNoData();

    return (
        <div className="profile-page">
            <h2>My Account</h2>
            <p>Manage your account information.</p>
            
            {saveError && (
                <div className="error-banner">
                    Error saving changes: {saveError}
                </div>
            )}

            <div className="profile-details">
                {Object.entries(profileData).map(([key, value]) => 
                    renderField(key, value)
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
