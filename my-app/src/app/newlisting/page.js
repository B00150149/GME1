'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/newlisting.css'; // Import the CSS from styles folder
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function newlisting() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = new FormData(event.currentTarget);
    const itemName = data.get('itemName');
    const description = data.get('description');
    const category = data.get('category');
    const swapDetails = data.get('swapDetails');
    const images = data.getAll('images');

    // Upload images to Cloudinary
    const uploadedImageUrls = [];
    for (const imageFile of images) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        console.error('Cloudinary upload failed');
        setIsSubmitting(false);
        return;
      }

      const json = await res.json();
      uploadedImageUrls.push(json.secure_url);
    }

    // Prepare payload
    const payload = {
      itemName,
      description,
      category,
      swapDetails,
      images: uploadedImageUrls,
    };

    // Send POST request to backend API
    const response = await fetch('/api/putnewListing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.data === 'inserted') {
      console.log('New Listing is successful!');
      window.location = '/products';
    } else {
      console.log('Listing creation failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newlisting">
      <Header />

      <div className="newlisting container my-5">
        <div className="card p-4">
          <h2 className="text-center">New Listing</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="itemName" className="form-label">Item Name:</label>
              <input type="text" className="form-control" id="itemName" name="itemName" />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea className="form-control" id="description" name="description" rows="3"></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">Category:</label>
              <select className="form-select" id="category" name="category">
                <option value="">Select Category</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="images" className="form-label">Images:</label>
              <input type="file" className="form-control" id="images" name="images" multiple />
            </div>

            <div className="form-group">
              <label htmlFor="swapDetails" className="form-label">Swap Details:</label>
              <textarea className="form-control" id="swapDetails" name="swapDetails" rows="3"></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
