'use client';

import React, { useState, useEffect } from 'react';
import { AddressModal } from '../AddressModal/AddressModal';
import { showToast } from '@/utils/toast';
import './BookingModal.css';

export function BookingModal({ service, onClose, userId }) {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        address_id: '',
        scheduled_time: '',
        special_instructions: ''
    });
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [prefilledAddress, setPrefilledAddress] = useState(null);

    const fetchAddresses = async () => {
        try {
            const response = await fetch(`/api/addresses?userId=${userId}`);
            if (!response.ok) throw new Error('Failed to fetch addresses');
            const data = await response.json();
            setAddresses(data);
            
            const primaryAddress = data.find(addr => addr.is_primary);
            if (primaryAddress) {
                setBookingData(prev => ({
                    ...prev,
                    address_id: primaryAddress.id
                }));
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            showToast.error('Failed to load addresses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookingData.address_id) {
            showToast.warning('Please select a service address');
            return;
        }

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    service_type: service.type,
                    scheduled_time: bookingData.scheduled_time,
                    base_price: service.pricing.basePrice,
                    special_instructions: bookingData.special_instructions,
                    address_id: bookingData.address_id
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create booking');
            }

            const result = await response.json();
            showToast.success('Booking created successfully! Our team will contact you soon.');
            onClose();
        } catch (error) {
            console.error('Error creating booking:', error);
            showToast.error(error.message || 'Failed to create booking');
        }
    };

    const handleAddressSubmit = async (newAddress) => {
        try {
            await fetchAddresses();
            setBookingData(prev => ({
                ...prev,
                address_id: newAddress.id
            }));
            setShowAddressModal(false);
            showToast.success('Address added successfully');
        } catch (error) {
            console.error('Error refreshing addresses:', error);
            showToast.error('Address added but failed to refresh list');
        }
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            showToast.error('Geolocation is not supported by your browser');
            return;
        }

        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    // Use reverse geocoding to get address from coordinates
                    const response = await fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
                    );

                    if (!response.ok) throw new Error('Failed to fetch address');
                    
                    const data = await response.json();
                    if (data.results && data.results.length > 0) {
                        const location = data.results[0].components;
                        
                        // Open AddressModal with pre-filled data
                        setShowAddressModal(true);
                        // Pass the location data to AddressModal
                        setPrefilledAddress({
                            street_address: `${location.road || ''} ${location.house_number || ''}`.trim(),
                            city: location.city || location.town || '',
                            state: location.state || '',
                            postal_code: location.postcode || '',
                            country: location.country || 'India',
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    } else {
                        throw new Error('No address found');
                    }
                } catch (error) {
                    console.error('Error getting location:', error);
                    showToast.error('Failed to get address from location');
                } finally {
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                setIsLoadingLocation(false);
                console.error('Geolocation error:', error);
                showToast.error('Failed to get your location');
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    if (loading) {
        return <div>Loading addresses...</div>;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Book {service.title}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Service Details */}
                    <div className="service-summary">
                        <p>Service: {service.title}</p>
                        <p>Price: ₹{service.pricing.basePrice}</p>
                    </div>

                    {/* Address Selection */}
                    <div className="form-group">
                        <label>Select Service Address</label>
                        <select 
                            value={bookingData.address_id}
                            onChange={(e) => setBookingData({
                                ...bookingData,
                                address_id: e.target.value
                            })}
                            required
                        >
                            <option value="">Select an address</option>
                            {addresses.map(addr => (
                                <option key={addr.id} value={addr.id}>
                                    {addr.street_address}, {addr.city}, {addr.state} {addr.postal_code}
                                    {addr.is_primary ? ' (Primary)' : ''}
                                </option>
                            ))}
                        </select>
                        <div className="address-actions">
                            <button 
                                type="button" 
                                className="add-address-btn"
                                onClick={() => setShowAddressModal(true)}
                            >
                                + Add New Address
                            </button>
                            <button
                                type="button"
                                className="use-location-btn"
                                onClick={getCurrentLocation}
                                disabled={isLoadingLocation}
                            >
                                {isLoadingLocation ? 'Getting Location...' : '📍 Use Current Location'}
                            </button>
                        </div>
                    </div>

                    {/* Schedule Time */}
                    <div className="form-group">
                        <label>Select Preferred Time</label>
                        <input 
                            type="datetime-local"
                            value={bookingData.scheduled_time}
                            onChange={(e) => setBookingData({
                                ...bookingData,
                                scheduled_time: e.target.value
                            })}
                            required
                            min={new Date().toISOString().slice(0, 16)}
                        />
                    </div>

                    {/* Special Instructions */}
                    <div className="form-group">
                        <label>Special Instructions (Optional)</label>
                        <textarea
                            value={bookingData.special_instructions}
                            onChange={(e) => setBookingData({
                                ...bookingData,
                                special_instructions: e.target.value
                            })}
                            rows={3}
                            placeholder="Any specific requirements or instructions..."
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Book Service</button>
                    </div>
                </form>
            </div>

            {showAddressModal && (
                <AddressModal
                    onClose={() => {
                        setShowAddressModal(false);
                        setPrefilledAddress(null);
                    }}
                    onSubmit={handleAddressSubmit}
                    userId={userId}
                    prefilledAddress={prefilledAddress}
                />
            )}
        </div>
    );
} 