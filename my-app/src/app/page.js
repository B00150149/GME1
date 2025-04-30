'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';  // Import Link from next/link
import Header from './components/Header';  // Update path if needed
import Footer from './components/Footer';  // Update path if needed
import homepage from './images/homepage1.jpg';  // Update the path as needed
import './styles/Homepage.css'; // Import the CSS file

export default function Homepage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/review');
        const data = await response.json();
        setReviews(data.slice(0, 3)); // Show top 3 reviews
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <Header />
      
      {/* Image section with overlay and text */} 
      <div className="image-container">
        {/* Image with overlay */} 
        <Image
          src={homepage}
          alt="Eco-friendly"
          layout="fill"  // Makes the image cover the container
          objectFit="cover"  // Ensures the image covers the area while maintaining aspect ratio
          className="homepage-image"
        />
        <div className="overlay"></div>

        {/* Top text - Title and Subheading */} 
        <div className="text-overlay">
          <h1 className="title">GreenerMe</h1>
          <p className="subtitle">A sustainable community for eco-conscious individuals</p>
        </div>

        {/* Buttons at the bottom */} 
        <div className="button-container">
          <Link href="/signup">
            <button className="button">Join the Community</button>
          </Link>
          <Link href="/products">
            <button className="button">Explore Eco-Friendly Upgrades</button>
          </Link>
        </div>
      </div>

      {/* === Review Section BELOW main content === */}
      <div className="homepage-reviews">
        <h2>What Our Users Are Saying</h2>
        <div className="review-cards">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h4>{review.userName}</h4>
              <p>{review.reviewText}</p>
              <div className="star-rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>
          ))}
        </div>
        <Link href="/review" className="see-more">
          See More Reviews →
        </Link>
      </div>

      <Footer />
    </>
  );
}
