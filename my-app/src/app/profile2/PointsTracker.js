'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PointsTracker = ({ email, setTotalPoints, setPointsHistory }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial points from the backend
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await axios.get(`/api/users/${email}`);
        const user = res.data;
        setTotalPoints(user.points || 0);
        setPointsHistory(user.pointsHistory || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching points:', error);
        setError('Failed to fetch points');
        setLoading(false);
      }
    };

    if (email) {
      fetchPoints();
    }
  }, [email, setTotalPoints, setPointsHistory]);

  // Function to handle adding points
  const handleAddPoints = async () => {
    const newPoints = 10; // Example: Add 10 points
    try {
      // Update points in the backend
      const res = await axios.post(`/api/users/${email}/add-points`, { points: newPoints });
      const user = res.data;

      // Update points in the frontend
      setTotalPoints(user.points || 0);
      setPointsHistory(user.pointsHistory || []);
    } catch (error) {
      console.error('Error adding points:', error);
      setError('Failed to add points');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="points-tracker">
      <button
        onClick={handleAddPoints}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Points
      </button>
    </div>
  );
};

export default PointsTracker;