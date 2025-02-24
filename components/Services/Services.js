'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { BookingModal } from '../BookingModal/BookingModal';
import toast from 'react-hot-toast';
import './Services.css';

const ServiceCard = ({ service, onBookNow }) => {
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
                if (!response.ok) throw new Error('Failed to fetch services');
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

    const handleBookNow = async (service) => {
        if (!user) {
            toast.error('Please login to book services');
            return;
        }
        setSelectedService(service);
    };

    const handleBookingSubmit = async (bookingData) => {
        try {
            const booking = {
                user_id: userId,
                service_type: selectedService.title,
                address_id: bookingData.address_id,
                scheduled_time: new Date(bookingData.scheduled_time).toISOString(),
                total_cost: parseFloat(selectedService.price.replace(/[^0-9.]/g, '')),
                status: 'NEW',
                payment_status: 'UNPAID',
                special_instructions: bookingData.special_instructions,
                payment_method: bookingData.payment_method
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });

            if (!response.ok) throw new Error('Failed to create booking');

            const data = await response.json();
            
            // Redirect to payment page
            window.location.href = `/payment/${data.bookingId}`;

        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Failed to create booking');
        }
    };

    if (loading) return <div>Loading services...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <section 
                className={`services-section ${isVisible ? 'visible' : 'hidden'}`} 
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
                                onBookNow={handleBookNow}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {selectedService && (
                <BookingModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                    onSubmit={handleBookingSubmit}
                    userId={userId}
                />
            )}
        </>
    );
} 