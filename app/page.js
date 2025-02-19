"use client"; // Add this line to make it a client component

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Content from "@/components/Content";
import { auth } from './firebase'; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";


export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserProfile({ name: user.displayName });
            } else {
                setIsLoggedIn(false);
                setUserProfile({});
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        <div id="root">
            <div className="navbar">
                <Navbar isLoggedIn={isLoggedIn} userProfile={userProfile} setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className="content">
                <Content />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}
