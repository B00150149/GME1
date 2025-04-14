'use client';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from '../../components/Header';  // Adjust path if needed
import Footer from '../../components/Footer';  // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const[basePath, setPath] = useState('https://tudublin-my.sharepoint.com/:f:/r/personal/b00156196_mytudublin_ie/Documents/Major%20Project%20Folder/Images/');


    // Fetch wishlist items from the API
    useEffect(() => {
        fetch('/api/getWishlist')
            .then((res) => res.json())
            .then((data) => {
                setWishlist(data);              
            })
            .catch((error) => console.error('Error fetching wishlist:', error));
    }, []);


    return (
        <>
            {/* Header */}
            <Header />

        <div className="container mt-4">
                <h1 className="text-center mb-4">My Wishlist</h1>
                <div className="row">
                    {wishlist.length > 0 ? (
                        wishlist.map((item) => (
                            <div key={item._id} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img 
                                    variant="top"
                                    style={{ height: '60%' }} // Pass height as a string
                                    src={basePath+item.images[0]}//{item.images && item.images[0]} // Use the first image if available
                                    alt={item.itemName}
                                    className="p-3"

                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Item: {item.itemName}</h5>
                                        <p className="card-text text-center">Description: {item.description}</p>
                                        <p className="card-text text-center">Owner: {item.userName} </p>
                                        <p className="text-muted text-center">Category: {item.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p className="text-center">Your wishlist is empty.</p>
                        </div>
                    )}
                </div>
            </div>


            {/* Footer */}
            <Footer />
        </>
    );
}