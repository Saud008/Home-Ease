"use client";

import React from 'react';
import { Layout } from '@/components/Layout';
import { Services } from '@/components/Services/Services';
import styles from '@/styles/ServicesPage.module.css';

const ServicesPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        
        <div className={styles.servicesWrapper}>
          <Services mode="detailed" isVisible={true} />
        </div>
        
        <div className={styles.guaranteeSection}>
          <div className={styles.guaranteeCard}>
            <div className={styles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>100% Satisfaction Guarantee</h3>
            <p>If you're not completely satisfied with our service, we'll make it right or refund your money.</p>
          </div>
          
          <div className={styles.guaranteeCard}>
            <div className={styles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>On-Time Service</h3>
            <p>We respect your time. Our professionals arrive within the scheduled timeframe or we'll discount your service.</p>
          </div>
          
          <div className={styles.guaranteeCard}>
            <div className={styles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Vetted Professionals</h3>
            <p>All our service providers undergo thorough background checks and are fully insured for your peace of mind.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
