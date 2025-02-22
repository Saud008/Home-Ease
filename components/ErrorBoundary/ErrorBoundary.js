'use client';

import { Component } from 'react';
import './ErrorBoundary.css';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <div className="error-content">
                        <h2>Something went wrong</h2>
                        <p>We're sorry for the inconvenience. Please try again.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="retry-button"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
} 