import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import CurrentRentals from './CurrentRentals';
import RentalHistory from './RentalHistory';
import Wishlist from './Wishlist';
import Recommendations from './Recommendations';
import RentCar from './RentCar';
import ReturnCar from './ReturnCar';
import Feedback from './Feedback';
import Settings from './Settings';
import Support from './Support';
import './MainContent.css';

function MainContent() {
    return (
        <main className="main-content">
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/current-rentals" element={<CurrentRentals />} />
                <Route path="/rental-history" element={<RentalHistory />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/rent-car" element={<RentCar />} />
                <Route path="/return-car" element={<ReturnCar />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
            </Routes>
        </main>
    );
}

export default MainContent; 