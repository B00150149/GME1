'use client';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from '../components/Header';  // Adjust path if needed
import Footer from '../components/Footer';  // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    // Fetch wishlist items from the API
    useEffect(() => {
        fetch('/api/getWishlist')
            .then((res) => res.json())
            .then((data) => {
                setWishlist(data);              
            })
            .catch((error) => console.error('Error fetching wishlist:', error));
    }, []);

    // Function to remove wishlist item
    const removeWishlistItem = async (itemId) => {
        try {
            const response = await fetch(`/api/removeWishlistItem?itemId=${itemId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Remove item from local state to update UI
                setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== itemId));
            } else {
                const errorData = await response.json();
                console.error('Failed to remove wishlist item:', errorData.error);
            }
        } catch (error) {
            console.error('Error removing wishlist item:', error);
        }
    };

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
                                <Card className="h-100">
                                    <Card.Img 
                                        variant="top"
                                        style={{ height: '60%', width: '100%' }} // Pass height and width as strings
                                        src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder.png'} // Use the first image if available or placeholder
                                        alt={item.itemName}
                                        className="p-3"
                                    />
                                    <Card.Body>
                                        <Card.Title className="text-center">Item: {item.itemName}</Card.Title>
                                        <Card.Text className="text-center">Description: {item.description}</Card.Text>
                                        <Card.Text className="text-center">Owner: {item.userName}</Card.Text>
                                        <Card.Text className="text-muted text-center">Category: {item.category}</Card.Text>
                                        <div className="d-flex justify-content-center">
                                            <Button variant="contained" color="error" onClick={() => removeWishlistItem(item._id)}>
                                                Remove
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
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
