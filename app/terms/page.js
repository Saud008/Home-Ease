"use client";

import React from 'react';
import { Layout } from '@/components/Layout';
import styles from '@/styles/Terms.module.css';

const TermsPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Terms and Conditions</h1>
        <p className={styles.lastUpdated}>Last Updated: June 15, 2023</p>
        
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Introduction</h2>
            <p>Welcome to HomeEase ("Company", "we", "our", "us")! These Terms and Conditions ("Terms", "Terms and Conditions") govern your use of our website located at www.homeease.com (the "Service") and any related applications operated by HomeEase.</p>
            <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
          </section>
          
          <section className={styles.section}>
            <h2>2. Definitions</h2>
            <p><strong>Service</strong> refers to the website and any related applications.</p>
            <p><strong>User</strong> refers to the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            <p><strong>Service Provider</strong> refers to the professionals who perform the services booked through our platform.</p>
          </section>
          
          <section className={styles.section}>
            <h2>3. User Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
          </section>
          
          <section className={styles.section}>
            <h2>4. Booking Services</h2>
            <p>By booking a service through our platform, you are entering into an agreement with the Service Provider, not with HomeEase. We act as an intermediary between you and the Service Provider.</p>
            <p>You agree to provide accurate information regarding the service you require, including the location, time, and specific needs. Failure to provide accurate information may result in additional charges or cancellation of the service.</p>
            <p>You must be at least 18 years old to book a service. By booking a service, you confirm that you are at least 18 years old.</p>
          </section>
          
          <section className={styles.section}>
            <h2>5. Cancellation Policy</h2>
            <p>You may cancel a booking up to 24 hours before the scheduled service time without incurring any charges. Cancellations made within 24 hours of the scheduled service time may incur a fee of 50% of the service cost.</p>
            <p>HomeEase reserves the right to cancel a booking at any time if we believe that the Service Provider cannot fulfill the service adequately or if there are safety concerns. In such cases, you will receive a full refund of any payments made.</p>
          </section>
          
          <section className={styles.section}>
            <h2>6. Payments</h2>
            <p>All payments are processed securely through our third-party payment processors. By making a payment, you agree to the terms and conditions of these processors.</p>
            <p>Prices for services are subject to change without notice. We reserve the right to modify or discontinue the Service without notice at any time.</p>
            <p>You agree to pay all charges at the prices then in effect for your purchases, and you authorize us to charge your chosen payment provider for any such purchases.</p>
          </section>
          
          <section className={styles.section}>
            <h2>7. Service Quality and Disputes</h2>
            <p>While we strive to ensure all Service Providers deliver high-quality services, we cannot guarantee the quality or satisfaction with the services provided. If you are dissatisfied with a service, you should first try to resolve the issue directly with the Service Provider.</p>
            <p>If you cannot resolve the issue with the Service Provider, please contact our customer support team, who will attempt to mediate the dispute. We reserve the right to make the final decision in any dispute.</p>
          </section>
          
          <section className={styles.section}>
            <h2>8. Intellectual Property</h2>
            <p>The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of HomeEase and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
            <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of HomeEase.</p>
          </section>
          
          <section className={styles.section}>
            <h2>9. Limitation of Liability</h2>
            <p>In no event shall HomeEase, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>
          
          <section className={styles.section}>
            <h2>10. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>
          </section>
          
          <section className={styles.section}>
            <h2>11. Contact Us</h2>
            <p>If you have any questions about these Terms, please <a href="/contact" className={styles.contactLink}>contact us</a>.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage; 