'use client';
import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer';  
import '../styles/Contact.css';  

export default function Contact() {
  return (
    <>
      <Header />
      
      <div className="contact-container">
        <div className="contact-form-container">
          <h2 className="contact-title">Contact Us</h2>
          
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-control" placeholder="Enter your name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control" placeholder="Enter your email" />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" className="form-control" placeholder="Your message" rows="4"></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
