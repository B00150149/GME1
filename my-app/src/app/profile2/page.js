'use client';

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';
import PointsTracker from './PointsTracker';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/swap.css';

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [userData, setUserData] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/users/${email}`);
        setUserData(res.data);
        setTotalPoints(res.data.points || 0);
        setPointsHistory(res.data.pointsHistory || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  if (!userData) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <main className="container my-5" style={{ flex: '1 0 auto' }}>
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-gray-600">Name: {userData.fullName}</p>
            <p className="text-gray-600">Email: {userData.email}</p>
            <p className="text-gray-600">Points: {totalPoints}</p>

            <PointsTracker setTotalPoints={setTotalPoints} setPointsHistory={setPointsHistory} />

            <h3 className="text-xl font-semibold mt-4">Points Transaction History:</h3>
            <ul>
              {pointsHistory.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>

            <div className="mb-4">
              <a
                href="/newlisting"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#064e03',
                  color: 'white',
                  fontWeight: '600',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                Upload Product
              </a>
            </div>
            <h2 className="text-xl font-semibold mt-4">Uploaded Items</h2>
            <div className="grid grid-cols-2 gap-4">
              {userData.products?.map((item, index) => (
                <div key={item._id || index} className="border p-2 rounded-lg">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded" />
                  <p className="mt-2 font-medium">{item.name}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-4">Swapped Items</h2>
            <div className="grid grid-cols-2 gap-4">
              {userData.swappedItems?.map((item, index) => (
                <div key={item._id || index} className="border p-2 rounded-lg">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded" />
                  <p className="mt-2 font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer style={{ flexShrink: 0 }} />
      </div>
    </>
  );
};

// This wraps ProfilePage in a Suspense boundary
const ProfileWrapper = () => {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfilePage />
    </Suspense>
  );
};

export default ProfileWrapper;






















// 'use client';

// import { useEffect, useState } from "react";
// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/swap.css';
// import axios from "axios";
// import PointsTracker from './PointsTracker';
// import { useSearchParams } from "next/navigation"; // Import useSearchParams from next/navigation
// import Header from '../components/Header'; // Import Header
// import Footer from '../components/Footer'; // Import Footer

//   // Fetch user profile data
//   const ProfilePage = () => {
//     const searchParams = useSearchParams();
//     const email = searchParams.get("email"); // Retrieve the email from the query parameters
//     const [userData, setUserData] = useState(null);
//     const [totalPoints, setTotalPoints] = useState(0);
//     const [pointsHistory, setPointsHistory] = useState([]);

//  // Fetch user profile data
//  useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get(`/api/users/${email}`);
//         setUserData(res.data);
//         setTotalPoints(res.data.points || 0);
//         setPointsHistory(res.data.pointsHistory || []);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (email) {
//       fetchUserData();
//     }
//   }, [email]);

//   if (!userData) return <div>Loading...</div>;

//   return(
//       <>
//       <Header /> 
//     {/* Profile Page Content */}
//     <div className="profile-page">
//     </div>
//       <div className="container my-5">  
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold">Profile</h1>
//       <p className="text-gray-600">Name: {userData.fullName}</p>
//       <p className="text-gray-600">Email: {userData.email}</p>
//       <p className="text-gray-600">Points: {totalPoints}</p>

//       {/* Points Tracker */}
//       <PointsTracker setTotalPoints={setTotalPoints} setPointsHistory={setPointsHistory} />

//       {/* Points Transaction History */}
//       <h3 className="text-xl font-semibold mt-4">Points Transaction History:</h3>
//       <ul>
//         {pointsHistory.map((entry, index) => (
//           <li key={index}>{entry}</li>
//         ))}
//       </ul>

//       {/* Uploaded Items */}
// <h2 className="text-xl font-semibold mt-4">Uploaded Items</h2>
// <div className="grid grid-cols-2 gap-4">
//   {userData.products?.map((item, index) => (
//     <div key={item._id || index} className="border p-2 rounded-lg">
//       <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded" />
//       <p className="mt-2 font-medium">{item.name}</p>
//     </div>
//   ))}
// </div>
//     {/* Swapped Items */}
// <h2 className="text-xl font-semibold mt-4">Swapped Items</h2>
// <div className="grid grid-cols-2 gap-4">
//   {userData.swappedItems?.map((item, index) => (  
//     <div key={item._id || index} className="border p-2 rounded-lg">
//     <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded" />
//     <p className="mt-2 font-medium">{item.name}</p>
//   </div>

//         ))}
//       </div>
//     </div>
//      {/* Include Footer component */}
//     <Footer /> 
  
//   </div>
//   </>                                                                                                                                                                                                                                                                                                                                                         
//   );
// }

    
//     export default ProfilePage;