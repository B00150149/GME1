'use client';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Header from '../components/Header'; // Adjust path if needed
import Footer from '../components/Footer'; // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState({});
  const router = useRouter();

  // Fetch wishlist items from the API
  useEffect(() => {
    fetch('/api/getRequest')
        .then((res) => res.json())
        .then((data) => {
            setRequests(data);              
        })
        .catch((error) => console.error('Error fetching request:', error));
}, []);

    const handleClick = () => {
      router.push("/messages"); 
    };

    const handleAccept = async (id) => {
      try {
        const response = await fetch('/api/putInRequest', {
          method: 'PUT', // Use PUT to update status
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestId: id }), // Pass the request ID
        });

        if (response.ok) {
          setAcceptedRequests((prev) => ({ ...prev, [id]: true }));

          // Remove the accepted request from the requests list
          //setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
        } else {
          console.error('Failed to accept request');
        }
      } catch (error) {
        console.error('Error updating request:', error);
      }
    };


  return (
    <>
      {/* Header */}
      <Header />

      <div className="container mt-5">
        <h2 className="text-center mb-4">Pending Requests</h2>
        
        {requests.length > 0 ? (
          <div className="list-group">
            {requests.map((request) => (
              <div className="list-group-item d-flex justify-content-between align-items-center" key={request._id}>
                <div>
                  <div><strong>Sender:</strong> {request.senderName}</div>
                  <div><strong>Email:</strong> {request.senderEmail}</div>
                  <div><strong>Item:</strong> {request.itemName}</div>
                  <div><strong>Status:</strong> 
                          <span className={`badge ${acceptedRequests[request._id] ? 'bg-success' : 'bg-warning'}`}>
                            {acceptedRequests[request._id] ? 'Accepted' : 'Pending'}
                          </span>              
                  </div>
                </div>
                

                {/* buttons to accept or reject the request */}
                <div>
                  {!acceptedRequests[request._id] ? (
                    <>
                      <button className="btn btn-outline-danger me-2">Reject</button>
                      <button className="btn btn-outline-primary" onClick={() => handleAccept(request._id)}>Accept</button>
                    </>
                  ) : (
                    <button className="btn btn-success" onClick={handleClick}>
                      Send Message
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p>No requests found.</p>
        )}
      </div>


      {/* Footer */}
      <Footer />
    </>
  );
}
