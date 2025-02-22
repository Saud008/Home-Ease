'use client';

import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

export function Layout({ children }) {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
} 