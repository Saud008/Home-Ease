'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { BookingModal } from '@/components/BookingModal/BookingModal';
import { showToast } from '@/utils/toast';
import './Services.css';
import Link from 'next/link';

const ServiceCard = ({ service }) => {
    if (!service) return null;

    return (
        <div className="service-card glass-effect">
            <div className="service-content">
                <h3 className="text-gradient">{service.title}</h3>
                <p>{service.description}</p>
                {/* Display sub-services if available */}
                {service.subServices && service.subServices.length > 0 && (
                    <ul className="sub-services-list">
                        {service.subServices.map((subService, index) => (
                            <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                                <span>{subService.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Link href={`/services/${service._id}`} className="book-now-link">
                <button className="book-now">
                    <span>Book Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </Link>
        </div>
    );
};

export function Services({ isVisible = true, mode = 'summary' }) {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [userAddresses, setUserAddresses] = useState([]);
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services');
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
                setError(error.message);
                showToast.error('Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (error) {
        return <div className="error-message">Error loading services: {error}</div>;
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="circular-loader"></div>
            </div>
        );
    }

    if (!services || services.length === 0) {
        return <div className="no-services">No services available</div>;
    }

    // Summary mode for home page
    if (mode === 'summary') {
        return (
            <section className={`services-summary ${isVisible ? 'visible' : ''}`} id="services">
                <h2>Our Services</h2>
                <p className="services-intro">
                    We provide a wide range of professional home services to meet all your needs.
                    From cleaning to repairs, our expert team is ready to help you maintain your perfect home.
                </p>
                
                <div className="services-overview">
                    {services.slice(0, 6).map((service) => (
                        <div key={service._id} className="service-item">
                            <h3>{service.title}</h3>
                            <p>{service.description.substring(0, 100)}...</p>
                        </div>
                    ))}
                </div>
                
                <div className="view-all-container">
                    <Link href="/services" className="view-all-button">
                        View All Services
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </section>
        );
    }

    // Detailed mode for services page
    return (
        <section className={`services ${isVisible ? 'visible' : ''}`} id="services">
            <h2>Our Services</h2>
            <p className="services-description">
                Browse our comprehensive selection of home services designed to make your life easier.
                Each service is performed by vetted professionals dedicated to quality and customer satisfaction.
            </p>
            
            <div className="services-grid">
                {services.map((service) => (
                    <div key={service._id} className="service-card glass-effect">
                        <div className="service-content">
                            <h3 className="text-gradient">{service.title}</h3>
                            <p>{service.description}</p>
                            {service.subServices && service.subServices.length > 0 && (
                                <ul className="sub-services-list">
                                    {service.subServices.map((subService, index) => (
                                        <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                                            <span>{subService.title}</span>
                                            {subService.price && (
                                                <span className="price">${subService.price}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Link href={`/services/${service._id}`} className="book-now-link">
                            <button className="book-now">
                                <span>Book Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            {selectedService && (
                <BookingModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                    userId={userId}
                    addresses={userAddresses}
                />
            )}
        </section>
    );
} 