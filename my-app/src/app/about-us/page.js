'use client';
import React from 'react';
import Header from '../components/Header';  
import Footer from '../components/Footer';  
import '../styles/About.css';  

export default function About() {
  return (
    <>
      <Header />
      
      <div className="about-container">
        <div className="about-section">
          <h1 className="about-title">About Us</h1>
          <p className="about-description">
            Welcome to GreenerMe! We are a passionate community of eco-conscious individuals committed to creating a more sustainable future.
            Our mission is to encourage individuals to embrace eco-friendly practices, reduce waste, and contribute to a greener world. 
            Our platform connects people with eco-friendly products, services, and solutions that empower them to make a positive impact.
          </p>
        </div>

        <div className="mission-section">
          <h2 className="mission-title">Our Mission</h2>
          <p className="mission-description">
            At GreenerMe, we believe in the power of collective action. We aim to create a sustainable future by promoting products and 
            initiatives that align with our core values of sustainability, community, and innovation. Our mission is to make it easier for individuals 
            to adopt green solutions, live sustainably, and reduce their environmental footprint. Together, we can create lasting change and make the world 
            a better place for future generations.
          </p>
        </div>

        <div className="values-section">
          <h2 className="values-title">Our Core Values</h2>
          <ul className="values-list">
            <li>🌱 **Sustainability**: We prioritize products and services that are eco-friendly, renewable, and help reduce waste.</li>
            <li>🤝 **Community**: We believe in the power of community, collaboration, and sharing knowledge to create a bigger impact.</li>
            <li>💡 **Innovation**: We are committed to discovering new ways to make sustainable living more accessible and practical for everyone.</li>
            <li>🌍 **Global Impact**: We aim to make a global impact by inspiring individuals to adopt sustainable practices in their daily lives.</li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}
