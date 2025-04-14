'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';  // Import Link from next/link
import Header from './components/Header';  // Update path if needed
import Footer from './components/Footer';  // Update path if needed
import homepage from './images/homepage1.jpg';  // Update the path as needed
import './styles/Homepage.css'; // Import the CSS file

export default function Homepage() {
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

      <Footer />
    </>
  );
}
