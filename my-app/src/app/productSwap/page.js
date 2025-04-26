'use client';
import React, { useState, useEffect } from "react";

export default function ChildModal({ onClose, onSelect, onSwap, sourceCategory }) {
  const [data, setData] = useState([]); // Store the fetched data
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    fetch('/api/getUserProducts')
      .then((res) => res.json())
      .then((data) => {
        // Filter products by sourceCategory
        const filteredData = data.filter(item => item.category === sourceCategory);
        setData(filteredData);
      });
  }, [sourceCategory]);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    const selectedItem = data[index];
    onSelect({ id: selectedItem._id, swapItemName: selectedItem.itemName, category: selectedItem.category });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Select an Option</h3>

        <div className="container">
          <div className="row">
            {data.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={item._id}
                  className={`col-6 col-md-4 mb-3`}
                >
                  <div
                    className={`card h-100 ${selectedIndex === index ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSelect(index)}
                  >
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        className="card-img-top"
                        alt={item.itemName}
                        style={{ objectFit: 'cover', height: '180px' }}
                      />
                    ) : (
                      <div
                        className="card-img-top d-flex align-items-center justify-content-center bg-light"
                        style={{ height: '180px' }}
                      >
                        No Image
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title text-truncate">{item.itemName}</h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>

        <button className="btn btn-danger me-2" onClick={onSwap} disabled={selectedIndex === null}>
          Swap
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>

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
          backdrop-filter: blur(5px);
        }
        .modal-content {
          background: rgba(255, 255, 255, 0.95);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          max-width: 600px;
          width: 90%;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
