import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setIsLoggedIn(true);
            setUser(savedUser);
        }
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
