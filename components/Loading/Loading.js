'use client';

import React from 'react';
import './Loading.css';

export function Loading() {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    );
} 