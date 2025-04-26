'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import '../styles/swap.css';
import ChildModal from '../productSwap/page.js';
import Image from 'next/image';

export default function Products() {
  const [data, setData] = useState([]); // Store the fetched data
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null); // Store selected value from modal
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // Store selected product index

  // Fetch products from the API
  useEffect(() => {
    fetch('/api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  function putInWishlist(itemName, description, images, category, userName, email) {
    console.log("putting in wishlist:", { itemName, description, images, category });
    fetch(`/api/putInWishlist?itemName=${encodeURIComponent(itemName)}&description=${encodeURIComponent(description)}&images=${encodeURIComponent(images)}&category=${encodeURIComponent(category)}&userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(email)}`);
    alert("Added to Wishlist");
  }

  function putInRequest(userName, email, itemName, itemId, swapItemId, swapItemName, itemCategory, swapItemCategory) {
    console.log("putting in request:", { userName, email, itemName, swapItemId, itemCategory, swapItemCategory });
    setShowModal(false);
    fetch(`/api/putInRequest?userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(email)}&itemName=${encodeURIComponent(itemName)}&ItemId=${encodeURIComponent(itemId)}&swapItemId=${encodeURIComponent(swapItemId)}&swapItemName=${encodeURIComponent(swapItemName)}&itemCategory=${encodeURIComponent(itemCategory)}&swapItemCategory=${encodeURIComponent(swapItemCategory)}`);
    alert("Swap Request sent to: " + userName);
  }

  function showModalForSelectedProduct(index) {
    setSelectedItemIndex(index);
    setShowModal(true);
  }

  // Function to handle value from child
  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="products">
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Products</h2>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {data.length > 0 && data.map((item, index) => (
            <Col key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  style={{ height: '60%', width: '100%' }}
                  src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder.png'}
                  alt={item.itemName}
                  className="p-3"
                />
                <Card.Body>
                  <Card.Title>{item.itemName}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {item.description}
                    <br />
                    <strong>Category:</strong> {item.category}
                    <br />
                    <strong>Owner:</strong> {item.userName}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-primary" onClick={() => showModalForSelectedProduct(index)}>
                    Swap Request
                  </button>
                  <Button onClick={() => putInWishlist(item.itemName, item.description, item.images, item.category, item.userName, item.email)} variant="contained" color="secondary">
                    <FaHeart className="text-danger" />
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Render ChildModal once outside the map */}
      {showModal && selectedItemIndex !== null && (
        <ChildModal
          onClose={() => setShowModal(false)}
          onSelect={handleSelect}
          sourceCategory={data[selectedItemIndex].category}
          onSwap={() =>
            putInRequest(
              data[selectedItemIndex].userName,
              data[selectedItemIndex].email,
              data[selectedItemIndex].itemName,
              data[selectedItemIndex]._id,
              selectedValue?.id,
              selectedValue?.swapItemName,
              data[selectedItemIndex].category,
              selectedValue?.category
            )
          }
        />
      )}

      <Footer />
    </div>
  );
}
