'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the email from the query parameters
  const email = router.query?.email;

  useEffect(() => {
    if (!email) {
      setError('No email provided.');
      setLoading(false);
      return;
    }

    // Fetch user data from the backend using the email
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/getUsersData?email=${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center">Profile Page</h1>
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h5 className="card-title">Welcome, {userData.fullName}!</h5>
          <p className="card-text">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="card-text">
            <strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}
          </p>
          <p className="card-text">
            <strong>About:</strong> {userData.about || 'No information provided.'}
          </p>
        </div>
      </div>
    </div>
  );
}