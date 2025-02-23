'use client';

import React from 'react';
import './Hero.css';

export function Hero({ onExploreClick }) {
    return (
        <section className="hero">
            <div className="hero-background"></div>
            <div className="hero-overlay"></div>
            <div className="container">
                <h1 className="text-gradient">Professional Home Services</h1>
                <p>Your trusted partner for all home service needs</p>
                <button 
                    className="hero-button"
                    onClick={() => {
                        console.log('Button clicked');
                        onExploreClick();
                    }}
                >
                    Explore Services
                </button>
            </div>
        </section>
    );
} 