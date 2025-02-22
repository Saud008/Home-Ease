"use client"; // Add this line to make it a client component

import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="/contact">Contact</a>
                <a href="/terms">Terms and Conditions</a>
                <a href="/refund">Refund Policy</a>
            </div>
            <div className="footer-copy">
                &copy; {new Date().getFullYear()} Home Ease. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
