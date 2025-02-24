"use client"; // Add this line to make it a client component

import React from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero/Hero';
import { Services } from '@/components/Services/Services';

export default function Home() {

    const handleExploreClick = () => {
        // Smooth scroll to services section
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Layout>
            <Hero onExploreClick={handleExploreClick} />
            <Services />
        </Layout>
    );
}
