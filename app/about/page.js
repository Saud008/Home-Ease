"use client";

import React from 'react';
import { Layout } from '@/components/Layout';
import styles from '@/styles/About.module.css';

const AboutPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>About Us</h1>
        
        <section className={styles.section}>
          <h2>Our Story</h2>
          <p>
            Founded in 2023, HomeEase began with a simple mission: to make home services accessible, 
            affordable, and hassle-free for everyone. What started as a small team of dedicated 
            professionals has grown into a trusted network of service providers across the country.
          </p>
          <p>
            Our journey has been defined by our commitment to quality, reliability, and customer 
            satisfaction. We believe that everyone deserves a comfortable living space, and we're 
            here to make that happen.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            At HomeEase, our mission is to transform the way people access home services. We strive 
            to create a platform that connects homeowners with skilled professionals who can deliver 
            exceptional service with transparency, reliability, and care.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>Our Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>Quality</h3>
              <p>We never compromise on the quality of our services. Every service provider in our 
              network is thoroughly vetted and committed to excellence.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Reliability</h3>
              <p>We understand the importance of punctuality and consistency in home services. 
              You can count on us to be there when you need us.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Transparency</h3>
              <p>No hidden fees, no surprises. We believe in clear communication and upfront pricing 
              to build trust with our customers.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Innovation</h3>
              <p>We continuously seek ways to improve our services and incorporate the latest 
              technologies to enhance the customer experience.</p>
            </div>
          </div>
        </section>
        
        <section className={styles.teamSection}>
          <h2>Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/team/ceo.jpg" alt="CEO" />
              </div>
              <h3>Jane Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/team/cto.jpg" alt="CTO" />
              </div>
              <h3>John Smith</h3>
              <p>CTO</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/team/operations.jpg" alt="Operations Director" />
              </div>
              <h3>Emily Johnson</h3>
              <p>Operations Director</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage; 