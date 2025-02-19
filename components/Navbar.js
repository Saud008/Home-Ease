"use client"; // Add this line to make it a client component

import React from 'react';
import { auth, provider } from '../app/firebase'; // Import Firebase auth and provider
import { signInWithPopup, signOut } from "firebase/auth";
import '@/styles/Navbar.css'; // Assuming you have some CSS for styling

const Navbar = ({ isLoggedIn, userProfile, setIsLoggedIn }) => {
    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setIsLoggedIn(true);
            // You can also set userProfile here if needed
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/logo.png" alt="Logo" />
            </div>
            <div className="navbar-buttons">
                {isLoggedIn ? (
                    <>
                        <span>{userProfile.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <button onClick={handleLogin}>Login with Google</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
