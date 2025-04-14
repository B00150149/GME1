
'use client';
import React from "react";
import { useState, useEffect } from 'react';

export default function ChildModal({ onClose, onSelect, onSwap }) {
 // const items = ["Option 1", "Option 2", "Option 3"]; // Sample options
  const [data, setData] = useState([]); // Store the fetched data

// Fetch products from the API
  useEffect(() => {
    fetch('/api/getUserProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);


  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Select an Option</h3>

        {/* Combobox (select dropdown) */}
        <select className="form-select" onChange={(e) => onSelect({id: data[e.target.selectedIndex-1]._id, swapItemName: e.target.value})} defaultValue="">
          <option value="" disabled>Select an option</option>
          {data.length > 0 && data.map((item, index) => (
            <option key={index} value={item.itemName}>
              {item.itemName}
            </option>
          ))}
        </select>

        <br />

        <button className="btn btn-danger" onClick={onSwap}>Swap</button>
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
            // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Adds a shadow for depth */
        }
    .form-select {
            width: 100%;
            margin-top: 10px;
        }
        `}</style>

    </div>
  );
}


