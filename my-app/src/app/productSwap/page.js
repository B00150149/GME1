'use client';
import React from "react";
import { useState, useEffect } from 'react';

export default function ChildModal({ category, onClose, onSelect, onSwap }) {
  const [data, setData] = useState(null); // Store the fetched data, null initially
  const [filteredData, setFilteredData] = useState([]); // Store filtered data by category
  const [selectedId, setSelectedId] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    fetch('/api/getUserProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  // Filter products by category when data or category changes
  useEffect(() => {
    if (category && data && data.length > 0) {
      const filtered = data.filter(item => item.category === category);
      setFilteredData(filtered);
      setSelectedId(null); // reset selection on category change
    } else {
      setFilteredData([]);
      setSelectedId(null);
    }
  }, [category, data]);

  // Handle selection change
  const handleSelect = (item) => {
    setSelectedId(item._id);
    onSelect({ id: item._id, swapItemName: item.itemName });
  };

  if (data === null) {
    // Data is still loading
    return null; // or a loading spinner if preferred
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Select an Option</h3>

        {/* List of products with images and names */}
        <div className="product-list">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item._id}
                className={`product-item ${selectedId === item._id ? 'selected' : ''}`}
                onClick={() => handleSelect(item)}
              >
                <img
                  src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder.png'}
                  alt={item.itemName}
                  className="product-image"
                />
                <div className="product-name">{item.itemName}</div>
              </div>
            ))
          ) : (
            <div>No products available for this category.</div>
          )}
        </div>

        <br />

        <button className="btn btn-danger" onClick={onSwap} disabled={!selectedId}>Swap</button>
        <button className="btn btn-danger" onClick={onClose}>Close</button>
      </div>

      {/* Modal Styling */}
      <style jsx>{`
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px); /* Adds a subtle blur effect */
        }
        .modal-content {
            background: rgba(255, 255, 255, 0.9); /* Slight transparency */
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .product-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            max-height: 300px;
            overflow-y: auto;
            margin-top: 10px;
        }
        .product-item {
            cursor: pointer;
            border: 2px solid transparent;
            border-radius: 8px;
            padding: 5px;
            width: 100px;
            text-align: center;
            transition: border-color 0.3s;
        }
        .product-item.selected {
            border-color: red;
        }
        .product-image {
            width: 100%;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
        }
        .product-name {
            margin-top: 5px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        .btn {
            margin: 5px;
        }
      `}</style>
    </div>
  );
}
