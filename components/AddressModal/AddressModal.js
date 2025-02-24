'use client';

import React, { useState } from 'react';
import './AddressModal.css';
import { toast } from 'react-hot-toast';

export function AddressModal({ onClose, onSubmit, userId }) {
    const [addressData, setAddressData] = useState({
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'India', // Default value
        is_primary: false  
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    ...addressData
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add address');
            }

            const newAddress = await response.json();
            onSubmit(newAddress);
            onClose();
        } catch (error) {
            console.error('Error adding address:', error);
            toast.error('Failed to add address');
        }
    };

    return (
        <div className="address-modal-overlay">
            <div className="address-modal-content">
                <h2>Add New Address</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Street Address</label>
                        <input
                            type="text"
                            value={addressData.street_address}
                            onChange={(e) => setAddressData({
                                ...addressData,
                                street_address: e.target.value
                            })}
                            required
                            placeholder="Enter your street address"
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            value={addressData.city}
                            onChange={(e) => setAddressData({
                                ...addressData,
                                city: e.target.value
                            })}
                            required
                            placeholder="Enter your city"
                        />
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            value={addressData.state}
                            onChange={(e) => setAddressData({
                                ...addressData,
                                state: e.target.value
                            })}
                            required
                            placeholder="Enter your state"
                        />
                    </div>

                    <div className="form-group">
                        <label>Postal Code</label>
                        <input
                            type="text"
                            value={addressData.postal_code}
                            onChange={(e) => setAddressData({
                                ...addressData,
                                postal_code: e.target.value
                            })}
                            required
                            placeholder="Enter postal code"
                        />
                    </div>

                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={addressData.is_primary}
                                onChange={(e) => setAddressData({
                                    ...addressData,
                                    is_primary: e.target.checked
                                })}
                            />
                            Set as primary address
                        </label>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Add Address</button>
                    </div>
                </form>
            </div>
        </div>
    );
} 