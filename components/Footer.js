"use client"; // Add this line to make it a client component

import React from 'react';
import '@/styles/Footer.css'; // Updated path to the CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="/contact">Contact</a>
                <a href="/terms">Terms and Conditions</a>
                <a href="/refund">Refund Policy</a>
            </div>
            <div className="footer-copy">
                &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
