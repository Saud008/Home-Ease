"use client"; // Add this line to make it a client component

import React from 'react';
import '@/styles/Content.css'; // Ensure this path is correct

const services = [
    { title: "Electric Services", description: "Reliable electrical services for your home and business." },
    { title: "House Help Services", description: "Professional help for cleaning and maintenance." },
    { title: "Plumbing Services", description: "Expert plumbing solutions for all your needs." },
    { title: "Laundry Services", description: "Convenient laundry services to save you time." },
];

const Content = () => {
    return (
        <div className="services-container">
            {services.map((service, index) => (
                <div className="service-card" key={index}>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button className="book-now">Book Now</button>
                </div>
            ))}
        </div>
    );
};

export default Content;
