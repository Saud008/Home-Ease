"use client";

import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import styles from '@/styles/FAQ.module.css';

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // FAQ data
  const faqData = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What services does HomeEase offer?",
          answer: "HomeEase offers a wide range of home services including cleaning, plumbing, electrical work, HVAC maintenance, painting, gardening, pest control, and more. Our goal is to be your one-stop solution for all home service needs."
        },
        {
          question: "How do I book a service?",
          answer: "Booking a service with HomeEase is simple. Browse our services, select the one you need, choose a date and time that works for you, provide your address details, and complete the booking. You can also call our customer service team for assistance."
        },
        {
          question: "Are your service providers insured?",
          answer: "Yes, all HomeEase service providers are fully insured and undergo thorough background checks. We prioritize your safety and peace of mind when allowing professionals into your home."
        },
        {
          question: "What is your cancellation policy?",
          answer: "You can reschedule or cancel your booking up to 24 hours before the scheduled service without any charge. Cancellations made within 24 hours may incur a fee of 50% of the service cost."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          question: "How is pricing determined for services?",
          answer: "Our pricing is transparent and based on the type of service, the size of your home, and the complexity of the task. You'll receive a detailed quote before confirming your booking, and we guarantee no hidden fees."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit and debit cards, PayPal, and bank transfers. Payment is typically processed after the service is completed to ensure your satisfaction."
        },
        {
          question: "Do you offer any discounts or promotions?",
          answer: "Yes, we regularly offer seasonal promotions and discounts for first-time customers. We also have a loyalty program where you can earn points for each booking, which can be redeemed for discounts on future services."
        },
        {
          question: "Is tipping expected?",
          answer: "Tipping is not required but is always appreciated by our service providers. If you're particularly satisfied with the service, you can add a tip during the payment process or in cash directly to the provider."
        }
      ]
    },
    {
      category: "Service Details",
      questions: [
        {
          question: "How long does a typical service take?",
          answer: "Service duration varies depending on the type of service and the size of your home. For example, a standard cleaning for a two-bedroom apartment typically takes 2-3 hours, while more complex services like plumbing or electrical work may take longer. The estimated duration will be provided when you book."
        },
        {
          question: "Do I need to be home during the service?",
          answer: "This depends on the service and your preference. For some services, you may need to be present to provide access or explain specific requirements. For others, you can provide entry instructions and we'll handle the rest. This can be specified when booking."
        },
        {
          question: "What if I'm not satisfied with the service?",
          answer: "Customer satisfaction is our priority. If you're not completely satisfied with the service, please contact us within 24 hours, and we'll arrange for the service provider to return and address any issues at no additional cost."
        },
        {
          question: "Do you bring your own equipment and supplies?",
          answer: "Yes, our service providers bring all necessary professional equipment and supplies needed to complete the job effectively. If you prefer that we use specific products you already have, please let us know during booking."
        }
      ]
    },
    {
      category: "Account & Booking",
      questions: [
        {
          question: "How do I create an account?",
          answer: "You can create an account by clicking on the 'Sign Up' button in the top right corner of our website. You'll need to provide your name, email address, and create a password. You can also sign up using your Google account for quicker access."
        },
        {
          question: "Can I reschedule my booking?",
          answer: "Yes, you can reschedule your booking up to 24 hours before the scheduled service time through your account dashboard. For changes within 24 hours, please contact our customer service team directly."
        },
        {
          question: "How do I view my booking history?",
          answer: "Once logged in, you can access your booking history from your account dashboard. This shows all your past and upcoming services, including details like date, time, service provider, and payment information."
        },
        {
          question: "Can I book recurring services?",
          answer: "Absolutely! We offer flexible recurring service options for services like cleaning, gardening, and pest control. You can choose weekly, bi-weekly, monthly, or custom intervals based on your needs. Recurring services also come with special discounted rates."
        }
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>Find answers to common questions about our services and platform</p>
        
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search for questions..." className={styles.searchInput} />
          </div>
        </div>
        
        <div className={styles.faqContainer}>
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{category.category}</h2>
              
              <div className={styles.questionsContainer}>
                {category.questions.map((faq, index) => {
                  const globalIndex = `${categoryIndex}-${index}`;
                  const isActive = activeIndex === globalIndex;
                  
                  return (
                    <div 
                      key={index} 
                      className={`${styles.faqItem} ${isActive ? styles.active : ''}`}
                    >
                      <div 
                        className={styles.faqQuestion}
                        onClick={() => toggleAccordion(globalIndex)}
                      >
                        <h3>{faq.question}</h3>
                        <span className={styles.accordionIcon}>
                          {isActive ? '−' : '+'}
                        </span>
                      </div>
                      
                      <div 
                        className={`${styles.faqAnswer} ${isActive ? styles.showAnswer : ''}`}
                      >
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.stillHaveQuestions}>
          <h2>Still Have Questions?</h2>
          <p>Our customer support team is here to help you with any other questions or concerns.</p>
          <div className={styles.contactButtons}>
            <a href="/contact" className={styles.contactButton}>Contact Us</a>
            <a href="tel:+15551234567" className={styles.phoneButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage; 