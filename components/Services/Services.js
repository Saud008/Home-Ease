'use client';

import React, { useState, useEffect } from 'react';
import './Services.css';

const ServiceCard = ({ service }) => {
    const handleBooking = (serviceTitle) => {
        window.location.href = `/services/${service._id}`;
    };

    return (
        <div className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <ul className="service-features">
                {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                ))}
            </ul>
            <div className="service-price">{service.price}</div>
            <button 
                className="book-now-button"
                onClick={() => handleBooking(service.title)}
            >
                Book Now
            </button>
        </div>
    );
};

export function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services');
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <div>Loading services...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section 
            className={`services-section`} 
            id="services"
        >
            <div className="container">
                <h2 className="section-title text-gradient">Our Services</h2>
                <p className="section-description">
                    Professional and reliable home services at your fingertips
                </p>
                <div className="services-grid">
                    {services.map((service) => (
                        <ServiceCard 
                            key={service._id} 
                            service={service}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
} 