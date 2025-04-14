'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/newlisting.css'; // Import the CSS from styles folder
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function newlisting() {
  // const [rating, setRating] = useState(3); // Default rating
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    console.log("handling submit");
    event.preventDefault();
    setIsSubmitting(true); 

    const data = new FormData(event.currentTarget);
    let itemName = data.get('itemName');
    let description = data.get('description');
    let category = data.get('category');
    let swapDetails = data.get('swapDetails');
    let images = data.getAll('images'); // Handles multiple file inputs if required

    console.log("Sent itemName:", itemName);
    console.log("Sent description:", description);
    console.log("Sent category:", category);
    console.log("Sent swapDetails:", swapDetails);
    console.log("Sent images:", images);


     // All data that needs to be passed
     const queryParams = new URLSearchParams({
      itemName,
      description,
      category,
      swapDetails,
    });

     // Append image names to the query string
     images.forEach((file) => {
      queryParams.append('images', file.name); // Only sending file names
    });

    runDBCallAsync(`/api/putnewListing?${queryParams.toString()}`)
    }; // end handle submit


            
    async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if(data.data === "inserted"){
    console.log("New Listing is succesfull!")
    window.location = '/products';
    } else {
    console.log("not valid ")
     setIsSubmitting(false);
    }
      
    }


  return (

    <div className="newlisting">
      <Header /> 

    <div className="newlisting container my-5">
      <div className="card p-4">
        <h2 className="text-center">New Listing</h2>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="itemName" className="form-label">Item Name:</label>
            <input type="text" className="form-control" id="itemName" name="itemName"/>
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

          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting} >
              {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>

        </form>
      </div>
    </div>

    <Footer />
  </div> 
  );
}
