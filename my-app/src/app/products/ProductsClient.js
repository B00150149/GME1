'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Card, Row, Col, Carousel } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import ChildModal from '../productSwap/page.js';
import '../styles/swap.css';

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('searchQuery') || '';

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== '') {
      fetch('/api/searchProducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchQuery: searchQuery.trim() }),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch(() => {
          setData([]);
        });
    } else {
      fetch('/api/getProducts')
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch(() => {
          setData([]);
        });
    }
  }, [searchQuery]);

  function putInWishlist(itemName, description, images, category, userName, email) {
    fetch(`/api/putInWishlist?itemName=${encodeURIComponent(itemName)}&description=${encodeURIComponent(description)}&images=${encodeURIComponent(images)}&category=${encodeURIComponent(category)}&userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(email)}`);
    alert("Added to Wishlist");
  }

  function putInRequest(userName, email, itemName, itemId, swapItemId, swapItemName) {
    setShowModal(false);
    fetch(`/api/putInRequest?userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(email)}&itemName=${encodeURIComponent(itemName)}&ItemId=${encodeURIComponent(itemId)}&swapItemId=${encodeURIComponent(swapItemId)}&swapItemName=${encodeURIComponent(swapItemName)}`);
    alert("Swap Request sent to: " + userName);
  }

  function showModalForSelectedProduct(index) {
    setSelectedItem(index);
    setShowModal(true);
  }

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="products">
      <div className="container mt-4">
        <h2 className="text-center mb-4">Products</h2>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {data.length > 0 && data.map((item, index) => (
            <Col key={index}>
              <Card className="h-100 shadow-sm">
                {item.images && item.images.length > 1 ? (
                  <Carousel variant="dark" interval={null} className="p-3" style={{ height: '60%', width: '100%' }}>
                    {item.images.map((imgSrc, idx) => (
                      <Carousel.Item key={idx}>
                        <img
                          className="d-block w-100"
                          src={imgSrc}
                          alt={`${item.itemName} image ${idx + 1}`}
                          style={{ height: '300px', objectFit: 'cover', borderRadius: '5px' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <Card.Img
                    variant="top"
                    style={{ height: '60%', width: '100%' }}
                    src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder.png'}
                    alt={item.itemName}
                    className="p-3"
                  />
                )}
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
                  {showModal && selectedItem !== null && (
                    <ChildModal
                      category={data[selectedItem].category}
                      onClose={() => setShowModal(false)}
                      onSelect={handleSelect}
                      onSwap={() => putInRequest(
                        data[selectedItem].userName,
                        data[selectedItem].email,
                        data[selectedItem].itemName,
                        data[selectedItem]._id,
                        selectedValue?.id,
                        selectedValue?.swapItemName
                      )}
                    />
                  )}
                  <Button onClick={() => putInWishlist(item.itemName, item.description, item.images, item.category, item.userName, item.email)} variant="contained" color="secondary"><FaHeart className="text-danger" /></Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
