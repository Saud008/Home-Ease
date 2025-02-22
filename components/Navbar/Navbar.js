"use client"; // Add this line to make it a client component

import React, { useState } from 'react';
import { auth, provider } from '@/app/firebase'; // Import Firebase auth and provider
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from '@/hooks/useAuth';
import './Navbar.css'; // Assuming you have some CSS for styling

const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            const userData = result.user;

            // Gather device information
            const deviceInfo = {
                uid: userData.uid,
                displayName: userData.displayName,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                userAgent: window.navigator.userAgent,
                platform: window.navigator.platform,
                language: window.navigator.language,
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };

            // Call API route
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deviceInfo),
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

        } catch (error) {
            console.error("Error signing in: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="/logo.png" alt="Logo" className="nav-logo" />
                <span className="site-name">HomeEase</span>
            </div>
            
            <div className="navbar-center">
                {/* Navigation links can go here */}
            </div>

            <div className="navbar-right">
                {loading ? (
                    <span>Loading...</span>
                ) : user ? (
                    <>
                        <span className="user-name">{user.name}</span>
                        <button 
                            onClick={handleLogout}
                            className="auth-button logout-button"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={handleLogin}
                        className="auth-button login-button"
                    >
                        Login with Google
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
