'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/Homepage.css'; // Make sure you have this file to style the page

export default function Homepage() {
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        {/* Left section with big text */}
        <div className="homepage-left">
          <h1 className="title">Greener Me</h1>
          <div className="image-container">
            <Image 
              src="/path/to/your/image.jpg" 
              alt="Eco-Friendly Image"
              width={500}  // Adjust image width as per your design
              height={300} // Adjust image height as per your design
            />
          </div>
        </div>

        {/* Right section with buttons */}
        <div className="homepage-right">
          <Link href="/signup">
            <a className="button">Join the Community</a>
          </Link>
          <Link href="/eco-upgrades">
            <a className="button">Explore Eco-Friendly Upgrades</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
