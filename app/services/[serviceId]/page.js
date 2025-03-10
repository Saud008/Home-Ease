// app/pages/services/[serviceId]/page.js
"use client"; // Mark this file as a client component

import { useParams } from 'next/navigation'; // Import useParams from next/navigation
import { useEffect, useState } from 'react';
import styles from '@/styles/SubServices.module.css'; // Import the CSS module
import { Layout } from '@/components/Layout';

const SubServicesPage = () => {
    const { serviceId } = useParams(); // Get the service ID from the URL parameters
    const [subServices, setSubServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (serviceId) {
            const fetchSubServices = async () => {
                console.log("Fetching sub-services for serviceId:", serviceId); // Log the serviceId
                try {
                    const response = await fetch(`/api/subservices/${serviceId}`); // Adjust the API endpoint as needed
                    if (!response.ok) {
                        throw new Error('Failed to fetch sub-services');
                    }
                    const data = await response.json();
                    console.log("Fetched sub-services data:", data); // Log the fetched data
                    setSubServices(data);
                } catch (err) {
                    console.error('Error fetching sub-services:', err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchSubServices();
        }
    }, [serviceId]);

    if (loading) return <div>Loading sub-services...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Layout>
        <div className={styles.container}>
            <h2 className={styles.subServiceTitle}>Sub-Services</h2>
            <ul className={styles.subServiceList}>
                {subServices.map((subService) => (
                    <li key={subService._id} className={styles.subServiceItem}>
                        <h3>{subService.title}</h3>
                        <p className={styles.subServiceDescription}>{subService.description}</p>
                        <p className={styles.subServicePrice}>Price: ${subService.price}</p>
                    </li>
                ))}
            </ul>
        </div>
        </Layout>
    );
};

export default SubServicesPage;