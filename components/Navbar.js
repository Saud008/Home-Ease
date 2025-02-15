"use client"; // Add this line to make it a client component

import React from 'react';
import '@/styles/Navbar.css'; // Assuming you have some CSS for styling

const Navbar = ({ isLoggedIn, userProfile }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/logo.png" alt="Logo" />
            </div>
            <div className="navbar-buttons">
                {isLoggedIn ? (
                    <>
                        <button onClick={handlePreviousOrders}>Previous Orders</button>
                        <span>{userProfile.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </div>
        </nav>
    );

    function handleLogin() {
        // Logic for login
    }

    function handleLogout() {
        // Logic for logout
    }

    function handlePreviousOrders() {
        // Logic to view previous orders
    }
};

export default Navbar;
