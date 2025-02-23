'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Services.css';

export function SubServices() {
    const { serviceId } = useParams();
    const [subServices, setSubServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubServices = async () => {
            try {
                const response = await fetch(`/api/services/${serviceId}/sub-services`);
                if (!response.ok) {
                    throw new Error('Failed to fetch sub-services');
                }
                const data = await response.json();
                setSubServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubServices();
    }, [serviceId]);

    if (loading) return <div>Loading sub-services...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="sub-services-section" id="sub-services">
            <div className="container">
                <h2 className="section-title text-gradient">Available Services</h2>
                <div className="sub-services-grid">
                    {subServices.map((subService) => (
                        <div key={subService._id} className="sub-service-card">
                            <h3>{subService.title}</h3>
                            <p>{subService.description}</p>
                            <div className="price">{subService.price}</div>
                            <button className="book-now-button">
                                Book This Service
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 