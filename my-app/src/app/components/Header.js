import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import Image from 'next/image';
import '../styles/Header.css';
import logo from '../images/logo2.png';  // Adjust the path if necessary
import { FaHeart, FaSearch, FaEnvelope, FaUser , FaComment} from 'react-icons/fa'; // Import heart, search, and envelope icons

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch the session email
    const fetchUserData = async () => {
      const response = await fetch('/api/getData');
      const data = await response.json();

      if (data.email && data.fullName) {
        setUserData(data);
        console.log('Header get Data call successful');
      } else {
        //console.error('No user data found');
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  function handleLogout() {
    // Logout logic
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    setUserData(null);
    setIsLoggedIn(false);
    console.log('User logged out');

    //empty session wishlist
    fetch('/api/clearWishlist');

    fetch('/api/logout', {
      method: 'POST', // Use POST method as defined in your API
      headers: {
        'Content-Type': 'application/json', // Specify JSON if your API expects it
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message); // 'Logged out successfully'
      });

    window.location.reload(); // Optionally reload the page
  }

  return (
    <div>
      <header className="header">
        {/* Logo Section */}
        <div className="header__logo">
          <Link href="/">
            <Image src={logo} alt="Logo" width={80} height={80} className="logo-image" />
          </Link>
          <h1>GreenerMe</h1>
        </div>

        {/* Search Bar Section */}
        <div className="header__search">
          <input className="search-input" type="text" placeholder="Search..." />
        </div>

        {/* Navigation Links */}
        <div className="header__nav">
          <Link href="/request" className="request-link">
            <FaEnvelope className="request-icon" />
          </Link>
          <Link href="/wishlist" className="wishlist-link">
            <FaHeart className="wishlist-icon" />
          </Link>
          {!isLoggedIn && <Link href="/signup">Signup</Link>}

          {/* Messenger icon visible after login */}
          {isLoggedIn && (
            <Link href="/messages" className="messenger-link">
                <FaComment className="messenger-icon" />
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#0070f3',
                cursor: 'pointer',
                padding: '0',
              }}
            >
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}

          {/* For user icon after login */}
          {isLoggedIn && (
            <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
              <Link
      href={`/profile2?email=${userData?.email}`} // Pass the user's email as a query parameter
      className="user-link"
      onClick={() => {
        setDropdownOpen(!dropdownOpen);
        console.log("Dropdown toggled:", !dropdownOpen); // Debugging
      }}
      style={{
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
      }}
    >
      <FaUser className="user-icon" />
    </Link>
              
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link href="/profile2" className="dropdown-item">New Listing</Link>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      
      {/* Secondary Navigation Bar */}
      <nav className="secondary-nav">
        <ul className="secondary-nav__list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/information">Information</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about-us">About Us</Link></li>
          <li><Link href="/newlisting">Upload Product</Link></li>
        </ul>
      </nav>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>  
        {isLoggedIn && userData ? (<div>Welcome {userData.fullName}!</div>) : (<div></div>)}
      </div>
      
    </div>
  );
}
