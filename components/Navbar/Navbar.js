"use client"; // Add this line to make it a client component

import React, { useState } from 'react';
import { auth, provider } from '@/app/firebase'; // Import Firebase auth and provider
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from '@/hooks/useAuth';
import './Navbar.css'; // Assuming you have some CSS for styling

const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
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

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    // Get first letter of email for fallback avatar
    const getInitial = () => {
        return user?.email ? user.email[0].toUpperCase() : 'U';
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
                        <div className="user-profile">
                            <div 
                                className="profile-circle" 
                                onClick={toggleProfile}
                            >
                                {user.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt="profile"
                                        className="profile-avatar"
                                    />
                                ) : (
                                    <div className="profile-initial">
                                        {getInitial()}
                                    </div>
                                )}
                            </div>
                            {showProfile && (
                                <div className="profile-dropdown">
                                    <div className="profile-header">
                                        <div className="profile-info">
                                            <div className="profile-avatar-large">
                                                {user.photoURL ? (
                                                    <img 
                                                        src={user.photoURL} 
                                                        alt="profile"
                                                        className="profile-image"
                                                    />
                                                ) : (
                                                    <div className="profile-initial-large">
                                                        {getInitial()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="profile-details">
                                                <h2>{user.email}</h2>
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-content">
                                        <div className="profile-section">
                                            <h3>Phone Number</h3>
                                            <p>{user.phoneNumber || 'Not provided'}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="logout-button"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
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
