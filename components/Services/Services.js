'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { BookingModal } from '@/components/BookingModal/BookingModal';
import toast from 'react-hot-toast';
import './Services.css';

const ServiceCard = ({ service, onBookNow }) => {
    if (!service) return null;
    
    return (
        <div className="service-card glass-effect">
            <div className="service-content">
                <h3 className="text-gradient">{service.title}</h3>
                <p>{service.shortDescription || service.description}</p>
                {service.features && service.features.length > 0 && (
                    <ul className="features-list">
                        {service.features.map((feature, index) => (
                            <li key={index}>
                                {feature.icon && <span className="feature-icon">{feature.icon}</span>}
                                <span>{feature.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
                {service.pricing && (
                    <p className="price">{service.pricing.displayText}</p>
                )}
            </div>
            <button 
                className="book-now"
                onClick={() => onBookNow(service)}
            >
                Book Now
            </button>
        </div>
    );
};

export function Services({ isVisible }) {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [userAddresses, setUserAddresses] = useState([]);

    useEffect(() => {
        const fetchUserId = async () => {
            if (user?.uid) {
                try {
                    const response = await fetch(`/api/users/${user.uid}`);
                    if (!response.ok) throw new Error('Failed to fetch user data');
                    const data = await response.json();
                    setUserId(data.id);
                } catch (err) {
                    console.error('Error fetching user ID:', err);
                }
            }
        };

        fetchUserId();
    }, [user]);

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
                toast.error('Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const fetchUserAddresses = async () => {
            if (userId) {
                try {
                    const response = await fetch(`/api/users/${user.uid}/addresses`);
                    if (!response.ok) throw new Error('Failed to fetch addresses');
                    const data = await response.json();
                    setUserAddresses(data);
                } catch (err) {
                    console.error('Error fetching addresses:', err);
                }
            }
        };

        fetchUserAddresses();
    }, [userId]);

    if (error) {
        return <div className="error-message">Error loading services: {error}</div>;
    }

    if (loading) {
        return <div className="loading">Loading services...</div>;
    }

    if (!services || services.length === 0) {
        return <div className="no-services">No services available</div>;
    }

    return (
        <section className={`services ${isVisible ? 'visible' : ''}`} id="services">
            <h2>Our Services</h2>
            <div className="services-grid">
                {services.map((service) => (
                    <ServiceCard
                        key={service._id}
                        service={service}
                        onBookNow={setSelectedService}
                    />
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